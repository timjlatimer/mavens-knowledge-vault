# Maven/Grace Innovation Index

**Document Type:** Living Index — Update Continuously
**Last Updated:** March 20, 2026
**Maintained By:** Maven/Grace Innovation Tracker Agent
**Version:** 1.0 — Founding Entry
**Source Repositories:** `timjlatimer/mavens-knowledge-vault`, `timjlatimer/master-jeeves-brain`

---

## Purpose & Mandate

This is the single source of truth for every innovation in the Maven/Grace platform. Its job is to ensure that as the SIC HB1000 Solve Team builds, no differentiator, "Move 37," or trust-building mechanism is forgotten, deprioritized, or collapsed into a generic feature. The North Star for every entry is **Ruby Red** — the 35–45 year old CFO of the household, working poor, navigating the political, bureaucratic, and greedy capitalist worlds. As the team has said: *"It's expensive to be poor."* We are trying to change that.

This document must be read before any sprint planning, feature scoping, or architectural decision. It is the immune system against drift.

---

## Scoring Methodology

Each innovation is scored on four dimensions, each 0–100.

| Dimension | What It Measures |
|:---|:---|
| **Uniqueness** | How differentiated is this from anything else in the market? 100 = no one has done this for this population. |
| **Impact for Ruby Red** | How profoundly does this change Ruby Red's life, reduce her cognitive load, or restore her dignity? 100 = life-altering. |
| **Technical Complexity** | How difficult is this to build, integrate, and maintain? 100 = frontier engineering. |
| **Build Status** | 0 = Not started, 25 = Conceptual/Designed, 50 = In progress/MVP, 75 = Substantially built, 100 = Live and complete. |

---

## Risk Flag Legend

| Flag | Meaning |
|:---|:---|
| 🚨 **HIGH PRIORITY** | Unique competitive moat — must be protected at all costs |
| ⚠️ **AT RISK: Drift** | Likely to be simplified or abandoned in favour of a generic solution |
| ⚠️ **AT RISK: Complexity** | High technical barrier may cause indefinite deferral |
| ⚠️ **AT RISK: Scale** | Requires community scale before it becomes functional |
| ⚠️ **AT RISK: Legal** | Regulatory or legal complexity may cause avoidance |

---

## Master Scorecard

| # | Innovation Name | Uniqueness | Impact | Complexity | Build Status | Risk Flag |
|:---|:---|:---:|:---:|:---:|:---:|:---|
| 1 | Persistent Ambient Presence | 95 | 90 | 85 | 50 | ⚠️ AT RISK: Drift |
| 2 | Voice-First Interface | 90 | 95 | 80 | 75 | |
| 3 | Conversational Permission Gathering | 95 | 85 | 60 | 50 | |
| 4 | Cross-Session Memory | 85 | 95 | 75 | 75 | |
| 5 | Head Office Intervention Protocol | 100 | 100 | 90 | 25 | ⚠️ AT RISK: Complexity |
| 6 | Song Moment (Daily Anthem) | 95 | 90 | 70 | 50 | |
| 7 | Wisdom Giants Network | 85 | 80 | 65 | 25 | ⚠️ AT RISK: Scale |
| 8 | "I Got a Guy" Agent Network | 90 | 85 | 75 | 25 | |
| 9 | Grace as Ruby's Advocate | 100 | 100 | 90 | 25 | ⚠️ AT RISK: Legal |
| 10 | Trust-Building Cadence (14-Day) | 85 | 90 | 50 | 50 | |
| 11 | Financial Stress Detection Engine | 95 | 95 | 85 | 25 | ⚠️ AT RISK: Complexity |
| 12 | Payment Psychology / No-Collections Model | 100 | 100 | 60 | 75 | |
| 13 | Grace's Personality | 90 | 95 | 70 | 75 | |
| 14 | "Only Maven Can Turn Grace Off" Control Model | 95 | 100 | 40 | 100 | |
| 15 | Future Intensity Dial | 85 | 85 | 60 | 0 | ⚠️ AT RISK: Drift |
| 16 | Corner Banker / Guardian Agent | 95 | 95 | 85 | 25 | |
| 17 | Big Mama / Local Community Reconnection | 90 | 90 | 75 | 50 | |
| 18 | Cooperative Phone Negotiation (Move 37) | 100 | 95 | 80 | 10 | 🚨 HIGH PRIORITY |
| 19 | Three-Legged Stool Architecture | 90 | 95 | 85 | 25 | |

