# Maven/Grace Race 2 — Comprehensive Feature Gap Analysis (Living Document)

**Date:** March 21, 2026 (Updated with Tim's feedback)
**Prepared by:** Manus AI for the SIC HB1000 Solve Team
**Vault Commit:** `88ebef8` (Race 1 specs) | App Checkpoint: `9c068970` (Race 2 build)
**Status:** LIVING DOCUMENT — Updated every race. Committed to GitHub.
**Method:** Cross-reference of every vault document, Race 1 spec, agent spec, innovation index entry, and product spec against the deployed Maven/Grace companion app.

---

## Tim's Feedback (Incorporated Mar 21, 2026)

**1. Voice: Ke.ai (MiniMax) replaces ElevenLabs.** MiniMax MCP provides text_to_audio (TTS with emotion control), music_generation (actual AI music from lyrics), voice_design (create custom voices from description), and voice_clone. This is a superior fit because it handles both Grace's speaking voice AND Song Moment music generation in one platform.

**2. TP Marketing: "Maven and Grace Give a Shit."** The toilet paper hook should be cheeky, provocative, and memorable. Not "free toilet paper" — it is a subscription service where TP delivery is one included benefit. The marketing should be fun and slightly irreverent while maintaining dignity. This is the hook that gets Ruby Red's attention in a world of boring, sanitized corporate messaging.

**3. Original Maven Look/Feel.** The companion app should mimic the branding from the original Maven app (graceai-mkzhdr3r.manus.space): Poppins primary font, Brittany Signature for branding accents, warm color palette. Michelle and Sam already have allegiance to this design.

**4. Grace Persistence Model — "Grace Never Gets Cut."** Innovation #14 from the vault is a foundational business rule: Grace remains fully available at every tier, including Free. Only Maven can modify Grace's availability, not Ruby's payment status. Tim's addition: if Ruby asks to turn Grace off, she can snooze Grace for a maximum of 8 hours, then Grace comes back. If Ruby explicitly wants to permanently turn Grace off, that means she is leaving the membership entirely. Grace is not a feature — she is the relationship.

**5. Marketing Genius Agent.** A new agent spec is needed — the Marketing Genius Agent — with a framework of 30+ marketing strategies baked into the platform architecture. This agent looks at everything Maven has and says "How do I market this so it has an impact in society?"

**6. Living Document.** This gap analysis must be committed to GitHub and continuously updated. It becomes the input spec for future learning loops and races.

---

## Critical Framing Correction: The Toilet Paper Story

**What the app currently says:** "Free toilet paper" as a standalone offer.

**What it should say:** "Maven and Grace Give a Shit" — a cheeky, provocative subscription service where the Maven Essentials Box (including toilet paper delivery) is one included benefit among many. The TP is the Trojan Horse that gets Ruby Red's attention, but the product is the full Maven membership: emergency cash (Milk Money), grocery boxes (HandUps), community support, Grace AI concierge, financial tools, and the entire Village ecosystem.

**Vault source:** `/product-specs/Maven_TP_Fulfillment_Strategy.md` describes the transition from "Toilet Paper Delivery" to a monthly "Maven Essentials Box" containing TP and non-perishable household goods, fulfilled through SHIPHYPE or Canada Post.

---

## Grace Persistence Model (NEW — Tim's Direction + Innovation #14)

This is a foundational, non-negotiable business rule that must be embedded in every layer of the platform.

| Rule | Description | Implementation |
|---|---|---|
| **Grace Never Gets Cut** | Financial failure never results in loss of the AI relationship. Grace is not a feature, she is the relationship. | Grace remains fully available — full voice, full text, full memory, full empathy — at every tier, including Free. |
| **Only Maven Controls Grace** | The only entity that can modify Grace's availability is Maven itself, not Ruby's payment status. | No payment-gated Grace features. |
| **8-Hour Snooze Maximum** | If Ruby asks to turn Grace off, she can snooze for a maximum of 8 hours. Then Grace comes back. | Snooze timer with auto-resume. Grace says something warm when she comes back: "Hey, I'm back. Just checking in. No pressure." |
| **Permanent Off = Leave Membership** | If Ruby explicitly wants to permanently turn Grace off, that means she is leaving the membership entirely. | Clear, dignified off-boarding flow. Grace says: "I understand. If you ever need me, I'll be right here." |
| **Trust Signal** | The moment Ruby loses access to Grace because she missed a payment is the moment Maven becomes just another system that punishes her for being poor. | This is the single most important trust signal in the entire platform. |

---

## Feature Audit: Complete Inventory

### Layer 1 — Trojan Horse Entry Points

| Feature ID | Feature Name | Vault Status | Race 2 App Status | Gap Description |
|---|---|---|---|---|
| EP-001 | Gift Anthem Dedication | BUILT (original Maven) | NOT BUILT | No gift/dedication flow. No sharing mechanism. No WhatsApp/SMS send. |
| EP-002 | Direct Song Studio | BUILT (original Maven) | PARTIALLY BUILT | Song generation exists but missing: struggle taxonomy (22 struggles across 5 life seasons), misery dial (1-99), genre selection, 3-free-then-$0.99 pricing. |
| EP-003 | Walk in Her Shoes | BUILT (original Maven) | NOT BUILT | No interactive empathy experience. |
| EP-004 | Grace Emergency Lifeline | BUILT (original Maven) | NOT BUILT | No crisis-detection entry point. No SEO landing pages. No emergency resource connection. |
| EP-005 | Toilet Paper Trojan Horse | NEW (Race 1) | PARTIALLY BUILT | 8-step flow exists but framing needs update to "Maven and Grace Give a Shit" subscription model. No actual payment integration. No courier dispatch. |
| EP-006 | Song Studio Ruby Anthem | BUILT (original Maven) | PARTIALLY BUILT | Song generation works but missing full Ruby Anthem psychology framework. |
| NEW | "Give a Shit" Marketing Hook | Tim's direction | NOT BUILT | Cheeky, provocative marketing framing for the TP Trojan Horse. |

### Layer 2 — Trust Bridge (Grace)

| Feature ID | Feature Name | Vault Status | Race 2 App Status | Gap Description |
|---|---|---|---|---|
| TB-001 | Grace AI Concierge | BUILT (original Maven) | BUILT | Grace chat works with LLM. System prompt includes warmth and empathy. Memory extraction works. |
| TB-002 | Grace Relationship Memory | DESIGNED | BUILT (basic) | Tables exist. Memory extraction works. Missing: family graph (ecomap), followup scheduling, birthday tracking, communication preference tracking, 3-layer architecture. |
| TB-003 | Scam Alerts | BUILT (original Maven) | NOT BUILT | No scam alerts feature. |
| TB-004 | Grace Voice (Ke.ai/MiniMax) | Innovation #2 | NOT BUILT | MiniMax MCP available with text_to_audio, voice_design, emotion control. Need to create Grace's voice and wire TTS into chat. |
| TB-005 | Grace Personality System | Innovation #13 | PARTIALLY BUILT | System prompt has warmth but missing the 5 secret weapons framework. |
| TB-006 | Conversational Permission Gathering | Innovation #3 | NOT BUILT | No PIPEDA/consent flow gathered conversationally. |
| TB-007 | Trust-Building Cadence (14-Day) | Innovation #10 | NOT BUILT | No structured 14-day trust-building sequence. |
| TB-008 | Financial Stress Detection | Innovation #11 | NOT BUILT | Grace does not detect financial stress signals to trigger proactive help. |
| TB-009 | Grace Persistence (8hr Snooze) | Innovation #14 + Tim | NOT BUILT | "Grace Never Gets Cut" rule. 8-hour max snooze. Permanent off = leave membership. |
| TB-010 | Intensity Dial | Innovation #15 | NOT BUILT | Ruby cannot control Grace's proactiveness level. |

### Layer 3 — Financial Impact Engine

| Feature ID | Feature Name | Vault Status | Race 2 App Status | Gap Description |
|---|---|---|---|---|
| FI-001 | Vampire Slayer | SPEC | BUILT (basic) | Manual add/audit/cancel works. Missing: bank connection, automatic scanning, one-tap cancellation. |
| FI-002 | Budget Builder | BUILT (original Maven) | NOT BUILT | No budget planning tool. Original Maven has this at `/snapshot`. |
| FI-003 | Fee Fighter | BUILT (original Maven) | NOT BUILT | No fee identification or fighting tool. |
| FI-004 | Bill Tracker | BUILT (original Maven) | NOT BUILT | No bill tracking or payment reminders. |
| FI-005 | Debt Snowball Agent | SPEC | NOT BUILT | No debt tracking, no snowball/avalanche calculator, no PDF battle plan. |
| FI-006 | Savings Goals | BUILT (original Maven) | NOT BUILT | No savings goal tracking. |
| FI-007 | Dignity Score | SPEC | NOT BUILT | No scoring engine. 5-dimension formula defined in agent spec. |
| FI-008 | Milk Money | BUILT (original Maven) | NOT BUILT | No emergency cash system. $25 starting, up to $100. |
| FI-009 | Chaos Support | BUILT (original Maven) | NOT BUILT | No larger emergency fund ($250/$750). |
| FI-010 | Financial Impact Dashboard | NEW (Race 1) | BUILT (basic) | Dashboard exists but only tracks manual entries. No bank connection. |
| FI-011 | Corner Banker / Money Up | SPEC | NOT BUILT | Entire "Leg 2" of three-legged stool. Micro-loans $20-$150. |
| FI-012 | Rent Reporting | RESEARCH | NOT BUILT | Zenbase integration ($2.90/month) for credit building. |
| FI-013 | Monthly Reality Check | BUILT (original Maven) | NOT BUILT | No monthly financial review with Grace. |

### Layer 4 — Community Value

| Feature ID | Feature Name | Vault Status | Race 2 App Status | Gap Description |
|---|---|---|---|---|
| CV-001 | Village Hands Help Board | BUILT (original Maven) | NOT BUILT | No community help board. |
| CV-002 | Good Neighbor Barter | ARCHITECTURE | NOT BUILT | Concentric circles model (3-mile, city, province, globe). |
| CV-003 | Wisdom Giants Network | BUILT (original Maven) | NOT BUILT | No expert coaching directory. |
| CV-004 | Village Chat | BUILT (original Maven) | NOT BUILT | No community chat. |
| CV-005 | HandUps Grocery Boxes | BUILT (original Maven) | NOT BUILT | No grocery box selection. |
| CV-006 | Make a Wish Daily Draw | BUILT (original Maven) | NOT BUILT | No daily draw system. |
| CV-007 | Anthem Wall | Song Strategy Brief | NOT BUILT | No community anthem discovery feed. |
| CV-008 | Maven Moments Feed | Innovation Library | NOT BUILT | No community story/moment sharing. |

### Layer 5 — Platform Infrastructure

| Feature ID | Feature Name | Vault Status | Race 2 App Status | Gap Description |
|---|---|---|---|---|
| PI-001 | Stripe Integration | BUILT (original Maven) | NOT BUILT | No payment processing. Observer/Essentials/Plus tiers. |
| PI-002 | Subscription Tiers | BUILT (original Maven) | NOT BUILT | No tier system. |
| PI-003 | Admin Dashboard | BUILT (original Maven) | NOT BUILT | No operations visibility. ~50 admin pages in original. |
| PI-004 | Member Portal | BUILT (original Maven) | NOT BUILT | No member-specific portal. ~20 portal pages in original. |
| PI-005 | Email (Mandrill) | BUILT (original Maven) | NOT BUILT | No transactional email. |
| PI-006 | SMS (Twilio) | BUILT (original Maven) | NOT BUILT | No SMS notifications. |
| PI-007 | Grace Chat Widget (Floating) | BUILT (original Maven) | NOT BUILT | Grace is a page, not a floating widget available everywhere. |
| PI-008 | Branding (Poppins + Brittany) | BUILT (original Maven) | NOT BUILT | Current app uses Nunito. Need to switch to original Maven fonts. |

### Innovation Index Features (#1-#22)

| # | Feature Name | Vault Build % | Race 2 Status | Priority |
|---|---|---|---|---|
| 1 | Persistent Ambient Presence | 50% | BASIC | Medium |
| 2 | Voice-First Interface (Ke.ai) | 75% | NOT BUILT | HIGH |
| 3 | Conversational Permission Gathering | 50% | NOT BUILT | Medium |
| 4 | Cross-Session Memory | 75% | BUILT (basic) | Done (enhance) |
| 5 | Head Office Intervention Protocol | 25% | NOT BUILT | Low |
| 6 | Song Moment (Daily Anthem) | 50% | BUILT (basic) | Done (enhance with Ke.ai music) |
| 7 | Wisdom Giants Network | 25% | NOT BUILT | Medium |
| 8 | "I Got a Guy" Agent Network | 25% | NOT BUILT | Medium |
| 9 | Grace as Ruby's Advocate | 25% | NOT BUILT | Medium |
| 10 | Trust-Building Cadence (14-Day) | 50% | NOT BUILT | HIGH |
| 11 | Financial Stress Detection | 25% | NOT BUILT | HIGH |
| 12 | Payment Psychology / No-Collections | 75% | NOT BUILT | HIGH |
| 13 | Grace's Personality | 75% | PARTIAL | Medium |
| 14 | "Only Maven Can Turn Grace Off" | 100% | NOT BUILT | CRITICAL (Tim) |
| 15 | Future Intensity Dial | 0% | NOT BUILT | Medium |
| 16 | Corner Banker / Guardian Agent | 25% | NOT BUILT | Low |
| 17 | Big Mama / Local Community | 50% | NOT BUILT | Medium |
| 18 | Cooperative Phone Negotiation | 10% | NOT BUILT | Low |
| 19 | Three-Legged Stool Architecture | 25% | NOT BUILT | Low |
| 20 | Union Boss Agent | 0% | NOT BUILT | Low |
| 21 | Blue Seal Initiative | 0% | NOT BUILT | Low |
| 22 | Mom Genie / JOY Rephraser | 0% | NOT BUILT | Low |

### Agent Specs (12 Agents)

| Agent | Spec Location | Race 2 Status |
|---|---|---|
| Vampire Slayer | `/agent-specs/Vampire_Slayer_Agent_Spec.md` | PARTIAL (manual only) |
| Debt Snowball | `/agent-specs/Debt_Snowball_Agent_Spec.md` | NOT BUILT |
| Dignity Score | `/agent-specs/Dignity_Score_Agent_Spec.md` | NOT BUILT |
| Rent Reporting | `/agent-specs/Rent_Reporting_Agent_Spec.md` | NOT BUILT |
| Stage of Life | `/agent-specs/Stage_of_Life_Agent_Spec.md` | NOT BUILT |
| Identity Spectrum | `/agent-specs/Identity_Spectrum_Agent_Spec.md` | NOT BUILT |
| Me Inc | `/agent-specs/Me_Inc_Agent_Spec.md` | NOT BUILT |
| Teach Up | `/agent-specs/Teach_Up_Agent.md` | NOT BUILT |
| Town Crier | `/agent-specs/Town_Crier_Agent_Spec.md` | NOT BUILT |
| North Star Validator | `/agent-specs/North_Star_Validator_Agent_Spec.md` | NOT BUILT |
| Village Intelligence | `/agent-specs/Village_Intelligence_Engine.md` | NOT BUILT |
| Visual Intelligence | `/agent-specs/Visual_Intelligence_Agent_Spec.md` | NOT BUILT |
| **Marketing Genius (NEW)** | **To be created** | **NOT BUILT** |

### Song Strategy Features (8 Features from Song Strategy Brief)

| Feature | Race 2 Status | Gap |
|---|---|---|
| Song Studio (core) | PARTIAL | Missing struggle taxonomy, misery dial, genre selection, pricing |
| Gift Anthem Dedication | NOT BUILT | No sharing/dedication flow |
| Walk in Her Shoes | NOT BUILT | No interactive empathy experience |
| The Anthem Wall | NOT BUILT | No community anthem discovery feed |
| Maven Moments (Dual Anthem) | NOT BUILT | No daily Big Mama's Pick or Village Vote |
| The Swiss Vault (Confessional) | NOT BUILT | No private journaling integrated with Grace |
| The Mood Journal | NOT BUILT | No emotional journey visualization |
| Vinnie/Bert Male Universe | NOT BUILT | No male-specific experience |

---

## Summary Statistics

| Category | Total Imagined | Built | Partial | Not Built |
|---|---|---|---|---|
| Trojan Horse Entry Points | 7 | 0 | 3 | 4 |
| Trust Bridge / Grace | 10 | 1 | 2 | 7 |
| Financial Impact Engine | 13 | 1 | 2 | 10 |
| Community Value | 8 | 0 | 0 | 8 |
| Platform Infrastructure | 8 | 0 | 0 | 8 |
| Innovation Index (#1-#22) | 22 | 0 | 3 | 19 |
| Agent Specs | 13 | 0 | 1 | 12 |
| Song Strategy Features | 8 | 0 | 1 | 7 |
| **TOTAL** | **89** | **2** | **12** | **75** |

---

## Marketing Genius Agent Framework (NEW — Tim's Direction)

The Marketing Genius Agent needs a framework of 30+ strategies organized by channel, audience, and Maven feature. Below is the initial taxonomy of marketing strategies the agent should evaluate and execute.

### Strategy Categories

| Category | Count | Examples |
|---|---|---|
| **Viral/Social** | 6 | Gift Anthem sharing, "Give a Shit" campaign, Walk in Her Shoes challenge, Maven Moments stories, Anthem Wall discovery, Village success stories |
| **Community/Grassroots** | 5 | Church partnerships, food bank referrals, school outreach, community center presence, neighborhood word-of-mouth |
| **Content/SEO** | 5 | "It's expensive to be poor" blog series, financial literacy content, Grace emergency landing pages, Ruby Red story features, podcast appearances |
| **Referral/Growth** | 4 | Member referral rewards, Gift Anthem viral loop, "Bring a neighbor" incentives, Wisdom Giants ambassador program |
| **Email/Nurture** | 4 | Welcome drip sequence, financial win celebrations, Grace check-in summaries, monthly impact reports |
| **Partnerships** | 3 | Blue Seal business partnerships, employer benefit programs, municipal/government partnerships |
| **PR/Media** | 3 | "Give a Shit" PR campaign, poverty cost awareness, Maven impact data releases |
| **Product-Led Growth** | 4 | Free tier with full Grace access, Song Moment as standalone viral product, Vampire Slayer as standalone tool, Budget Builder as standalone tool |
| **TOTAL** | **34** | |

---

## Recommended Race 3 Backlog (Prioritized)

### Sprint 1 — Critical (Tim's Directives)

1. **Grace Persistence Model** — 8-hour snooze, "Grace Never Gets Cut" rule
2. **"Give a Shit" TP Framing** — Update all copy, add subscription context
3. **Original Maven Branding** — Switch to Poppins + Brittany Signature, match color palette
4. **Grace Voice via Ke.ai** — Create Grace's voice, wire TTS into chat responses
5. **Song Moment Music via Ke.ai** — Use music_generation for actual music, not just lyrics

### Sprint 2 — Financial Foundation

6. **Stripe Integration** — Observer/Essentials/Plus tiers
7. **Budget Builder** — The foundation tool all other financial features depend on
8. **Bill Tracker** — Prevents NSF fees, most immediate financial impact
9. **Fee Fighter** — Contests hidden fees, direct dollar savings
10. **Monthly Reality Check** — Grace-guided monthly financial review

### Sprint 3 — Growth & Community

11. **Gift Anthem Dedication** — The viral growth loop
12. **Enhanced Song Studio** — Struggle taxonomy, misery dial, genre selection
13. **Milk Money** — Emergency cash with graduated trust
14. **Marketing Genius Agent Spec** — Framework for 34 strategies
15. **Grace Chat Widget (Floating)** — Available on every page, not just /grace

### Sprint 4 — Depth

16. **Debt Snowball** — PDF battle plan with monthly check-ins
17. **Dignity Score** — The competitive moat
18. **Village Hands** — Community help board
19. **Admin Dashboard** — Operations visibility
20. **Trust-Building Cadence** — 14-day structured sequence

---

## Vault Sources Consulted

| Document | Path |
|---|---|
| Maven Platform Overview | `/maven-app-docs/MAVEN_PLATFORM_OVERVIEW.md` |
| Grace Relationship Intelligence | `/maven-app-docs/Grace_Relationship_Intelligence.md` |
| Grace Brain Audit | `/maven-app-docs/Grace_Brain_Audit.md` |
| Setup and Architecture | `/maven-app-docs/SETUP_AND_ARCHITECTURE.md` |
| Song Strategy Brief | `/briefs/Song_Strategy_Brief.md` |
| Maven Grace Ecosystem Narrative | `/briefs/Maven_Grace_Ecosystem_Narrative_Mar20_2026.md` |
| Grace Operations Brain Dump | `/product-specs/Grace_Maven_Operations_Brain_Dump_Mar20.md` |
| Corner Banker Spec | `/product-specs/Corner_Banker_of_Old_Spec.md` |
| Pulse Product Spec | `/product-specs/Pulse_Product_Spec.md` |
| TP Fulfillment Strategy | `/product-specs/Maven_TP_Fulfillment_Strategy.md` |
| Milk Money Communications | `/product-specs/Milk_Money_Communications_Library.md` |
| Rent Reporting Research | `/product-specs/Rent_Reporting_FrontLobby_Zenbase_Research.md` |
| Blue Seal Initiative Spec | `/product-specs/Blue_Seal_Initiative_Spec.md` |
| All 12 Agent Specs | `/agent-specs/*.md` |
| Maven Innovation Index | `/Maven_Innovation_Index.md` |
| Good Neighbor Barter Architecture | `/innovation-libraries/Good_Neighbor_Barter_Architecture.md` |
| Maven Moment System | `/innovation-libraries/Maven_Moment_System.md` |
| Big Mama Innovation Library | `/innovation-libraries/Big_Mama_Innovation_Library.md` |
| Named Innovation Library | `/innovation-libraries/Named_Innovation_Library.md` |
| Race 1 Platform Spec | `/maven-grace-race-1/maven-grace-platform-spec-v1.json` |
| Race 1 Trojan Horse Entry Points | `/maven-grace-race-1/trojan-horse-entry-points.json` |
| Race 1 Financial Impact Framework | `/maven-grace-race-1/financial-impact-framework.json` |
| Race 1 90-Day Journey | `/maven-grace-race-1/ruby-red-90-day-journey.json` |

---

*Ruby Red is the soul of every decision. It is expensive to be poor. Maven and Grace give a shit. We are trying to change that.*

---

## Race 3 Suggestion Queue (Triaged from Race 3 Completion)

These suggestions were generated at the end of Race 3 and triaged per the recursive build loop protocol:

### Already in Gap Analysis (confirmed addressed or spec exists)
- Stripe subscription tiers — PARTIALLY BUILT in Race 3 (UI + placeholder, no live payment)
- Voice input for Ruby Red — BUILT in Race 3 (browser mic → Whisper → Grace)
- Gift Anthem Dedication — BUILT in Race 3 (share token + shareable link)

### New Items Added to Gap Analysis for Race 4
1. **Stripe live payment processing** — The membership page has tiers and UI but no real Stripe charge. Race 4 must wire Stripe MCP to make payments real.
2. **Gift Anthem viral loop completion** — Share token is created but the recipient landing page (the "someone sent you a song" page) is not yet built.
3. **Budget Builder AI coaching** — Grace should proactively comment on the budget ("Hey, your phone bill is $120/month — that's high. Want me to help you find a cheaper plan?")
4. **Bill NSF dispute script delivery** — The flag is set but the dispute script is not surfaced to Ruby Red in the UI.
5. **Milk Money trust score progression** — Account opens at Rookie but there's no mechanism to earn trust and graduate to Neighbor/Veteran/Elite tiers.
6. **Admin dashboard live data** — The admin page is built but needs real queries wired to the DB.
7. **Grace voice on Song Moment auto-play** — Song Moment requests voice but needs the auto-play trigger wired to the anthem generation completion event.

