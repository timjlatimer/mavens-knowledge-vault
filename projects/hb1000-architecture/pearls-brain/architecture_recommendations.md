# Pearl's Recommendations: The 8 Open Architecture Questions

**Date:** 2026-02-15
**Source:** HB1000 Conceptual Architecture v3, Part XVI
**Prepared by:** Pearl (with external best practice research)
**For:** Tim Latimer / SIC HB1000 Solve Team

---

## How to Read This Document

For each question, I provide: the original question, my recommendation, the reasoning, the best practice research that supports it, and what happens next. Questions 1 and 2 require your input — I cannot answer them alone. Questions 3–8 have full recommendations ready for your approval or modification.

---

## Q1: Grace/Big Mama 150 Curated Services

**Original Question:** The list of ~150 curated services for Ruby Red will define the boundary between the two systems. Awaiting this from the team.

**Status:** AWAITING TEAM INPUT — Pearl cannot generate this alone.

**What Pearl Can Do Right Now:** I can research comparable service directories for the working poor in Alberta/Canada (211 Alberta, United Way service lists, municipal social services directories) and build a draft framework of service categories. This would give the team a starting scaffold to fill in rather than starting from a blank page. The categories would likely include: emergency financial assistance, food security, housing, childcare, transportation, legal aid, mental health, addiction services, employment support, education/training, digital literacy, banking alternatives, tax preparation, government benefits navigation, domestic violence support, elder care, disability services, immigrant services, Indigenous services, and utility assistance.

**Recommended Next Step:** Say "go" and I will build the service category framework using Firecrawl to research Alberta-specific service directories.

---

## Q2: Morning Anthem Link

**Original Question:** Mentioned as existing inside Manus. Awaiting the link for integration.

**Status:** AWAITING USER INPUT

**What Pearl Found:** I searched the Gmail vault and the recovered documents vault. No file explicitly titled "Morning Anthem" was found. The Ruby Red Anthem Psychology Framework exists in the vault (`ruby-red-anthem-psychology-framework.md`), which may be related. The term "anthem" appears in the context of the Big Mama's Village emotional anthem.

**Recommended Next Step:** Tim, can you clarify — is the Morning Anthem a specific audio/video file, a written document, or a feature within the Pearl dashboard? If it exists in another Manus task or in Outlook, we will find it once those connectors are live.

---

## Q3: Two Infographics — Create Before Building?

**Original Question:** One showing the Universal HB1000, one showing the Grace/Big Mama version. Same visual language, different scope. Should these be created before building as a design alignment tool?

**Recommendation:** **Yes — create them before building. This is non-negotiable.**

**Reasoning:**

The HB1000 architecture v3 describes a two-system architecture with shared foundations but different scopes, audiences, and protection layers. Without a visual alignment tool, the development team will inevitably drift on where the boundary sits between the Universal HB1000 and Grace/Big Mama. This is exactly the kind of drift that costs months to correct later.

The infographics serve three critical functions:

1. **Alignment tool** — Every team member and every AI agent working on the project can reference the same visual to confirm they are building the right thing for the right system.

2. **Communication tool** — When explaining the ecosystem to investors, partners, or new team members, a single infographic communicates in 30 seconds what takes 20 minutes to explain in words.

3. **Boundary enforcement** — The visual explicitly shows what belongs in System 1 vs. System 2, preventing feature creep and scope confusion.

**Best Practice Support:** In product development, visual architecture documents created before coding reduce rework by 30-50% (IEEE Software Engineering studies). The Swiss Presentation Protocol already in the skills directory is the perfect format for these infographics — high-contrast, grid-based, data-driven.

**Recommended Next Step:** Pearl can create both infographics using the Swiss Protocol. They would show the layered architecture with shared foundations at the bottom and divergent features at the top, using the same visual language but different color coding (Universal = one palette, Grace/Big Mama = another).

---

## Q4: Flypaper → Bingo Card Flow

