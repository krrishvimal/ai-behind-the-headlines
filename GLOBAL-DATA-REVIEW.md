# Global explorer source and reuse review

Reviewed and retrieved: 16 October 2026. This is an AI-assisted source/schema review, not independent verification of every source incident.

## Selected source and coverage

AI Incident Database (AIID), Responsible AI Collaborative, official download-index export:
https://incidentdatabase.ai/page-data/downloadindex/page-data.json

The retrieved export contains 7,293 report rows and 1,743 distinct incident IDs. Multiple report rows are collapsed by incident_id. Distinct IDs are not guaranteed distinct real-world events; cross-ID overlaps are not resolved. This export is a dated snapshot, not a guaranteed complete copy of every AIID collection.

CSETv1 country annotations yield 140 usable country-coded IDs, 25 country/territory labels, and 1,603 IDs without usable country annotations. Country fields and incident dates agree across report rows for each ID in this export. Empty and whitespace-only countries are unmapped. One explicit United States label is normalized to US. No location is inferred from headlines, company headquarters or event descriptions. Each retained record has one country annotation. A country's absence is not evidence of no incidents. No country performance or risk ranking is provided.

Dates use incident_date, not report publication dates or the taxonomy's separate year annotations. They may be approximate; the retrieved range is 1983-09-26 to 2026-10-06. Country classification coverage is sparse and not contemporaneous global surveillance. CSETv1 tangible-harm annotations include tangible harm, near misses, issues, unclear, no tangible harm and unclassified. These are not interchangeable with OECD AIM's incident/hazard definitions. Unclassified is not harmless. Retaining a source record is not an independent finding, conviction or proof of deliberate misuse.

Source incident titles containing Unicode replacement characters are replaced by neutral ID labels, with links to original citation pages. Other titles are retained as source titles, not newly asserted facts. No article text, report descriptions, images or video enter the derived dataset or public package. Titles link to https://incidentdatabase.ai/cite/ID/ for source context and contributor credit.

## Reuse basis

https://incidentdatabase.ai/terms-of-use/ explicitly licenses its incidents and classifications collections under Creative Commons Attribution ShareAlike 4.0:
https://creativecommons.org/licenses/by-sa/4.0/

The derived incident metadata and classifications in dist/data/global-incidents.json are shared under CC BY-SA 4.0 with attribution to AIID / Responsible AI Collaborative and its contributing editors and submitters. Transformations, source URL, retrieval date and source SHA-256 are included. No endorsement is implied. Third-party article bodies, photographs and other excluded report material are not reused. This licence does not grant rights to unrelated third-party material or remove privacy/other legal obligations.

The official weekly snapshot endpoint returned HTTP 403; no access control was bypassed. The public official download-index export was retrieved once. No high-volume page crawling was performed.

OECD AIM was considered but not imported: a suitable broad republication basis for its third-party news-based data was not established in this review. AIAAIC was considered but not imported. No claim is made that AIID is a complete global census or that the mapped subset represents all AIID geography.

## Map geometry

Natural Earth 1:110m admin-0 countries, official repository:
https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson

Public-domain basis: https://www.naturalearthdata.com/about/terms-of-use/

Coordinates are projected to SVG paths in an equirectangular projection, rounded to one decimal place, with Antarctica omitted. ISO_A2_EH is used to join source labels. All 25 retained country codes have geometry. Small territories may be absent at this scale. Boundaries are illustrative and are not a position on sovereignty. Original geometry hash and retrieval date appear in dist/data/world-map.json.

## Reproduction and tests

scripts/build-global.mjs reads the two locally obtained source files from generated/global-source/ and writes only the filtered metadata and projected map geometry to dist/data/. Raw downloads remain excluded from the publishing package. To rebuild, obtain the documented official exports independently and place them at the paths in the script; do not assume their future contents will match this reviewed snapshot.

Tests reconcile all source IDs and counts, preserve 30 curated cases, test every supported country/year/harm filter combination against direct record filtering, validate source links and allowed export fields, verify country geometry coverage and check offline packaging. DOM simulation separately exercises all 27 location selections, pagination, reset, map keyboard selection and country-bar selection. Browser layout checks are reported separately; tests do not establish source factual truth or zero errors.
