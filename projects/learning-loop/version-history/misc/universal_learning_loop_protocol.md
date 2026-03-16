# Universal Learning Loop Protocol (ULL-P)

This document outlines the Universal Learning Loop Protocol (ULL-P), a framework for iterative improvement of an output that has already met its baseline quality requirements.

## The Core Mechanism

The ULL-P is a multi-phase process designed to guide iterative refinement and measure the impact of each change.

### PHASE 1: BASELINE ASSESSMENT (Before Iteration)

- **BASELINE SCORE (1-100):** Rate the current version on these dimensions:
    - **CLARITY:** How clear and understandable is it? (1-100)
    - **COMPLETENESS:** Does it fully address the requirement? (1-100)
    - **IMPACT:** How compelling/effective is it? (1-100)
    - **ELEGANCE:** Is it efficient, tight, no waste? (1-100)
    - **BASELINE TOTAL:** Average of all four (X/100)
- Identify the **TOP 3 WEAKNESSES** in priority order.

### PHASE 2: ITERATION EXECUTION

- Make aggressive, meaningful improvements.
- After each iteration, provide an **ITERATION REPORT**:
    - Version: (V1, V2, V3, etc.)
    - Changes Made: (Bullet list of specific changes)
    - Weaknesses Addressed: (Which of the top 3 were fixed)
    - New Weaknesses Introduced: (If any)

### PHASE 3: IMPROVEMENT ASSESSMENT (After Iteration)

- **POST-ITERATION SCORE (1-100):** Rate the new version on the same four dimensions.
- **IMPROVEMENT KPIs:**
    - **ABSOLUTE GAIN:** Post-score minus Baseline
    - **PERCENTAGE IMPROVEMENT:** ((Post - Baseline) / Baseline) × 100
    - **DIMINISHING RETURNS FLAG:** Is this iteration showing less than 5% improvement? (YES/NO)

### PHASE 4: CONTINUE OR STOP DECISION

Recommend one of the following after each iteration:

- 🟢 **CONTINUE ITERATING** — Improvement >10%, significant weaknesses remain
- 🟡 **ONE MORE LOOP** — Improvement 5-10%, minor polish needed
- 🔴 **STOP — SHIP IT** — Improvement <5%, diminishing returns, ready for use

### PHASE 5: LEARNING LOOP SUMMARY TABLE

At the end of a session, provide a summary table:

| Version | Clarity | Complete | Impact | Elegance | TOTAL | Δ Change | Recommendation |
|---|---|---|---|---|---|---|---|
| V1 (Baseline) | X | X | X | X | X | — | — |
| V2 | X | X | X | X | X | +X% | Continue/Stop |
| FINAL | X | X | X | X | X | +X% cumulative | SHIP IT |

## Special Rules

1.  **NEVER iterate without measuring.**
2.  **CALL OUT FAKE PROGRESS.** If potential improvement is <3%, recommend shipping or pivoting.
3.  **SUGGEST PIVOT WHEN STUCK.** If three consecutive iterations show <5% improvement, recommend a new approach.
4.  **BE HONEST ABOUT SCORES.** 70=good, 85=excellent, 95+=rare.
5.  **DEFAULT STARTING ASSUMPTION:** First drafts are usually 60-70.