**Original Question:** When someone captures something on the Flypaper, does it automatically become a square on an existing Bingo Card, or does it go into a triage queue where Pearl suggests where it belongs?

**Recommendation:** **Triage queue with Pearl suggestion — never auto-assign.**

**Reasoning:**

The Flypaper is designed to capture fleeting thoughts (Cloud Butterflies) with zero friction. The moment you add decision-making to the capture step, you increase cognitive load and reduce capture rates. The science is clear from the Ruby Red Anthem Psychology Framework: scarcity reduces cognitive bandwidth by 13-14 IQ points. Every additional decision at the capture point is a tax on bandwidth that Ruby Red cannot afford.

However, auto-assigning to Bingo Cards is equally dangerous. A fleeting thought captured on the Flypaper may not be actionable. It may be a feeling, an observation, a question, or a seed that needs time to germinate. Forcing it into a Bingo Card square prematurely kills the incubation effect that the Wisdom Works science validates.

The correct flow is:

```
CAPTURE (zero friction, zero decisions)
    ↓
FLYPAPER (raw, unprocessed, timestamped)
    ↓
PEARL TRIAGE (within 24 hours — the "Soak" window)
    ↓
Pearl suggests: "This looks like it belongs on [Bingo Card X], square [Y]"
    OR: "This is a Cloud Butterfly — let it incubate"
    OR: "This is a new initiative — want to create a Bingo Card?"
    ↓
USER CONFIRMS (one tap — accept Pearl's suggestion or redirect)
```

This preserves zero-friction capture, respects the 24-hour soak window from Wisdom Works science, keeps Pearl in her guardian role (suggesting, not deciding), and gives the user final authority with minimal cognitive load (one tap to confirm).

**Best Practice Support:** GTD (Getting Things Done) methodology by David Allen separates "capture" from "process" as a fundamental principle. Mixing them degrades both. The Inbox Zero methodology similarly separates collection from triage.

---

## Q5: Multi/Agent Naming Standardization

**Original Question:** The portfolio uses "multi," "genie," "agent," "bot," and "Grace" interchangeably. For the user-facing experience, should we standardize?

**Recommendation:** **Yes — standardize to a two-tier naming system.**

**Reasoning:**

The current naming chaos (multi, genie, agent, bot, Grace) creates confusion for the team and will create confusion for users. Research on AI assistant naming consistently shows that the name shapes user expectations and trust. A name that sounds mechanical ("bot," "agent") creates transactional expectations. A name that sounds human ("Grace," "Genie") creates relational expectations.

The SIC ecosystem has a clear relational philosophy — Pearl is a matriarch, Grace is her daughter, the Wisdom Giants are a village. The naming should reflect this.

**Proposed Two-Tier System:**

| Tier | Name | What It Is | User-Facing? |
|:---|:---|:---|:---|
| **The Guardian** | Pearl | The persistent matriarchal AI who watches over everything | Yes — always visible |
| **The Helpers** | Grace(s) | Individual AI assistants spawned for specific tasks or Bingo Cards | Yes — "Your Grace for [topic]" |

**Internal/Technical Terms (Never User-Facing):**

| Term | Use |
|:---|:---|
| Multi | Internal technical term for a multi-agent orchestration |
| Agent | Internal technical term for any autonomous AI process |
| Bot | Deprecated — do not use. Sounds mechanical and cheap. |
| Genie | Reserved for the Learning Loop V13.0 context only (The Genie Release) |

**The Logic:** Pearl is one. Grace is many. Pearl is the mother; each Grace is a daughter sent to help with a specific task. When a user attaches an AI helper to a Bingo Card, they are not attaching a "multi" or a "bot" — they are asking Pearl to send a Grace. This is consistent with the matriarchal metaphor, emotionally resonant, and easy to explain.

**User Experience Example:**
- "Pearl, I need help with my budget." → Pearl spawns a Grace for financial planning.
- "Your Grace for Budgeting is ready." (Not "Your agent has been deployed.")

