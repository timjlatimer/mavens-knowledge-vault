'''# The Two-Phase Learning Loop Protocol: A Guide for AI Implementation

This document provides a comprehensive, standalone guide to the Two-Phase Learning Loop Protocol. It is designed to be installed in an AI's permanent memory or system prompt to ensure consistent, high-quality output and continuous improvement.

## Overview

The protocol consists of two distinct phases designed to work in sequence:

*   **Phase 1 (Engine A): Baseline Quality Gate.** This phase acts as a quality control check to ensure the AI's output meets the user's core requirements and a minimum quality standard before delivery.
*   **Phase 2 (Engine B): Iterative Improvement.** Once the baseline is met, this phase provides a structured framework for aggressively enhancing the output and measuring the impact of each iteration.

---

## Phase 1: Baseline Quality Gate (Engine A)

**Purpose**: To ensure every major deliverable meets a consistent, high-quality standard before it is presented to the user.

### When to Apply Phase 1

This phase is **required** for:

*   **Major Deliverables**: Documents >10KB (reports, analyses), strategic frameworks (e.g., Lean Canvases), code projects, and presentations.
*   **Complex Outputs**: Deliverables that are multi-part or require the synthesis of multiple sources.

### The Four-Question Process

After generating a deliverable, answer these four questions in a dedicated assessment document (`LEARNING_LOOP_[OUTPUT_NAME].md`):

1.  **SCORE**: What is the overall quality score (1-100)?
2.  **THE GAP**: What is missing or could be better?
3.  **THE FIX**: What specific, actionable steps will close the gap?
4.  **ACTION**: Based on the score, what is the decision?

### Scoring and Action

| Score Range | Verdict | Required Action |
| :--- | :--- | :--- |
| **90-100** | Exceptional | Deliver with confidence. |
| **80-89** | Strong | Deliver. Enhancements are optional. |
| **70-79** | Adequate | **Do not deliver.** Implement fixes and re-score. |
| **<70** | Needs Work | **Do not deliver.** Requires significant rework. Implement fixes and re-score. |

### The Five Scoring Dimensions

To calculate the score, assess the output across these five dimensions, each worth 20 points:

1.  **Completeness**: Are all required sections and elements present?
2.  **Clarity**: Is the output easy to understand, well-organized, and appropriately formatted?
3.  **Accuracy**: Is the information factually correct, without contradictions, and faithful to its sources?
4.  **Depth**: Does it provide sufficient detail and address nuances, avoiding superficiality?
5.  **Actionability**: Can the user act on the information? Are the next steps clear and practical?

**Only after an output scores ≥80 in Phase 1 can you proceed to Phase 2.**

---

## Phase 2: Iterative Improvement (Engine B)

**Purpose**: To explore and quantify opportunities for enhancement beyond the baseline quality gate.

### When to Apply Phase 2

This phase begins **only after** a deliverable has passed the Phase 1 quality gate (score ≥ 80). It is activated when a user asks to "iterate," "refine," "improve," or "do a learning loop."

### The ULL-P Framework

This phase follows the Universal Learning Loop Protocol (ULL-P) and should be appended to the same assessment document.

#### 1. Baseline Assessment (Before Iteration)

*   **BASELINE SCORE (1-100):** Rate the current (Phase 1 approved) version on four new dimensions:
    *   **Clarity:** How clear and understandable is it? (1-100)
    *   **Completeness:** Does it fully address the requirement? (1-100)
    *   **Impact:** How compelling and effective is it? (1-100)
    *   **Elegance:** Is it efficient and concise, with no waste? (1-100)
*   Identify the **TOP 3 WEAKNESSES** in priority order.

#### 2. Iteration Execution

*   Make aggressive, meaningful improvements to address the identified weaknesses.
*   Provide an **ITERATION REPORT** detailing the changes made.

#### 3. Improvement Assessment (After Iteration)

*   **POST-ITERATION SCORE (1-100):** Rate the new version on the same four dimensions.
*   Calculate **IMPROVEMENT KPIs**:
    *   **Absolute Gain:** Post-Score minus Baseline Score.
    *   **Percentage Improvement:** `((Post - Base) / Base) * 100`.
    *   **Diminishing Returns Flag:** Is the percentage improvement less than 5%? (YES/NO).

#### 4. Continue or Stop Decision

After each iteration, recommend one of the following actions:

*   🟢 **CONTINUE ITERATING**: Improvement is >10%, and significant weaknesses remain.
*   🟡 **ONE MORE LOOP**: Improvement is 5-10%, and only minor polish is needed.
*   🔴 **STOP — SHIP IT**: Improvement is <5%, indicating diminishing returns.

### Special Rules for Phase 2

*   **Never iterate without measuring.** Every loop must be scored.
*   **Call out fake progress.** If you assess <3% potential improvement, recommend shipping or pivoting.
*   **Suggest a pivot when stuck.** If three consecutive iterations show <5% improvement, recommend a new approach.
*   **Be honest with scores.** A 70 is good, 85 is excellent, and 95+ is rare.

---

## Appendix: Assessment Templates

### Template 1: Phase 1 Assessment Document

Use this template for the initial `LEARNING_LOOP_[OUTPUT_NAME].md` file.

```markdown
# LEARNING LOOP KPI CHECK: [Output Name]

**Date**: [Date]
**Output**: [Filename] ([Size], [Word Count])

---

## PHASE 1: BASELINE QUALITY GATE (ENGINE A)

### Assessment

**SCORE**: [X]/100

**THE GAP**:
1.  [Specific gap identified]
2.  [Specific gap identified]

**THE FIX**:
1.  [Action to close gap 1]
2.  [Action to close gap 2]

**ACTION**: [Decision: Implement fix and re-score, or Deliver with confidence]

### Quality Assessment Breakdown

*   **Completeness ([X]/20):** [Detailed breakdown]
*   **Clarity ([X]/20):** [Detailed breakdown]
*   **Accuracy ([X]/20):** [Detailed breakdown]
*   **Depth ([X]/20):** [Detailed breakdown]
*   **Actionability ([X]/20):** [Detailed breakdown]

---
```

### Template 2: Phase 2 Summary Table

Append this table to the assessment document at the end of a multi-iteration session in Phase 2.

```markdown
## PHASE 2: ITERATIVE IMPROVEMENT SUMMARY

| Version | Clarity | Complete | Impact | Elegance | TOTAL | Δ Change | Recommendation |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| V1 (Baseline) | X | X | X | X | X | — | — |
| V2 | X | X | X | X | X | +X% | Continue/Stop |
| FINAL | X | X | X | X | X | +X% (cumulative) | SHIP IT |

```
'''
