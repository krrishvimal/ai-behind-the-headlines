import fs from 'node:fs/promises';
const path=new URL('../dist/data/cases.json',import.meta.url),data=JSON.parse(await fs.readFile(path));
// Manually reviewed evidence locators: factual account, outcome, numerical/context check.
const notes={
 'belamy-credit':['The Verge: Whose code is it anyway?; Obvious interview','WIRED: opening sale account and blog-credit/apology paragraphs','USD 432,500 is auction proceeds, not damages. Attribution debate predates sale. Credit was subsequently acknowledged. US is auction venue, not collective origin. No copyright verdict or price-record claim.'],
 'uber-tempe':['What Happened; What We Found','What We Recommended','Fatality and 18 March 2018 supported; probable cause is not AI alone.'],
 'clearview-canada':['February findings, collection and consent paragraphs','December announcement, provincial orders bullets','Updated recommendation-only outcome; provincial orders distinguished from federal powers.'],
 'everalbum':['Case Summary; January 2021 complaint','May 2021 case timeline and final-order entry','Settlement retained as settlement; later compliance report is not a new incident.'],
 'seven-eleven':['Background, reactivation and image count','Privacy uplift; investigation closure','54 stores / 45,874 images; images are not unique individuals.'],
 'alexa':['FTC complaint account, retention and training paragraphs','DOJ July 2023 announcement, order entered today','USD 25 million is a civil penalty; July court entry replaces proposed-only wording.'],
 'ring':['FTC complaint account, access and training paragraphs','April 2024 refund announcement, opening paragraphs','USD 5.6 million is refunds announced, not measured AI-caused loss; wider case retained.'],
 'itutorgroup':['EEOC settlement paragraphs describing programmed age cutoffs','Consent decree and relief paragraphs','Women 55+, men 60+, >200 applicants, USD 365,000. Removed unlinked recruitment-year specificity.'],
 'rite-aid':['FTC case summary and original deployment announcement','Case summary, five-year prohibition; orders in timeline','Five years is the prohibition duration; allegations remain attributed.'],
 'mata':['Sanctions order, opening and findings of fact paragraphs 7–12','Sanctions order, printed pages 33–34; conclusion (d)','USD 5,000 jointly and severally, not per respondent. PDF successfully retrieved this pass.'],
 'hong-kong-deepfake':['Government reply, part (1), January case paragraphs','Same paragraph, investigation status in June 2024','About HKD 200 million reported loss; pre-recorded, no interaction; not a proven live deepfake.'],
 'kramer-robocalls':['FCC September 2024 announcement; NHPR account','NHPR, opening paragraphs and acquittal account','USD 6 million adopted federal fine; separate state criminal acquittal added. FCC PDF retrieval limited.'],
 'music-streaming':['DOJ sentencing release, scheme description','Sentencing release, opening and final sentencing paragraphs','18 months; two years supervised release; USD 8,091,843.64 forfeiture, not fine.'],
 'donotpay':['FTC Case Summary and complaint','January final order / February announcement in timeline','USD 193,000 monetary relief; announcement date distinguished from order finalisation.'],
 'ngl':['FTC July allegations, moderation section','FTC case timeline, 2024 orders / January 2026 refund update','Under-18 restriction is part of a wider settlement, not proof all harm was AI-caused.'],
 'intellivision':['FTC complaint announcement, unsupported claims paragraphs','January 2025 final-order timeline','No universal accuracy or victim count inferred. Headline changed to attributed challenge.'],
 'workado':['FTC final announcement, academic-content allegation','Final order requirements bullets','No universal detector accuracy inferred. Headline changed to claims challenged.'],
 'accessibe':['FTC Case Summary, WCAG claims','April 2025 final approval in timeline','USD 1 million settlement; current retrieval timed out but earlier full case page reviewed.'],
 'automators':['FTC Case Summary, AI and income claims','February 2024 settlement paragraph and order entry','Lifetime restriction described for businesses and two owners, not every individual.'],
 'ascend':['FTC Case Summary, allegations','June 2025 proposed-order entry','Proposed outcome only; current final court status unresolved in reviewed source.'],
 'rytr':['December 2025 release, description of earlier case','Reopened / set-aside paragraphs','Original ban is not represented as in force; not counted as proven violation.'],
 'microsoft-tay':['Developer blog, coordinated-attack paragraph','Opening apology and offline statement','Developer acknowledgement; no claim that all chatbots learn online.'],
 'robert-williams':['ACLU announcement, opening and arrest account','Key components of settlement bullets','Source is claimant representative; linked agreement available; no universal error rate.'],
 'ofqual-grading':['Ofqual statement, goals and anguish paragraphs','Centre assessment or moderated grade, whichever higher','England only; statistical standardisation, not an LLM.'],
 'robodebt':['Justice Kyrou speech, Robodebt findings section','Commission report publication and corrigendum record','Automation case; no claim that referrals are convictions. Large report PDF not fully retrieved.'],
 'apple-card':['DFS announcement and report, Summary; Fair Lending Review','No fair lending violations finding','Cleared allegation; not counted as established discrimination.'],
 'dutch-childcare':['Amnesty investigation, Discriminatory loop','Publication and recommendations paragraphs','Research organisation findings; no new judicial verdict claimed.'],
 'uk-ceo-voice-2019':['WSJ opening paragraphs quoting insurer attribution','No court outcome established in reviewed reporting','EUR 220,000, not pounds; AI attribution unconfirmed independently; no first-ever claim.'],
 'delphia':['SEC release, Delphia paragraphs','Shared settlement paragraph, Delphia terms','USD 225,000 civil penalty; no admission; separate from Global Predictions.'],
 'global-predictions':['SEC release, Global Predictions paragraph','Shared settlement paragraph, Global Predictions terms','USD 175,000 civil penalty; no admission; separate proceeding.'],
 'rimar-capital':['SEC release, order findings paragraphs','Without admitting or denying paragraph','USD 310,000 total civil penalties; wider conduct and multiple respondents.'],
 'evolv-screening':['FTC complaint announcement, screening claims','Proposed Settlement Requirements','Proposed settlement retained; court approval not inferred from filing.'],
 'replika-italy':['Garante English version, findings paragraphs','Fine, compliance and separate investigation paragraphs; appeal footnote','EUR 5 million; appeal pending in cited announcement; ancillary-publication penalty distinguished.'],
 'foodinho-riders':['Italian Garante announcement, automated-processing paragraphs','Corrective measures paragraphs','EUR 5 million in 2024 distinct from EUR 2.6 million in 2021; translated summary.'],
 'deepseek-korea':['PIPC examination, sections 1–3','Administrative Disposition and Future Plans','Recommendations, not monetary sanction; opt-out and transfer changes noted.'],
 'cruise-reporting':['NHTSA consent-order announcement, incomplete reporting','Penalty and corrective-action requirements','USD 1.5 million for reporting failure, not compensation or sole crash causation.']
};
const corrections={
 'uber-tempe':'Aligned causal wording with NTSB finding and removed a name not established by the linked page.',
 'clearview-canada':'Added December 2021 provincial orders.',
 'kramer-robocalls':'Added separate June 2025 criminal acquittal.',
 'mata':'Clarified joint and several penalty; directly checked PDF conclusion.',
 'itutorgroup':'Removed recruitment-year detail not explicit in selected settlement source.',
 'workado':'Qualified headline as challenged claims.',
 'intellivision':'Qualified headline as FTC challenge.',
 'ngl':'Qualified headline; retained later refund-process update.'
};
for(const c of data.cases){const n=c.review?.checkedOn==='2026-10-16'?[c.review.supportLocators.summaryAndAiRole,c.review.supportLocators.outcome,c.review.numberAndScopeChecks]:(notes[c.id]||[c.review?.supportLocators?.summaryAndAiRole,c.review?.supportLocators?.outcome,c.review?.numberAndScopeChecks]);if(n.some(x=>!x))throw Error(`Missing reviewed evidence locators: ${c.id}`);c.review={checkedOn:c.review?.checkedOn||data.reviewedOn,basis:c.review?.basis|| (c.id==='belamy-credit'?'Original reporting by The Verge and WIRED':c.id==='uk-ceo-voice-2019'?'Insurer-attributed reporting':c.id==='robert-williams'?'Litigant representative and linked settlement':c.id==='dutch-childcare'?'Research organisation investigation':c.id==='microsoft-tay'?'Developer acknowledgement':c.id==='kramer-robocalls'?'Regulator account and original court reporting':'Official source account'),supportLocators:{summaryAndAiRole:n[0],outcome:n[1]},numberAndScopeChecks:n[2],correction:c.review?.correction||corrections[c.id]||'Retained with explicit attribution and scope limits.',remainingUncertainty:c.limitation,statusCoverage:'Dated source review; not an exhaustive search of all later proceedings.',interpretation:'Theme and lesson are editorial interpretation, not source findings.'};}
await fs.writeFile(path,JSON.stringify(data,null,2)+'\n');
const fields=['case_id','entity','checked_on','basis','summary_ai_locator','outcome_locator','number_scope_checks','correction','outcome_as_of','status_coverage','remaining_uncertainty','source_urls'];
const q=x=>'"'+String(x).replaceAll('"','""')+'"';
const rows=data.cases.map(c=>[c.id,c.entity,c.review.checkedOn,c.review.basis,c.review.supportLocators.summaryAndAiRole,c.review.supportLocators.outcome,c.review.numberAndScopeChecks,c.review.correction,c.outcomeAsOf,c.review.statusCoverage,c.review.remainingUncertainty,c.sources.map(s=>s.url).join(' | ')]);
const csv=[fields.join(','),...rows.map(r=>r.map(q).join(','))].join('\r\n');await fs.writeFile(new URL('../dist/data/verification-audit.csv',import.meta.url),csv);await fs.writeFile(new URL('../../../outputs/ai-headlines-verification-audit.csv',import.meta.url),csv);
console.log(`Saved manual source-review notes and audit CSV for ${rows.length} cases.`);
