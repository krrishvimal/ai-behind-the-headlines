import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import {csv} from '../dist/engine.mjs';
const read=p=>fs.readFileSync(new URL(p,import.meta.url),'utf8');
test('disclosure is visible and survives dataset and offline downloads',()=>{
 const html=read('../dist/index.html'),offline=read('../generated/AI Behind the Headlines.html');
 const data=JSON.parse(read('../dist/data/cases.json'));
 assert.match(data.provenance.preparation,/AI-assisted/);
 assert.match(data.provenance.verification,/No independent expert verification/);
 for(const c of data.cases)assert.match(c.preparation,/AI-assisted/);
 assert.match(csv(data.cases),/AI-assisted factual summary/);
 for(const page of [html,offline]){assert.match(page,/id="ai-assistance"/);assert.match(page,/id="corrections"/);assert.match(page,/GitHub issues are public/);assert.match(page,/No comprehensive legal rights clearance/);}
 assert.ok(!offline.includes('href="data/content-reuse-review.csv"'));
 assert.match(offline,/download="content-reuse-review.csv"/);
});
test('policy follow-up covers every current host without inventing item licences',()=>{
 // A fresh clone has no private generated/ archive. Validate the shipped CSV
 // and policy register rather than relying on local authoring artifacts.
 const lines=read('../dist/data/content-reuse-review.csv').split('\r\n');
 const keys=lines.shift().split(',');
 const records=lines.filter(Boolean).map(line=>Object.fromEntries([...line.matchAll(/"((?:[^"]|"")*)"/g)].map((m,i)=>[keys[i],m[1].replaceAll('""','"')])));
 const review={sourceReferences:records.length,records,policies:JSON.parse(read('../scripts/source-policy-review.json')).policies};
 assert.equal(review.sourceReferences,58);
 for(const r of review.records){assert.ok(r.policyUrl);assert.ok(!/^Publisher-specific policy not verified$/.test(r.policyStatus));assert.match(r.permission,/No publisher-specific permission/);}
 assert.match(review.policies['wsj.com'].status,/inaccessible/);
 assert.match(review.policies['pipc.go.kr'].status,/unresolved/);
 const data=JSON.parse(read('../dist/data/cases.json'));
 const selection=JSON.parse(read('../scripts/curation-policy.json'));
 for(const id of Object.keys(selection.heldCases))assert.ok(!data.cases.some(c=>c.id===id),'Held case must not be published: '+id);
 for(const c of data.cases)for(const s of c.sources){const host=new URL(s.url).hostname;assert.ok(selection.caseSourceDomains.some(d=>host===d||host.endsWith('.'+d)),'Source needs review: '+host);}
 for(const id of ['seven-eleven','hong-kong-deepfake','ofqual-grading','getty-stability-uk','grok-eu-images'])assert.ok(data.cases.find(c=>c.id===id).sources.some(s=>s.reuseNote));
 assert.ok(!read('../generated/AI Behind the Headlines.html').includes('"id": "belamy-credit"'));
 assert.match(read('../dist/ethics.mjs'),/England guidance/);
 assert.match(csv(data.cases),/Crown copyright/);
 assert.match(read('../dist/app.mjs'),/s.reuseNote/);
});
test('reuse inventory never invents publisher permission and no third-party media are packaged',()=>{
 const csv=read('../dist/data/content-reuse-review.csv');
 assert.match(csv,/No publisher-specific permission requested or granted/);
 assert.ok(!/Publisher-specific policy not verified|Policy inaccessible/.test(csv),'Unresolved case dependencies must not be published');
 const files=fs.readdirSync(new URL('../dist/',import.meta.url));
 assert.deepEqual(files.filter(x=>/\.(png|jpe?g|webp|svg|gif|mp4|webm|woff2?|ttf)$/i.test(x)).sort(),['icon.svg','social-preview.png']);
 const data=JSON.parse(read('../dist/data/cases.json'));
 const narrative=data.cases.map(c=>[c.title,c.summary,c.aiRole,c.affected,c.outcome,c.limitation,c.lesson].join(' ')).join('\n');
 assert.ok(!/[\w.+-]+@[\w.-]+\.[a-z]{2,}/i.test(narrative),'No personal email addresses in case narratives');
 assert.ok(!/data:image|<iframe|<img\b/i.test(narrative),'No embedded source media in case narratives');
});
