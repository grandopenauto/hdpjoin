# HDPJoin — publishing, attribution and operations guide

## Audience and purpose
HDPJoin is **top-of-funnel discovery** for people who encountered a short address, billboard, article, social post or video and want to learn more. Do not duplicate the HDP Business Launchpad or turn all content into product cards.

**Visitor journey:** curious visit → useful guide / comparison / demo → discover path → specific task or Business OS at highestdegreepriorities.com → commercial qualification, scope, quoted price, approved payment and verified fulfillment.

**Headline:** "Manifested Miracles." This is aspirational brand language, not a guarantee of business outcomes.

## Site routes
- / — billboard-friendly campaign landing with sky/clouds/sun graphic and clear visitor starting points
- /discover/ — self-service selection of new business, single task, or existing-business improvement
- /learn/ — editorial guide index
- /learn/task-or-business-os/ — deciding between a bounded service and integrated operations
- /learn/ai-receptionist-comparison/ — neutral capability comparison
- /learn/build-buy-operate/ — build vs purchase vs outsource operations
- /learn/automation-readiness/ — 10-item bounded process checklist
- /learn/better-ai-systems-integration/ — seven-sign operational integration self-check and SI⁸ positioning
- /videos/ — existing public HDP voice demo; future approved click-to-load videos
- /updates/ — email update request and RSS
- /about/ — purpose, master brand connection and SI∞IƧ reference
- /privacy/ — analytics and email-request explanation
- /feed.xml — standards-based RSS
- /sitemap.xml /robots.txt /404.html — crawler support and navigation

## Repository / GitHub Pages
Repo: grandopenauto/hdpjoin (public), branch main, website source root. CNAME is exactly hdpjoin.com. Owner's next step: GitHub Settings → Pages → Deploy from a branch → main → /(root), save. Confirm DNS and wait for the Pages certificate before enabling 'Enforce HTTPS'. Check https://hdpjoin.com/ and both apex/WWW behavior. Do not change external DNS without authorization.

## Attribution
HDPJoin uses HDP's existing GA4 property G-2ZD9GMMZ36 only if visitors allow analytics. A browser preference controls consent. Links to the HDP main site carry utm_source=hdpjoin and meaningful utm_campaign values. Validate actual GA4 tracking and campaign attribution after Pages is live. Do not claim conversion without real data. Keep query order correct: any `#catalog` fragment must come **after** the UTM query string.

## Newsletter state
The site **does not have a mailing-list provider or live signup backend**. The email CTA opens the customer's mail program and requests HDP to confirm the opt-in. RSS is live as a file once the Pages domain is published. Never claim "successfully subscribed" or collect email input via static JS without a working data processor.
Recommended next phase: choose verified mailing provider (e.g., Buttondown, Mailchimp, Brevo, or managed HDP EmailAgent) and design double opt-in, unsubscribe, suppression, spam safeguards, privacy notice and list security. Confirm accounts, pricing, service permissions and email sending rules. Only then swap the current link to an authorized hosted form or consent-verified endpoint. Avoid sending a user to an unverified form.

## Videos
The video page currently links to existing HDP public voice demo and voice configurator. No fabricated embeds. For a verified authorized YouTube video, insert a container such as:
```html
<div data-youtube-id="VERIFIED11CHAR_ID" data-video-title="HDP Business OS Walkthrough">
  <button type="button" data-load-video>Play walkthrough</button>
</div>
```
site.js loads youtube-nocookie.com **only on viewer click**. Securely confirm video source, licensing and permission. Do not claim preview placeholders are playable.

## Publishing standards
Prefer fewer original, substantial, helpful guides over mass-generated thin comparison pages. A comparison must state trade-offs, what was actually tested, specific limitations, vendor/source dates for changing facts, clear examples, and the relevance to a visitor's decision. Do not create competitor pages that imply partnerships or unverified prices. Avoid unsupported performance, revenue and superintelligence claims. Each article gets unique title, description, canonical, and Article JSON-LD; add sitemap/RSS items when published.

## Activation and fulfillment
No checkout and no customer-specific services are hosted on HDPJoin. The HDP Tasks/Business Launchpad and other specialist domains manage separate product discovery and potentially payment processing. Static landing buttons do not grant access or prove payment. Existing HDP Tasks $49 infrastructure does not imply every task is connected to checkout. Preserve approval rules and never bypass READY + approved queue requirements for VPSBridge.

## QA checklist before public promotion
1. GitHub Pages deploys successfully from main root.
2. Both https://hdpjoin.com/ and /discover/ /learn/ /updates/ resolve over HTTPS.
3. Header/footer/nav, mobile hamburger, click targets, contrast, title and description checked.
4. The advisor shows a meaningful result for each user choice; cross-domain UTM parameters are preserved.
5. Analytics does not load before opt-in; preferences can be changed afterward.
6. RSS validates and feed links resolve; no fake newsletter "subscribe" success.
7. All four guides resolve from index, sitemap and internal links.
8. Actual HDP demo URLs are verified, and any third-party vendor links checked.
9. Check Search Console ownership and indexing after publication.
10. Validate billboard typography remains readable on small devices and at driving-distance impressions; avoid busy text.
