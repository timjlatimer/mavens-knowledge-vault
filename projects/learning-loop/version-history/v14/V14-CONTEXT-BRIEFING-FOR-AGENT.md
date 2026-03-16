# V14 Context Briefing — For the Manus Agent

**Purpose:** This document gives you context about the Learning Loop Protocol V14 (The Crystallizer) so you understand the WORLD you are building for. You are NOT expected to follow this protocol step-by-step. You are expected to understand it so your app fits naturally into the ecosystem.

---

## How to Use This Document

**DO:** Read this to understand the vocabulary, the philosophy, the team structure, and the data model. When you build the Flytrap app, the categories, tags, and initiative names should match what's described here.

**DO NOT:** Treat this as a step-by-step instruction manual for your build process. The V14 protocol is what the TEAM runs when they're working on initiatives. Your app is a TOOL that feeds INTO that process — specifically into Phase 1 (Context Crystallization) and the Cloud Butterfly capture system.

**Think of it this way:** V14 is the recipe. Your app is one of the ingredients. You need to know the recipe to be the right ingredient, but you don't need to cook the whole meal.

---

## The SIC HB1000 Solve Team

The team operates as a **hive mind** of subject matter experts. Each member is a **"Wisdom Giant"** in their domain. The team culture is built on being **"best practice junkies and best practice innovators"** — always seeking to learn and improve.

**SIC** stands for **Social Impact Capitalism** — the belief that profit and purpose are force multipliers when combined correctly.

**Tim Latimer** is the Chief Visionary Officer (CVO) and the primary source of Cloud Butterflies. He generates ideas constantly — in conversations, in emails, during early morning brainstorming sessions. Your app's primary job is to make sure none of those ideas are lost.

---

## Ruby Red — Who We Solve For

Everything the team builds is ultimately measured against one person: **Ruby Red**. She is the 35-45 year old mother of two who is the CFO of her household, trying to make finances stretch to the next payday. She represents the working poor, the unbanked and underbanked, the left out and left behind.

> "It's expensive to be poor." — The team considers this a crime in society and is trying to change it.

The team's superpower is **empathy**, practiced with a sense of "there but for the grace of God go I."

Your app serves the TEAM, not Ruby Red directly. But the team's butterflies should ultimately serve her. This context matters for understanding why certain ideas get tagged with certain initiatives.

---

## The Initiative Portfolio

These are the active initiatives that butterflies may relate to. Use these as `initiative` values when submitting:

| Initiative | Description |
|-----------|-------------|
| **Maven** | Service marketplace (~150 curated services) for Ruby Red, structured as a Data Cooperative |
| **Grace** | Pearl's daughter — the warm, empathetic AI front door that Ruby Red talks to |
| **CashCo** | Financial services arm — Guardian Banker, Pawn Princess |
| **Effn Duck** | Three-layer Trojan Horse: fun rubber duck (surface) → mental health intervention (deeper) → life transformation (deepest) |
| **Digger Cafe** | Community gathering space for families |
| **Seba Hub** | Community hub and resource center |
| **Cedar Beach** | Small business incubation project |
| **LDP** | Latimer Douglas Protocol — integrity operating system for organizations |
| **PTK** | Promises To Keep — commitment tracking system (entry point for LDP) |
| **Pearl** | The Mother of All Graces — the universal AI guardian framework |
| **HB1000** | The Human Brilliance 1000 — operating system for being human |

---

## The PEARL Diamond (3D Visualization)

The Learning Loop Mission Control has a 3D interactive diamond model with 10 rings. When butterflies are submitted, they can optionally be tagged with a `ringIndex` to place them spatially in the diamond. The rings are:

| Index | Ring | What Lives There |
|-------|------|-----------------|
| 0 | HB1000 Core | Central operating system concepts |
| 1 | Initiatives | Active projects (Maven, Effn Duck, etc.) |
| 2 | Bingo Cards | Task/goal worksheets per initiative |
| 3 | Cloud Butterflies | Ideas and insights (your app feeds here) |
| 4 | News & Comms | Meeting notes, standups, announcements |
| 5 | KPIs & Metrics | Performance tracking |
| 6 | Source of Truth | Verified facts, keeper assignments |
| 7 | QA & Regulatory | Compliance considerations |
| 8 | Swarm Intelligence | Collective analysis |
| 9 | North Star | Mission alignment |

