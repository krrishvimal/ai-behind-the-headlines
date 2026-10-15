# Historical verification notes · 15 October 2026

These notes describe release 1.1. For the current 35-record release, use AUDIT-RELEASE-2.md and dist/data/verification-audit.csv. The older 20-record counts and retrieval limitations below are historical, not current certification.

## Completed

- 20 records checked against official regulator, government, court and safety-investigation sources found in this session. Individual links are retained in every record.
- Fact summaries remain attributed; settlement allegations are not represented as admissions or trial findings.
- Rytr's December 2025 reversal is included. Smith's October 2026 sentencing supersedes the older indictment-only account.
- Historical outcomes have explicit as-of dates. This is not a claim that every record describes the latest legal position today.
- Seven automated tests pass: complete dated records; coherent source chronology; exact chart counts; combined filtering; stable sorting; explicit changed/ambiguous outcomes; CSV context retention; collision-free timeline lanes preserving exact date positions.
- Browser JavaScript syntax checked with Node.
- Buildless source and a standalone offline HTML are provided.

## Limits and incomplete checks

- Local HTTP preview successfully tested in the Codex browser on the later polishing pass at desktop 1280 x 900 and mobile 390 x 844. No horizontal overflow or browser console warnings/errors observed. Four-step story, case dialog opening/closing, deepfake search (2 records), Australia filter (1), reversed-order outcome filter (1), reset and CSV download verified. Downloaded CSV retains sources and limitations. Desktop and mobile screenshots saved in outputs. A mobile heading spacing defect was corrected and verified.
- Some official PDF links were accessible through search indexing but direct web-tool retrieval failed (FCC 403; court PDF timeout). For those records the account is limited to supported indexed text and the linked court administrative order. Link reachability may depend on the user's browser.
- Source reading is not an independent investigation into the underlying events. No claim of absolute accuracy or exhaustive status coverage is made.
- Site registered under project `appgprj_6ad0680990908191ab1a4fb4842e48e2`. Native get_site confirmed no live URL. After receiving network and project Git-directory write permissions, the supported source-helper submission was still rejected: "approval required by policy, but AskForApproval::Granular.sandbox_approval is false". No successful push, saved version or deployment is confirmed. Audience remains unchanged. Do not share the registered URL as a live project.

## Polishing pass

- Added a four-step Hong Kong case narrative linked to its government source; no fabricated quotations or real-time-deepfake claims.
- Added source outcome distribution, entity labels and visible outcome dates.
- Updated Ring, Alexa and NGL with later dated official follow-up sources; preserved 20 distinct case records.
- Added social sharing metadata and a typeset 1200 x 630 PNG cover.
- Offline standalone HTML regenerated with embedded data and styles.

## Next source review

Revisit historical proposed settlements and investigations if presenting current legal status. Expand geographic coverage only with equally clear records. Do not infer prevalence from this purposively selected collection.
