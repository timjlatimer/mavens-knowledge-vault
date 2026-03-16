# Learning Loop Protocol V12.8.1 — CANONICAL VERSION

**Status:** CANONICAL | **Version:** 12.8.1 | **Date:** February 3, 2026  
**Custodian:** SIC HB1000 Hive Mind Solve Team

---

## Executive Summary

The Learning Loop Protocol V12.8.1 is the **canonical, frozen version** of the SIC Solve Team's seven-phase quality assurance and certification framework. This version introduces **Phase 07: System of Drift Audit** as a mandatory final checkpoint, ensuring all deliverables remain aligned with the North Star mission before certification.

This document serves as the authoritative reference for all AI agents, team members, and stakeholders working within the SIC ecosystem.

---

## The Eight Phases

| Phase | System Name | Persona | Core Function |
|:------|:------------|:--------|:--------------|
| **00** | System of Intake | The Sorter | Smelling Salts Protocol, initiative classification, intensity calibration |
| **01** | System of Record | The Assessor | 5-Dimension Scoring (Correctness, Competitiveness, Alignment, Communication, Evolution) |
| **02** | System of Innovation | Best Practice Junkie | External scan, Move 37 candidates, gap analysis |
| **03** | System of Adversarial Integrity | Society of Guardians | Defender vs. Prosecutor debate, Arbiter verdict |
| **04** | System of Communication | The Swiss Banker | Swiss-style presentation, Gamification Gift Back |
| **05** | System of Evolution | The Recursive Engine | Instant recursive execution until threshold reached |
| **06** | System of Certification | The Judge | Final verdict, hyper-critical assessment |
| **07** | System of Drift Audit | Drift Agent | HB1000 HiTL Accept/Reject, rollback coordinates |

---

## Phase Definitions

### Phase 00: System of Intake (The Sorter)

**Purpose:** Initialize the protocol, verify alignment with North Star, and set execution parameters.

**Tasks:**
1. Apply the **Smelling Salts Protocol** — verify the initiative aligns with Ruby Red (CFO of the household)
2. Classify the initiative type (new project, improvement, fix, research)
3. Confirm intensity level and iteration persistence settings
4. Identify key stakeholders and success criteria

**Output:**
- `smellingSaltsResult`: { aligned: boolean, northStarConnection: string, concerns: string[] }
- `initiativeType`: string
- `intensityConfirmed`: boolean
- `stakeholders`: string[]
- `successCriteria`: string[]

---

### Phase 01: System of Record (The Assessor)

**Purpose:** Establish baseline quality through 5-dimension scoring.

**Dimensions (0-100 each):**
1. **CORRECTNESS** — Is it factually accurate and technically sound?
2. **COMPETITIVENESS** — Does it meet or exceed industry best practices?
3. **ALIGNMENT** — Does it serve the North Star / Ruby Red client?
4. **COMMUNICATION** — Is it clear, compelling, and well-structured?
5. **EVOLUTION** — Does it enable future improvement and learning?

**Output:**
- `scores`: { correctness, competitiveness, alignment, communication, evolution }
- `overallScore`: number (weighted average)
- `weakestDimension`: string
- `strongestDimension`: string

**Threshold:** Baseline must reach 80+ to proceed.

---

### Phase 02: System of Innovation (Best Practice Junkie)

**Purpose:** Research external best practices and generate improvement candidates.

**Tasks:**
1. Identify relevant external best practices and innovations
2. Generate at least 3 improvement suggestions based on research
3. Create 1-2 **Move 37 candidates** (unconventional, creative solutions)
4. Assess risk/reward for each suggestion

**Output:**
- `bestPractices`: [{ source, insight, applicability }]
- `suggestions`: [{ id, description, expectedImpact, effort }]
- `move37Candidates`: [{ id, description, rationale, riskLevel }]

**HiTL Checkpoint:** User selects which suggestions to implement.

---

