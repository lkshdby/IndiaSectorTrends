/** Safely apply owner-authored GitHub issue to public theme-composition review audit. */
import fs from 'node:fs';
import path from 'node:path';
import {THEMATIC_SECTOR_BY_ID} from '../src/data/sectorUniverse';
import {normalizeMonitorSymbol} from '../src/utils/priceMonitoring';
import {fetchYahooChart} from '../server/marketSync';
import {
  parseThemeReviewBook,parseThemeReviewIssueBody,
  type ThemeReviewBook,type ApprovedThemeReview
} from '../src/utils/themeCompositionReviews';

interface ThemeReviewEvent {
  action?:string;
  sender?:{login?:string};
  repository?:{full_name?:string};
  issue?:{
    number?:number;title?:string;body?:string;state?:string;
    user?:{login?:string};author_association?:string;
  };
}

export function approveThemeReviewEvent(
  event:ThemeReviewEvent,book:ThemeReviewBook,now:string
):ThemeReviewBook{
  const issue=event.issue;
  if(event.action!=='opened'||event.sender?.login!=='lkshdby'||
    event.repository?.full_name!=='lkshdby/IndiaSectorTrends'||
    issue?.user?.login!=='lkshdby'||issue.author_association!=='OWNER'||
    issue.state!=='open'||!issue.title?.startsWith('[Review Theme] Approve composition: ')||
    !Number.isSafeInteger(issue.number)||Number(issue.number)<1){
    throw new Error('Only new, owner-authored thematic review issues may be approved');
  }
  const request=parseThemeReviewIssueBody(issue.body||'');
  if(issue.title!=='[Review Theme] Approve composition: '+request.themeId){
    throw new Error('Theme approval title mismatch');
  }
  const theme=THEMATIC_SECTOR_BY_ID.get(request.themeId);
  if(!theme)throw new Error('Unknown thematic basket');
  const existing=parseThemeReviewBook(book);
  // The current roster includes all prior approved additions, even if the
  // workflow checks out a revision before the public site has redeployed.
  const previous=existing.reviews.filter(x=>x.themeId===request.themeId).at(-1);
  const current=new Set([
    ...theme.stocks.map(x=>x.ticker),
    ...(previous?.assignments.map(x=>x.ticker)||[]),
  ]);
  const requested=new Set(request.assignments.map(x=>x.ticker));
  if([...current].some(ticker=>!requested.has(ticker))){
    throw new Error('Review must exactly match CURRENT basket tickers; existing members cannot be removed');
  }
  const additions=[...requested].filter(ticker=>!current.has(ticker));
  if(additions.length>5)throw new Error('At most five new NSE tickers per thematic approval');
  if(additions.some(ticker=>normalizeMonitorSymbol(ticker)!==ticker)){
    throw new Error('New ticker must be an NSE symbol without .NS, .BO or invalid characters');
  }
  if(existing.reviews.some(x=>x.githubIssue===issue.number)){
    throw new Error('GitHub issue already applied');
  }
  if(!/^\d{4}-\d{2}-\d{2}T/.test(now)||!Number.isFinite(Date.parse(now))){
    throw new Error('Invalid approval timestamp');
  }
  const record:ApprovedThemeReview={
    ...request,reviewedAt:now,githubIssue:issue.number as number,reviewedBy:'lkshdby'
  };
  return parseThemeReviewBook({version:1,reviews:[...existing.reviews,record]});
}

/**
 * Confirm a genuinely new NSE symbol has an observable Yahoo .NS history.
 * Existing verified NSE histories need no additional public API call.
 * A failed verification blocks the whole issue; never silently include a
 * fabricated/invalid constituent or alter an existing approved portfolio.
 */
export async function verifyNewNseTickers(
  additions:readonly string[], hasKnownHistory:(ticker:string)=>boolean,
  fetchChart:typeof fetchYahooChart=fetchYahooChart,
):Promise<void>{
  for(const ticker of additions){
    if(hasKnownHistory(ticker))continue;
    let firstError:unknown=null;
    let verified=false;
    for(const host of ['query1.finance.yahoo.com','query2.finance.yahoo.com'] as const){
      try{
        const quote=await fetchChart(ticker+'.NS','1mo',host);
        if(quote.rawHistory.length>=2 && quote.rawHistory.every(row=>
          Number.isFinite(row.close)&&row.close>0)){
          verified=true;break;
        }
      }catch(error){firstError=error;}
    }
    if(!verified)throw new Error('Unable to verify '+ticker+
      ' on Yahoo NSE daily chart (.NS); approval NOT saved. '+String(firstError||'Missing trading history'));
  }
}

async function main(){
  const eventPath=process.env.GITHUB_EVENT_PATH;
  if(!eventPath)throw new Error('Missing GitHub event file');
  const event=JSON.parse(fs.readFileSync(eventPath,'utf8')) as ThemeReviewEvent;
  const file=path.join(process.cwd(),'src/data/themeCompositionReviews.json');
  const existing=parseThemeReviewBook(JSON.parse(fs.readFileSync(file,'utf8')));
  const updated=approveThemeReviewEvent(event,existing,new Date().toISOString());
  const current=new Set([
    ...(THEMATIC_SECTOR_BY_ID.get(updated.reviews.at(-1)!.themeId)?.stocks.map(x=>x.ticker)||[]),
    ...(existing.reviews.filter(x=>x.themeId===updated.reviews.at(-1)!.themeId).at(-1)?.assignments.map(x=>x.ticker)||[]),
  ]);
  const added=updated.reviews.at(-1)!.assignments.map(x=>x.ticker).filter(t=>!current.has(t));
  const snapshotPath=path.join(process.cwd(),'src/data/verifiedLiveMarketData.json');
  const prices=JSON.parse(fs.readFileSync(snapshotPath,'utf8')) as {stocks?:Record<string,{
    symbol?:string;rawHistory?:{date:string;close:number}[]}>};
  await verifyNewNseTickers(added,ticker=>{
    const stock=prices.stocks?.[ticker];
    return stock?.symbol===ticker+'.NS' && (stock.rawHistory?.length||0)>=2;
  });
  fs.writeFileSync(file,JSON.stringify(updated,null,2)+'\n','utf8');
  if(process.env.GITHUB_OUTPUT)fs.appendFileSync(process.env.GITHUB_OUTPUT,
    'added_count='+added.length+'\n'+'added_tickers='+added.join(',')+'\n');
  console.log('Saved theme approval:',JSON.stringify(updated.reviews.at(-1)));
  if(added.length)console.log('Approved additional NSE tracking symbols:',added.join(', '));
}
if(process.argv[1]?.endsWith('/scripts/approve-theme-composition-issue.ts')){
  main().catch(error=>{console.error(error);process.exitCode=1;});
}
