import fs from 'node:fs/promises';
import crypto from 'node:crypto';
const root=new URL('../',import.meta.url);
const raw=await fs.readFile(new URL('generated/global-source/download-page.json',root));
const source=JSON.parse(raw.toString('utf8').replace(/^\uFEFF/,''));
const reports=source.result.pageContext.data;
const groups=new Map();
for(const r of reports)if(Number.isInteger(r.incident_id)){
  if(!groups.has(r.incident_id))groups.set(r.incident_id,[]);
  groups.get(r.incident_id).push(r);
}
const names=new Intl.DisplayNames(['en'],{type:'region'});
const records=[];
for(const [id,rs] of groups){
  // Multiple reports about the same incident are counted once. Never infer location from prose.
  const values=[...new Set(rs.map(r=>String(r.CSETv1?.['Location Country (two letters)']??'').trim()))];
  const rawCountry=values.length===1?values[0]:'';
  const code=rawCountry==='United States'?'US':rawCountry;
  const country=/^[A-Z]{2}$/.test(code)&&names.of(code)!==code?code:null;
  const dates=[...new Set(rs.map(r=>r.incident_date))];
  if(dates.length!==1)throw Error(`Conflicting incident dates: ${id}`);
  const date=dates[0];
  if(!/^\d{4}-\d{2}-\d{2}$/.test(date)||date>'2026-10-16')throw Error(`Invalid/future date: ${id}`);
  const harms=[...new Set(rs.map(r=>r.CSETv1?.['Tangible Harm']??'Unclassified'))];
  const title=rs[0].incident_title;
  records.push({id,title:typeof title==='string'&&!title.includes('\uFFFD')?title:`AIID incident ${id} (open source record for title)`,date,country,rawCountry,harm:harms.length===1?harms[0]:'Conflicting classifications',url:`https://incidentdatabase.ai/cite/${id}/`});
}
records.sort((a,b)=>b.date.localeCompare(a.date)||a.id-b.id);
const countries=[...new Set(records.map(r=>r.country).filter(Boolean))].sort().map(code=>({code,name:names.of(code)}));
const mapped=records.filter(r=>r.country).length;
const output={meta:{source:'AI Incident Database / Responsible AI Collaborative',retrievedOn:'2026-10-16',exportUrl:'https://incidentdatabase.ai/page-data/downloadindex/page-data.json',sha256:crypto.createHash('sha256').update(raw).digest('hex'),license:'CC BY-SA 4.0',licenseUrl:'https://creativecommons.org/licenses/by-sa/4.0/',termsUrl:'https://incidentdatabase.ai/terms-of-use/',taxonomyUrl:'https://incidentdatabase.ai/taxonomies/csetv1/',taxonomy:'CSETv1',total:records.length,mapped,unmapped:records.length-mapped,reportRows:reports.length,transformations:['Deduplicated report rows by incident_id; IDs are distinct source records, not guaranteed distinct real-world events.','Retained incident ID, title, incident date and CSETv1 country and tangible-harm classifications only; excluded article bodies, images and report descriptions.','Trimmed country whitespace and normalized explicit United States label to US; no geographic inference.','Titles with source replacement characters are replaced by neutral record-ID labels.','Snapshot, not live feed. Classifications are source annotations, not independent verification or legal findings.']},countries,records};
await fs.writeFile(new URL('dist/data/global-incidents.json',root),JSON.stringify(output)+'\n');
const earthRaw=await fs.readFile(new URL('generated/global-source/world.geojson',root));
const earth=JSON.parse(earthRaw);
// Equirectangular projection; source polygons already split at the antimeridian.
const point=([lon,lat])=>`${((lon+180)*2.5).toFixed(1)},${((90-lat)*2.5).toFixed(1)}`;
const features=earth.features.filter(f=>f.properties.ISO_A2_EH!=='AQ').map(f=>({code:f.properties.ISO_A2_EH,name:f.properties.NAME,path:(f.geometry.type==='Polygon'?[f.geometry.coordinates]:f.geometry.coordinates).flatMap(poly=>poly.map(ring=>'M'+ring.map(point).join('L')+'Z')).join('')}));
await fs.writeFile(new URL('dist/data/world-map.json',root),JSON.stringify({source:'Natural Earth 1:110m admin-0 countries',url:'https://www.naturalearthdata.com/about/terms-of-use/',license:'Public domain',retrievedOn:'2026-10-16',sha256:crypto.createHash('sha256').update(earthRaw).digest('hex'),features})+'\n');
console.log(JSON.stringify({records:records.length,mapped,unmapped:records.length-mapped,countries:countries.length}));