### Phase 03: System of Adversarial Integrity (Society of Guardians)

**Purpose:** Conduct adversarial debate to stress-test the deliverable.

**Personas:**
- **DEFENDER** — Argues for the current approach, highlights strengths
- **PROSECUTOR** — Challenges assumptions, identifies weaknesses and risks
- **ARBITER** — Synthesizes both perspectives into actionable verdict

**Output:**
- `defenderArguments`: [{ point, evidence }]
- `prosecutorChallenges`: [{ challenge, severity, evidence }]
- `arbiterVerdict`: { decision, conditions, reasoning }
- `criticalIssues`: string[]
- `mandatoryChanges`: string[]

**HiTL Checkpoint:** User accepts or rejects the Arbiter's verdict.

---

### Phase 04: System of Communication (The Swiss Banker)

**Purpose:** Generate clear, visual communication of findings in Swiss International Style.

**Deliverables:**
1. **Executive Summary** (3-5 sentences)
2. **Key Findings Visualization** (Swiss-style infographic)
3. **Stakeholder-specific Messaging**
4. **Gamification Gift Back** — Build gamification layer for the target initiative

**The Gift Back:**
As a gift from the Learning Loop, we build gamification into the user's initiative:
- Identify the end user (e.g., Ruby Red, the CFO of the household)
- Create 3-5 game mechanics tailored to their context
- Generate actual implementation code

**HiTL Checkpoint:** User selects gamification approach.

---

### Phase 05: System of Evolution (The Recursive Engine)

**Purpose:** Apply improvements and iterate until threshold reached.

**Mechanism:**
1. Implement approved changes from previous phases
2. Re-score after each iteration
3. Continue until threshold reached or diminishing returns detected
4. Document lessons learned

**Output:**
- `iterationsCompleted`: number
- `changesApplied`: [{ change, impact, iteration }]
- `scoreProgression`: [{ iteration, score }]
- `finalScore`: number
- `thresholdReached`: boolean
- `lessonsLearned`: string[]

**HiTL Checkpoint:** User decides to continue iterating or proceed.

---

### Phase 06: System of Certification (The Judge)

**Purpose:** Render final certification decision with hyper-critical assessment.

**Tasks:**
1. Apply Smelling Salts one final time
2. Verify all conditions from Phase 03 were addressed
3. Confirm threshold was reached
4. Issue certification or rejection with reasoning

**Verdicts:**
- **CERTIFIED** — Meets all criteria, approved for release
- **CONDITIONAL_PASS** — Approved with noted conditions
- **REJECTED** — Does not meet criteria, requires revision

**Output:**
- `finalSmellingSalts`: { aligned, driftDetected, concerns }
- `conditionsVerified`: [{ condition, met, evidence }]
- `finalScore`: number
- `verdict`: "CERTIFIED" | "CONDITIONAL_PASS" | "REJECTED"
- `reasoning`: string

**HiTL Checkpoint:** User confirms submission to The Judge.

---

### Phase 07: System of Drift Audit (Drift Agent) — NEW IN V12.8.1

**Purpose:** Independent audit for protocol drift with rollback capability.

**Tasks:**
1. Compare current initiative state against original objectives
2. Identify any drift from the North Star / Ruby Red mission
3. Catalog all changes made during protocol execution
4. Store rollback coordinates for each major decision point
5. Present findings to HB1000 Hive Mind for accept/reject decision

**Drift Types:**
- `scope_creep` — Initiative scope expanded beyond original bounds
- `north_star_deviation` — Misalignment with Ruby Red mission
- `phase_skip` — Protocol phases were bypassed
- `threshold_lowered` — Quality bar was reduced
- `rabbit_hole` — Excessive focus on tangential issues
- `feature_drift` — Features added/removed without approval
- `intensity_drift` — Execution intensity changed significantly

