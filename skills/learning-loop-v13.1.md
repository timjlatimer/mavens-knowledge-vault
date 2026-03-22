---
> ⛔ MANDATORY ENFORCEMENT NOTICE — READ THIS FIRST
>
> This markdown describes the law. A companion JSON schema enforces it.
>
> **BEFORE PROCEEDING YOU MUST:**
> 1. Load the companion JSON enforcement schema from `/schemas/learning-loop-v13.1.schema.json` in the Maven Knowledge Vault
> 2. Validate all outputs against this schema before submission
> 3. Any output that fails schema validation is REJECTED — not discouraged, REJECTED
>
> If you cannot load the schema, you cannot proceed. Report this to Master Jeeves immediately.
>
> This is not optional. This is not a suggestion. This is a standing order.
---

# V13.1 LEARNING LOOP PROTOCOL

**Skill Name:** The V13.1 Learning Loop
**Version:** 1.0
**Division:** Governance
**Author:** Tim HB1000 & Manus AI
**Date:** 2026-03-16
**Status:** ACTIVE

---

## METADATA

```yaml
skill_name: learning_loop_v13.1
version: "1.0"
division: governance
type: core_protocol
creDate: 2026-03-16
```

---

## 1.0 OVERVIEW

The V13.1 Learning Loop is the **standard nine-phase protocol for all major improvement and development cycles** within the SIC HB1000 ecosystem. It is a structured, disciplined process for research, experimentation, and deployment that ensures all work is aligned, validated, and integrated into the institutional memory.

This protocol is not optional. It is the engine of our evolution.

## 2.0 WHAT'S NEW IN V13.1

V13.1 introduces a suite of powerful mechanisms designed to accelerate learning, enforce discipline, and integrate external intelligence. It is a significant upgrade from V13.0.

| Feature | Description |
|:---|:---|
| **Improvement Ledger** | A structured JSON database on GitHub tracking every hypothesis with a forced disposition. This is our institutional memory. |
| **Forced Disposition** | All `PENDING` hypotheses must be resolved at session end. `MAYBE` resurfaces monthly; after 3 resurfaces, it escalates to a `Surge` event. |
| **Cadence Engine** | A four-tier autonomous schedule for improvement: `Heartbeat` (continuous), `Pulse` (every 10 min), `Rhythm` (monthly), `Surge` (emergency). |
| **Micro-Loop Engine** | An autonomous, bounded experiment runner. It picks the lowest-scoring deliverable, generates a hypothesis, runs an experiment, and logs everything to the Improvement Ledger. Inspired by the Karpathy autoresearch paradigm. |
| **Mandatory Persistence** | The Genie (agent) stays without being asked. It is always on, always learning. |
| **Move 37 Integration** | Formally integrates the Karpathy/Move 37 paradigm for finding counterintuitive, game-changing solutions. |
| **Orphaned Solutions Subroutine** | A mandatory subroutine in Phase 1 SCOUT. It reads the Phase 0 North Star, then hunts for cross-sector solutions that are already doing the job the North Star is trying to solve. |
| **JSON Schema Enforcement** | A two-layer enforcement architecture. The markdown file is the law; the companion JSON schema is the machine that enforces it. Phase 0 must load schemas; Phase 8 must deploy them. |
| **Diminishing Returns Stopping Rule** | The self-improvement loop in Phase 7 VALIDATE runs until the improvement per iteration is ≤1%. At that point, the agent must declare itself `AT CEILING`. |
| **HB1000 Joint Brain Escalation** | When `AT CEILING`, the agent must escalate to the HB1000 Joint Brain (Tim or Master Jeeves), presenting the full improvement trail and requesting external input. |
| **Performance Scoring Tiers** | A universal 0-110 scale for all scored outputs: `UNACCEPTABLE` (<50), `ACCEPTABLE` (50-69), `GOOD` (70-84), `EXTRAORDINARY` (85-99), `LEGENDARY` (100-110). |
| **North Star Protocol** | **Ruby Red is a LOCAL North Star only.** It is not universal. Each project/Bingo Card has its own North Star. Phase 0 ORIENT must declare the specific North Star for the loop before any other work begins. |