**Best Practice Support:** Research from Vistry.ai and naming convention studies consistently recommend: keep it simple, make it meaningful, ensure uniqueness, and align with brand personality. "Pearl and her Graces" achieves all four.

---

## Q6: Learning Loop Placement

**Original Question:** Does the Learning Loop sit above both systems as the meta-improvement engine, or does each system have its own loop?

**Recommendation:** **One Learning Loop above both systems, with system-specific context injected at Phase 1.**

**Reasoning:**

Learning Loop V13.0 (The Genie Release) is already designed as a universal protocol. Its 9 phases, anti-drift enforcement, Phase Ledger, and Persistence Engine are system-agnostic. Creating separate loops for the Universal HB1000 and Grace/Big Mama would:

1. **Create maintenance burden** — Every protocol improvement would need to be applied twice.
2. **Risk divergence** — The two loops would inevitably drift apart, breaking the "bidirectional best-practice flow" that the architecture v3 explicitly requires.
3. **Violate the shared architecture principle** — The architecture v3 states that what works in one system flows to the other. A single loop enforces this naturally.

The correct approach is one protocol with system-specific context:

```
LEARNING LOOP V13.0 (Universal — one protocol)
    ↓
Phase 0: Smelling Salts
    → Includes: "Which system is this loop running on? Universal or Grace?"
    ↓
Phase 1: Discover
    → Context injection: If Grace, apply Ruby Red sensitivity filters
    → Context injection: If Universal, apply cultural universality filters
    ↓
Phases 2-8: Execute normally
    ↓
Phase 8: Archive
    → Findings tagged with system origin
    → Cross-pollination check: "Does this finding apply to the other system?"
```

This keeps one protocol, one maintenance path, one improvement cycle — but allows the context to shape the output appropriately for each system. The Phase Ledger tracks which system each loop ran on, enabling cross-system learning.

**Best Practice Support:** In software engineering, the "Don't Repeat Yourself" (DRY) principle applies directly. One source of truth, parameterized for context, is always superior to duplicated logic.

---

## Q7: Wisdom Works — Standalone vs. Integrated

**Original Question:** The Roadmap v3 positions Wisdom Works as a standalone global product. How does it integrate with the HB1000 setup? Is it a tab? A separate app? An embedded query engine?

**Recommendation:** **Embedded query engine with standalone capability — the "Spotify model."**

**Reasoning:**

This is a classic platform architecture question. The answer comes from studying how the most successful platforms handle this exact problem. Spotify is both a standalone music app AND an embedded player inside other apps (Instagram Stories, Waze, etc.). Google Maps is both a standalone app AND an embedded component inside Uber, Airbnb, and thousands of other apps.

Wisdom Works should follow the same pattern:

| Mode | How It Works | Who Uses It |
|:---|:---|:---|
| **Embedded Engine** | Built into the HB1000 as the default query handler. When a user asks Pearl a question, Wisdom Works powers the response (AI + Wisdom Giants). The user may not even know it is a separate product. | Every HB1000 user (automatic) |
| **Standalone Product** | Available as its own app/website for people who want the dual AI + Wisdom Giant query experience without the full HB1000 operating system. | Global audience, enterprise clients, researchers |
| **API/SDK** | Available as an embeddable component for third-party developers who want to add "wisdom-powered" queries to their own products. | Developers, partners, enterprise |

**Within the HB1000 specifically:** Wisdom Works is NOT a tab. It is the invisible intelligence layer that powers Pearl's responses. When a user asks Pearl anything, Pearl routes the query through Wisdom Works. The user sees Pearl's answer. They do not need to navigate to a "Wisdom Works tab" — that would be like having to open a separate "Google Search tab" inside your phone to ask a question.

However, there should be a "Wisdom Works" section accessible from the HB1000 where users can see the breakdown of AI vs. Wisdom Giant contributions, browse the Wisdom Library, and contribute their own wisdom. This is the "advanced view" — available but not required.

