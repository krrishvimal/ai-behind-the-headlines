import fs from 'node:fs/promises';
import {ethicsTasks,ethicsSources,buildEthicsChecklist,ethicsReviewedOn} from '../dist/ethics.mjs';
const rows=[];
for(const task of ethicsTasks)for(const [a] of task.questions[0].options)for(const [b] of task.questions[1].options)for(const [c] of task.questions[2].options){
 const answers=Object.fromEntries(task.questions.map((q,i)=>[q.id,[a,b,c][i]]));
 const result=buildEthicsChecklist(task.id,answers);
 rows.push({combination:rows.length+1,task:task.id,answers:result.answers,items:result.items,relatedCases:task.cases,caseContext:task.caseContext,context:result.context});
}
const out=new URL('../generated/',import.meta.url);await fs.mkdir(out,{recursive:true});
const unique=new Map();
for(const row of rows)for(const item of row.items){const key=JSON.stringify(item);if(!unique.has(key))unique.set(key,item)}
const review={reviewedOn:ethicsReviewedOn,combinations:rows.length,uniqueExplanationVariants:unique.size,scope:'Rule-output and contextual-wording review. Not external expert certification, legal advice, a proof of factual infallibility, or a fresh re-investigation of every case.',sources:ethicsSources,outputs:rows};
await fs.writeFile(new URL('ethics-combination-audit.json',out),JSON.stringify(review,null,2)+'\n');
const q=value=>'"'+String(value).replaceAll('"','""')+'"';
const csv=['combination,task,answers,step,title,action,explanation,source_url',...rows.flatMap(row=>row.items.map((item,i)=>[row.combination,row.task,JSON.stringify(row.answers),i+1,item.title,item.action,item.why,ethicsSources[item.source].url].map(q).join(',')))].join('\r\n');
await fs.writeFile(new URL('ethics-combination-audit.csv',out),csv);
console.log(JSON.stringify({combinations:rows.length,uniqueExplanationVariants:unique.size,outputRows:rows.length*5}));