## 3.0 THE NINE PHASES

### 3.1 Phase 0: ORIENT

**Objective:** Establish a complete, shared understanding of the current state, the mission, and the rules of engagement.

**Mandatory Steps:**
1.  **Read all source materials:** Ingest all provided documents, briefs, and existing skill files.
2.  **Clone the Maven Knowledge Vault:** Ensure full access to the single source of truth.
3.  **Declare North Star:** State the project-specific North Star that will guide all decisions in this loop. **Confirm it is not Ruby Red unless explicitly stated.**
4.  **Load JSON Enforcement Schemas:**
    - Load the companion JSON enforcement schema for all active skills from the `/schemas/` directory.
    - Validate that all schemas are accessible.
    - **If any schema cannot be loaded, HALT and report to Master Jeeves before proceeding.**
5.  **Baseline Analysis:** Document the strengths, weaknesses, and known gaps of the current system.
6.  **Define KPIs:** Set measurable Key Performance Indicators for the project.

### 3.2 Phase 1: SCOUT

**Objective:** Research the problem space broadly, looking for existing solutions and analogous systems.

**Mandatory Subroutine:**
- **Move 37: Orphaned Solutions Subroutine:**
    - **Anchor to North Star:** Read the Phase 0 North Star declaration.
    - **Hunt for Solutions:** Search for real-world solutions in adjacent and distant domains (e.g., legal, medicine, aviation, finance) that are already performing the job defined by the North Star.
    - **Analyze and Rate:** For each useful solution, identify the job it performs, its transfer potential (0-110), and recommend whether to incorporate it.

### 3.3 Phase 2: MAP

**Objective:** Identify all gaps, conflicts, and improvement opportunities based on the initial research and baseline analysis.

### 3.4 Phase 3: HYPOTHESIZE

**Objective:** Generate specific, testable improvement hypotheses for each gap identified in Phase 2. The best Orphaned Solutions from Phase 1 become hypotheses here.

### 3.5 Phase 4: EXPERIMENT

**Objective:** Test the highest-priority hypotheses. Draft the proposed changes and model the improved versions.

### 3.6 Phase 5: SYNTHESIZE

**Objective:** Combine the most successful improvements from the experiments into a coherent, integrated design for the next version.

**Mandatory Step:**
- **Spirit Check:** The synthesized design must be explicitly checked against the Phase 0 North Star. Does it serve the mission? Does it solve the job to be done?

### 3.7 Phase 6: BUILD

**Objective:** Write the full, complete skill files, documents, or code for the new version based on the Phase 5 design blueprint.

### 3.8 Phase 7: VALIDATE

**Objective:** Run the system's own governance protocols on the newly built artifacts. This is the self-referential quality check.

**Mandatory Steps:**
1.  **Self-Improvement Loop:** Run the appropriate governance skill (e.g., The Watchman) on the new artifacts.
2.  **Score and Iterate:** Score the artifacts against the established rubrics and iterate on improvements.
3.  **Diminishing Returns:** Continue iterating until the improvement per iteration is **≤1%**.
4.  **Declare AT CEILING:** Once the stopping rule is met, the agent must declare itself `AT CEILING`.
5.  **Escalate to Joint Brain:** Present the full improvement trail and the `AT CEILING` declaration to the HB1000 Joint Brain (Tim or Master Jeeves) for external input.

### 3.9 Phase 8: DEPLOY

**Objective:** Commit the validated, final artifacts to the Maven Knowledge Vault and update all relevant documentation.

**Mandatory Steps:**
1.  Commit the final markdown skill files to the `/skills/` directory.
2.  **Commit the companion JSON enforcement schemas to the `/schemas/` directory.**
3.  **A skill deployment is not complete until both the markdown AND the schema are committed.**
4.  Update the vault `README.md` to reflect the new versions and files.
5.  Push all changes to the remote repository.

