# Two-Phase Learning Loop Protocol V4 - Slide Content Outline

## Slide 1: Title Slide
- **Title**: The Two-Phase Learning Loop Protocol (V4)
- **Subtitle**: A Standard Operating Procedure for the SIC Solve Team
- **Author**: Manus AI in collaboration with HB1000
- **Date**: January 2026

---

## Slide 2: The Core Problem: AI Self-Correction Has Limits
- **Headline**: Self-correction without external feedback leads to "local maximum" quality
- **Key Points**:
  - 2024 MIT research confirms: LLMs struggle to correct their own mistakes without external input [1]
  - Internal reflection can only optimize based on what the AI already knows
  - Result: Outputs that are "good enough" but never "state-of-the-art"
- **Visual**: Concept of a closed loop vs. an open loop

---

## Slide 3: The Solution: A Two-Phase, Externally-Grounded Protocol
- **Headline**: Combining correctness (Phase 1) with competitiveness (Phase 2)
- **Key Points**:
  - **Phase 1 (Engine A)**: System of Record — ensures the output is *correct*
  - **Phase 2 (Engine B)**: System of Innovation — ensures the output is *competitive*
  - Framed using Gartner's Pace-Layering model for clarity
- **Visual**: Two-column comparison table

---

## Slide 4: Phase 1 — System of Record (Correctness)
- **Headline**: The Baseline Quality Gate ensures outputs meet a minimum standard of 80/100
- **Key Points**:
  - **The Four-Question Process**: SCORE → GAP → FIX → ACTION
  - **Five Dimensions** (20 pts each): Completeness, Clarity, Accuracy, Depth, Actionability
  - If score < 80, the AI MUST fix and re-assess before proceeding
- **Visual**: Flowchart of the four-question process

---

## Slide 5: Phase 2 — System of Innovation (Competitiveness)
- **Headline**: The Iterative Improvement Engine drives outputs from "good enough" to "state-of-the-art"
- **Key Points**:
  - Begins only AFTER Phase 1 is passed (score ≥ 80)
  - **Four Dimensions** (25 pts each): Clarity, Completeness, Impact, Elegance
  - Uses a Continue/Stop decision framework based on diminishing returns
- **Visual**: Flowchart of the Phase 2 process

---

## Slide 6: The V4 Upgrade — The "Best Practice Junkie" Innovation Scan
- **Headline**: V4 mandates external research before every iteration
- **Key Points**:
  - **Step 1**: Identify 1-3 knowledge gaps in the current output
  - **Step 2**: Generate 2-3 targeted search queries
  - **Step 3**: Execute a mini-research sprint
  - **Step 4**: Identify 1-3 external "Gold Standards" to benchmark against
  - **Step 5**: Document external insights
- **Visual**: The five-step Innovation Scan process

---

## Slide 7: Case Study — Applying V4 to Its Own Creation
- **Headline**: The protocol was used to improve itself from V3 to V4
- **Key Points**:
  - **V3 Baseline Score**: 94/100
  - **Innovation Scan Findings**: Identified need for Pace-Layering framing, diminishing returns visualization, and A3 summary
  - **V4 Post-Iteration Score**: 100/100
  - **Improvement**: +6 points (+6.4%)
- **Visual**: Before/After comparison

---

## Slide 8: The Continue/Stop Decision Framework
- **Headline**: Knowing when to ship is as important as knowing how to improve
- **Key Points**:
  - **KPIs**: Absolute Gain, Percentage Improvement, Diminishing Returns Flag
  - 🟢 **CONTINUE**: Significant improvement, potential for more
  - 🟡 **USER'S CALL**: Moderate improvement, defer to user
  - 🔴 **STOP — SHIP IT**: Minor improvement or diminishing returns
- **Visual**: The traffic light decision framework

---

## Slide 9: One-Page A3 Summary
- **Headline**: A quick-reference guide for day-to-day use
- **Content**: Two-column table summarizing Phase 1 and Phase 2
  - Phase 1: Key Question, Process, Dimensions, Threshold
  - Phase 2: Key Question, Process, Dimensions, Threshold

---

## Slide 10: Key Takeaways
- **Headline**: Three principles for AI quality assurance
- **Key Points**:
  1. **Correctness First**: Always pass the 80-point baseline before iterating.
  2. **External Grounding is Mandatory**: The Innovation Scan is not optional.
  3. **Know When to Ship**: Use the Continue/Stop framework to avoid over-engineering.

---

## Slide 11: Call to Action
- **Headline**: Install the protocol and start using it today
- **Key Points**:
  - **For Manus Users**: The skill is already active in your environment.
  - **For Other AIs**: Copy the Markdown document into your system prompt or custom instructions.
  - **For Teams**: Use the A3 summary as a quick-reference poster.

---

## References
[1] Kamoi, R., et al. (2024). *When Can LLMs Actually Correct Their Own Mistakes?*. MIT.
[2] Shinn, N., et al. (2023). *Reflexion: an autonomous agent with dynamic memory and self-reflection*. arXiv.
[3] Segner, M. (2025). *LLM-As-Judge: 7 Best Practices*. Monte Carlo Data Blog.
[4] Gartner, Inc. (2012). *Pace-Layered Application Strategy*.
