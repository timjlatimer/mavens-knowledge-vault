# Maven/Grace Platform — Agent Registry & Gap Analysis

**Document ID:** AGENT-REGISTRY-V1.0  
**Date:** March 20, 2026  
**Prepared by:** Manus AI for the SIC HB1000 Solve Team  
**Vault Path:** `/agent-specs/Agent_Registry_and_Gap_Analysis.md`  
**North Star:** Ruby Red — the 35–45 year old CFO of the household, working poor, navigating the political, bureaucratic, and greedy capitalist worlds  
**Governing Principle:** *"It's expensive to be poor. We think that's a crime in society, and we're trying to change it."*

---

> **LIVING DOCUMENT — UPDATE CONTINUOUSLY**  
> This registry must be updated every time a new agent is specced, built, or deployed. It is the single source of truth for the agent ecosystem. The North Star Validator and The Watchman are authorized to flag any version of this document that has not been updated within 30 days of a new agent deployment.

---

## Table of Contents

1. [Full Agent Registry (Existing Agents)](#1-full-agent-registry-existing-agents)
2. [Missing Agent Gap Analysis (Prioritized)](#2-missing-agent-gap-analysis-prioritized)
3. [Top 5 Recommended Agents to Build Next](#3-top-5-recommended-agents-to-build-next)
4. [Vault-Discovered Agents Not in Original Brief](#4-vault-discovered-agents-not-in-original-brief)
5. [Audit Methodology & Source Index](#5-audit-methodology--source-index)

---

## 1. Full Agent Registry (Existing Agents)

This registry covers every agent that has been formally specified, architecturally documented, or confirmed as built within the `timjlatimer/mavens-knowledge-vault` and its referenced repositories. Status definitions follow the Maven Innovation Index build-status scale: **Spec Only** = conceptual/designed (0–25%), **Built** = in progress/MVP (50–75%), **Deployed** = live and complete (100%).

### 1.1 Core Product Agents (Maven/Grace/Pulse/Corner Banker)

| # | Agent Name | One-Sentence Job Description | File Location in Vault | Status |
|:--|:-----------|:-----------------------------|:-----------------------|:-------|
| 1 | **Identity Spectrum Agent** | Learns Ruby's biological sex and gender expression through natural conversation and uses that data to calibrate Grace's tone, framing, and service delivery across the entire ecosystem. | `/agent-specs/Identity_Spectrum_Agent_Spec.md` | Spec Only |
| 2 | **Stage of Life Agent** | Tracks Ruby's journey across five life stages over a 15–20 year horizon and recalibrates Grace's approach, service offerings, and communication style as her circumstances evolve. | `/agent-specs/Stage_of_Life_Agent_Spec.md` | Spec Only |
| 3 | **Town Crier Agent** | Filters the global information flood down to the handful of things genuinely relevant to Ruby's life right now and delivers them in the right format, at the right time, through the right channel. | `/agent-specs/Town_Crier_Agent_Spec.md` | Spec Only |
| 4 | **Visual Intelligence Agent** | Transforms the Maven/Grace administrative experience by converting KPIs, Maven Moments, and community metrics into a story-driven, instantly comprehensible visual dashboard. | `/agent-specs/Visual_Intelligence_Agent_Spec.md` | Spec Only |
| 5 | **Grace (Maven)** | Acts as Ruby's persistent, empathetic AI companion and primary interface across all Maven platform services, from onboarding through the full 20-year relationship horizon. | `/knowledge-base/GRACE_IDENTITY.md`, `/briefs/maven-ai-team-brief.md` | Built |
| 6 | **Grace (CashCo Guardian)** | Serves as a persistent AI companion assigned to every CashCo loan applicant from first keystroke, providing relief today and hope for tomorrow regardless of approval outcome. | `/projects/cashco/loan-bot/The Maven + Cashco Guardian: The Definitive Master Document (V7).md` | Spec Only |
| 7 | **Good Neighbor / Barter Agent** | Operates a persistent 3-mile radius awareness layer and AI-powered barter matchmaker that reconstructs the physical community fabric and connects Ruby to mutual aid resources. | `/innovation-libraries/Good_Neighbor_Barter_Architecture.md` | Spec Only |
| 8 | **Maven Moment Agent** | Captures, protects, and amplifies real instances where Maven's core values were lived out loud, turning them into hyper-local community stories with Ruby's dignity and consent at the center. | `/innovation-libraries/Maven_Moment_System.md` | Spec Only |

### 1.2 Governance & Source of Truth Division Agents

| # | Agent Name | One-Sentence Job Description | File Location in Vault | Status |
|:--|:-----------|:-----------------------------|:-----------------------|:-------|
| 9 | **The Harvester** | Serves as the first-in-chain retrieval agent for the Source of Truth Division, conducting ground-zero and incremental harvests of all institutional memory across every platform and repository. | `/skills/the-harvester.md` | Built (ACTIVE — AT CEILING, 98.5/100) |
| 10 | **The Archivist** | Intakes, classifies, and permanently indexes every piece of institutional knowledge with SHA-256 integrity hashing, lifecycle statuses, and a full provenance chain. | `/skills/the-archivist.md` | Built (ACTIVE — AT CEILING, 97.8/100) |
| 11 | **Citation Officer** | Validates every factual claim made within the ecosystem against a four-tier source hierarchy and issues formal Citation NOTAMs when claims cannot be substantiated. | `/skills/citation-officer.md` | Built (ACTIVE — AT CEILING, 88.3/100) |
| 12 | **The Watchman** | Conducts independent audits across seven dimensions of ecosystem integrity and reports unfiltered findings directly to Tim HB1000, serving as the third line of defense. | `/skills/the-watchman.md` | Built (ACTIVE — AT CEILING, 90.3/110) |
| 13 | **The Auditor (Work Plan Audit Agent)** | Performs systematic plan-fidelity verification before final certification in any Learning Loop, comparing every planned step against actual execution evidence to detect drift and scope creep. | `/knowledge-base/WORK_PLAN_AUDIT_AGENT.md` | Built |
| 14 | **Iron Brief Agent (v1.4)** | Enforces the zero-drift execution standard across all AI agents in the ecosystem through mandatory pre-flight vault reading, universal performance scoring, and standing orders. | `/skills/iron-brief.md` | Built (ACTIVE — AT CEILING, v1.4) |
| 15 | **Learning Loop Facilitator (V13.1)** | Orchestrates the nine-phase V13.1 Learning Loop protocol, managing the full improvement cycle from Scout through Certification for any initiative in the ecosystem. | `/skills/learning-loop-v13.1.md` | Built (ACTIVE) |

### 1.3 Cloud Butterfly / PTK System Agents

| # | Agent Name | One-Sentence Job Description | File Location in Vault | Status |
|:--|:-----------|:-----------------------------|:-----------------------|:-------|
| 16 | **Cloud Butterfly Agent (Grace Executor)** | Captures raw stream-of-consciousness ideas via always-on Flypaper, deduplicates and organizes them, routes actionable Grace Items to the appropriate agent, and generates daily briefings. | `/knowledge-base/CLOUD_BUTTERFLY_PROTOCOL.md`, `/projects/cloud-butterfly/batch-46/cloud_butterfly_grace_protocol_complete.md` | Built (v4.0) |
| 17 | **PTK Agent (Promises To Keep)** | Tracks both promises made by the user and promises made to the user (Ghost Buster), extracts commitments from email via OAuth, delivers morning briefings, and generates reliability scores. | `/knowledge-base/ptk_two_versions.md`, `/knowledge-base/LATIMER_DOUGLAS_PROTOCOL.md` | Spec Only (V2 architecture designed, not fully implemented) |

---

## 2. Missing Agent Gap Analysis (Prioritized)

The following agents have been identified as **should-exist but have not yet been formally specced** in the vault. Each is scored on three dimensions:

- **Impact (1–10):** How critical is this agent to the MVP and to Ruby Red's core experience?
- **Urgency (1–10):** How soon is this agent needed given current build priorities and dependencies?
- **Build Ease (1–10):** How straightforward is it to write the spec and build the initial version? (10 = easiest)

**Combined Score** = Impact + Urgency + Build Ease (max 30). Sorted descending.

### 2.1 Prioritized Gap Table

| Rank | Agent Name | One-Sentence Job Description | Ecosystem | Impact | Urgency | Build Ease | Combined |
|:----:|:-----------|:-----------------------------|:----------|:------:|:-------:|:----------:|:--------:|
| 1 | **Dignity Score Agent** | Proprietary scoring engine that calculates Ruby's 0–100 Dignity Score from payment reliability, budgeting engagement, community participation, savings, and referrals — the competitive moat that replaces the traditional credit check for Corner Banker. | Pulse / Corner Banker | 10 | 10 | 7 | **27** |
| 2 | **Debt Snowball Agent** | Generates a custom, sequenced PDF battle plan for debt elimination using the snowball or avalanche method, calibrated to Ruby's exact debt load and income. | Corner Banker | 10 | 9 | 9 | **28** |
| 3 | **Wallet Warrior Checkup Agent** | Conducts Ruby's monthly solvency review, assessing debt-to-income ratio, upcoming large expenses, and NMM balance trajectory, and flags bankruptcy candidacy early with compassion. | Corner Banker / Pulse | 10 | 9 | 8 | **27** |
| 4 | **Vampire Slayer Agent** | Automatically audits Ruby's connected accounts for forgotten or unused subscriptions, surfaces them with one-tap cancellation options, and reports the total monthly savings recovered. | Corner Banker | 9 | 9 | 9 | **27** |
| 5 | **North Star Validator Agent** | Checks every deliverable, feature, and decision in the ecosystem against the correct North Star for that project, flagging any output that does not serve Ruby Red or the stated mission. | Governance | 10 | 10 | 7 | **27** |
| 6 | **Bill Negotiator Agent** | Orchestrates the concierge workflow where staff (or AI) contacts service providers, waits on hold, and negotiates lower bills on Ruby's behalf, reporting the dollar savings achieved. | Corner Banker | 9 | 8 | 8 | **25** |
| 7 | **Rent Reporting Agent** | Automatically reports Ruby's verified rent payments to Equifax Canada and TransUnion Canada via FrontLobby/Zenbase API integration, turning her biggest monthly expense into her most powerful credit-building tool. | Pulse | 10 | 9 | 7 | **26** |
| 8 | **Credit Score Simulator Agent** | Runs "What If" financial scenario modeling (pay off the payday loan vs. the credit card, open a secured card, dispute a collection) and delivers the projected credit score impact conversationally through Grace. | Pulse | 9 | 8 | 7 | **24** |
| 9 | **Phoenix Mode Agent** | Activates on Day 4 post-bankruptcy or consumer-proposal discharge and orchestrates a 24-month credit reconstruction protocol, celebrating every milestone and guiding Ruby from zero to prime. | Pulse | 9 | 8 | 7 | **24** |
| 10 | **FSL Integration Agent** | Documents and manages the Financial Services Layer (FSL) infrastructure that provides approximately 80% of the Corner Banker's required back-end, bridging the gap between the FSL platform and Maven's product layer. | Corner Banker | 9 | 9 | 6 | **24** |
| 11 | **Compliance Framework Agent** | Manages the regulatory interpretation and compliance workflow for Corner Banker under Alberta consumer lending law, coordinating with Dentons/Alex Nuth and maintaining a living compliance log. | Corner Banker | 9 | 9 | 5 | **23** |
| 12 | **Savings Circle Agent** | Manages AI-facilitated ROSCA (Rotating Savings and Credit Association) groups within the Maven Village, handling contributions, payout scheduling, member trust scoring, and Grace-mediated communication. | Corner Banker | 9 | 7 | 6 | **22** |
| 13 | **Gig Alert Agent** | Curates and delivers a personalized list of local earning opportunities (gig work, part-time roles, community micro-contracts) calibrated to Ruby's skills, schedule, and 3-mile radius. | Corner Banker | 8 | 8 | 8 | **24** |
| 14 | **Hidden Prime Letter Agent** | Automatically generates a professional, Pulse-signed reference letter synthesizing Ruby's Dignity Score, rent payment history, and NMM repayment record for use with landlords, employers, and alternative lenders. | Pulse / Corner Banker | 10 | 8 | 8 | **26** |
| 15 | **Financial History Vault Agent** | Maintains Ruby's permanent, portable, consumer-owned financial record — independent of any bank or bureau — and manages her data sovereignty rights under Canada's Consumer-Driven Banking Act. | Pulse | 9 | 7 | 7 | **23** |
| 16 | **Me Inc. Agent** | Serves as Ruby's personal North Star coach, constantly surfacing and reinforcing her prime directive and personal purpose statement through the HB1000 framework, so every financial decision connects to her larger destiny. | Maven / HB1000 | 9 | 7 | 7 | **23** |
| 17 | **Bingo Card Tracker Agent** | Maintains the living, real-time initiative tracker across all Bingo Cards in the ecosystem, surfacing health status (green/amber/red), assigned Grace personalities, and cross-card dependencies. | Governance / HB1000 | 8 | 8 | 7 | **23** |
| 18 | **Village Rolodex Agent** | Curates and maintains the insider resource directory of community-vetted contacts, tips, and services that Ruby cannot find through Google — the "I Got a Guy" network made searchable. | Corner Banker / Maven | 9 | 7 | 8 | **24** |
| 19 | **Gratitude Loop Agent** | Orchestrates the JOY-formula thank-you engine that drafts three authentic, dignity-preserving thank-you options for Ruby when a neighbor clears her step or provides support. | Corner Banker / Maven | 8 | 7 | 9 | **24** |
| 20 | **Lifeline Link Agent** | Manages the village insurance mechanic where healthy members can anonymously clear a struggling neighbor's Safety Step, coordinating the blind relay, Village Wall display, and reserve pool distribution. | Corner Banker | 8 | 7 | 7 | **22** |
| 21 | **Blue Seal Agent** | Operates the Social Impact Capitalism certification platform, verifying that businesses meet the Blue Seal integrity standards (10% tithe, data cooperative, fair dealing) and maintaining the public trust registry. | Blue Seal | 9 | 6 | 6 | **21** |
| 22 | **Angel of Your Better Nature Agent** | Serves as an AI life coach and ethical leadership companion for Blue Seal members and business leaders — a Grace variant calibrated for the entrepreneur/civic leader audience rather than Ruby Red. | Blue Seal | 8 | 6 | 7 | **21** |
| 23 | **Wisdom Giants Agent** | Routes queries to the appropriate Wisdom Giant subject matter experts, manages the Immediate + 24-hour Soak response windows, and synthesizes Fossilized Intelligence (AI) with Crystallized Intelligence (lived experience). | Maven / HB1000 | 8 | 6 | 6 | **20** |
| 24 | **Learning Loop Facilitator Agent** | Orchestrates the full V13.0/V13.1 nine-phase protocol for any initiative, managing phase sequencing, improvement ledger, drift audits, and certification — distinct from the skill file in that it operates as an autonomous agent. | Governance | 8 | 7 | 6 | **21** |
| 25 | **Iron Brief Agent (Standalone)** | Enforces Iron Brief v1.3/v1.4 standard as an autonomous enforcement agent that pre-screens all deliverables before they reach Tim or any human reviewer, distinct from the protocol file. | Governance | 8 | 7 | 7 | **22** |
| 26 | **PTK Agent (Full V2 Build)** | Implements the full organizational PTK with OAuth email integration, promise extraction, Ghost Buster follow-up, Force for Good Coach, Promise Feed, Morning Briefing, and reliability scoring — beyond the current V1 Trojan Horse. | HB1000 / LDP | 8 | 6 | 6 | **20** |
| 27 | **Cloud Butterfly Agent (Full Automation)** | Extends the current Cloud Butterfly system to full automation with API-based sending, calendar integration, voice commands, and autonomous Grace Item execution without human approval gates. | HB1000 | 7 | 6 | 6 | **19** |
| 28 | **Seba Hub Agent** | Manages the Seba Beach community hub operations, connecting local residents to Maven Village services, Blue Seal businesses, and community events in the Seba Beach geographic node. | Seba Hub | 7 | 5 | 7 | **19** |
| 29 | **Digger Cafe Agent** | Manages venue operations, reservations, community event scheduling, and Blue Seal certification workflows for the Digger Cafe hospitality initiative in Seba Beach. | Digger Cafe | 6 | 5 | 7 | **18** |
| 30 | **CashCo / Pawn Princess Agent** | Bridges the Maven trust ecosystem with CashCo lending and Pawn Princess dignity-centered pawn services, providing referral routing, trust scoring, and post-denial coaching pathways. | CashCo / Pawn Princess | 7 | 6 | 6 | **19** |
| 31 | **Effn Duck Agent** | Serves as the irreverent, plain-speaking avatar that cuts through corporate noise and delivers hard truths to Ruby in the JOY-compliant voice of the community — the ecosystem's truth-teller character. | Maven / HB1000 | 6 | 5 | 7 | **18** |
| 32 | **Good Neighbor Agent (Full Spec)** | Upgrades the existing architecture document to a full formal agent spec with database schema, API contracts, trust model implementation, and Grace integration protocols. | Maven | 8 | 6 | 6 | **20** |
| 33 | **North Star Validator Agent (Standalone)** | Operates as an independent check on every project deliverable, confirming alignment with the correct North Star before any output is certified — distinct from the Iron Brief's execution focus. | Governance | 8 | 7 | 7 | **22** |
| 34 | **Watchman Agent (Standalone Deployment)** | Deploys The Watchman as a fully autonomous scheduled audit agent that runs independently of human-triggered sessions and reports directly to Tim on a defined cadence. | Governance | 7 | 6 | 6 | **19** |
| 35 | **Citation Officer Agent (Standalone Deployment)** | Deploys the Citation Officer as an autonomous claim-validation agent that monitors all new vault documents in real time and issues Citation NOTAMs without waiting for a human-triggered audit. | Governance | 7 | 6 | 6 | **19** |

---

### 2.2 Consolidated Prioritization Table (Sorted by Combined Score)

| Rank | Agent Name | Impact | Urgency | Build Ease | Combined Score |
|:----:|:-----------|:------:|:-------:|:----------:|:--------------:|
| 1 | Debt Snowball Agent | 10 | 9 | 9 | **28** |
| 2 | Dignity Score Agent | 10 | 10 | 7 | **27** |
| 3 | Wallet Warrior Checkup Agent | 10 | 9 | 8 | **27** |
| 4 | Vampire Slayer Agent | 9 | 9 | 9 | **27** |
| 5 | North Star Validator Agent | 10 | 10 | 7 | **27** |
| 6 | Rent Reporting Agent | 10 | 9 | 7 | **26** |
| 7 | Hidden Prime Letter Agent | 10 | 8 | 8 | **26** |
| 8 | Bill Negotiator Agent | 9 | 8 | 8 | **25** |
| 9 | Credit Score Simulator Agent | 9 | 8 | 7 | **24** |
| 10 | Phoenix Mode Agent | 9 | 8 | 7 | **24** |
| 11 | FSL Integration Agent | 9 | 9 | 6 | **24** |
| 12 | Gig Alert Agent | 8 | 8 | 8 | **24** |
| 13 | Village Rolodex Agent | 9 | 7 | 8 | **24** |
| 14 | Gratitude Loop Agent | 8 | 7 | 9 | **24** |
| 15 | Compliance Framework Agent | 9 | 9 | 5 | **23** |
| 16 | Savings Circle Agent | 9 | 7 | 6 | **22** |
| 17 | Me Inc. Agent | 9 | 7 | 7 | **23** |
| 18 | Bingo Card Tracker Agent | 8 | 8 | 7 | **23** |
| 19 | Financial History Vault Agent | 9 | 7 | 7 | **23** |
| 20 | Lifeline Link Agent | 8 | 7 | 7 | **22** |
| 21 | Iron Brief Agent (Standalone) | 8 | 7 | 7 | **22** |
| 22 | North Star Validator (Standalone) | 8 | 7 | 7 | **22** |
| 23 | Blue Seal Agent | 9 | 6 | 6 | **21** |
| 24 | Angel of Your Better Nature Agent | 8 | 6 | 7 | **21** |
| 25 | Learning Loop Facilitator Agent | 8 | 7 | 6 | **21** |
| 26 | Wisdom Giants Agent | 8 | 6 | 6 | **20** |
| 27 | Good Neighbor Agent (Full Spec) | 8 | 6 | 6 | **20** |
| 28 | PTK Agent (Full V2 Build) | 8 | 6 | 6 | **20** |
| 29 | Cloud Butterfly Agent (Full Automation) | 7 | 6 | 6 | **19** |
| 30 | Seba Hub Agent | 7 | 5 | 7 | **19** |
| 31 | CashCo / Pawn Princess Agent | 7 | 6 | 6 | **19** |
| 32 | Watchman Agent (Standalone Deployment) | 7 | 6 | 6 | **19** |
| 33 | Citation Officer Agent (Standalone Deployment) | 7 | 6 | 6 | **19** |
| 34 | Digger Cafe Agent | 6 | 5 | 7 | **18** |
| 35 | Effn Duck Agent | 6 | 5 | 7 | **18** |

---

## 3. Top 5 Recommended Agents to Build Next

The following five agents represent the highest-leverage, highest-urgency build opportunities in the current ecosystem. Each recommendation is grounded in vault evidence and scored against the Ruby Red North Star.

---

### Recommendation #1 — Debt Snowball Agent (Combined Score: 28)

**Rationale:** This is the single easiest-to-build, highest-impact agent in the entire gap list. The Corner Banker product spec explicitly scores it 10/10 for Client Relevance and 10/10 for Build Ease, noting it can be delivered as a custom-generated PDF battle plan. The algorithm (snowball or avalanche method) is well-established, the inputs (Ruby's debt list and income) are already captured by Grace, and the output is a concrete, actionable document Ruby can hold in her hands. This agent directly addresses one of the most cognitively overwhelming experiences in Ruby's life — the feeling that her debt is a wall with no door. The Debt Snowball Agent puts a door in the wall. It should be the first Corner Banker agent specced and built.

---

### Recommendation #2 — Dignity Score Agent (Combined Score: 27)

**Rationale:** The Dignity Score is described in the vault as "the competitive moat" and "the proprietary scoring engine" that replaces the traditional credit check for Corner Banker purposes. The Pulse Product Spec provides a complete weighted formula (Payment Reliability 40%, Budgeting Engagement 20%, Community Participation 15%, Savings Circle 15%, Referrals 10%) and a full score interpretation table. Without this agent, Corner Banker cannot function — it is the engine that determines NMM allotment limits. It is also the foundation of the Hidden Prime Letter, Phoenix Mode, and the Credit Rebuilding Roadmap. Every other Pulse and Corner Banker agent depends on this one. It must be specced and built before the Three-Legged Stool can stand.

---

### Recommendation #3 — Vampire Slayer Agent (Combined Score: 27)

**Rationale:** The GitHub Innovation Master List confirms this agent is "complete" in the Bingo City architecture but not yet integrated into the live Maven platform. The build complexity is rated Medium, the concept is fully defined (scan transactions, identify forgotten subscriptions, surface one-tap cancellation), and the ROI for Ruby Red is immediate and measurable. The average household wastes $348/year on forgotten subscriptions — for Ruby, that is a month of groceries. This agent can be built quickly, delivers a visible win on Day 1, and builds the trust that keeps Ruby in the ecosystem. It is the perfect "quick win" that demonstrates Maven's value proposition in the first 14 days.

---

### Recommendation #4 — North Star Validator Agent (Combined Score: 27)

**Rationale:** This is a governance-layer agent that protects every other agent from drift. The vault contains extensive documentation on the Iron Brief, The Watchman, and the Citation Officer — but there is no dedicated agent whose sole job is to check every deliverable against the correct North Star for that project. As the ecosystem scales to 35+ agents, the risk of a feature being built that technically passes Iron Brief compliance but quietly drifts away from Ruby Red's actual needs becomes existential. The North Star Validator Agent is the immune system against that drift. It is relatively easy to spec (it is essentially a structured checklist agent) and its impact is felt across every other agent in the ecosystem.

---

### Recommendation #5 — Rent Reporting Agent (Combined Score: 26)

**Rationale:** The Pulse Product Spec provides a complete implementation blueprint: FrontLobby and Zenbase as the two Canadian platform partners, API integration paths, the PIPEDA-compliant consent model, and the exact Grace conversational script for delivering the news to Ruby. TransUnion Canada officially accepted rental payment data as a dedicated category as of January 2026. This agent turns Ruby's largest monthly expense — rent she is already paying — into her most powerful credit-building tool, at zero additional cost to her. It is the fastest path to a measurable improvement in her traditional credit score and the most direct proof that Pulse is working. The spec is essentially already written in the product document; it needs only to be formalized as an agent spec.

---

## 4. Vault-Discovered Agents Not in Original Brief

The following agents were discovered during the vault audit that were **not listed in the original brief** but represent meaningful, named agent concepts within the ecosystem. They are included here for completeness and to prevent them from being lost.

| # | Agent Name | Description | Source File | Recommended Action |
|:--|:-----------|:------------|:------------|:-------------------|
| 1 | **The Auditor (Work Plan Audit Agent)** | Performs plan-fidelity verification before Learning Loop certification, comparing planned steps against execution evidence. | `/knowledge-base/WORK_PLAN_AUDIT_AGENT.md` | Already built — add to registry |
| 2 | **Union Boss Agent** | Collective data bargaining engine that uses the aggregated Maven community's data to negotiate better terms with financial institutions and service providers. | `/Maven_Innovation_Index.md` (Innovation #20) | 🚨 HIGH PRIORITY — spec immediately |
| 3 | **Mom Genie / JOY Rephraser** | Offers three JOY-aligned rewrites of Ruby's negative self-talk, serving as a behavioral intervention disguised as a friendly check-in. | `/Maven_Innovation_Index.md` (Innovation #22) | 🚨 HIGH PRIORITY — spec immediately |
| 4 | **Bullshit Detector Agent** | Scans communications, corporate marketing, and financial offers to identify manipulation, hidden traps, and predatory language across six manipulation vectors. | `/GitHub_Innovation_Master_List.md` (Innovation 1.2) | High priority — spec after Top 5 |
| 5 | **Capital Scout Agent** | Continuously scans for funding opportunities aligned with the HB1000 mission (grants, impact investments, CDFIs) and prepares pitch materials for Tim's review. | `/GitHub_Innovation_Master_List.md` (Innovation 5.13) | Medium priority |
| 6 | **Big Mama Agent** | Manages the community connection layer, Village Angels program, and the broader Big Mama's Genius Village services for Ruby Red. | `/innovation-libraries/Big_Mama_Innovation_Library.md` | Spec needed |
| 7 | **Fee Transparency Engine Agent** | Exposes bank fees and predatory charges explicitly, showing Ruby exactly what is being taken from her and by whom. | `/GitHub_Innovation_Master_List.md` (Innovation 2.6) | Spec needed |
| 8 | **Data Breach Monitor Agent** | Shows Ruby how many times her personal data has been compromised in known data breaches, framed as empowerment rather than alarm. | `/GitHub_Innovation_Master_List.md` (Innovation 2.7) | Low complexity — quick win |
| 9 | **Crisis Playbook Agent** | Delivers step-by-step guides for when everything goes wrong at once, thinking strategically for Ruby when her prefrontal cortex is offline. | `/GitHub_Innovation_Master_List.md` (Innovation 3.3) | High priority — requires partnerships |
| 10 | **Tim AI (CEO Clone)** | A persistent AI persona built from the CVO's institutional memory, fly paper thoughts, and documented decision patterns — a force multiplier for the founder's vision. | `/GitHub_Innovation_Master_List.md` (Innovation 5.12) | Strategic — long-term build |

---

## 5. Audit Methodology & Source Index

### 5.1 Files Reviewed

This audit reviewed every file in the following directories and key files across the vault:

| Directory / File | Purpose |
|:----------------|:--------|
| `/agent-specs/` | Primary agent specification directory (4 files) |
| `/product-specs/` | Product specifications for Corner Banker and Pulse (2 files) |
| `/skills/` | Governance agent skill files (7 files) |
| `/innovation-libraries/` | Architecture and design documents (4 files) |
| `/knowledge-base/` | Core platform knowledge (selected key files) |
| `/projects/cashco/` | CashCo Guardian specification |
| `/projects/cloud-butterfly/` | Cloud Butterfly Grace protocol |
| `GitHub_Innovation_Master_List.md` | Archaeological extraction of 54 unbuilt innovations |
| `Maven_Innovation_Index.md` | 22-innovation master scorecard |
| `JOY_Movement_Brief.md` | Cultural operating system and JOY framework |
| `README.md` | Vault overview and navigation |

### 5.2 Status Classification Criteria

| Status | Definition | Evidence Required |
|:-------|:-----------|:------------------|
| **Spec Only** | Formal specification document exists in the vault | File in `/agent-specs/`, `/product-specs/`, `/skills/`, or `/innovation-libraries/` with structured spec content |
| **Built** | Agent has been implemented in code or is confirmed as active in a live system | Confirmed in `maven-ai-team-brief.md`, `PEARL_IDENTITY.md`, or skill files with `ACTIVE` status |
| **Deployed** | Agent is live and serving users in production | Confirmed via live URL or deployment evidence |

### 5.3 Scoring Rubric for Gap Analysis

**Impact (1–10):** Scores 9–10 reserved for agents that are either load-bearing infrastructure (without them, another product cannot function) or that directly address Ruby Red's most acute pain points (NSF fees, debt, credit invisibility). Scores 7–8 for agents that meaningfully improve the experience but are not blocking other builds. Scores 5–6 for agents that serve specific sub-products or non-Ruby audiences.

**Urgency (1–10):** Scores 9–10 for agents that are blocking current product launches (Corner Banker, Pulse) or that protect the ecosystem from immediate governance risks. Scores 7–8 for agents needed within the next two sprints. Scores 5–6 for agents that are important but not blocking.

**Build Ease (1–10):** Scores 9–10 for agents where the spec is essentially already written in a product document and the build is a well-understood algorithm or workflow. Scores 7–8 for agents requiring moderate new design work. Scores 5–6 for agents requiring significant regulatory, partnership, or technical complexity.

---

*"It's expensive to be poor. We think that's a crime in society, and we're trying to change it."*  
*— SIC HB1000 Solve Team*

---

**Document prepared by:** Manus AI for the SIC HB1000 Solve Team  
**Governing North Star:** Ruby Red  
**Next Review Date:** April 20, 2026  
**Review Authority:** The Watchman + North Star Validator Agent
