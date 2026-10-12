# HDPJoin → SACO → GoogleAnalyticsCollector-CDK connection

**Status:** proposed extension of the **existing** live SACO `google_analytics` read-only adapter. A new `hdpjoin_discovery_analytics` connector is **not deployed** on the VPS. This repository contains an implementable site-level contract and safe browser event instrumentation, not production SACO credentials or a working new backend route.

## Confirmed prior infrastructure (Great Operation Handoff)
- Collector: `C:\HDP\GoogleAnalyticsCollector-CDK`; Windows service `HDP-GoogleAnalyticsCollector-CDK`, previously installed as LocalService and configured to run every six hours.
- Direct Google APIs: Search Console and GA4 property `properties/553736139` (measurement ID used on HDPJoin: `G-2ZD9GMMZ36`).
- Data path: CDK → PayloadOverflow-CDK → allowlisted `OIE_ANALYTICS_INGEST` → private OIE analytics / verified-demand lane.
- Existing SACO v0.5.0 production-ready `google_analytics` adapter: **read-only** `analytics.fetch` returns a sanitized summary from the collector. It uses a trusted local adapter; Google keys remain in CDK.
- These are documented previous production receipts. Current collector uptime and HDPJoin-hostname inclusion have **not** been queried directly in this change.

## Target routing

```text
Visitor at hdpjoin.com --optional GA4 consent--> GA4 G-2ZD9GMMZ36
                                              -> direct Google CDK collector (existing)
                                              -> private snapshots / analytics summary
                                              -> SACO existing google_analytics:analytics.fetch (read only)
                                              -> proposed HDPJoin-filtered report for authorized internal consumers
                                              -> OIE / Distribution OS / SEO Agent / Great Operation evidence
```

**SACO is the switching/control layer, not a replacement collector.** Never call authenticated SACO `app.invoke` directly from public browser JavaScript, embed a SACO key in GitHub, or give visitor input execution authority through CrossDock.

## GA4 events implemented on HDPJoin
- `hdpjoin_visit_context`: approved source code (`src` allowlist), content area. Consent required.
- `hdpjoin_content_click`: internal click by safe action label and content area.
- `discovery_path_selected`: self-service guide selection with safe path value.
- `hdpjoin_handoff`: click into HDP, Tasks, Business OS, SACO or ESF (known hostnames only).
- `hdpjoin_newsletter_interest`: opens consent-request email; **not a confirmed subscription**.
- `hdpjoin_contact_interest`: ordinary email inquiry.
- Existing optional `hdpjoin_navigation`: other navigation events.
Browser values exclude names, email addresses, telephone numbers, free-form descriptions, and URL queries.

Some visitors decline analytics. These events therefore measure opted-in browser activity, not all site traffic or all billboard impressions. A `mailto:` click is not proof the email was actually sent.

## Proposed operator-controlled SACO connector deployment
1. Confirm site routes and domain, GA4 page_view and event availability with a real consented internal browser test.
2. Retrieve a recent **read-only** HDP-GoogleAnalyticsCollector-CDK receipt; validate whether the GA4 hostName dimension includes HDPJoin visits, separate from HDP's main domain.
3. Verify a separate Search Console domain property for hdpjoin.com and its service account permissions before enabling Search Console reporting.
4. Add hostname-scoped `hdpjoin` site mapping to the **trusted existing** SACO `google_analytics` adapter. No generic URL fetch, dynamically supplied provider module, or arbitrary shell execution.
5. Validate the allowlisted site/window arguments and aggregate-only output; enforce tenant authorization, audits, rate limits, and failure when site is unknown or disabled.
6. Deploy through the existing **operator-approved** VPSBridge process. Queue requires `status=READY`, `approved=TRUE`, unique `job_id` and a bounded approved action/artifact checksum; `PENDING` is not executable. CDK itself must NOT be used as an arbitrary PowerShell bridge.
7. Record DONE/PASS receipt from both SACO and CDK, then update `hdpjoin-discovery-connector.json` from proposal to live. Don't promote a design JSON file into the SACO active registry before the runtime supports it.
8. Track aggregate handoff outcomes, then map confirmed paid orders back into funnel reporting under the correct source attribution. Don't infer revenue from a click or mailto event.

## Newsletter connector (separate write capability)
`newsletter-connection.json` defines requirements for a future consent-based subscriber backend. Do not send public browser email addresses to `analytics.fetch` or repurpose it as a subscriber collector. Newsletter ingestion is a sensitive write path with verified opt-in and unsubscribe; use HDP EmailAgent or a dedicated consent-capable provider backend only after secure endpoint deployment and tests. Until connected, RSS and the explicitly described email-request link remain the public flows.

## Important visibility distinctions
- Live already: static HDPJoin front end, successful GitHub Pages build, desktop/mobile hero files, current GA4 consent gate, SACO generic read-side analytics adapter (per previous field receipt).
- Added here: consent-aware safe-name HDPJoin funnel events, proposed SACO HDPJoin site contract.
- Not yet verified live: SACO report filtered to HDPJoin; any new SACO manifest installed on Windows; Search Console access for hdpjoin.com; functional newsletter subscription backend; paid customer conversion.

## Oct 11, 2026: actual SACO adapter contract verified

VPSBridge read-only receipts R13/R14 confirmed the installed adapter at `C:\HDP\SACO\connectors\business_apps\google_analytics\adapter.py` currently exposes **only** `analytics.fetch`, reading the allowlisted top-level collector fields from `state.json`. Direct adapter smoke returned status=ok, read_only=True, source_service=HDP-GoogleAnalyticsCollector-CDK, last_decision=NOOP_UNCHANGED, settled_through=2026-10-09, last_error absent. An attempted `analytics.site.fetch` correctly returned `blocked`: the HDPJoin-specific capability is **not installed**.

A GA4 API production query through the repaired collector confirmed `hdpjoin.com` with **2 sessions and 30 events** on October 11 (a preliminary daily count, not a conversion proof). The current SACO adapter cannot derive host-level counts from its `state.json` readout. Do not add public `site_key` filters to that readout and pretend it is an HDPJoin report. An approved private collector-side aggregate, with verified provenance and settled/date window, must be exported to a narrow trusted report first. Then an authorized SACO read capability may return the **aggregate** for a strictly allowlisted site with tenant access, audit and rate limits. Source credentials stay with the collector. Do not expose detailed HDP analytics to unrelated SACO tenants.

GSC sites.list for the collector account returned HTTP 200 but does **not** list `sc-domain:hdpjoin.com` as of this check. Site owner must verify the domain and grant the appropriate restricted property access before direct-Google Search Console reports for HDPJoin are enabled. Do not confuse GA4 hostName presence with Search Console property ownership.