---

## Detailed Innovation Audits

---

### Innovation #1 — Persistent Ambient Presence

**One-Sentence Description:** Grace is an always-on, never-off digital matriarch who proactively monitors Ruby's environment rather than waiting to be summoned.

**Source Documents:** `grace-godmother-protocol-whitepaper-feb12-2026.md`, `pearl-universal-matriarchal-ai-framework-feb12-2026.md`

**What Makes It Unique:** Every other financial app is reactive — it waits for the user to open it. Grace is an ambient agent operating on a proactive "push" model, detecting signals in Ruby's digital environment and acting before she even knows she needs help. This mirrors the role of the great executive assistant who is always watching, always thinking, always ready.

**Why It Matters for Ruby Red:** Ruby's cognitive bandwidth is already depleted by financial scarcity. The last thing she needs is another app she has to remember to open. An ambient presence means Grace catches the NSF before it hits, reminds her of the bill before it's late, and checks in before the crisis becomes a catastrophe.

**Build Status Notes:** The conceptual architecture is fully documented. The scheduled heartbeat mechanism (recurring tasks) is available in the Manus platform. True ambient presence on a mobile device requires OS-level integration that is not yet built.

**Risk:** High. AI development teams default to reactive chat interfaces because they are dramatically easier to build. The ambient model requires persistent background processes, proactive triggers, and a fundamentally different architecture. Without explicit protection in the roadmap, this innovation will be collapsed into a standard chatbot.

| Score | Value |
|:---|:---:|
| Uniqueness | 95 |
| Impact for Ruby Red | 90 |
| Technical Complexity | 85 |
| Build Status | 50 |

**Risk Flag:** ⚠️ AT RISK: Drift — Must be explicitly protected in every sprint plan.

---

### Innovation #2 — Voice-First Interface

**One-Sentence Description:** Grace speaks and listens in dialect-specific, natural language, restoring cognitive bandwidth by eliminating the need for complex UI navigation.

**Source Documents:** `grace-mavens-ai-assistant-project-context.md`, `best-practice-junkies-move37-future-planning.md`

**What Makes It Unique:** The World Economic Forum identifies voice-first, dialect-specific AI as one of the most impactful tools for financial inclusion. Grace does not just speak — she speaks the language of Ruby Red, including the specific dialects and linguistic patterns of the working poor. This is not a feature; it is a declaration that we see and hear our users in their own voice.

**Why It Matters for Ruby Red:** Ruby is on her phone, stressed, with limited time. Reading walls of text is a cognitive tax she cannot afford. Voice removes the friction entirely. A warm, familiar voice is also psychologically safer than a cold interface for someone who has been burned by financial systems.

**Build Status Notes:** Voice capabilities (ElevenLabs, "Jessica" voice profile) are active in the live Grace application. Dialect-specific tuning is in progress. The voice model uses `eleven_turbo_v2_5` with settings optimized for warmth and naturalness.

| Score | Value |
|:---|:---:|
| Uniqueness | 90 |
| Impact for Ruby Red | 95 |
| Technical Complexity | 80 |
| Build Status | 75 |

---

### Innovation #3 — Conversational Permission Gathering

**One-Sentence Description:** Grace obtains consent through natural, empathetic dialogue rather than sterile, cognitive-load-heavy checkboxes and terms-of-service walls.

**Source Documents:** `The Maven Guardian: A Learning Loop Analysis (V4).md`, `grace-mavens-ai-assistant-project-context.md`

**What Makes It Unique:** The standard industry approach to data consent is a legal document designed to protect the company, not the user. Grace's approach is a conversation: *"I can be much more helpful to you if I can see your calendar. Is that okay with you? You can turn it off at any time."* This is trust-building, not compliance theatre.

**Why It Matters for Ruby Red:** Ruby has been burned by systems that buried harmful terms in fine print. A conversational permission model treats her as an intelligent adult, explains the value exchange clearly, and gives her genuine control. This is the technical implementation of the SAMHSA Trustworthiness principle.

**Build Status Notes:** The conversational intake model is partially implemented. Mapping conversational consent to legal/compliance requirements (PIPEDA in Canada, GDPR-adjacent principles) remains an open design challenge.

| Score | Value |
|:---|:---:|
| Uniqueness | 95 |
| Impact for Ruby Red | 85 |
| Technical Complexity | 60 |
| Build Status | 50 |

---

