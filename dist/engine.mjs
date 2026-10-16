export const themes = {
 'Privacy & data':'#356c61',
 'Discrimination':'#986b2d',
 'Fraud & impersonation':'#bb483a',
 'Output & content harms':'#496fa1',
 'Physical safety':'#555d70',
 'Misleading AI claims':'#80619c',
 'Governance & oversight':'#9a5937',
 'Creative credit & authorship':'#577f86'
};
export function filterCases(cases, filters={}) {
 const q=(filters.search||'').trim().toLocaleLowerCase();
 return cases.filter(c=>(!filters.category||c.category===filters.category)&&(!filters.region||c.jurisdiction===filters.region)&&(!filters.year||c.recordDate.startsWith(filters.year))&&(!filters.status||c.status===filters.status)&&(!q||[c.title,c.entity,c.summary,c.category,c.sector,c.jurisdiction,c.technology,c.aiRole,c.outcome,c.limitation,c.lesson].join(' ').toLocaleLowerCase().includes(q)));
}
export function countsBy(cases, field){return cases.reduce((a,c)=>{a[c[field]]=(a[c[field]]||0)+1;return a},{})}
export function timelineBounds(cases,throughYear=2026){const first=Math.min(throughYear,...cases.map(c=>Number(c.recordDate.slice(0,4))));const last=Math.max(throughYear,...cases.map(c=>Number(c.recordDate.slice(0,4))));return {start:Date.UTC(first,0,1),end:Date.UTC(last+1,0,1),years:Array.from({length:last-first+1},(_,i)=>first+i)}}
export function timelineLayout(cases,minGap=4,bounds=timelineBounds(cases)){const {start,end}=bounds,points=[];for(const c of sortCases(cases,'oldest')){const pos=100*(new Date(c.recordDate+'T00:00:00Z')-start)/(end-start);let lane=0;while(points.some(p=>Math.abs(p.pos-pos)<minGap&&p.lane===lane))lane++;points.push({id:c.id,pos,lane})}return points}
export function sortCases(cases, sort='newest'){return [...cases].sort((a,b)=>sort==='name'?a.entity.localeCompare(b.entity):(sort==='oldest'?1:-1)*a.recordDate.localeCompare(b.recordDate)||a.id.localeCompare(b.id))}
export function csv(cases){const fields=['id','entity','title','category','sector','jurisdiction','technology','recordDate','eventPeriod','status','outcomeAsOf','summary','aiRole','affected','outcome','limitation','lesson','sources','preparation','rightsNote'];const quote=x=>'"'+String(x??'').replaceAll('"','""')+'"';return [fields.join(','),...cases.map(c=>fields.map(f=>quote(f==='sources'?JSON.stringify(c.sources):c[f])).join(','))].join('\r\n')}
