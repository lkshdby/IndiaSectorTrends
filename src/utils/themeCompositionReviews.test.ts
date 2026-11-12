import test from 'node:test';
import assert from 'node:assert/strict';
import {
  COMMITTED_THEME_REVIEWS,buildThemeReviewIssueBody,parseThemeReviewIssueBody,
  parseThemeReviewBook,mostRecentThemeReview,cleanReviewAssignments,mergeThemeReviewBooks
} from './themeCompositionReviews';
import {approveThemeReviewEvent} from '../../scripts/approve-theme-composition-issue';
import {THEMATIC_SECTOR_BY_ID,classifySectorMember,getCoreSectorIndices} from '../data/sectorUniverse';

const theme=THEMATIC_SECTOR_BY_ID.get('hospitals')!;
const candidates=theme.stocks.map(s=>({ticker:s.ticker,tier:'core' as const}));
const accepted='2026-11-11T09:32:00.000Z';
function event(body=buildThemeReviewIssueBody(theme.id,candidates)){
  return {
    action:'opened',repository:{full_name:'lkshdby/IndiaSectorTrends'},
    sender:{login:'lkshdby'},
    issue:{
      number:123456,title:'[Review Theme] Approve composition: '+theme.id,
      body,state:'open',user:{login:'lkshdby'},author_association:'OWNER'
    }
  };
}
test('owner review is recorded but not applied before its approval date',()=>{
  const book=approveThemeReviewEvent(event(),{version:1,reviews:[]},accepted);
  const tickerList=theme.stocks.map(x=>x.ticker);
  assert.equal(book.reviews.length,1);
  assert.ok(mostRecentThemeReview(book,theme.id,tickerList));
  assert.equal(mostRecentThemeReview(book,theme.id,tickerList,'2026-11-10'),null);
  assert.equal(mostRecentThemeReview(book,theme.id,[...tickerList,'CHANGED']),null);
  assert.equal(classifySectorMember(theme.id,theme.stocks[0],book).reviewStatus,'reviewed-theme-fit');
  assert.equal(getCoreSectorIndices(book).find(x=>x.id===theme.id)?.stocks.length,tickerList.length);
});
test('approval rejects other users, mismatched baskets and duplicate issues',()=>{
  assert.throws(()=>approveThemeReviewEvent({...event(),sender:{login:'stranger'}},{version:1,reviews:[]},accepted));
  assert.throws(()=>approveThemeReviewEvent(event(buildThemeReviewIssueBody(theme.id,candidates.slice(1))),
    {version:1,reviews:[]},accepted),/exactly match/);
  const book=approveThemeReviewEvent(event(),{version:1,reviews:[]},accepted);
  assert.throws(()=>approveThemeReviewEvent(event(),book,accepted),/already applied/);
});
test('issue input is strict and existing editorial defaults remain unchanged',()=>{
  const roles=cleanReviewAssignments([{ticker:'AAA',tier:'adjacent'},{ticker:'BBB',tier:'core'}]);
  const body=buildThemeReviewIssueBody('sample-theme',roles,'Reviewed');
  assert.deepEqual(parseThemeReviewIssueBody(body).assignments,roles);
  assert.throws(()=>cleanReviewAssignments([{ticker:'AAA',tier:'excluded'}]),/core/);
  assert.throws(()=>cleanReviewAssignments([{ticker:'AAA',tier:'core'},{ticker:'AAA',tier:'core'}]),/Duplicate/);
  // The public audit now contains genuine owner approvals; do not assume an empty fixture.
  assert.deepEqual(parseThemeReviewBook(COMMITTED_THEME_REVIEWS),COMMITTED_THEME_REVIEWS);
});

test('last approved review survives an older or empty remote audit',()=>{
  const book=approveThemeReviewEvent(event(),{version:1,reviews:[]},accepted);
  const saved=mergeThemeReviewBooks(COMMITTED_THEME_REVIEWS,book,{version:1,reviews:[]});
  assert.ok(saved.reviews.some(r=>r.githubIssue===123456));
  const reloaded=mergeThemeReviewBooks(COMMITTED_THEME_REVIEWS,saved);
  assert.deepEqual(saved,reloaded);
  assert.ok(mostRecentThemeReview(reloaded,theme.id,theme.stocks.map(s=>s.ticker)));
});
test('audit merge rejects same issue number with conflicting contents',()=>{
  const book=approveThemeReviewEvent(event(),{version:1,reviews:[]},accepted);
  const altered={version:1 as const,reviews:book.reviews.map(r=>({...r,note:'tampered'}))};
  assert.throws(()=>mergeThemeReviewBooks(book,altered),/Conflicting/);
});

test('all 21 owner-authored theme approvals are baked into the application',()=>{
  const issueNumbers=[26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46];
  const recorded=COMMITTED_THEME_REVIEWS.reviews.map(r=>r.githubIssue).sort((a,b)=>a-b);
  assert.deepEqual(recorded,issueNumbers);
  const rechecked=COMMITTED_THEME_REVIEWS.reviews;
  for(const review of rechecked){
    const theme=THEMATIC_SECTOR_BY_ID.get(review.themeId);
    assert.ok(theme,'Missing theme '+review.themeId);
    const current=theme.stocks.map(x=>x.ticker).sort();
    assert.deepEqual(review.assignments.map(x=>x.ticker).sort(),current,review.themeId);
    for(const stock of theme.stocks){
      const expected=review.assignments.find(x=>x.ticker===stock.ticker);
      const actual=classifySectorMember(theme.id,stock);
      assert.equal(actual.tier,expected?.tier,review.themeId+' '+stock.ticker);
      assert.equal(actual.reviewStatus,'reviewed-theme-fit',review.themeId+' '+stock.ticker);
    }
  }
  const banks=getCoreSectorIndices().find(x=>x.id==='private-banks');
  assert.equal(banks?.stocks.length,9,'Private Banks issue #30 must stay approved');
  assert.equal(banks?.stocks.every(x=>classifySectorMember('private-banks',x).reviewStatus==='reviewed-theme-fit'),true);
  const brokers=getCoreSectorIndices().find(x=>x.id==='brokers-depositories');
  assert.equal(brokers?.stocks.length,9,'Brokers issue #39 explicitly added Groww');
  assert.ok(brokers?.stocks.some(x=>x.ticker==='GROWW'),'GROWW must stay in reviewed core basket');
});