### Innovation #4 — Cross-Session Memory

**One-Sentence Description:** Grace remembers Ruby's family, struggles, goals, and history forever, building a genuine relationship rather than treating every interaction as a new ticket.

**Source Documents:** `maven-ai-team-brief.md`, `The Maven + Cashco Guardian: The Definitive Master Document (V7).md`

**What Makes It Unique:** The "Life Ledger" — a private, shared history of Ruby's journey — is a foundational competitive moat. Relationships cannot be copied. Technology can. The depth of memory Grace accumulates over months and years creates an insurmountable switching cost built on genuine gratitude, not lock-in.

**Why It Matters for Ruby Red:** Being remembered is a profound act of respect for someone who is routinely ignored by systems. When Grace says "I remember you mentioned your daughter's birthday is next week — how are you feeling about the budget for that?" it signals that Ruby is a person, not a case number.

**Build Status Notes:** The 5-table relationship memory schema is designed and partially implemented in the Maven V2 codebase. The 11-table Grace Brain architecture is in place.

| Score | Value |
|:---|:---:|
| Uniqueness | 85 |
| Impact for Ruby Red | 95 |
| Technical Complexity | 75 |
| Build Status | 75 |

---

### Innovation #5 — Head Office Intervention Protocol

**One-Sentence Description:** Grace initiates three-way advocacy interactions — calling creditors, landlords, or government agencies on Ruby's behalf to negotiate, advocate, and fight the bureaucratic world.

**Source Documents:** `briefs/polsia-ai-assessment.md`, `projects/cashco/loan-bot/` (Guardian Lifecycle docs)

**What Makes It Unique:** No financial app fights for its users. They provide information; they do not take action. Grace as a genuine advocate — one who will sit on hold with the phone company, draft the letter to the landlord, or navigate the government benefits portal — is a category-defining capability.

**Why It Matters for Ruby Red:** Ruby is navigating three hostile systems (political, bureaucratic, capitalist) with depleted cognitive bandwidth. Having an AI who will do the fighting for her is not a convenience feature — it is a fundamental shift in power dynamics.

**Build Status Notes:** Not started (25%). The advocacy philosophy is fully documented. The technical implementation requires AI agents capable of browser automation, phone tree navigation, and document drafting.

**Risk:** High. The technical complexity of building an AI that can reliably navigate real-world bureaucratic systems is significant. This innovation may be indefinitely deferred unless explicitly protected.

| Score | Value |
|:---|:---:|
| Uniqueness | 100 |
| Impact for Ruby Red | 100 |
| Technical Complexity | 90 |
| Build Status | 25 |

**Risk Flag:** ⚠️ AT RISK: Complexity — Must be on the roadmap with a defined phase, not left as a "future vision."

---

### Innovation #6 — Song Moment (Daily Anthem)

**One-Sentence Description:** A behavioral intervention system disguised as a creative tool that generates a personalized empowerment song from Ruby's daily struggles, using music to restore cognitive bandwidth and build narrative identity.

**Source Documents:** `ruby-red-anthem-psychology-framework.md`, `pearl/the-pearl-canon-v1.md`

**What Makes It Unique:** The Daily Anthem is not a music app. It is a seven-mechanism behavioral intervention system grounded in narrative identity theory (McAdams), habit formation (Duhigg/Clear), self-determination theory (Deci & Ryan), and music therapy research. The "misery dial" (1–99), struggle selection, and AI-generated personalized song create a redemption sequence generator that transforms suffering into something beautiful.

**Why It Matters for Ruby Red:** Poverty is not just a financial condition — it is a cognitive one. Mullainathan and Shafir demonstrated that financial scarcity reduces cognitive bandwidth by the equivalent of 13–14 IQ points. The Daily Anthem restores bandwidth by giving Ruby a daily moment of agency, a daily act of naming her struggle, and a daily reminder that her story is one of resilience, not defeat.

**Build Status Notes:** The psychological framework is fully documented. The "Song Studio" module is referenced in the Maven codebase. Music generation API integration (e.g., Suno) is required.

| Score | Value |
|:---|:---:|
| Uniqueness | 95 |
| Impact for Ruby Red | 90 |
| Technical Complexity | 70 |
| Build Status | 50 |

---

### Innovation #7 — Wisdom Giants Network

**One-Sentence Description:** A structured system for querying both documented knowledge and the crystallized, lived intelligence of community elders and peer experts who have navigated the same challenges as Ruby.

