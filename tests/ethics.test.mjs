import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {ethicsTasks,ethicsSources,buildEthicsChecklist} from '../dist/ethics.mjs';
const records=JSON.parse(fs.readFileSync(new URL('../dist/data/cases.json',import.meta.url))).cases;

test('public guide source audit matches every cited resource and approved host',()=>{
 const audit=JSON.parse(fs.readFileSync(new URL('../dist/data/guide-source-audit.json',import.meta.url)));
 const policy=JSON.parse(fs.readFileSync(new URL('../scripts/curation-policy.json',import.meta.url)));
 assert.deepEqual(Object.keys(audit.sources).sort(),Object.keys(ethicsSources).sort());
 assert.equal(audit.combinations,216);
 for(const [id,source]of Object.entries(ethicsSources)){
  assert.equal(audit.sources[id].url,source.url);
  assert.equal(audit.sources[id].checkedOn,'2026-10-16');
  assert.ok(audit.sources[id].locator.length>20);
  const host=new URL(source.url).hostname;
  assert.ok(policy.guideSourceDomains.some(d=>host===d||host.endsWith('.'+d)),id+': unreviewed host');
 }
 assert.match(ethicsSources.nist.scope,/Voluntary/);
 assert.match(ethicsSources.education.scope,/England/);
 assert.match(ethicsSources.reviewsrule.scope,/does not ban all AI avatars/i);
 assert.match(ethicsSources.india.scope,/not a substitute/);
});
test('all 216 supported answer combinations produce sourced checklists and valid case links',()=>{
 let combinations=0;
 assert.equal(ethicsTasks.length,8);
 for(const task of ethicsTasks){
  assert.equal(task.questions.length,3);
  for(const id of task.cases)assert.ok(records.some(c=>c.id===id),`${task.id}: missing case ${id}`);
  for(const [a] of task.questions[0].options)for(const [b] of task.questions[1].options)for(const [c] of task.questions[2].options){
   const answers=Object.fromEntries(task.questions.map((q,i)=>[q.id,[a,b,c][i]]));
   const result=buildEthicsChecklist(task.id,answers);
   assert.equal(result.items.length,5);
   assert.equal(result.answers.length,3);assert.ok(!result.context.some(n=>n.source==='india'));assert.match(result.context[1].text,/country, school or workplace/);assert.equal(result.furtherReading.length,1);for(const note of result.furtherReading)assert.ok(ethicsSources[note.source]);
   assert.ok(result.context.length>=3);for(const note of result.context){assert.ok(note.label&&note.text);if(note.source)assert.ok(ethicsSources[note.source]);}for(const item of result.items){assert.ok(item.action&&item.title&&item.why);assert.ok(ethicsSources[item.source]);assert.equal(new URL(ethicsSources[item.source].url).protocol,'https:');}
   combinations++;
  }
 }
 assert.equal(combinations,216);
});
test('incomplete and unsupported answers cannot generate reassuring results',()=>{
 assert.throws(()=>buildEthicsChecklist('unknown',{}),/supported task/);
 for(const invalid of [undefined,null,[],false,'text'])assert.throws(()=>buildEthicsChecklist('images',invalid),/all three questions/);
 for(const task of ethicsTasks){assert.throws(()=>buildEthicsChecklist(task.id,{}),/all three questions/);const answers=Object.fromEntries(task.questions.map(q=>[q.id,q.options[0][0]]));answers[task.questions[1].id]='fabricated';assert.throws(()=>buildEthicsChecklist(task.id,answers),/all three questions/);}
});
test('all combinations preserve important contextual limits instead of inferring a verdict',()=>{
 assert.match(ethicsSources.copyright.url,/faq-fairuse/);
 assert.match(ethicsSources.copyright.scope,/US guidance/);
 assert.match(ethicsSources.endorsements.scope,/US guidance/);
 for(const task of ethicsTasks)for(const [a] of task.questions[0].options)for(const [b] of task.questions[1].options)for(const [c] of task.questions[2].options){
  const answers=Object.fromEntries(task.questions.map((q,i)=>[q.id,[a,b,c][i]]));
  const result=buildEthicsChecklist(task.id,answers),items=result.items;
  assert.match(items.at(-1).why,/does not measure energy or carbon/);
  if(task.id==='images'){
   assert.match(items[1].why,/Permission is not always required/);
   assert.match(items[1].why,/Attribution does not replace/);
   assert.equal(items[1].source,'copyright');
   if(answers.sharing==='labelled')assert.match(items[3].action,/a label alone does not remove/);
   if(answers.person==='unclear')assert.match(items[2].action,/Get clear permission/);
   if(answers.reference==='unknown')assert.match(items[1].action,/Find the reference’s source/);
  }
  if(task.id==='hiring'&&answers.criteria==='unknown')assert.match(items[3].action,/Find out which criteria/);
  if(task.id==='studying'&&answers.purpose==='submit'&&answers.rules==='allowed')assert.match(items[1].action,/permission covers AI-generated submissions/);
  if(task.id==='marketing'){
   assert.equal(items[2].source,'endorsements');
   if(answers.claims==='unknown')assert.match(items[1].action,/Identify the claims/);
   if(answers.reviews==='real')assert.match(items[2].action,/relationships need disclosure/);
   if(answers.reviews==='invented')assert.match(items[2].action,/Do not present invented/);
  }
  if(task.id==='support'&&answers.action==='account')assert.match(items[2].action,/narrow permissions, confirmation steps and human review/);
 }
});
test('consequential choices and unknowns change the suggested actions',()=>{
 const base={data:'anonymous',decision:'suggest',criteria:'tested'};
 const assisted=buildEthicsChecklist('hiring',base);
 const automatic=buildEthicsChecklist('hiring',{...base,decision:'reject'});
 assert.match(automatic.items[2].action,/Reconsider automatic rejection/);
 assert.notEqual(automatic.items[2].action,assisted.items[2].action);
 assert.match(buildEthicsChecklist('studying',{purpose:'draft',rules:'unknown',verify:'trust'}).items[2].action,/Ask your teacher/);
 assert.match(buildEthicsChecklist('marketing',{claims:'performance',reviews:'invented',approval:'auto'}).items[2].action,/Do not present invented/);
 assert.match(buildEthicsChecklist('support',{data:'unknown',action:'unknown',handoff:'unknown'}).items[3].action,/Add an accessible human route/);
});

 test('new task branches expose consequential choices and scope',()=>{
 const office=buildEthicsChecklist('office',{data:'private',tool:'unreviewed',review:'auto'});assert.match(office.items[1].action,/Pause the upload/);assert.match(office.items[2].action,/Add a review step/);assert.ok(office.context.some(n=>n.source==='privacy'));
 const coding=buildEthicsChecklist('coding',{environment:'live',permissions:'action',checks:'untested'});assert.match(coding.items[0].action,/separate test environment/);assert.match(coding.items[1].action,/approval for deletion/);assert.match(coding.items[2].action,/Do not treat generated code as verified/);assert.equal(coding.task.cases.length,0);assert.match(coding.task.caseContext,/No directly matched/);
 const voice=buildEthicsChecklist('voice',{subject:'unclear',audience:'unlabelled',purpose:'payment'});assert.match(voice.items[0].action,/ethical safeguard/);assert.match(voice.items[1].action,/disclosure rules/);assert.match(voice.items[2].action,/independently verified approval/);assert.ok(voice.context.some(n=>n.source==='transparency'));
 for(const task of ethicsTasks){const r=buildEthicsChecklist(task.id,Object.fromEntries(task.questions.map(q=>[q.id,q.options[0][0]])));assert.equal(r.reviewedOn,'2026-10-16');assert.match(r.context[0].text,/not legal approval/);assert.ok(!r.context.some(n=>n.source==='india'));assert.match(r.context[1].text,/country, school or workplace/);assert.equal(r.furtherReading[0].source,'india');assert.match(r.furtherReading[0].text,/not an education-specific policy/);}
 });
 test('each new answer option changes the relevant recommendation',()=>{for(const id of ['office','coding','voice']){const task=ethicsTasks.find(t=>t.id===id),base=Object.fromEntries(task.questions.map(q=>[q.id,q.options[0][0]]));for(const q of task.questions){const outputs=q.options.map(([value])=>JSON.stringify(buildEthicsChecklist(id,{...base,[q.id]:value}).items));assert.equal(new Set(outputs).size,3,id+': '+q.id);}}});