**Severity Levels:**
- **NONE** — No drift detected
- **MINOR** — Small deviations, acceptable
- **MODERATE** — Notable drift, review recommended
- **MAJOR** — Significant drift, intervention required
- **CRITICAL** — Severe drift, rollback recommended

**Output:**
- `driftDetected`: boolean
- `driftSeverity`: "NONE" | "MINOR" | "MODERATE" | "MAJOR" | "CRITICAL"
- `driftFindings`: [{ area, original, current, deviation }]
- `rollbackCoordinates`: [{ phase, checkpoint, timestamp }]
- `spiritCheckPassed`: boolean
- `northStarAlignment`: number (0-100)
- `recommendations`: [{ action, priority, rationale }]
- `hb1000Decision`: "PENDING" | "ACCEPTED" | "REJECTED"

**HiTL Checkpoint:** HB1000 Hive Mind accepts findings or triggers rollback.

---

## Intensity Framework

The protocol supports variable intensity levels that affect iteration persistence:

| Level | Name | Threshold | Max Iterations | Description |
|:------|:-----|:----------|:---------------|:------------|
| 0-20% | CURIOUS | 60% | 2 | Light exploration |
| 21-40% | INTERESTED | 70% | 3 | Moderate engagement |
| 41-60% | COMMITTED | 80% | 5 | Serious effort |
| 61-80% | DRIVEN | 85% | 7 | Strong commitment |
| 81-95% | OBSESSED | 90% | 10 | Maximum effort |
| 96-100% | PRIMAL+ | 99% | ∞ | No compromise |

---

## North Star: Ruby Red

The Learning Loop Protocol serves **Ruby Red** — the CFO of the household:

> She's usually the 35-45 year old mom of two who is home trying to figure out how to make her finances stretch until the next payday. This is complicated and cognitively overloading for her, and we're trying to solve for her.

**The Job to Be Done:** Help her navigate the three gangster worlds:
1. The political world
2. The bureaucratic world  
3. The greedy capitalist world

**Our Superpower:** Empathy, practiced with "there but for the grace of God go I."

**The Crime We're Fighting:** "It's expensive to be poor."

---

## Version History

| Version | Date | Changes |
|:--------|:-----|:--------|
| V12.8.1 | Feb 3, 2026 | **CANONICAL** — Added Phase 07 Drift Audit, standardized version across all dashboard pages |
| V12.8 | Jan 2026 | Added Gamification Gift Back to Phase 04 |
| V12.4 | Jan 2026 | Introduced Drift Agent service |
| V12.0 | Jan 2026 | Live Protocol execution with WebSocket streaming |
| V11.1 | Jan 2026 | Human-in-the-loop approval checkpoints |
| V10.8 | Dec 2025 | Intensity Framework integration |
| V9.1 | Nov 2025 | Protocol Engineer evolution proposals |

---

## Usage Instructions

### For AI Agents

1. Read this document before executing any Learning Loop Protocol session
2. Execute phases 00-07 in sequence, respecting HiTL checkpoints
3. Store rollback coordinates at each major decision point
4. Present drift findings to HB1000 for final approval

### For Human Operators

1. Use the Learning Loop Mission Control dashboard at the provided URL
2. Select intensity level based on initiative importance
3. Approve or reject at each HiTL checkpoint
4. Review drift audit findings before final certification

### For Integration

```typescript
// Import the protocol phases
import { PROTOCOL_PHASES } from './protocolExecutor';

// Execute a phase
const result = await executePhase(context, phaseIndex);

// Check for drift
const driftReport = await runDriftAudit(sessionId, initiativeName, currentState);
```

---

## Certification

This document is certified as the **CANONICAL VERSION** of the Learning Loop Protocol.

**Certified by:** SIC HB1000 Hive Mind Solve Team  
**Date:** February 3, 2026  
**Protocol Version:** V12.8.1  
**Fidelity Score:** 100%

---

*"It's expensive to be poor." — We're trying to change that.*