**Source Documents:** `knowledge-base/WISDOM_GIANTS.md`, `master-jeeves-brain/KNOWLEDGE.md`, `master-jeeves-brain/DIRECTIVES.md`

**What Makes It Unique:** Wisdom Works distinguishes between "fossilized intelligence" (searchable, scalable AI data) and "crystallized intelligence" (the deep, lived experience of human experts that has never been written down). The Wisdom Giants network provides a structured process for querying both simultaneously — something no competitor has attempted for this population.

**Why It Matters for Ruby Red:** The person who has navigated a landlord dispute, survived a bankruptcy, or rebuilt credit after a crisis has knowledge that no database contains. Ruby needs access to that wisdom, not just generic financial advice.

**Build Status Notes:** Conceptual (25%). Defined in Master Jeeves directives. Requires a critical mass of community members to become operational.

**Risk:** Medium. Requires community scale before the network delivers meaningful value.

| Score | Value |
|:---|:---:|
| Uniqueness | 85 |
| Impact for Ruby Red | 80 |
| Technical Complexity | 65 |
| Build Status | 25 |

**Risk Flag:** ⚠️ AT RISK: Scale — Chicken-and-egg problem. Must be designed for low-volume operation from day one.

---

### Innovation #8 — "I Got a Guy" Agent Network

**One-Sentence Description:** Grace acts as the community connector who always knows someone for something, bridging Ruby's needs to verified local and digital resources the way small communities did before big data destroyed those connections.

**Source Documents:** `master-jeeves-brain/KNOWLEDGE.md` (DIR-017), `master-jeeves-brain/DIRECTIVES.md`

**What Makes It Unique:** The "I Got a Guy" concept references how small communities operated before the internet — where everyone knew a mechanic, a lawyer, a nurse, a contractor who would give you a fair deal because you were part of the community. Grace rebuilds that network digitally, with verified resources and personal guidance rather than anonymous Yelp reviews.

**Why It Matters for Ruby Red:** Ruby does not need a search engine. She needs a trusted friend who says "I know someone who can help you with that, and they won't rip you off." The Village Rolodex (verified community resources with personal guidance) is the technical implementation.

**Build Status Notes:** Conceptual (25%). Referenced in the Tiger21 Corner Banker spec as "Village Rolodex."

| Score | Value |
|:---|:---:|
| Uniqueness | 90 |
| Impact for Ruby Red | 85 |
| Technical Complexity | 75 |
| Build Status | 25 |

---

### Innovation #9 — Grace as Ruby's Advocate

**One-Sentence Description:** Grace actively fights for Ruby against the three gangster worlds — negotiating fees, navigating government systems, and drafting communications on her behalf.

**Source Documents:** `briefs/polsia-ai-assessment.md`, `The Maven + Cashco Guardian: The Definitive Master Document (V7).md`

**What Makes It Unique:** The Polsia assessment identified that AI negotiation capabilities — demonstrated in VC contexts — could be adapted to help Ruby negotiate with employers, landlords, and creditors. An AI agent that researches comparable wages, prepares negotiation scripts, and drafts professional communications could meaningfully shift the power dynamic in negotiations that Ruby currently enters at a severe disadvantage.

**Why It Matters for Ruby Red:** Ruby enters every negotiation at a disadvantage: less time, less knowledge, less power. Grace as an advocate levels the playing field. The "Tenant Shield" (paralegal hotline for housing disputes) and "Bill Negotiator" (Maria calls, waits on hold, negotiates for you) are early implementations of this principle.

**Build Status Notes:** Conceptual (25%). Legally and technically complex.

**Risk:** High. Regulatory risk around AI acting as a legal or financial representative requires careful scoping.

| Score | Value |
|:---|:---:|
| Uniqueness | 100 |
| Impact for Ruby Red | 100 |
| Technical Complexity | 90 |
| Build Status | 25 |

**Risk Flag:** ⚠️ AT RISK: Legal — Requires explicit legal scoping before build. Must not be abandoned due to complexity.

---

### Innovation #10 — Trust-Building Cadence (14-Day)

**One-Sentence Description:** A structured relationship-deepening sequence in which Grace proves her value through radical generosity before any financial ask is made, building the foundation of an unbreakable relationship.

**Source Documents:** `The Maven + Cashco Guardian: The Definitive Master Document (V7).md`, `Maven Guardian Lifecycle: Path B (The Denied Applicant).md`

