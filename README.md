# AI Behind the Headlines

A buildless educational explorer with 36 curated AI and related automated-system case records. All graphics derive from the included data; there are no simulated incident counts.

Version 2.1 includes the Belamy creative-credit controversy, 36 records, eight themes and source-review locators for each case. See AUDIT-RELEASE-2.md and BELAMY-REVIEW.md for checks and limits.

## Preview

The stories section initially displays six matching cases. Show more cases reveals the next six; changing a filter or sort resets the cards to six. Charts and downloads always include the full relevant dataset. Browser checks covered 6→12→18→24→30→36, the final hidden button, search, no results, reset, sorting and mobile layout.

On Windows, double-click `Open Headlines.cmd`, or run `node scripts/serve.mjs` from this directory. Open http://127.0.0.1:4174. Keep the server window open. No packages or API keys are required.

## Verify

Run `node scripts/package-local.mjs` then `node --test tests/*.test.mjs`. Run `node --check dist/app.mjs` after editing the browser code.

## Data and editorial policy

`dist/data/cases.json` is the source of truth. Summaries paraphrase linked official records, developer statements, research investigations and labelled original reporting, not an imported third-party incident dataset. Court records reproduced by Justia and party-side accounts are labelled. Source rights remain with publishers; links are attribution, not endorsement.

- Reviewed on 15 October 2026. This is a manually curated snapshot, not a live feed or a full legal status service.
- The public-record timeline uses the earliest publication included in each case's sources. This may be later than the event or its first media report. Event periods are separate text fields.
- `outcomeAsOf` dates the outcome being described. Old proposed settlements and ongoing investigations are explicitly historical, not claims of present status.
- Counts describe this selected collection only, including controversies and reversals. They do not establish worldwide prevalence, trends, victim totals, national safety rankings, or proven violations.
- Each case has one editorial primary theme to avoid double counting. Categories and lessons are interpretation; sources supply the factual account.
- AI claims are distinguished from verified technology. iTutorGroup is a rules-based automated-system case; Ring's wider security allegations are not all attributed to AI.
- Rytr's reversed order is visibly marked. An earlier action must not be treated as still in force.
- No severity score, financial-loss total, or model/company harm ranking is calculated. Penalties, forfeiture, investment sums and losses are different measures.
- `review` provides manual source locators and number/scope checks. The audit is a record of the evidence reviewed, not independent fact certification or a guarantee of zero errors. It explicitly does not claim an exhaustive search of every later proceeding.
- The UK 2019 report has unconfirmed technical attribution; Apple Card's investigated allegation was not substantiated; the Kramer record distinguishes a federal fine from a separate state acquittal. These are not all confirmed harmful uses.

## Updating records

Read the original source and look for later decisions or corrections. Add linked sources with exact dates; update `outcomeAsOf` only when a source supports the new outcome. Keep uncertainty and the organisation's dispute, where material. Do not change an allegation into a finding merely because a settlement exists. Run the checks, review the actual source wording and preview the case before publishing.

## Hosting

The ready-to-serve website is in `dist`. Import this repository into Vercel with framework preset Other. The included `vercel.json` selects `dist`, with no installation or build command required. No API keys, accounts for visitors, or backend are required. GitHub stores the source; a live website requires a separate hosting deployment.

Use Node.js 22 or later. Run `npm test` for the checks or `npm start` for a local preview. `npm run package:offline` creates `generated/AI Behind the Headlines.html`, a self-contained offline copy. Generated files and local hosting identity are excluded from Git.

Source summaries are original paraphrases. Linked publishers retain rights to their source material. No licence to redistribute third-party artwork or source articles is implied.
