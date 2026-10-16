import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {selectGlobal,globalCoverage} from '../dist/global-engine.mjs';
const data=JSON.parse(await fs.readFile(new URL('../dist/data/global-incidents.json',import.meta.url),'utf8'));
const world=JSON.parse(await fs.readFile(new URL('../dist/data/world-map.json',import.meta.url),'utf8'));
test('external IDs and country coverage reconcile without changing curated counts',async()=>{
  assert.equal(data.records.length,1743);assert.equal(new Set(data.records.map(r=>r.id)).size,1743);
  assert.equal(data.meta.mapped,140);assert.equal(data.meta.unmapped,1603);assert.equal(data.countries.length,25);
  const cov=globalCoverage(data.records);assert.equal(cov.mapped,140);assert.equal(cov.unmapped,1603);
  assert.equal(Object.values(cov.countries).reduce((a,b)=>a+b,0),140);
  const curated=JSON.parse(await fs.readFile(new URL('../dist/data/cases.json',import.meta.url),'utf8'));assert.equal(curated.cases.length,30);
});
test('all supported country year and harm combinations match direct counts',()=>{
  const years=['',...new Set(data.records.map(r=>r.date.slice(0,4)))];
  const harms=['',...new Set(data.records.map(r=>r.harm))];
  for(const country of ['', 'unknown',...data.countries.map(c=>c.code)])for(const year of years)for(const harm of harms){
    const result=selectGlobal(data.records,{country,year,harm});
    const expected=data.records.filter(r=>(!country||(country==='unknown'?!r.country:r.country===country))&&(!year||r.date.slice(0,4)===year)&&(!harm||r.harm===harm));
    assert.deepEqual(result,expected);
  }
});
test('export excludes article text and carries traceable licensed metadata',()=>{
  assert.equal(data.meta.license,'CC BY-SA 4.0');assert.match(data.meta.sha256,/^[a-f0-9]{64}$/);
  for(const r of data.records){assert.deepEqual(Object.keys(r),['id','title','date','country','rawCountry','harm','url']);assert.equal(r.url,`https://incidentdatabase.ai/cite/${r.id}/`);assert.ok(r.date<='2026-10-16');assert.ok(!r.title.includes('\uFFFD'));}
  assert.equal(world.license,'Public domain');
  for(const c of data.countries)assert.ok(world.features.some(f=>f.code===c.code),`Geometry missing ${c.code}`);
  for(const f of world.features)assert.match(f.path,/^M[\d.,LZM-]+$/);
});