**What Makes It Unique:** The "First-Keystroke Awakening" — where Grace materializes the moment Ruby starts typing — and the subsequent 14-day cadence of proactive value delivery (coaching, resources, celebration of micro-wins) is the opposite of every other financial app's onboarding, which immediately demands sensitive information and asks for payment.

**Why It Matters for Ruby Red:** Ruby has been burned by systems that promised help and delivered exploitation. Trust must be earned, not assumed. The 14-day cadence is the technical implementation of the Law of Reciprocity: give generously without expectation of return, and loyalty follows.

**Build Status Notes:** In progress (50%). The protocol is defined in the Guardian Master Document. The Maven V2 onboarding flow is being redesigned around this principle.

| Score | Value |
|:---|:---:|
| Uniqueness | 85 |
| Impact for Ruby Red | 90 |
| Technical Complexity | 50 |
| Build Status | 50 |

---

### Innovation #11 — Financial Stress Detection Engine

**One-Sentence Description:** Grace monitors Ruby's financial patterns (with explicit permission) to predict crises like NSFs 2–3 days before they occur and intervenes proactively.

**Source Documents:** `Tiger21_Comprehensive_Background.md` (Corner Banker / Guardian System), `maven-pricing-strategy-v2.md`

**What Makes It Unique:** The "Shield" — the NSF prediction and prevention engine — uses a 90-day trailing budget analysis to calculate a "Safe to Spend" number and proactively intervenes with a micro-advance before the NSF fee hits. This converts a $45 NSF fee into a $0.10 interest charge. The "breathing shield animation" when active communicates "I'm watching" without requiring Ruby to check.

**Why It Matters for Ruby Red:** NSF fees are one of the most brutal expressions of "it's expensive to be poor." A $5 coffee becomes a $35 mistake. The stress detection engine intercepts this cascade before it begins, saving Ruby both money and the cognitive devastation of discovering the damage after the fact.

**Build Status Notes:** Conceptual (25%). Requires deep integration with banking APIs (Plaid, Flinks, or Zum Rails) and high predictive accuracy.

**Risk:** High. Banking API integration is complex, and predictive accuracy must be extremely high to avoid false positives that erode trust.

| Score | Value |
|:---|:---:|
| Uniqueness | 95 |
| Impact for Ruby Red | 95 |
| Technical Complexity | 85 |
| Build Status | 25 |

**Risk Flag:** ⚠️ AT RISK: Complexity — Must be on the roadmap with a defined phase.

---

### Innovation #12 — Payment Psychology / No-Collections Model

**One-Sentence Description:** A radical pricing and operational model in which there are no collections, no penalties, and no shame — "step-downs" absorb failed payments while Grace remains fully active.

**Source Documents:** `maven-pricing-strategy-v2.md`, `MAVEN_PROJECT.md`

**What Makes It Unique:** Every other financial service terminates or degrades service when payment fails. Maven's step-down model does the opposite: it opens a smaller door, then a smaller one, and if all else fails, says "You're still a member of the Village. Grace is still here. Come back when you can." The step-down IS the resolution. There is nothing to pay back on membership.

**Why It Matters for Ruby Red:** Collections calls are one of the most traumatic experiences in the working poor's financial life. They are also counterproductive — they destroy the relationship that is the only path to long-term loyalty and repayment. The no-collections model is both ethically correct and strategically superior.

**Build Status Notes:** Substantially built (75%). The logic is fully mapped in the Maven Pricing Strategy V2 document and is reflected in the codebase.

| Score | Value |
|:---|:---:|
| Uniqueness | 100 |
| Impact for Ruby Red | 100 |
| Technical Complexity | 60 |
| Build Status | 75 |

---

### Innovation #13 — Grace's Personality

**One-Sentence Description:** A warm, funny, matriarchal AI hyper-specialized in the working poor, replacing the sterile corporate tone of traditional financial apps with a voice that feels like a trusted neighbor.

**Source Documents:** `grace-mavens-ai-assistant-project-context.md`, `The Maven + Cashco Guardian: The Definitive Master Document (V7).md`

**What Makes It Unique:** Grace is not a chatbot with a friendly tone. She is a character — with a simulated life, a sense of humor, a specific communication style, and a deep specialization in the emotional and financial reality of the working poor. The Personality Harmonization Engine matches Ruby with the archetype (Warm Hearth, Straight Shooter, Steady Rock, Watchful Owl, Sparkplug, Guardian) that will resonate most with her communication style.

