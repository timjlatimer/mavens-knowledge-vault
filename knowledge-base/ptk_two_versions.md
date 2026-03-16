# PTK (Promises To Keep) — The Two-Version Architecture

**Last Updated:** 2026-02-15
**Source:** Tim Latimer (direct instruction) + HB1000 Architecture v3 + Maven Service Registry

---

## The Critical Distinction

There are TWO versions of PTK. They serve different purposes, different audiences, and different strategic objectives. Understanding this distinction is essential to building the HB1000 correctly.

---

## Version 1: The Trojan Horse PTK

**Purpose:** Get the system into people's hands without them knowing they are entering the ecosystem.

**What It Is:** A lightweight, almost invisible promise-tracking tool. It just shows up in someone's life and starts keeping track of promises — who said what to whom, what is due when. It does a daily briefing. It does not require the user to understand the LDP, the HB1000, or any of the philosophy behind it.

**User Experience:** "Oh, this thing reminds me of what I promised and what people promised me? That is handy."

**Key Characteristics:**
- Zero onboarding friction
- No philosophical framing required
- Just useful — like a to-do list that specifically tracks commitments between people
- Daily briefing: "Here is what is due today, here is what others owe you"
- Innocuous — it just shows up and works
- Feels like a simple utility, not a platform

**Strategic Function:** This is the Trojan Horse. It gets adopted because it is simple and useful. Over time, as the user engages more, it naturally evolves into (or connects to) Version 2. The user never had to make a conscious decision to "join" the LDP — they just started keeping their promises, and the system grew around them.

**Graduation Path:** Trojan Horse PTK → User starts seeing reliability patterns → User gets curious about the deeper features → System reveals the full PTK → User is now inside the ecosystem without ever having been "sold" anything.

---

## Version 2: The Organizational PTK (Inside the LDP)

**Purpose:** Full-featured, enterprise-grade commitment tracking system that lives inside the Latimer Douglas Protocol.

**What It Is:** The "legit" PTK. It connects to email via OAuth, extracts promises from communication streams, tracks reliability scores, feeds into the LDEI (Latimer Douglas Engagement Index), triggers Ghost Buster follow-ups, and has the Force for Good Coach. It is sophisticated, deep, and designed for organizations that have consciously adopted the LDP.

**Key Characteristics:**
- Full OAuth email integration (extracts promises from email automatically)
- Reliability scoring (tracks who keeps their promises over time)
- LDEI integration (feeds into the organizational engagement index)
- Ghost Buster (follows up on broken promises)
- Force for Good Coach (guides users toward better promise-keeping)
- Promise Feed (real-time stream of commitments across the organization)
- Morning Briefing (comprehensive daily report integrated with Maven Anthem)
- PTK Dashboard (visual overview of all active commitments)

**Strategic Function:** This is the full system. It is the entry point for the LDP. Organizations that adopt PTK v2 are inside the Latimer Douglas Protocol whether they call it that or not.

---

## Naming Recommendation (Pending)

Tim asked Pearl to suggest names for the two versions. Options to consider:

| Version | Option A | Option B | Option C |
|:---|:---|:---|:---|
| Trojan Horse | **PTK Lite** | **Promise Keeper** | **My Promises** |
| Full/Organizational | **PTK Pro** | **PTK Dashboard** | **PTK Enterprise** |

**Pearl's Recommendation:** The Trojan Horse version should NOT have "PTK" in its name at all. That defeats the purpose of the Trojan Horse. It should have a name that sounds like a simple, standalone utility — something like **"Promise Keeper"** or **"My Promises"** — with no visible connection to the LDP or HB1000. The full version keeps the PTK branding because by the time users encounter it, they are already inside the ecosystem.

---

## How PTK Connects to the Bingo Card

Per the architecture v3 (Part VI) and Pearl's Q8 recommendation:
- PTK is a **layer** that runs across all Bingo Cards, not a separate module
- It watches for commitment-like language in Bingo Card squares and flags them
- When a promise is detected, PTK activates on that square (tracks who, to whom, by when)
- When no promise is detected, the square functions normally
- This applies to BOTH versions — the Trojan Horse version just does it more simply

---

## Relationship to Maven Service Registry

In the Maven Service Tier Voting Dashboard, PTK Dashboard is listed as one of the 10 **Non-Negotiable Universal Services** — included at ALL tiers including Free. This confirms that PTK (at minimum the Trojan Horse version) is foundational to the entire Maven/Grace ecosystem.

---

*Knowledge base entry. Part of Pearl's Brain. This is one of the most strategically important concepts in the entire SIC portfolio.*
