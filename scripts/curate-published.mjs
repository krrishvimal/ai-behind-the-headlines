import fs from 'node:fs/promises';
const root=new URL('../',import.meta.url),file=p=>new URL(p,root);
const read=async p=>JSON.parse(await fs.readFile(file(p),'utf8'));
const write=(p,v)=>fs.writeFile(file(p),JSON.stringify(v,null,2)+'\n');
const data=await read('dist/data/cases.json'),policy=await read('scripts/curation-policy.json');
await fs.mkdir(file('generated/'),{recursive:true});
const archivePath=file('generated/held-case-records.json');
let archived=[];try{archived=JSON.parse(await fs.readFile(archivePath,'utf8'))}catch(e){if(e.code!=='ENOENT')throw e}
for(const c of data.cases)if(policy.heldCases[c.id]&&!archived.some(a=>a.record.id===c.id))archived.push({heldOn:policy.reviewedOn,reason:policy.heldCases[c.id],record:c});
await fs.writeFile(archivePath,JSON.stringify(archived,null,2)+'\n');
data.cases=data.cases.filter(c=>!policy.heldCases[c.id]);
// The government court order remains linked through Justia, whose terms expressly
// distinguish government court documents from its own protected material.
data.cases.find(c=>c.id==='mata').sources=[{publisher:'US District Court, SDNY; reproduced by Justia',date:'2023-06-22',url:'https://docs.justia.com/cases/federal/district-courts/new-york/nysdce/1%3A2022cv01461/575368/54',label:'Opinion and Order on Sanctions, document 54, 22 June 2023',type:'Court sanctions order',reuseNote:'Government-authored court order. Justia disclaims copyright in US government court documents; its own annotations and website design are not reproduced.'}];
data.cases.find(c=>c.id==='mata').sources.push({publisher:'US District Court, SDNY; reproduced by Justia',date:'2023-06-30',url:'https://docs.justia.com/cases/federal/district-courts/new-york/nysdce/1%3A2022cv01461/575368/56',label:'Administrative order transferring the paid penalty, document 56, 30 June 2023',type:'Court administrative order',reuseNote:'Government-authored court order; no Justia annotations or website design reproduced.'});
for(const c of await read('scripts/reviewed-additions.json'))data.cases=data.cases.filter(x=>x.id!==c.id).concat(c);
const matches=(url,domains)=>domains.some(d=>new URL(url).hostname===d||new URL(url).hostname.endsWith('.'+d));
for(const c of data.cases)for(const s of c.sources)if(!matches(s.url,policy.caseSourceDomains))throw Error('Source requires a new reuse review: '+s.url);
if(data.cases.length!==policy.expectedCases)throw Error('Unexpected published case count');
// Preserve the current release version when refreshing only the case selection.
data.version=JSON.parse(await fs.readFile(file('package.json'),'utf8')).version;
data.reviewedOn=policy.reviewedOn;
data.scope=`An editorial selection of ${data.cases.length} AI and related automated-system cases using reviewed source-reuse conditions. Not a census, representative sample, live feed or list of proven unethical acts.`;
data.selectionPolicy='Sources with unresolved or incompatible reuse conditions are held out of the published collection. This conservative editorial choice is not a finding of infringement. Licence conditions and third-party exceptions still apply.';
await write('dist/data/cases.json',data);
console.log(JSON.stringify({published:data.cases.length,held:Object.keys(policy.heldCases).length,reviewedAdditions:(await read('scripts/reviewed-additions.json')).length}));