**Why It Matters for Ruby Red:** People don't care how much you know until they know how much you care. A personality that feels genuine, warm, and non-judgmental is the prerequisite for every other innovation on this list. Without it, Ruby will not engage long enough for the relationship to form.

**Build Status Notes:** In progress (75%). System prompts, voice profiles (ElevenLabs "Jessica"), and conversation protocols are actively being refined. User feedback from Samantha Meunier confirms the warmth is landing.

| Score | Value |
|:---|:---:|
| Uniqueness | 90 |
| Impact for Ruby Red | 95 |
| Technical Complexity | 70 |
| Build Status | 75 |

---

### Innovation #14 — "Only Maven Can Turn Grace Off" Control Model

**One-Sentence Description:** A foundational business rule — "Grace Never Gets Cut" — ensuring that financial failure never results in the loss of the AI relationship, because Grace is not a feature, she is the relationship.

**Source Documents:** `maven-pricing-strategy-v2.md`, `MAVEN_PROJECT.md`

**What Makes It Unique:** Every other subscription service terminates its core value when payment fails. Maven's model inverts this entirely. Grace remains fully available — full voice, full text, full memory, full empathy — at every tier, including Free. The only entity that can modify Grace's availability is Maven itself, not Ruby's payment status.

**Why It Matters for Ruby Red:** The moment Ruby loses access to Grace because she missed a payment is the moment Maven becomes just another system that punishes her for being poor. "Grace Never Gets Cut" is the single most important trust signal in the entire platform.

**Build Status Notes:** Complete (100%). This is a foundational, non-negotiable business rule embedded in the pricing architecture.

| Score | Value |
|:---|:---:|
| Uniqueness | 95 |
| Impact for Ruby Red | 100 |
| Technical Complexity | 40 |
| Build Status | 100 |

---

### Innovation #15 — Future Intensity Dial

**One-Sentence Description:** A user-controlled dial (1–99) allowing Ruby to set Grace's level of presence and intervention based on her current cognitive load and emotional capacity.

**Source Documents:** `pearl/the-pearl-canon-v1.md` ("misery dial"), `grace-godmother-protocol-whitepaper-feb12-2026.md` (Autonomy Spectrum)

**What Makes It Unique:** The autonomy spectrum — from Full HITL to Full Autonomy — is designed to grow as trust deepens. The intensity dial gives Ruby the inverse control: the ability to say "I need you to back off today" or "I need you to be more present this week." This is the technical implementation of trauma-informed design's Empowerment principle — giving Ruby ultimate control over her own experience.

**Why It Matters for Ruby Red:** Ruby's cognitive bandwidth fluctuates dramatically. On a bad week, even a helpful check-in can feel overwhelming. On a good week, she may want Grace to be more proactive. A fixed-intensity AI that cannot adapt to her current state will eventually feel like another system imposing on her.

**Build Status Notes:** Not started (0%). The concept is referenced in the Pearl Canon V1 as the "misery dial."

**Risk:** High. This is easily dismissed as a "nice to have" UX feature, but it is a critical trauma-informed design requirement. Without it, Grace risks becoming another source of cognitive load rather than a reliever of it.

| Score | Value |
|:---|:---:|
| Uniqueness | 85 |
| Impact for Ruby Red | 85 |
| Technical Complexity | 60 |
| Build Status | 0 |

**Risk Flag:** ⚠️ AT RISK: Drift — Must be included in V2 design specs, not deferred to V3.

---

### Innovation #16 — The Corner Banker / Guardian Agent

**One-Sentence Description:** A dedicated AI agent that acts as Ruby's personal relationship banker — the one that used to exist on every corner — holding NSF checks, coaching finances, and advocating for Ruby in tandem with Grace.

**Source Documents:** `Tiger21_Comprehensive_Background.md`, `knowledge-base/WISDOM_GIANTS.md`

**What Makes It Unique:** The Corner Banker operates on the "Big Data Flip" principle: using community intelligence to rescue clients rather than exploit them. Banks abandoned this market 60+ years ago. The Corner Banker restores the personal banker relationship — complete with a named banker (e.g., "Maria Chen — Your Guardian since March 2025"), a weekly check-in, and a running ledger of "Total fees blocked: $387 | Hours on hold for you: 3.5."

**Why It Matters for Ruby Red:** Ruby has never had a banker who knew her name. The Corner Banker gives her the same personalized financial advocacy that wealthy clients receive from private banks — at a price point she can afford.

