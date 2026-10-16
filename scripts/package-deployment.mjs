import fs from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
// A fresh staging directory avoids retaining files from an older release.
const stage=await fs.mkdtemp(path.join(root,'generated','deployment-'));
const entries=['dist','tests','README.md','CONTENT-REUSE-REVIEW.md','CANDIDATE-REVIEW.md','Open Headlines.cmd','package.json','vercel.json','.gitignore'];
for(const entry of entries)await fs.cp(path.join(root,entry),path.join(stage,entry),{recursive:true});
await fs.mkdir(path.join(stage,'scripts'),{recursive:true});
for(const name of ['serve.mjs','package-local.mjs','package-deployment.mjs','build-audit.mjs','review-content-reuse.mjs','source-policy-review.json','curation-policy.json','reviewed-additions.json','curate-published.mjs','sync-curated-release.mjs','audit-guide.mjs','create-preview.py'])await fs.copyFile(path.join(root,'scripts',name),path.join(stage,'scripts',name));
const files=[];
async function walk(dir){for(const entry of await fs.readdir(dir,{withFileTypes:true})){const full=path.join(dir,entry.name);if(entry.isDirectory())await walk(full);else files.push(path.relative(stage,full).replaceAll('\\','/'))}}
await walk(stage);
if(files.some(p=>/(^|\/)(\.git(?:\/|$)|\.openai(?:\/|$)|\.env(?:\.|$)|held-case-records|node_modules(?:\/|$))/.test(p)))throw Error('Excluded file in package');
await fs.writeFile(path.join(root,'generated','deployment-manifest.json'),JSON.stringify({stage,files:files.sort(),cases:JSON.parse(await fs.readFile(path.join(root,'dist/data/cases.json'),'utf8')).cases.length},null,2)+'\n');
console.log(JSON.stringify({stage,files:files.length,cases:JSON.parse(await fs.readFile(path.join(root,'dist/data/cases.json'),'utf8')).cases.length,heldArchiveIncluded:false}));
