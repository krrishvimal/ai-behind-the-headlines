# AI Behind the Headlines

An AI ethics learning website with five everyday task paths and 30 selected case records. Answer three questions to explore practical next steps and related evidence. This is an educational guide, not a news feed, ethical certification or exhaustive incident database.

Research, summaries, learning prompts and code were prepared with AI assistance. Software tests do not establish independent expert verification or comprehensive legal clearance. Source organisations do not endorse this project. Report corrections or rights concerns through [GitHub issues](https://github.com/krrishvimal/ai-behind-the-headlines/issues), without posting sensitive information.

## Current release

Version 3.1.0 contains 30 case records. The earlier source-selection pass reduced 36 records to 24, then added three, giving 27. The 16 October 2026 follow-up restores iTutorGroup and Robodebt with new source packages and adds Andersen’s August 2024 procedural ruling, giving 30. Ten earlier records remain held out. No target count overrides evidence and source-selection requirements.

Individual checks retain their actual dates; a collection update does not certify that every case was freshly checked or is legally current. The two restored cases concern related automation, not demonstrated LLM incidents. Andersen is a dated procedural ruling, not a finding of infringement.

See CONTENT-REUSE-REVIEW.md for current rights findings and CANDIDATE-REVIEW.md for all 19 suggestions and their inclusion decisions. Earlier release reports are historical and their counts are superseded. No held-case archive is included in dist or the deployment package.

## Guide and privacy

Five task paths cover hiring, studying, creative images, marketing and customer support. Suggestions respond to selected answers, including unknowns. They are independent educational interpretations informed by OECD, NIST, England's Department for Education, the US Copyright Office and FTC guidance. Geography and institutional limits are shown. No task is certified ethical, safe or legally compliant.

The guide runs locally in the browser with no AI API, account, document upload, analytics or answer persistence. It accepts predefined choices. Its text download includes selected answers, practical steps, contextual limits and source links. External source websites have their own privacy practices.

## Read the data carefully

The source of truth is dist/data/cases.json. Charts count the selected records, not victims or proven violations. Allegations, investigations, settlements, findings and reversals are distinguished. One primary editorial theme per record avoids double counting. Public record dates follow the earliest included source; event periods are separate. Outcome dates describe cited evidence, not a guarantee of the current legal status.

Sources are selected using documented reuse conditions or explicit government-document distinctions; exceptions and attribution requirements still apply. No original article bodies, database imports, artwork, photographs, video or publisher logos are redistributed. Citations are not permission or endorsement. This is not a guarantee of zero errors or complete legal compliance.

## Run and verify

Use Node.js 22 or later. Run npm start or double-click Open Headlines.cmd and visit http://127.0.0.1:4174. No packages, API keys or backend are required.

Run node scripts/build-audit.mjs, node scripts/review-content-reuse.mjs, node scripts/audit-guide.mjs and npm test after an editorial change. Check source wording and date scope as well as automated results. The tests cover 135 guide combinations, source and case references, counting, filtering, timeline layout, source-policy selection and offline packaging.

The stories section begins with six matching cards and reveals six more at a time. Filters or sorting reset the cards. Charts and downloads include all relevant records.

## Publishing

The ready-to-serve files are in dist. The included vercel.json uses the Other framework preset and dist output directory with no installation or build command. GitHub stores the project; hosting is a separate deployment. Local generated archives, hosting identity, .env files, dependencies and ZIPs are excluded by .gitignore.

The standalone copy is generated/AI Behind the Headlines.html. Publish only the reviewed deployment files. Do not upload generated/held-case-records.json or unrelated workspace files. Source licences do not grant rights to publisher assets or third-party exhibits.