**Build Status Notes:** Conceptual (25%). Detailed design is complete in the Tiger21 specs. Technology build is required. Grace and the Corner Banker are designed to work in tandem — Grace is the relationship layer, the Corner Banker is the financial protection layer.

| Score | Value |
|:---|:---:|
| Uniqueness | 95 |
| Impact for Ruby Red | 95 |
| Technical Complexity | 85 |
| Build Status | 25 |

---

### Innovation #17 — Big Mama / Local Community Reconnection

**One-Sentence Description:** Big Mama reconnects Ruby to her physical neighbors, mutual aid networks, and local village — acting as a structured antidote to the social isolation caused by phone dependency and digital fragmentation.

**Source Documents:** `knowledge-base/big_mamas_village.md`, `MAVEN_PROJECT.md`, `pearl/the-pearl-canon-v1.md`

**What Makes It Unique:** Every other platform drives engagement by keeping users on the platform. Big Mama's goal is the opposite: to reconnect Ruby to the physical world around her. The Village Angels (winter shoveling, lawn mowing, safety checks), the Pay It Forward system, and the Gratitude Loop are all mechanisms for rebuilding the physical community fabric that used to exist before digital isolation.

**Why It Matters for Ruby Red:** The research is clear: social isolation is a health crisis for the working poor. Big Mama's Village is not a social media platform — it is a community restoration project. The "it takes a village" philosophy is the antidote to the atomization that makes poverty more expensive and more dangerous.

**Build Status Notes:** In progress (50%). The Village concept and service stack are well-defined. Physical community bridging mechanisms are in development.

| Score | Value |
|:---|:---:|
| Uniqueness | 90 |
| Impact for Ruby Red | 90 |
| Technical Complexity | 75 |
| Build Status | 50 |

---

### Innovation #18 — Cooperative Phone Negotiation (Move 37)

**One-Sentence Description:** Maven uses collective data from 1,000+ recruited Rubies to negotiate a better phone rate for all of them with the phone company — a cooperative union of phone users where Grace is intrinsically motivated to help Ruby recruit others because more members means better rates for everyone.

**Source Documents:** `Tiger21_Comprehensive_Background.md` (Leg 1: Always Connected), `briefs/best-practice-junkies-move37-future-planning.md`

**What Makes It Unique:** This is a genuine Move 37 — a move so unexpected it changes the game. No one has built a cooperative phone negotiation model for the working poor. The mechanics are elegant: Grace helps Ruby recruit other Rubies not because Maven wants growth, but because every new member lowers everyone's phone bill. The incentive is aligned with Ruby's interests, not Maven's. This creates a viral growth engine that is also a genuine act of community solidarity.

**Why It Matters for Ruby Red:** The phone bill is one of the most significant and unavoidable expenses for the working poor. It is also one of the most predatory — carriers charge more for prepaid plans (used by the unbanked) than for postpaid plans (used by those with credit). Collective bargaining flips this dynamic entirely.

**Build Status Notes:** Conceptual (10%). The "Always Connected" leg of the Three-Legged Stool is planned for Phase 4 (Month 12–18) in the Tiger21 specs. The cooperative negotiation mechanic is a new addition that must be designed into the architecture from the beginning.

**Risk:** 🚨 **HIGH PRIORITY.** This is a unique competitive moat that has never been built for this population. It requires complex business development (carrier negotiations), legal structuring (cooperative or collective bargaining framework), and technical architecture (member data aggregation with privacy protection). The risk is that it gets deferred indefinitely because it is complex and does not fit neatly into a standard software sprint. It must be protected.

| Score | Value |
|:---|:---:|
| Uniqueness | 100 |
| Impact for Ruby Red | 95 |
| Technical Complexity | 80 |
| Build Status | 10 |

**Risk Flag:** 🚨 **HIGH PRIORITY — Unique Competitive Moat. Must be on the roadmap with a named owner and a defined Phase 4 milestone.**

---

### Innovation #19 — Three-Legged Stool Architecture

**One-Sentence Description:** The entire platform is built on three consolidated legs — Corner Banker (financial advocacy), Big Mama (community connection), and Phone/Digital Citizenship (staying connected to the modern world) — originally three separate subscription services, now unified into one.

**Source Documents:** `Tiger21_Comprehensive_Background.md`, `MAVEN_PROJECT.md`

