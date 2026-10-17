import {selectGlobal,globalCoverage} from './global-engine.mjs';
const globalRoot=document.querySelector('#global-explorer');
if(globalRoot){
  const ge=s=>globalRoot.querySelector(s);
  const safeGlobal=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  try{
    const globalResponse=await fetch('data/global-incidents.json');
    const worldResponse=await fetch('data/world-map.json');
    if(!globalResponse.ok||!worldResponse.ok)throw Error('Global data unavailable');
    const globalData=await globalResponse.json();
    const worldData=await worldResponse.json();
    const globalCountry=ge('#global-country'),globalYear=ge('#global-year'),globalHarm=ge('#global-harm');
    const option=(value,label)=>`<option value="${safeGlobal(value)}">${safeGlobal(label)}</option>`;
    globalCountry.innerHTML=option('','All locations')+globalData.countries.map(c=>option(c.code,c.name)).join('')+option('unknown','No usable country annotation');
    globalYear.innerHTML=option('','All incident years')+[...new Set(globalData.records.map(r=>r.date.slice(0,4)))].sort().reverse().map(y=>option(y,y)).join('');
    globalHarm.innerHTML=option('','All source classifications')+[...new Set(globalData.records.map(r=>r.harm))].sort().map(h=>option(h,h)).join('');
    ge('#global-baseline').textContent=`${globalData.meta.total.toLocaleString()} distinct source IDs · ${globalData.meta.mapped} with usable CSETv1 country labels · ${globalData.meta.unmapped.toLocaleString()} without · ${globalData.countries.length} country/territory labels. Retrieved 16 October 2026.`;
    let globalLimit=6;
    function renderGlobal(){
      const baseline=selectGlobal(globalData.records,{year:globalYear.value,harm:globalHarm.value});
      const cov=globalCoverage(baseline);
      const selected=selectGlobal(baseline,{country:globalCountry.value});
      ge('#global-summary').textContent=`${selected.length.toLocaleString()} records in your selection. Across these year and harm filters: ${cov.mapped} have a usable country annotation; ${cov.unmapped.toLocaleString()} do not.`;
      const maximum=Math.max(1,...Object.values(cov.countries));
      ge('#global-map').innerHTML=`<svg viewBox="0 0 900 410" aria-label="World map of available country annotations"><title>Reported incident records by annotated location. Missing data is not zero harm.</title>${worldData.features.map(f=>{
        const count=cov.countries[f.code]??0,active=globalCountry.value===f.code;
        const color=count?`hsl(185 40% ${72-35*Math.log1p(count)/Math.log1p(maximum)}%)`:'#e2e5de';
        return `<path d="${f.path}" fill="${color}" fill-rule="evenodd" stroke="${active?'#e54f35':'#faf9f5'}" stroke-width="${active?2:0.5}" ${count?`tabindex="0" role="button" data-global-country="${safeGlobal(f.code)}" aria-pressed="${active}" aria-label="${safeGlobal(f.name)}: ${count} source records"`:''}><title>${safeGlobal(f.name)}: ${count?count+' source records':'no mapped records in this selection; not evidence of no harm'}</title></path>`;
      }).join('')}</svg>`;
      ge('#global-bars').innerHTML=globalData.countries.map(c=>({...c,count:cov.countries[c.code]??0})).filter(c=>c.count).sort((a,b)=>a.name.localeCompare(b.name)).map(c=>`<button type="button" data-global-country="${c.code}" aria-pressed="${globalCountry.value===c.code}"><span>${safeGlobal(c.name)}</span><span class="global-meter"><i style="width:${100*c.count/maximum}%"></i></span><b>${c.count}</b></button>`).join('')||'<p>No country annotations match these filters.</p>';
      const label=globalCountry.value==='unknown'?'Records without usable country annotations':globalData.countries.find(c=>c.code===globalCountry.value)?.name??'All source records';
      ge('#global-selection-title').textContent=label;
      ge('#global-records').innerHTML=selected.slice(0,globalLimit).map(r=>`<article><p class="eyebrow">AIID ${r.id} · Incident date ${safeGlobal(r.date)}</p><h4><a href="${r.url}" target="_blank" rel="noopener noreferrer">${safeGlobal(r.title)} ↗</a></h4><p>${safeGlobal(globalData.countries.find(c=>c.code===r.country)?.name??'Country annotation unavailable')} · Source tangible-harm classification: ${safeGlobal(r.harm)}</p></article>`).join('')||'<p>No source records match this selection.</p>';
      ge('#global-more').hidden=selected.length<=globalLimit;
      ge('#global-record-count').textContent=`Showing ${Math.min(globalLimit,selected.length)} of ${selected.length} source records. Linked titles describe reported incidents, allegations or concerns; inclusion is not a verdict.`;
    }
    ge('#global-filters').addEventListener('change',()=>{globalLimit=6;renderGlobal()});
    ge('#global-filters').addEventListener('reset',e=>{e.preventDefault();globalCountry.value='';globalYear.value='';globalHarm.value='';globalLimit=6;renderGlobal()});
    function chooseGlobal(e){const b=e.target.closest('[data-global-country]');if(!b)return;globalCountry.value=b.dataset.globalCountry;globalLimit=6;renderGlobal()}
    ge('#global-map').addEventListener('click',chooseGlobal);
    ge('#global-map').addEventListener('keydown',e=>{if(['Enter',' '].includes(e.key)&&e.target.matches('[data-global-country]')){e.preventDefault();chooseGlobal(e);globalCountry.focus()}});
    ge('#global-bars').addEventListener('click',chooseGlobal);
    ge('#global-more').addEventListener('click',()=>{globalLimit+=12;renderGlobal()});
    renderGlobal();
  }catch(error){ge('#global-summary').textContent='The global dataset could not load. Reload the page or open the linked original database.';console.error(error)}
}