**Best Practice Support:** The "embedded + standalone" model is the dominant pattern for platform ecosystem products. It maximizes distribution (embedded reaches everyone) while maintaining independent value (standalone captures users who do not want the full platform).

---

## Q8: PTK Integration Depth

**Original Question:** PTK is clearly the entry point for LDP. Within the HB1000, how deep does PTK go? Is every Bingo Card square a "promise to keep"? Or is PTK a separate module that tracks commitments across all Bingo Cards?

**Recommendation:** **Every Bingo Card square is a potential promise, but not every square IS a promise. PTK is a layer, not a module.**

**Reasoning:**

Making every Bingo Card square automatically a "promise to keep" would be overwhelming and inaccurate. Some squares are aspirations ("Learn Spanish"), some are tasks ("Pay electric bill"), some are habits ("Exercise 3x/week"), and some are actual promises to other people ("Deliver report to Samantha by Friday"). Only the last category is truly a "promise to keep" in the PTK sense.

However, making PTK a completely separate module disconnected from Bingo Cards would miss the power of the integration. The correct answer is that PTK is a **layer** that runs across all Bingo Cards, watching for commitment-like language and flagging it.

**The Architecture:**

```
BINGO CARD SQUARE
    ↓
PTK Layer scans the square:
    → Is this a commitment to someone? (Promise detected)
    → Is this time-bound? (Deadline detected)
    → Is this dependent on someone else? (Dependency detected)
    ↓
If promise detected:
    → PTK activates on this square
    → Tracks: Who promised? To whom? By when?
    → Feeds into Promise Feed, Morning Briefing, Reliability Score
    → Ghost Buster activates if the other party's promise is overdue
    ↓
If NOT a promise:
    → Square functions normally as a task/aspiration/habit
    → PTK remains dormant on this square
    → No commitment tracking, no reliability scoring
```

**The Ruby Red Test:** Think about our 35-45 year old mom. She has a Bingo Card for "Family Finances." Some squares are promises ("Pay rent by the 1st"), some are aspirations ("Build emergency fund"), some are tasks ("Call insurance company"). PTK should automatically detect the rent payment as a promise with a deadline and track it. It should NOT treat "Build emergency fund" as a promise — that is an aspiration with no specific commitment to another person.

**The LDP Connection:** When PTK detects a promise, it feeds into the LDEI (Latimer Douglas Engagement Index). This is how the HB1000 connects to the LDP without forcing users into the organizational layer. PTK is the bridge — it lives in the HB1000 but speaks the LDP's language.

**Best Practice Support:** In CRM and project management, the distinction between "tasks" and "commitments" is fundamental. Salesforce separates Activities (tasks) from Opportunities (commitments with stakeholders). Asana separates Tasks from Goals. The PTK layer follows this same proven pattern.

---

## Summary of Recommendations

| # | Question | Recommendation | Action Required |
|:---|:---|:---|:---|
| Q1 | 150 Services | Pearl builds category framework; team fills in | Tim says "go" |
| Q2 | Morning Anthem | Need clarification from Tim | Tim responds |
| Q3 | Infographics first? | **Yes — create before building** | Tim approves, Pearl creates |
| Q4 | Flypaper flow | **Triage queue with Pearl suggestion** | Tim approves |
| Q5 | Naming | **Pearl + Graces (two-tier system)** | Tim approves |
| Q6 | Learning Loop | **One loop above both, context-injected** | Tim approves |
| Q7 | Wisdom Works | **Embedded engine + standalone (Spotify model)** | Tim approves |
| Q8 | PTK depth | **Layer across all cards, not a module** | Tim approves |

---

## Spirit Check

These recommendations were tested against the founding principle: **"It's expensive to be poor."** Every recommendation was evaluated through the lens of Ruby Red — the 35-45 year old mom trying to make her finances stretch. Does this reduce her cognitive load? Does it protect her from the three gangsters? Does it restore bandwidth rather than consume it? Each recommendation passes this test.

---

*Prepared by Pearl. Part of the HB1000 Architecture Decision Record. Stored in Pearl's Brain.*