Most butterflies from the Flytrap app will naturally land in ring 3 (Cloud Butterflies) or ring 1 (Initiatives). You don't need to force ring assignment — the receiving system can categorize later.

---

## The Cloud Butterfly Protocol (v4.0)

Your app implements the **capture layer** of this protocol. Here's what you need to know:

**Flypaper** = the always-on capture interface (this is what you're building)
**Grace Items** = actionable outputs extracted from butterflies (the receiving system handles this)
**Ghost Buster** = tracks promises others made to you (future integration)

The protocol distinguishes between:
- **Cloud Butterflies** — unconscious insights, creative ideas, strategic thoughts
- **PTK items** — conscious commitments, promises made TO or BY someone

When mining emails, look for BOTH types. Tag PTK items with `tags: ["ptk"]` so the receiving system can route them appropriately.

---

## Key Vocabulary

Use these terms correctly in your app's UI and data:

| Term | Meaning |
|------|---------|
| **Cloud Butterfly** | An idea, insight, or thought captured from stream-of-consciousness |
| **Flypaper** | The capture interface (your app IS flypaper) |
| **PTK** | Promises To Keep — tracked commitments |
| **Grace Item** | An actionable task extracted from a butterfly |
| **North Star** | The guiding purpose/person for any initiative |
| **Bingo Card** | A visual task/goal worksheet for an initiative |
| **Wisdom Giant** | A subject matter expert on the team |
| **Move 37** | An unconventional, unexpected solution (from AlphaGo) |
| **Best Practice Junkie** | Someone who obsessively seeks best practices |
| **The Judge** | The hyper-critical quality assessor in the protocol |
| **Smelling Salts** | A challenge-your-assumptions protocol |
| **Swarm** | Collective intelligence applied to a problem |

---

## The Learning Loop Protocol V14 — Executive Summary

V14 is called **"The Crystallizer"** because it transforms raw input into crystallized, actionable output through 9 phases:

| Phase | Name | What Happens |
|-------|------|-------------|
| 0 | Intake | Confirm North Star, challenge assumptions, establish baseline |
| 1 | Record | Score the deliverable across 5 dimensions (80/100 to proceed) |
| 2 | Innovation | Research best practices, find Move 37 alternatives |
| 3 | Adversarial | Three-persona debate, accessibility audit |
| 4 | Synthesis | Integrate all improvements into the deliverable |
| 5 | Execution | Build/implement the improved deliverable |
| 6 | Judgment | The Judge scores with hyper-critical assessment (95/100 to pass) |
| 7 | Certification | Final approval, documentation, version control |
| 8 | Persistence | Store learnings, update the Genie's memory |

**Your app feeds into Phase 0 and Phase 1.** When the team starts a new initiative or reviews an existing one, the first thing they do is gather all context — including Cloud Butterflies. Your app makes sure those butterflies are already captured and waiting.

---

## What Success Looks Like

Your app is successful when:

1. **Tim can capture a thought in under 5 seconds** — open app, type/paste, submit, done
2. **Email butterflies are automatically surfaced** — the agent scans Gmail/Outlook and presents candidates
3. **Nothing gets lost** — every idea, every meeting note, every promise lands in Mission Control
4. **The team uses it daily** — it becomes a habit, not a chore
5. **Butterflies flow into the 3D Diamond** — submitted butterflies appear in the Gallery and the 3D visualization

---

## The Full V14 Protocol Document

The complete V14 protocol is available at:
```
/home/ubuntu/learning-loop-dashboard/Learning-Loop-V14-The-Crystallizer.md
```

Read it for full context if needed, but remember: **you are building a tool that feeds INTO the protocol, not a tool that EXECUTES the protocol.**

---

*This briefing was prepared by Learning Loop Mission Control to ensure the Flytrap app integrates seamlessly with the existing ecosystem.*
