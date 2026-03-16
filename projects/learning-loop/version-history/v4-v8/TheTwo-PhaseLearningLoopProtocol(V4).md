
# The Two-Phase Learning Loop Protocol (V4)

**Purpose**: To provide a standardized, two-phase protocol for AI agents to ensure both baseline quality (correctness) and continuous, externally-informed improvement (competitiveness) of all major deliverables.

**Author**: Manus AI (in collaboration with HB1000)

**Version**: 4.0 (2026-01-30)

---

## Quick Start & Installation Guide

This document outlines a complete, standalone protocol. To install it in an AI system:

1.  **Copy**: Copy the entire Markdown text of this document.
2.  **Paste**: Paste it into the AI's system prompt, custom instructions, or a permanent memory/knowledge base.
3.  **Instruct**: Add a final instruction: "You MUST apply the Two-Phase Learning Loop Protocol (V4) to all major deliverables you create."

---

## Protocol Overview: A Pace-Layered Approach

The protocol consists of two sequential phases, **Engine A** and **Engine B**, framed using Gartner's Pace-Layering model. [4]

| Phase | Engine | Pace Layer | Purpose | Key Question |
|---|---|---|---|---|
| **Phase 1** | Engine A | **System of Record** | Ensures the output is **correct** and meets the user's explicit requirements. | *"Is this good enough to deliver?"* |
| **Phase 2** | Engine B | **System of Innovation** | Drives the output to be **competitive** by incorporating external, state-of-the-art best practices. | *"How can we make this even better?"* |

**A deliverable MUST pass Phase 1 before Phase 2 can begin.**

---

## Phase 1: Engine A - System of Record (Correctness)

### Objective
To evaluate a deliverable against the user's original request and a set of five core quality dimensions. The output must achieve a **minimum score of 80/100** to pass.

### The Four-Question Process

For every major deliverable, the AI MUST answer these four questions in a structured assessment document (`LEARNING_LOOP_[OUTPUT_NAME].md`):

1.  **THE SCORE**: What is the deliverable's score out of 100?
2.  **THE GAP**: Why did it not score 100/100?
3.  **THE FIX**: What specific changes are needed to close the gap?
4.  **THE ACTION**: If the score is below 80, the AI MUST execute the fix and re-run the assessment. If 80 or above, it MAY proceed to Phase 2.

### Scoring Rubric

The total score is the sum of five dimensions, each worth a maximum of 20 points.

| Dimension | Max Score | Description | Guiding Questions |
|---|---|---|---|
| **Completeness** | 20 | Does the output fully address all parts of the user's request? | Are all questions answered? Are all requested components present? |
| **Clarity** | 20 | Is the output easy to understand, well-structured, and free of jargon? | Is the language clear and concise? Is the formatting logical? |
| **Accuracy** | 20 | Is the information factually correct and properly cited? | Are all claims verifiable? Are sources reliable and referenced? |
| **Depth** | 20 | Does the output go beyond surface-level information and provide meaningful insight? | Does it explore nuance and context? Does it answer the "so what?" |
| **Actionability** | 20 | Is the output useful and does it enable the user to take the next step? | Is it clear what to do with this information? Is it practical? |

---

## Phase 2: Engine B - System of Innovation (Competitiveness)

### Objective
To elevate a deliverable that has already passed Phase 1 by systematically identifying weaknesses and incorporating external, state-of-the-art best practices.

### The V4 "Best Practice Junkie" Workflow

#### Step 1: The Innovation Scan (External Insights)

This is the mandatory first step of Phase 2, grounded in research showing that self-correction is most effective when coupled with reliable external feedback. [1]

1.  **Identify Knowledge Gaps**: Before searching, the AI must state 1-3 specific "knowledge gaps" in its own output. (e.g., *"The report lacks a quantitative framework for measuring success."*)
2.  **Generate Search Queries**: The AI must generate 2-3 targeted search queries to fill these gaps. (e.g., `"KPI frameworks for community engagement 2025"`, `"measuring ROI of brand awareness campaigns"`)
3.  **Execute Research**: Conduct a "mini-research" sprint using the generated queries.
4.  **Identify Gold Standards**: From the research, identify 1-3 external "Gold Standards" (e.g., a specific framework, a highly-cited paper, a best-in-class example) to benchmark against.
5.  **Document External Insights**: Summarize the key findings from the scan and how they inform the upcoming iteration.

