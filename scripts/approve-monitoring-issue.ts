import fs from 'node:fs';
import path from 'node:path';
import { THEMATIC_SECTOR_INDICES } from '../src/data/sectorUniverse';
import {
  approveMonitoringSymbols, parseMonitoringIssueBody, parseMonitoringManifest,
  MONITORING_MANIFEST_PATH, type PriceMonitoringManifest
} from '../src/utils/priceMonitoring';

/** This is a strictly constrained owner-only GitHub Issue intake.
 * User-provided issue contents are NEVER executed, used in shell, or written
 * into code; only validated ticker strings reach a JSON symbol-only manifest.
 */
export interface MonitoringIssue {
  title?:string;
  body?:string;
  user?:{login?:string};
  author_association?:string;
  state?:string;
}
export interface MonitoringIssueEvent {
  action?:string;
  sender?:{login?:string};
  issue?:MonitoringIssue;
  repository?:{full_name?:string};
}
export function approveIssueRequest(
  event:MonitoringIssueEvent,
  current:PriceMonitoringManifest,
):{after:PriceMonitoringManifest,added:string[],skipped:string[]}{
  const issue=event.issue;
  if(event.action!=='opened'||event.repository?.full_name!=='lkshdby/IndiaSectorTrends'||
    event.sender?.login!=='lkshdby'||issue?.user?.login!=='lkshdby'||
    issue?.author_association!=='OWNER'||issue.state!=='open'||
    !issue.title?.startsWith('[Monitor NSE] Approve ')){
    throw new Error('Only new, owner-authored monitoring approvals from lkshdby are accepted');
  }
  const selected=parseMonitoringIssueBody(issue.body||'');
  const thematic=new Set(THEMATIC_SECTOR_INDICES.flatMap(x=>x.stocks.map(y=>y.ticker)));
  return approveMonitoringSymbols(current,selected,thematic);
}

function main(){
  const eventPath=process.env.GITHUB_EVENT_PATH;
  if(!eventPath)throw new Error('Missing GitHub issue event JSON');
  const event=JSON.parse(fs.readFileSync(eventPath,'utf8')) as MonitoringIssueEvent;
  const manifestFile=path.join(process.cwd(),MONITORING_MANIFEST_PATH);
  const before=parseMonitoringManifest(JSON.parse(fs.readFileSync(manifestFile,'utf8')));
  const result=approveIssueRequest(event,before);
  if(result.added.length){
    fs.writeFileSync(manifestFile,JSON.stringify(result.after,null,2)+'\n','utf8');
  }
  const output=process.env.GITHUB_OUTPUT;
  if(output)fs.appendFileSync(output,[
    'added='+result.added.length,
    'total='+result.after.symbols.length,
    'skipped='+result.skipped.length,
  ].join('\n')+'\n');
  console.log('Approved ticker-only daily monitoring:',JSON.stringify({
    added:result.added, skippedAlreadyTracked:result.skipped,
    total:result.after.symbols.length
  }));
}
if(process.argv[1]?.endsWith('/scripts/approve-monitoring-issue.ts'))main();
