/** Public owner-reviewed thematic composition records; no Screener data. */
import committedReviewData from '../data/themeCompositionReviews.json';

export type CompositionTier='core'|'adjacent'|'proxy'|'excluded';
export interface CompositionAssignment {ticker:string;tier:CompositionTier;}
export interface ThemeReviewRequest {themeId:string;assignments:CompositionAssignment[];note:string;}
export interface ApprovedThemeReview extends ThemeReviewRequest {
  reviewedAt:string;githubIssue:number;reviewedBy:'lkshdby';
}
export interface ThemeReviewBook {version:1;reviews:ApprovedThemeReview[];}
export const REVIEW_MARKER='<!-- ist-theme-composition-review:v1 -->';
export const REVIEW_START='THEME_COMPOSITION_REQUEST';
export const REVIEW_END='END_THEME_COMPOSITION_REQUEST';
export const PUBLIC_REVIEWS_URL=
  'https://raw.githubusercontent.com/lkshdby/IndiaSectorTrends/main/src/data/themeCompositionReviews.json';
const tiers=new Set<CompositionTier>(['core','adjacent','proxy','excluded']);
function isObj(v:unknown):v is Record<string,unknown>{
  return !!v&&typeof v==='object'&&!Array.isArray(v);
}
export function cleanReviewAssignments(v:unknown):CompositionAssignment[]{
  if(!Array.isArray(v)||v.length<1||v.length>100)throw new Error('Review requires 1–100 stock tickers');
  const rows:CompositionAssignment[]=v.map((entry:unknown)=>{
    if(!isObj(entry)||typeof entry.ticker!=='string'||
      !/^[A-Z0-9][A-Z0-9&._-]{0,19}$/.test(entry.ticker)||
      !tiers.has(entry.tier as CompositionTier))throw new Error('Invalid stock ticker or review tier');
    return {ticker:entry.ticker,tier:entry.tier as CompositionTier};
  }).sort((a,b)=>a.ticker.localeCompare(b.ticker));
  if(new Set(rows.map(x=>x.ticker)).size!==rows.length)throw new Error('Duplicate stock ticker');
  if(!rows.some(x=>x.tier==='core'))throw new Error('At least one core ticker must remain');
  return rows;
}
function parseRequest(v:unknown):ThemeReviewRequest{
  if(!isObj(v)||typeof v.themeId!=='string'||
    !/^[a-z0-9][a-z0-9-]{1,90}$/.test(v.themeId)||
    typeof v.note!=='string'||v.note.length>280){
    throw new Error('Invalid theme identity or review note');
  }
  return {themeId:v.themeId,assignments:cleanReviewAssignments(v.assignments),note:v.note.trim()};
}
export function parseThemeReviewBook(v:unknown):ThemeReviewBook{
  if(!isObj(v)||v.version!==1||!Array.isArray(v.reviews)||v.reviews.length>750){
    throw new Error('Invalid public review audit');
  }
  const issues=new Set<number>();
  const reviews:ApprovedThemeReview[]=v.reviews.map((entry:unknown)=>{
    if(!isObj(entry)||entry.reviewedBy!=='lkshdby'||
      typeof entry.reviewedAt!=='string'||!/^\d{4}-\d{2}-\d{2}T/.test(entry.reviewedAt)||
      !Number.isFinite(Date.parse(entry.reviewedAt))||
      !Number.isSafeInteger(entry.githubIssue)||Number(entry.githubIssue)<1||
      issues.has(entry.githubIssue as number))throw new Error('Invalid audit owner, timestamp or issue');
    issues.add(entry.githubIssue as number);
    return {...parseRequest(entry),reviewedAt:entry.reviewedAt,
      reviewedBy:'lkshdby',githubIssue:entry.githubIssue as number};
  });
  return {version:1,reviews};
}
export const COMMITTED_THEME_REVIEWS:ThemeReviewBook=parseThemeReviewBook(committedReviewData);
export function mostRecentThemeReview(book:ThemeReviewBook,themeId:string,
  currentUniverse:readonly string[],asOf?:string):ApprovedThemeReview|null{
  const latest=[...book.reviews].reverse().find(r=>r.themeId===themeId&&
    (!asOf||r.reviewedAt.slice(0,10)<=asOf));
  if(!latest)return null;
  const tickers=[...new Set(currentUniverse)].sort();
  const approved=latest.assignments.map(a=>a.ticker).sort();
  if(tickers.length!==approved.length||tickers.some((ticker,i)=>ticker!==approved[i]))return null;
  return latest;
}
export function buildThemeReviewIssueBody(themeId:string,
  assignments:CompositionAssignment[],note=''):string{
  const payload=parseRequest({themeId,assignments,note});
  return [REVIEW_MARKER,REVIEW_START,JSON.stringify(payload),REVIEW_END,'',
    'I approve this exact thematic composition as an editorial research classification.',
    'I understand this is not independently verified revenue exposure, and past signals stay unchanged.',
  ].join('\n');
}
export function parseThemeReviewIssueBody(body:string):ThemeReviewRequest{
  const lines=body.replace(/\r\n/g,'\n').split('\n');
  if(body.length>15000||lines[0]!==REVIEW_MARKER||lines[1]!==REVIEW_START||
    lines[3]!==REVIEW_END||
    !lines.slice(4).join('\n').includes('I approve this exact thematic composition')){
    throw new Error('Unrecognized or incomplete theme approval');
  }
  let request:unknown;
  try{request=JSON.parse(lines[2]);}catch{throw new Error('Invalid review JSON');}
  return parseRequest(request);
}
export function buildThemeReviewIssueUrl(themeId:string,
  assignments:CompositionAssignment[],note=''):string{
  const body=buildThemeReviewIssueBody(themeId,assignments,note);
  return 'https://github.com/lkshdby/IndiaSectorTrends/issues/new?title='+
    encodeURIComponent('[Review Theme] Approve composition: '+themeId)+
    '&body='+encodeURIComponent(body);
}

