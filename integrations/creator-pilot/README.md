# HDPJoin Creator Community & AI Network — pilot contract (Oct 12, 2026)

## Purpose and readiness

The HDPJoin /creators/ landing page and /creators/kit/ resource kit support a **human-reviewed limited creator collaboration pilot**, not an operational open social network, affiliate engine, creator SaaS or automatic store platform.

| Component | Existing foundation | Not yet promised |
|---|---|---|
| HDPJoin | Public static site, consent-aware GA4, GSC collector, SACO aggregate analytics | Hosted creator accounts, automatic subscriber collection |
| Creator Studio | Arcadian Tutorial Studio prototype on Mac mini, TV dashboard, phone controller, session teleprompter | Public SaaS, single sign-on, turnkey remote hosting |
| Social Network OS | Clean-room SocialMediaScript_Rebuild v0.9 archive: community, publishing, marketplace, PWA scaffolds | Deployed moderated public social network, native push, live payments, transcoding |
| SACO | Authenticated internal HDP-SACO VPS service with approval/receipts | Automatic external creator posting or multi-tenant self-service authorization |
| UltraHype | C:\HDP\Ultrahype folder; running eBay-related services | Automatically provisioned hosted storefronts, shopping cart checkout or unlimited hosting |

A no-cost UltraHype hosted storefront is a **proposed reviewed pilot benefit**. Before assigning one, verify actual deployment, URL, provisioning, accepted products, safety/moderation, tenant separation, payment settlement, support and a bounded no-cost usage policy. No promise of free shipping, payment fees or indefinite hosting.

## Pages and experiment routes

- /creators/ explains creator paths and opens a mailto invitation request; it has no signup backend.
- /creators/kit/ contains a script, five content angles and client-only campaign link generator. Codes must be operator-issued: typing a code **does not** register an affiliate, validate a referral or initiate a payout.
- /creators/?variant=studio and /creators/?variant=store are **manually assigned content variants**, with same canonical URL. There is not yet randomized A/B testing or validated cohort allocation.
- /tools/agent-stack-cost/ (calculator-first) and /discover/ (discovery-first) are distinct educational destinations. The main HDP site remains the commerce/fulfillment site.

## Attribution and privacy rules

Example:
https://hdpjoin.com/tools/agent-stack-cost/?src=creator&via=creator-code&variant=studio

1. The source value creator is allowed. The via code is a public HDP-issued slug (3–24 lowercase letters, numbers and hyphens) and variant is one of studio/store/general. The generator does **not** check a verified server registry; payments must not rely on self-entered codes.
2. Consent-aware assets/site.js stores public creator attribution in sessionStorage only after opt-in consent, then adds creator_ref and campaign_variant to consented GA4 event metadata. Declining analytics doesn't prevent page access.
3. Only consented HDP-bound links can gain utm_medium=creator, utm_campaign=creator_pilot and utm_content with the public code. Calculator input amounts, visitor identifiers, email and full raw URLs are not included in these custom GA4 events.
4. assets/creators.js emits hdpjoin_creator_interest (allowlisted category) and hdpjoin_creator_kit_action (generate_link/copy_link/copy_caption) only after opt-in. These are interest indicators, not conversions. Existing aggregate CDK report doesn't yet count these event names; an approved collector allowlist change and real browser evidence are needed. GA4 custom dimensions for creator_ref and campaign_variant are not yet verified.
5. privacy/index.html discloses referral codes. Invitations open the visitor's mail application; there is no backend to store requests or send newsletters.

Conversion ladder: public page interaction → consented HDP handoff → verified inquiry → discovery appointment → verified paid order → fulfilled result. Link clicks are not paid conversions or earned commissions. Material connections to creators require clear disclosures.

## Pilot operations

- Invite 5–10 willing creators in relevant small-business, maker, creative, tech or educational niches. No bulk scraping, spam DMs, cold SMS or unauthorized social posting.
- Start with shareable useful educational content. If offering Creator Studio, Social Network OS or UltraHype access, demonstrate a working feature and supply approved individual terms first.
- Require rights/permissions for reusing creator material, content moderation/abuse reporting and a clear path to leave before hosting user content.
- 30-day evidence: invitations, opt-ins, publications, legitimate referral sessions, qualified inquiries, paid orders independently verified, creator satisfaction and operating costs. Decide STOP / CONTINUE / EXPAND by actual outcomes.

## Next verification work

1. Verify GitHub Pages deployment, navigation, responsive display, consent accept/decline.
2. Verify creator-specific GA4 event names after a genuine consented visit, and extend private CDK allowlist through an approved staged release.
3. Establish approved creator code registry and downstream order reconciliation before financial incentives.
4. Audit storefront runtime separately from UltraHype eBay services.
5. Audit Arcadian Creator Studio and Social Network OS artifacts and package a demo of the features that really work.
6. Enable no-cost store provisioning and creator accounts only after support/security/financial terms are validated.

These static GitHub Pages changes do not mutate highestdegreepriorities.com, UltraHype services, SACO operator configuration, or private CDK credentials.
