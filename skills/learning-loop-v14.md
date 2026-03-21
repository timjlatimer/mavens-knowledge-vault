---
> ⛔ MANDATORY ENFORCEMENT NOTICE — READ THIS FIRST
>
> This markdown is only the human-readable pointer. The protocol is machine-enforced. The companion JSON schema is the law.
>
> **BEFORE PROCEEDING YOU MUST:**
> 1. Load the companion JSON enforcement schema from `/schemas/learning-loop-v14.schema.json` in the Maven Knowledge Vault.
> 2. Validate all outputs against this schema before submission.
> 3. Any output that fails schema validation is REJECTED.
>
> **ANTI-DRIFT PRIME DIRECTIVE:** If you are using Markdown narrative instead of structured JSON fields, you are violating this protocol. Stop. Log the violation. Correct it.
---

# V14 LEARNING LOOP PROTOCOL

**Skill Name:** The V14 Learning Loop (The Crystallizer)
**Version:** 14.0
**Division:** Governance
**Author:** Tim HB1000 & Manus AI
**Date:** 2026-03-20
**Status:** ACTIVE

---

## METADATA

```yaml
skill_name: learning_loop_v14
version: "14.0"
division: governance
type: core_protocol
creDate: 2026-03-20
parent_version: "13.1"
```

---

## 1.0 THE NORTH STAR

The North Star of the Learning Loop itself: **Self-improve and never forget.**

The gift this loop leaves behind is an ironclad, JSON-sealed, GitHub-anchored memory that cannot drift.

## 2.0 WHAT'S NEW IN V14 (THE CRYSTALLIZER)

V14 is the first major step toward the V20 Singularity, shifting the architecture from file-based memory to a verifiable state machine. The new rules are:

1. **Markdown Prohibited**: No Markdown narrative is allowed in phase outputs. All text must be structured JSON strings.
2. **No Paraphrase Rule**: The AI cannot summarize past decisions. It must quote exact record IDs or halt execution.
3. **Source Citations Required**: Every factual claim must cite a `vault_path` or `context_record_id`.
4. **Memory Anchors**: Every phase output must be anchored to a specific GitHub commit hash.
5. **Anti-Drift Logging**: Any violation (Markdown use, hallucination, missing citations) must be logged in the `anti_drift_violations` array.
6. **Recursive Improvement Tracking**: The loop calculates its `memory_loss_probability` and tracks improvements in a recursive log.
7. **The Gifts**: The loop explicitly defines a `gift_to_strategy` (rules left behind for the target) and a `gift_to_loop` (rules left behind for the next version).

## 3.0 THE NINE PHASES (INHERITED FROM V13.1)

The 9 core phases from V13.1 are inherited verbatim. For full phase details, cite: `/skills/learning-loop-v13.1.md`.

*   **Phase 0: ORIENT** — Declare North Star, load schemas.
*   **Phase 1: SCOUT** — Research and Move 37 Orphaned Solutions Subroutine.
*   **Phase 2: MAP** — Identify gaps and conflicts.
*   **Phase 3: HYPOTHESIZE** — Generate testable improvements.
*   **Phase 4: EXPERIMENT** — Test highest-priority hypotheses.
*   **Phase 5: SYNTHESIZE** — Combine improvements, run Spirit Check.
*   **Phase 6: BUILD** — Write the improved artifacts.
*   **Phase 7: VALIDATE** — Self-improvement loop with Diminishing Returns Stopping Rule.
*   **Phase 8: DEPLOY** — Commit JSON and schema.

## 4.0 THE V20 STOP CONDITION

The Learning Loop will continue to recursively run on itself until the V20 Stop Condition is met. This condition is machine-enforceable in the schema:

The `v20_stop_condition_met` field MUST be `true` only when:
1. `memory_loss_probability` < 0.01
2. The `anti_drift_violations` array is empty for the entire run
3. `performance_scoring.score` >= 100

---
*End of Protocol.*
