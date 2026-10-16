import {ethicsSources,ethicsTasks,buildEthicsChecklist} from './ethics.mjs';
const guideEscape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const guideRoot=document.querySelector('#ethics-guide');
let activeTask=null,lastChecklist=null;
const guideChoices=guideRoot.querySelector('#guide-tasks'),guideForm=guideRoot.querySelector('#guide-form'),guideResults=guideRoot.querySelector('#guide-results');
function closeGuide(){
 const previous=activeTask?.id;lastChecklist=null;activeTask=null;
 guideForm.hidden=true;guideForm.innerHTML='';guideResults.hidden=true;guideResults.innerHTML='';
 for(const button of guideChoices.querySelectorAll('button')){button.setAttribute('aria-pressed','false');button.setAttribute('aria-expanded','false')}
 (guideChoices.querySelector(`[data-guide-task="${previous}"]`)||guideChoices.querySelector('button')).focus();
}
function addGuideCloseButton(panel){const bar=document.createElement('div');bar.className='guide-dismiss';bar.innerHTML='<button type="button" class="guide-close" data-guide-close>Close guide <span aria-hidden="true">×</span></button>';panel.prepend(bar)}
guideRoot.addEventListener('click',e=>{if(e.target.closest('[data-guide-close]'))closeGuide()});
guideChoices.innerHTML=ethicsTasks.map((t,i)=>`<button type="button" class="task-choice" data-guide-task="${t.id}" aria-pressed="false"><span class="task-number">0${i+1}</span><strong>${t.name}</strong><span>${t.description}</span><b aria-hidden="true">↗</b></button>`).join('');
function chooseGuideTask(id){
 if(activeTask?.id===id){closeGuide();return}
 activeTask=ethicsTasks.find(t=>t.id===id);if(!activeTask)return;lastChecklist=null;guideResults.hidden=true;guideResults.innerHTML='';guideForm.hidden=false;
 for(const button of guideChoices.querySelectorAll('button')){button.setAttribute('aria-pressed',String(button.dataset.guideTask===id));button.setAttribute('aria-expanded',String(button.dataset.guideTask===id));button.setAttribute('aria-controls','guide-form guide-results')}
 guideForm.innerHTML=`<div class="guide-form-heading"><p class="eyebrow">02 / ADD SOME CONTEXT</p><h3 tabindex="-1" id="guide-task-title">${activeTask.name}</h3><p>${activeTask.example}</p></div>${activeTask.questions.map((q,i)=>`<fieldset><legend><span>0${i+1}</span> ${q.title}</legend><div class="guide-options">${q.options.map(([value,label])=>`<label><input type="radio" name="${q.id}" value="${value}" required><span>${label}</span></label>`).join('')}</div></fieldset>`).join('')}<div class="guide-submit"><p>No names, CVs or private documents needed. Your choices stay in this page.</p><button class="cta" type="submit">Build my checklist <span aria-hidden="true">↗</span></button></div>`;
 addGuideCloseButton(guideForm);guideForm.querySelector('#guide-task-title').focus();
}
guideChoices.addEventListener('click',e=>{const b=e.target.closest('[data-guide-task]');if(b)chooseGuideTask(b.dataset.guideTask)});
guideForm.addEventListener('submit',e=>{
 e.preventDefault();if(!guideForm.reportValidity())return;
 const answers=Object.fromEntries(new FormData(guideForm));lastChecklist=buildEthicsChecklist(activeTask.id,answers);const r=lastChecklist;
 const sourceIds=[...new Set(r.items.map(item=>item.source))];
 guideResults.innerHTML=`<div class="guide-result-heading"><p class="eyebrow">03 / YOUR NEXT STEPS</p><h3 id="guide-result-title" tabindex="-1">Your checklist: ${r.task.name}</h3><p>Based on your choices. These are editorial learning prompts, not an ethical score or legal approval.</p><button type="button" class="text-link" id="guide-edit">Edit my answers ↗</button></div><details class="guide-answer-summary"><summary>Your choices</summary><dl>${r.answers.map(a=>`<div><dt>${a.question}</dt><dd>${a.answer}</dd></div>`).join('')}</dl></details><div class="guide-checklist">${r.items.map((item,i)=>`<article class="guide-check"><span class="check-number">0${i+1}</span><div><h4>${item.title}</h4><p>${item.action}</p><details><summary>Why this matters</summary><p>${item.why}</p><a href="${ethicsSources[item.source].url}" target="_blank" rel="noopener noreferrer">Related guidance: ${ethicsSources[item.source].title} ↗</a></details></div></article>`).join('')}</div><div class="guide-bottom"><section><p class="eyebrow">SEE THE IDEA IN REAL LIFE</p><h4>Related cases from the collection</h4><p>${r.task.caseContext}</p><div class="guide-case-links">${r.task.cases.map(id=>`<button type="button" class="text-link" data-case="${id}">${guideCaseNames[id]} ↗</button>`).join('')}</div></section><section><p class="eyebrow">HOW THIS GUIDE WAS WRITTEN</p><h4>Guidance, adapted to your task</h4><p>These checklists are our educational interpretation. The linked organisations do not endorse this tool. Reviewed 15 October 2026. Rules and institutional policies vary.</p><ul>${sourceIds.map(id=>`<li><a href="${ethicsSources[id].url}" target="_blank" rel="noopener noreferrer">${ethicsSources[id].title} ↗</a><small>${ethicsSources[id].scope}</small></li>`).join('')}</ul></section></div><div class="guide-result-actions"><button type="button" id="guide-download">Download my checklist ↓</button><button type="button" class="text-link" id="guide-restart">Choose another task ↗</button></div>`;
 addGuideCloseButton(guideResults);guideForm.hidden=true;guideResults.hidden=false;guideResults.querySelector('#guide-result-title').focus();
 guideResults.querySelector('#guide-edit').onclick=()=>{guideResults.hidden=true;guideForm.hidden=false;guideForm.querySelector('#guide-task-title').focus()};
 guideResults.querySelector('#guide-restart').onclick=closeGuide;
 guideResults.querySelector('#guide-download').onclick=()=>{
  const text=['AI Behind the Headlines — Your AI ethics checklist',r.task.name,'Educational prompts, not legal approval or a complete assessment.','Reviewed '+r.reviewedOn,'',...r.answers.map(a=>a.question+'\n'+a.answer),'',...r.items.map((item,i)=>(i+1)+'. '+item.title+'\n'+item.action+'\nWhy: '+item.why+'\nGuidance: '+ethicsSources[item.source].url+'\nSource scope: '+ethicsSources[item.source].scope),'','Related cases: '+r.task.cases.map(id=>guideCaseNames[id]).join('; '),'Case context: '+r.task.caseContext,'','Source organisations do not endorse this tool. No energy or carbon measurement is provided.'].join('\n\n');
  const url=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'}));const link=document.createElement('a');link.href=url;link.download='ai-ethics-'+r.task.id+'-checklist.txt';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
 };
});
const guideCaseNames={'itutorgroup':'iTutorGroup: programmed age screening','clearview-canada':'Clearview: facial data and privacy','rite-aid':'Rite Aid: facial recognition alerts','mata':'Mata v. Avianca: invented legal citations','getty-stability-uk':'Getty / Stability: a mixed UK judgment','grok-eu-images':'Grok: an EU image-risk investigation','hong-kong-deepfake':'Hong Kong: reported deepfake fraud','donotpay':'DoNotPay: AI capability claims','workado':'Workado: accuracy claims','rytr':'Rytr: an order later set aside','ngl':'NGL: moderation claims','ring':'Ring: privacy and safeguards'};
