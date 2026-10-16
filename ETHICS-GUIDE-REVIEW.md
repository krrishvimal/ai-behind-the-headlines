# AI ethics guide source and output review

Reviewed 16 October 2026 with AI assistance. Version 3.2.0 adds office documents, coding agents and synthetic voice/video to the existing five tasks. Eight tasks × three questions × three choices = 216 supported combinations. Each result has five practical suggestions and a separate scope section. None certifies safety, ethics or legal compliance. The historical case dataset remains 30 records with its own source dates.

## What changed

Practical suggestions are visibly labelled. Rules to check appear separately and identify geography and role limits. EU transparency notes distinguish provider marking from deployer disclosures and acknowledge scope and exceptions. The US FTC review-rule note distinguishes covered business conduct from ordinary consumer reviews and does not claim all avatars or fictional advertising are prohibited. India’s policy announcement is presented as a resource, not a legal approval or comprehensive Indian-law checklist. England education guidance remains explicitly limited to England and institutional rules. Consent advice is labelled an ethical safeguard, not a universal legal requirement.

Office choices address document contents, approved tools and summary review. Coding choices address test/live access, permissions and testing. Imported instructions, secrets, recovery and human approval for consequential actions are discussed without claiming complete security. The voice path addresses identity rights, public/private context and identity/payment uses. Familiar voices are not accepted as identity verification.

Coding has no directly matched incident link because the collection has no reviewed coding-agent case. Ring is explicitly a different-service privacy example in the office path. The Hong Kong case remains pre-recorded clips without interaction, not a proven real-time deepfake meeting. No held incident was restored merely to illustrate a new task.

## Evidence and reuse

The machine-readable source inventory is in dist/data/guide-source-audit.json. It records actual source locators, checked dates and limits. The content-reuse CSV includes all 12 guide resources, with applicable host policies. PIB permits accurate attributed reuse excluding third-party material; its ministry announcement is prominently credited. EU source credit, CC BY link and change notice are retained. NIST, OECD, FTC, education and copyright resources inform independent prompts, not copied frameworks. Public comments below the FTC article are not evidence for the voice guidance.

- **oecd** — [OECD AI Principles](https://oecd.ai/en/ai-principles). Values-based principles: fairness/privacy, transparency, safety, accountability, sustainable development.

- **nist** — [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework). Overview: voluntary use; AI RMF 1.0 and the Generative AI Profile. Revision in progress is not treated as a new final standard.

- **education** — [Department for Education: generative AI in education](https://www.gov.uk/government/publications/generative-artificial-intelligence-in-education/generative-artificial-intelligence-ai-in-education). Applies to England; using AI safely/effectively and responsibly. Institution permission cannot be inferred.

- **copyright** — [US Copyright Office: using someone else’s work](https://www.copyright.gov/help/faq/faq-fairuse.html). Permission and fair-use FAQ. Exceptions are context-specific; not an output infringement determination.

- **endorsements** — [FTC: endorsements and testimonials](https://www.ftc.gov/business-guidance/resources/ftcs-endorsement-guides-what-people-are-asking). Genuine experiences and material connections. Distinct from the separate Consumer Reviews Rule.

- **privacy** — [NIST Privacy Framework](https://www.nist.gov/privacy-framework). Framework overview and voluntary risk-management purpose. No legal compliance inferred from adoption.

- **software** — [NIST Secure Software Development Framework](https://csrc.nist.gov/pubs/sp/800/218/final). SP 800-218 publication abstract and secure-development recommendations. Tailored steps are editorial adaptations, not a full control implementation.

- **genai** — [NIST Generative AI Profile](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf). AI 600-1, section 2.9, PDF pages 13–14; indirect prompt injection and risks to connected systems. No mitigation is described as complete protection.

- **voice** — [FTC: AI voice-cloning scams](https://consumer.ftc.gov/consumer-alerts/2023/03/scammers-use-ai-enhance-their-family-emergency-schemes). FTC staff article opening and independent callback advice; public comments excluded.

- **transparency** — [European Commission: AI transparency obligations](https://digital-strategy.ec.europa.eu/en/policies/guidelines-ai-transparency-obligations). Commission guidance: Article 50 date, provider vs deployer obligations and scope/exception discussion; official service-desk Article 50 text, including creative-work disclosure limits, also inspected.

- **reviewsrule** — [FTC: Consumer Reviews and Testimonials Rule Q&A](https://www.ftc.gov/business-guidance/resources/consumer-reviews-testimonials-rule-questions-answers). General scope and staff-guidance limits; §465.2 fake/false testimonials, avatars and fictional dramatizations; separate endorsement-disclosure rules.

- **india** — [MeitY / PIB: India AI Governance Guidelines announcement](https://www.pib.gov.in/Pressreleaseshare.aspx?PRID=2186639&lang=2&reg=3). Ministry announcement, 5 November 2025, framework components and foundational-reference description. Full underlying guidelines and all Indian statutes are not claimed to be audited.

## Coverage and limits

The guide runs locally, uses predefined choices and has no AI API, uploads, accounts, analytics or answer persistence. It is manually maintained. Medical, financial and legal-advice task paths are not added. No energy or carbon quantities are measured. A completed checklist does not determine which laws apply or replace tool terms, institutional policy or professional advice.

Automated checks enumerate all 216 combinations, verify source and case references, exercise consequential branches and check that every new question’s options change the relevant suggestions. On 16 October 2026, a native Brave browser check opened the expanded guide, selected three education answers and built a result. Desktop rendering of that form and result was inspected, including the separate India policy resource and England education guidance. All eight task controls were present. Native mobile rendering and actual browser file saving remain pending; the earlier scheduled browser attempt stopped when its URL could not be identified. Earlier version 3.1.0 checks do not establish the expanded interface’s behaviour. Successful checks establish the tested behaviour, not factual infallibility or independent expert certification.

Use node scripts/audit-guide.mjs for the detailed output inventory. Do not publish generated/ or held-case archives. The deployment package includes this review and the public source inventory only.

## Interface simulation follow-up

On 16 October 2026, a jsdom simulation executed the actual bundled application and exercised all 216 guide combinations. It checked all five displayed suggestions, every context note, generated checklist text, edit-answer retention and close controls. It also opened and closed all 30 case dialogs, checked the initial six cards, revealed twelve, and exercised search and reset. No simulation console errors were recorded. Dialog and download browser APIs were stubbed, so this result does not establish native dialog behaviour, actual file saving, layout, responsive rendering or browser accessibility. The simulation harness and dependency tree stay in generated/ and are excluded from publication.
