/** Safely apply owner-authored GitHub issue to public theme-composition review audit. */
import fs from 'node:fs';
import path from 'node:path';
import {THEMATIC_SECTOR_BY_ID} from '../src/data/sectorUniverse';
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
  const expected=[...new Set(theme.stocks.map(x=>x.ticker))].sort();
  const requested=request.assignments.map(x=>x.ticker).sort();
  if(expected.length!==requested.length||expected.some((ticker,i)=>ticker!==requested[i])){
    throw new Error('Review must exactly match CURRENT basket tickers');
  }
  const existing=parseThemeReviewBook(book);
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

function main(){
  const eventPath=process.env.GITHUB_EVENT_PATH;
  if(!eventPath)throw new Error('Missing GitHub event file');
  const event=JSON.parse(fs.readFileSync(eventPath,'utf8')) as ThemeReviewEvent;
  const file=path.join(process.cwd(),'src/data/themeCompositionReviews.json');
  const existing=parseThemeReviewBook(JSON.parse(fs.readFileSync(file,'utf8')));
  const updated=approveThemeReviewEvent(event,existing,new Date().toISOString());
  fs.writeFileSync(file,JSON.stringify(updated,null,2)+'\n','utf8');
  console.log('Saved theme approval:',JSON.stringify(updated.reviews.at(-1)));
}
if(process.argv[1]?.endsWith('/scripts/approve-theme-composition-issue.ts'))main();