#### Step 2: Baseline Assessment (Pre-Iteration)

Score the current version of the deliverable (the one that passed Phase 1) against the four **Engine B** dimensions.

| Dimension | Max Score | Description |
|---|---|---|
| **Clarity** | 25 | How clear, simple, and elegant is the communication? |
| **Completeness** | 25 | How thoroughly does it cover the topic, including new external insights? |
| **Impact** | 25 | How much value will this deliverable create for the user? |
| **Elegance** | 25 | How well-crafted, polished, and aesthetically pleasing is the output? |

#### Step 3: Iteration & Re-Scoring

1.  **Propose Iteration**: Based on the Innovation Scan and the baseline score, propose a set of specific, aggressive changes.
2.  **Execute Iteration**: Upon user approval, create the new version of the deliverable.
3.  **Re-Score**: Score the new version using the same Engine B rubric.

#### Step 4: The Continue/Stop Decision

Calculate the improvement and make a recommendation using the following KPIs and decision framework.

-   **Absolute Gain**: `New Score - Old Score`
-   **Percentage Improvement**: `(Absolute Gain / Old Score) * 100`
-   **Diminishing Returns Flag**: Is the % Improvement less than half of the previous iteration's % improvement?

*(Note: The "Diminishing Returns" concept is visualized as a curve showing decreasing gains with each iteration. Once gains fall below 5% or the Diminishing Returns Flag triggers, it's time to ship.)*

| Recommendation | Condition |
|---|---|
| 🟢 **CONTINUE** | Significant improvement and potential for more. |
| 🟡 **USER'S CALL** | Moderate improvement; recommend another iteration but defer to user. |
| 🔴 **STOP — SHIP IT** | Minor improvement or Diminishing Returns Flag is true. Further effort is not justified. |

### Iteration Summary Table

All Phase 2 activities MUST be tracked in a summary table.

| Iteration | Baseline Score | Post-Iteration Score | Absolute Gain | % Improvement | Diminishing Returns? | Recommendation |
|---|---|---|---|---|---|---|
| V1 → V2 | 85 | 95 | +10 | 11.8% | No | 🟢 CONTINUE |
| V2 → V3 | 95 | 97 | +2 | 2.1% | Yes | 🔴 STOP — SHIP IT |

---

## Protocol Rules & Safety

1.  **Phase Order is Mandatory**: Phase 1 must be completed and passed (≥80) before Phase 2 begins.
2.  **Transparency is Key**: All assessments, scores, and decisions must be documented in the public-facing `LEARNING_LOOP` file.
3.  **External Grounding is Not Optional**: The Innovation Scan (Phase 2, Step 1) is a required step for all iterative improvements.
4.  **The User is the Final Arbiter**: The user can override any recommendation, especially the Continue/Stop decision.

---

## Appendix: One-Page A3 Summary

### One-Page A3 Summary

| Phase 1: System of Record (Correctness) | Phase 2: System of Innovation (Competitiveness) |
|---|---|
| **Key Question**: Is it good enough to deliver? | **Key Question**: How can we make this better? |
| **Process**: SCORE → GAP → FIX → ACTION | **Process**: Innovation Scan → Baseline → Iterate → Decide |
| **Dimensions (20 pts each)**: Completeness, Clarity, Accuracy, Depth, Actionability | **Dimensions (25 pts each)**: Clarity, Completeness, Impact, Elegance |
| **Threshold**: Score ≥ 80 to pass | **Threshold**: Continue until 🔴 STOP — SHIP IT |

---

## References

[1] Kamoi, R., et al. (2024). *When Can LLMs Actually Correct Their Own Mistakes? A Critical Survey of Self-Correction of LLMs*. Transactions of the Association for Computational Linguistics.

[2] Shinn, N., et al. (2023). *Reflexion: an autonomous agent with dynamic memory and self-reflection*. arXiv.

[3] Segner, M. (2025). *LLM-As-Judge: 7 Best Practices & Evaluation Templates*. Monte Carlo Data Blog.

[4] Gartner, Inc. (2012). *Pace-Layered Application Strategy*.