/** Maintain last verified owner approvals even when a CDN is briefly unavailable.
 * The committed audit baked into the Vercel build is the first fallback;
 * the browser's last successful, strictly parsed audit adds newer approvals.
 */
export const REVIEW_CACHE_KEY='india-sector-trends:confirmed-theme-reviews:v1';

export function mergeThemeReviewBooks(...books:ThemeReviewBook[]):ThemeReviewBook{
  const byIssue=new Map<number,ApprovedThemeReview>();
  for(const book of books){
    for(const row of parseThemeReviewBook(book).reviews){
      const prev=byIssue.get(row.githubIssue);
      if(prev&&JSON.stringify(prev)!==JSON.stringify(row)){
        throw new Error('Conflicting GitHub theme review issue #'+row.githubIssue);
      }
      byIssue.set(row.githubIssue,row);
    }
  }
  return parseThemeReviewBook({version:1,reviews:[...byIssue.values()].sort(
    (a,b)=>a.reviewedAt.localeCompare(b.reviewedAt)||a.githubIssue-b.githubIssue
  )});
}

export function loadRememberedThemeReviews():ThemeReviewBook{
  if(typeof window==='undefined')return COMMITTED_THEME_REVIEWS;
  try{
    const saved=window.localStorage.getItem(REVIEW_CACHE_KEY);
    return saved?mergeThemeReviewBooks(COMMITTED_THEME_REVIEWS,parseThemeReviewBook(JSON.parse(saved))):
      COMMITTED_THEME_REVIEWS;
  }catch{
    return COMMITTED_THEME_REVIEWS;
  }
}

export function rememberThemeReviews(book:ThemeReviewBook):void{
  if(typeof window==='undefined')return;
  try{window.localStorage.setItem(REVIEW_CACHE_KEY,JSON.stringify(parseThemeReviewBook(book)));}
  catch{/* Storage can be disabled; the verified committed audit remains the fallback. */}
}

async function readReviewJson(url:string,apiContents:boolean):Promise<ThemeReviewBook>{
  const controller=new AbortController();
  const timer=setTimeout(()=>controller.abort(),12000);
  try{
    const res=await fetch(url,{cache:'no-store',credentials:'omit',signal:controller.signal,
      headers:apiContents?{'Accept':'application/vnd.github+json'}:undefined});
    if(!res.ok)throw new Error('HTTP '+res.status);
    if(!apiContents)return parseThemeReviewBook(await res.json());
    const response=await res.json() as {encoding?:string;content?:string};
    if(response.encoding!=='base64'||typeof response.content!=='string')
      throw new Error('GitHub API did not provide base64 review contents');
    const binary=atob(response.content.replace(/\s/g,''));
    const bytes=Uint8Array.from(binary,c=>c.charCodeAt(0));
    return parseThemeReviewBook(JSON.parse(new TextDecoder().decode(bytes)));
  }finally{clearTimeout(timer);}
}

export async function fetchThemeReviews():Promise<ThemeReviewBook>{
  const version=Date.now();
  let primaryFailure='';
  try{
    return await readReviewJson(PUBLIC_REVIEWS_URL+'?v='+version,false);
  }catch(error){
    primaryFailure=error instanceof Error?error.message:String(error);
  }
  // Independent contents endpoint helps when raw.githubusercontent.com is
  // unavailable on the user's network. This endpoint is public, no token used.
  const api='https://api.github.com/repos/lkshdby/IndiaSectorTrends/contents/'+
    'src/data/themeCompositionReviews.json?ref=main';
  try{return await readReviewJson(api,true);}
  catch(error){
    const secondary=error instanceof Error?error.message:String(error);
    throw new Error('GitHub raw: '+primaryFailure+'; GitHub API: '+secondary);
  }
}
