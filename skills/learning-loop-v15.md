---
> ⛔ MANDATORY ENFORCEMENT NOTICE — READ THIS FIRST
>
> This markdown is only the human-readable pointer. The protocol is machine-enforced. The companion JSON schema is the law.
>
> **BEFORE PROCEEDING YOU MUST:**
> 1. Load the companion JSON enforcement schema from `/schemas/learning-loop-v15.schema.json` in the Maven Knowledge Vault.
> 2. Validate all outputs against this schema before submission.
> 3. Any output that fails schema validation is REJECTED.
>
> **ANTI-DRIFT PRIME DIRECTIVE:** If you are using Markdown narrative instead of structured JSON fields, you are violating this protocol. Stop. Log the violation. Correct it.
---

# V15 LEARNING LOOP PROTOCOL

**Skill Name:** The V15 Learning Loop (The Dual Runner Launch)
**Version:** 15.0
**Division:** Governance
**Author:** Tim HB1000 & Manus AI
**Date:** 2026-03-21
**Status:** ACTIVE

---

## METADATA

```yaml
skill_name: learning_loop_v15
version: "15.0"
division: governance
type: core_protocol
creDate: 2026-03-21
parent_version: "14.0"
```

---

## 1.0 THE DUAL RUNNER ARCHITECTURE

V15 introduces the Dual Runner Architecture. The journey from V13.1 to V20 is now run simultaneously on two completely different tracks by two dedicated runners:

**1. The Memory Runner (Straight Track)**
*   **The Track:** One straight lane. No hurdles.
*   **The Job:** Find memory leaks, seal them in JSON, anchor to GitHub, and recalculate the probability.
*   **The Finish Line:** Drive the `memory_loss_probability` below 0.01.

**2. The Innovation Runner (Hurdles Track)**
*   **The Track:** A track with 9 distinct hurdles — one for each of the 9 phases.
*   **The Job:** Clear every hurdle by driving each phase to the Primal threshold (95%) or the diminishing returns ceiling (less than 1% gain).
*   **The Finish Line:** Successfully clear all 9 hurdles.

**Resource Transfer:** When one runner crosses their finish line first, their entire support staff pivots to the other runner's track to help them finish. V20 is declared ONLY when both runners have finished.

## 2.0 WHAT'S NEW IN V15

V15 builds upon the V14 Crystallizer by adding:

1.  **Phase Improvement Cycles:** Every phase (0-8) now has its own internal recursive improvement cycle. A phase cannot advance until it hits the Primal threshold or the diminishing returns ceiling.
2.  **Swarm Mind One (JTBD Orphan Hunter):** Runs at the end of every phase. Looks outside the sector entirely to find orphaned solutions in medicine, aviation, law, science, or intelligence that have already solved the job to be done.
3.  **Swarm Mind Two (Pure Innovation Swarm):** Runs at the end of every phase. Searches the outer edges of what is known or imagined. Looks for breakthrough ideas without constraints.
4.  **Updated V20 Stop Condition:** The stop condition now requires both the Innovation Runner to clear all 9 hurdles and the Memory Runner to cross the 0.01 probability threshold, alongside zero drift violations and a perfect performance score.

## 3.0 THE NINE PHASES (INHERITED FROM V14)

The 9 core phases are inherited verbatim, but now include the internal improvement cycles and swarm minds at each step. For historical context, cite: `/skills/learning-loop-v14.md`.

*   **Phase 0: ORIENT**
*   **Phase 1: SCOUT**
*   **Phase 2: MAP**
*   **Phase 3: HYPOTHESIZE**
*   **Phase 4: EXPERIMENT**
*   **Phase 5: SYNTHESIZE**
*   **Phase 6: BUILD**
*   **Phase 7: VALIDATE**
*   **Phase 8: DEPLOY**

## 4.0 THE V20 STOP CONDITION

The `v20_stop_condition_met` field MUST be `true` ONLY when:
1. `runner_one_status.all_phases_at_threshold` = true
2. `runner_two_status.memory_threshold_crossed` = true
3. `runner_two_status.current_memory_loss_probability` < 0.01
4. The `anti_drift_violations` array is empty for the entire run
5. `performance_scoring.score` >= 100

---
*End of Protocol.*