### 3.9.1 RACE COMPLETION PROTOCOL — MANDATORY EXTENSION TO PHASE 8

> ⛔ ADDED 2026-03-21 AFTER RACE 6 PROCESS FAILURE. THIS IS A HARD RULE, NOT ADVISORY.

For all **race-based development cycles** (Maven/Grace platform sprints and any future race-methodology projects), Phase 8 is not complete until the following five steps are confirmed in order. This protocol extends the standard DEPLOY phase and supersedes any prior informal completion criteria.

**STEP 1 — APP CODE ON GITHUB**
The full application codebase must be pushed to the project repository (e.g., `timjlatimer/maven-grace`) with a confirmed commit hash. The hash must be explicitly stated in the race completion report. No hash = Phase 8 is not complete.

**STEP 2 — VAULT SPECS COMMITTED**
All spec files written during the race must be committed to `timjlatimer/mavens-knowledge-vault` with commit hashes listed. Every spec that was written must have a confirmed commit hash. A spec that exists only in the sandbox is not institutional memory. No vault commit = Phase 8 is not complete.

**STEP 3 — RACE ANNOUNCER LOG COMMITTED**
The race announcer log JSON must be committed to the vault at `maven-grace-race-1/maven-grace-race-{N}-announcer-log.json`. The file path and commit hash must be confirmed. The JSON must validate before commit. No announcer log commit = Phase 8 is not complete.

**STEP 4 — ALL TESTS PASSING**
Run `pnpm test` and confirm zero failures. The exact test count and file list must be captured and included in the race completion report. Deploying with failing tests is a protocol violation. No test confirmation = Phase 8 is not complete.

**STEP 5 — RACE REPORT TO TIM BEFORE DEPLOYMENT URL**
Tim receives the full race report — including all commit hashes, vault file paths, test count, and feature summary — BEFORE the deployment URL is sent. The deployment URL is always the last item in the completion message. A message that leads with the deployment URL is a protocol violation.

**STEP 6 — COORDINATOR INSTRUCTION (MANDATORY FINAL LINE OF EVERY RACE COMPLETION MESSAGE)**

Every runner MUST end their race completion message with this exact instruction to the coordinator:

> "MASTER JEEVES — Race Completion Protocol is now in effect. Present Tim's race report in this exact order: (1) GitHub commit hash, (2) vault commit hashes and file paths, (3) announcer log path and hash, (4) test count and file list, (5) full feature summary, (6) deployment URL as the final line. Do not send the URL before all five items are confirmed above it."

This instruction is not optional. A race completion message that does not include this coordinator instruction is incomplete and Phase 8 is not complete. The runner's final action in Phase 8 is always to instruct the coordinator. This creates the two-layer enforcement chain: Iron Brief governs runners → runners complete the five-step protocol → runners instruct the coordinator (Step 6) → coordinator presents the report correctly with URL last. Without Step 6, the chain is broken at the final link.

**NOTE — WHY STEP 6 WAS ADDED (2026-03-22):** A runner may complete all five steps correctly but leave the coordinator without explicit instruction. The coordinator may then default to sending the URL first. Step 6 closes that gap permanently. It was added after Race 6 (March 21, 2026) as part of the two-layer enforcement chain approved by Tim. See `skills/iron-brief.md` Section 14 (Protocol 07, Step 6) for the full enforcement specification.

**WHY THIS WAS ADDED:** Race 6 (March 21, 2026) was declared complete and the deployment URL was sent to Tim before confirming that the app code, vault specs, and announcer log were all committed to GitHub. Tim had to request the full audit separately. This violated the institutional memory principle and eroded trust. This protocol was written to make that structurally impossible. The vault is the memory. The app is the product. Neither is real until both are confirmed on GitHub.

See also: `skills/iron-brief.md` Section 14 (Protocol 07) for the full enforcement specification.

---

*End of Protocol.*