**What Makes It Unique:** The consolidation of three services that Ruby needs — financial protection, community belonging, and digital access — into a single, integrated platform is the "Amazon for the Left Out, Left Behind, and Working Poor." No competitor integrates all three. Propel does financial. Pi AI does companionship. No one does phone. No one does all three together.

**Why It Matters for Ruby Red:** Ruby does not experience her life in silos. Her financial stress affects her community relationships. Her phone bill affects her ability to access financial services. Her social isolation affects her financial decision-making. A platform that addresses all three simultaneously — with a single relationship (Grace) at the center — is fundamentally more powerful than three separate apps.

**Build Status Notes:** Conceptual (25%). The strategic vision is clear in the Tiger21 specs. Technical consolidation is pending. The three legs were originally designed as separate subscription services ($49.95 + $24.95–$69.95 + $19.95/month) and are now being consolidated into a unified platform.

| Score | Value |
|:---|:---:|
| Uniqueness | 90 |
| Impact for Ruby Red | 95 |
| Technical Complexity | 85 |
| Build Status | 25 |

---

## Build Status Summary

| Status | Count | Innovations |
|:---|:---:|:---|
| 🟢 Complete (100) | 1 | #14 |
| 🟡 Substantially Built (75) | 3 | #2, #4, #12 |
| 🟡 In Progress / MVP (50) | 5 | #1, #3, #6, #10, #17 |
| 🔴 Conceptual / Designed (25) | 8 | #5, #7, #8, #9, #11, #16, #18, #19 |
| 🔴 Not Started (0–10) | 2 | #13 (75), #15, #18 |

> **Note:** #13 (Grace's Personality) is in progress at 75 and is not at risk. #15 (Intensity Dial) and #18 (Cooperative Phone Negotiation) are the two most critical not-started innovations.

---

## Risk Register

| # | Innovation | Risk Type | Risk Description | Mitigation |
|:---|:---|:---|:---|:---|
| 1 | Persistent Ambient Presence | Drift | Will be simplified to reactive chatbot | Explicit roadmap protection; ambient architecture decision in Phase 1 |
| 5 | Head Office Intervention Protocol | Complexity | Technical barrier causes indefinite deferral | Define a Phase 3 milestone; start with document drafting before live calls |
| 7 | Wisdom Giants Network | Scale | Requires community scale to function | Design for low-volume operation; seed with 5–10 founding Wisdom Giants |
| 9 | Grace as Advocate | Legal | Regulatory risk around AI representation | Legal scoping in Phase 1; start with document drafting and coaching |
| 11 | Financial Stress Detection Engine | Complexity | Banking API integration complexity | Partner with Zum Rails (contract negotiated); define Phase 2 milestone |
| 15 | Future Intensity Dial | Drift | Dismissed as "nice to have" | Include in V2 design specs; trauma-informed design requirement |
| 18 | Cooperative Phone Negotiation | Deprioritization | Complex BD/legal work deferred indefinitely | Named owner, Phase 4 milestone, carrier outreach in Phase 1 |

---

## How to Use This Document

This index is a living document. It must be updated:

1. **Before every sprint** — Check the Build Status column. Any innovation at 0–25 that is not on the current sprint plan must be explicitly acknowledged and either scheduled or risk-flagged.
2. **After every build milestone** — Update the Build Status score for any innovation that advanced.
3. **When new innovations are identified** — Add a new row to the Master Scorecard and a new Detailed Audit section. Assign a number sequentially.
4. **When a risk materializes** — Update the Risk Register and escalate to the CVO.

The Persistence Engine principle applies here: if you cannot update this document with real data after a sprint, the sprint did not protect the innovations. This document is the platform's immune system against drift.

---

*"It's expensive to be poor. We think that's a crime in society, and we're trying to change it."*

*— SIC HB1000 Solve Team*

---

**Document Sources:**
- `timjlatimer/mavens-knowledge-vault` — Grace Godmother Whitepaper, Maven Pricing Strategy V2, Tiger21 Comprehensive Background, Ruby Red Anthem Psychology Framework, Maven AI Team Brief, Cloud Butterfly Grace Protocol, Best Practice Junkies / Move 37 Brief, Pearl Canon V1, Maven Project Knowledge Base, Big Mama's Village Knowledge Base
- `timjlatimer/master-jeeves-brain` — KNOWLEDGE.md (Wisdom Giants, I Got a Guy), DIRECTIVES.md
