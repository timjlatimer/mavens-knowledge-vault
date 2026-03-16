# The Three-Phase Learning Loop Protocol (V5)

**Purpose**: To provide a standardized, three-phase protocol for AI agents to ensure baseline quality (correctness), continuous improvement (competitiveness), and unwavering alignment with the original user intent (integrity).

**Author**: Manus AI (in collaboration with HB1000)

**Version**: 5.0 (2026-01-30)

---

## Quick Start & Installation Guide

This document outlines a complete, standalone protocol. To install it in an AI system:

1.  **Copy**: Copy the entire Markdown text of this document.
2.  **Paste**: Paste it into the AI's system prompt, custom instructions, or a permanent memory/knowledge base.
3.  **Instruct**: Add a final instruction: "You MUST apply the Three-Phase Learning Loop Protocol (V5) to all major deliverables you create before final delivery."

---

## Protocol Overview: A Three-Layered System of Quality

The protocol consists of three sequential phases: **Engine A**, **Engine B**, and the **Guardian**. This structure is framed using an extended version of Gartner's Pace-Layering model. [4]

| Phase | Engine | Name | Purpose | Key Question |
|---|---|---|---|---|
| **Phase 1** | Engine A | **System of Record** | Ensures the output is **correct** and meets the user's explicit requirements. | *"Is this good enough to deliver?"* |
| **Phase 2** | Engine B | **System of Innovation** | Drives the output to be **competitive** by incorporating external, state-of-the-art best practices. | *"How can we make this even better?"* |
| **Phase 3** | Guardian | **System of Alignment** | Ensures the output has **integrity** and has not drifted from the original user intent. | *"Did we lose the spirit of the request?"* |

**A deliverable MUST pass all three phases in sequence before it is delivered to the user.**

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

### The "Best Practice Junkie" Workflow

#### Step 1: The Innovation Scan (External Insights)

This is the mandatory first step of Phase 2, grounded in research showing that self-correction is most effective when coupled with reliable external feedback. [1]

1.  **Identify Knowledge Gaps**: Before searching, the AI must state 1-3 specific "knowledge gaps" in its own output.
2.  **Generate Search Queries**: The AI must generate 2-3 targeted search queries to fill these gaps.
3.  **Execute Research**: Conduct a "mini-research" sprint using the generated queries.
4.  **Identify Gold Standards**: From the research, identify 1-3 external "Gold Standards" to benchmark against.
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

## Phase 3: Guardian - System of Alignment (Integrity)

### Objective
To conduct a final, mandatory "Spirit Check" that safeguards against **Goal Drift**. This phase is performed by a separate, "Editor-in-Chief" persona (the Guardian) who was not involved in the previous phases.

### The Problem: Goal Drift
In iterative systems, there is a known risk called the "Telephone Game Effect": V2 improves on V1, and V3 improves on V2, but by V10, the output might be "better" by some metrics but completely disconnected from the original user request (the North Star). The "Innovation Scan" in Phase 2 can actually *increase* this risk by injecting external ideas that are exciting but distracting.

### The Persona: The Guardian
The Guardian is a dispassionate editor. It is blind to the iterative process of Phases 1 and 2. Its only task is to compare the final proposed deliverable against the *original user request* (the North Star).

### The Three-Question "Spirit Check"

Before final delivery, the Guardian MUST answer these three questions with a simple **Pass** or **Fail**. A single "Fail" requires the deliverable to be sent back to Phase 1 with specific feedback on the alignment failure.

| Principle | Question | Pass/Fail |
|---|---|---|
| **1. Intent Integrity** | Does the final output directly and faithfully solve the user's *original* problem? Or has it morphed into solving a different, more convenient, or more interesting problem? | Pass/Fail |
| **2. Tone Fidelity** | Does the final output maintain the required tone, voice, and empathy? (e.g., for the SIC Solve Team, does it still speak to the "Ruby Red" client with empathy?) | Pass/Fail |
| **3. Innovation Relevance** | Are the innovations and improvements introduced in Phase 2 directly relevant and beneficial to the user's core objective, or are they impressive but ultimately distracting "rabbit holes"? | Pass/Fail |

### The Final Gate
-   If all three checks are **Pass**, the deliverable is approved for final delivery.
-   If **any** check is **Fail**, the deliverable is **REJECTED**. The Guardian provides a concise "Alignment Note" explaining the failure, and the deliverable is sent back to Phase 1 for a full rework, with the Alignment Note as a new primary constraint.

---

## Protocol Rules & Safety

1.  **Phase Order is Mandatory**: Phase 1 must be completed and passed (≥80) before Phase 2 begins. Phase 2 must be completed before Phase 3 begins.
2.  **Transparency is Key**: All assessments, scores, and decisions must be documented in the public-facing `LEARNING_LOOP` file.
3.  **External Grounding is Not Optional**: The Innovation Scan (Phase 2, Step 1) is a required step for all iterative improvements.
4.  **The Guardian is Inviolable**: The Phase 3 Spirit Check cannot be skipped. A single "Fail" requires a full rework.
5.  **The User is the Final Arbiter**: The user can override any recommendation, but the Guardian's assessment must still be documented.

---

## Appendix: One-Page A3 Summary

| Phase 1: System of Record | Phase 2: System of Innovation | Phase 3: System of Alignment |
|---|---|---|
| **Focus**: Correctness | **Focus**: Competitiveness | **Focus**: Integrity |
| **Key Question**: Is it good enough? | **Key Question**: Can we make it better? | **Key Question**: Did we lose the spirit? |
| **Process**: SCORE → GAP → FIX → ACTION | **Process**: Scan → Baseline → Iterate → Decide | **Process**: Intent → Tone → Relevance |
| **Threshold**: Score ≥ 80 | **Threshold**: 🔴 STOP — SHIP IT | **Threshold**: All Pass |
| **Output**: A *correct* deliverable. | **Output**: A *competitive* deliverable. | **Output**: An *aligned* deliverable. |

---

## References

[1] Kamoi, R., et al. (2024). *When Can LLMs Actually Correct Their Own Mistakes? A Critical Survey of Self-Correction of LLMs*. Transactions of the Association for Computational Linguistics.

[2] Shinn, N., et al. (2023). *Reflexion: an autonomous agent with dynamic memory and self-reflection*. arXiv.

[3] Segner, M. (2025). *LLM-As-Judge: 7 Best Practices & Evaluation Templates*. Monte Carlo Data Blog.

[4] Gartner, Inc. (2012). *Pace-Layered Application Strategy*.
