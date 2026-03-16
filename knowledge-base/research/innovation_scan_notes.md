# Innovation Scan: AI Self-Correction & Quality Assurance (2024-2025)

## Source 1: MIT/TACL Paper - "When Can LLMs Actually Correct Their Own Mistakes?" (2024)
**Authors**: Ryo Kamoi, Yusen Zhang, Nan Zhang, Jiawei Han, Rui Zhang
**Citation Count**: 171 (highly influential)

### Key Findings:
1. **Self-correction with prompting alone (no external feedback) does NOT reliably work** for general tasks.
2. **Self-correction IS effective when**:
   - Reliable **external feedback** is available.
   - **Large-scale fine-tuning** has been applied.
   - The task has **decomposable responses** (exceptionally suited for self-correction).
3. **The bottleneck is feedback generation**: The LLM cannot reliably judge its own output without external grounding.

### Implications for Our Protocol:
- **Validates our "Best Practice Junkie" addition**: External research provides the "reliable external feedback" that the paper identifies as the key enabler of successful self-correction.
- **Internal self-scoring (Phase 1) is necessary but insufficient**: It catches obvious errors but cannot identify gaps relative to the state-of-the-art.
- **External benchmarking (Phase 2 Innovation Scan) is the missing piece**: It provides the "external information" that makes self-correction effective.

### Research Questions Framework (from paper):
- **RQ1**: When can LLMs self-correct based solely on inherent capabilities? → **Generally, they cannot.**
- **RQ2**: When can LLMs self-correct with external information? → **When reliable external feedback is available.**
- **RQ3**: When are final outputs of self-correction better than other approaches? → **Still unclear; strong baselines needed.**

---

## Next: Research more on iterative refinement protocols and LLM evaluation frameworks.


---

## Source 2: Reflexion Framework (2023-2025) - "Building a Self-Correcting AI"
**Based on**: Shinn et al. Reflexion Paper
**Performance**: Boosted GPT-4 on HumanEval from 80% to 91%

### Core Philosophy: Verbal Reinforcement, Not Weight Updates
- **Key Insight**: Instead of expensive fine-tuning (adjusting model weights), Reflexion uses **"verbal reinforcement"** — feedback in natural language.
- **"Semantic Gradient"**: The agent's self-critique acts as a "gradient" pointing toward improvement, but it's text, not numbers.
- **Optimization happens in the context window**, not over training epochs.

### The Reflexion Loop (3 Stages):
1.  **Generate**: Produce an initial response.
2.  **Reflect**: Critically self-evaluate to identify flaws and knowledge gaps.
3.  **Research & Revise**: Autonomously perform web research to gather new information, then revise.

### Episodic Memory: The Key to Learning
- The agent stores its self-critiques in an **"episodic memory buffer"**.
- This log of past attempts, errors, and lessons is provided as context in subsequent trials.
- **Mimics human learning**: We reflect on failures to formulate an improved "plan of attack."

### Implications for Our Protocol:
- **Validates the two-phase structure**: Phase 1 (Generate & Score) → Phase 2 (Reflect, Research, Revise).
- **The "Best Practice Junkie" step IS the "Research" component**: It provides the external grounding that enables effective self-correction.
- **Memory is crucial**: The protocol should document findings for future iterations.

---

## Source 3: Emergent Mind - "Iterative Refinement Protocol" (Nov 2025)
**URL**: https://www.emergentmind.com/topics/iterative-refinement-protocol

### Definition:
> "Iterative refinement is a strategy where an initial solution is incrementally improved using structured feedback until defined accuracy criteria are met."

### Key Design Principles:
1.  **Structured Feedback**: Not just "make it better," but specific, actionable critique.
2.  **Defined Accuracy Criteria**: A clear stopping condition (like our 80/100 threshold and diminishing returns flag).
3.  **Incremental Improvement**: Small, measurable steps, not wholesale rewrites.

---

## Synthesis: Gold Standards for Our V3 Protocol

Based on this Innovation Scan, the state-of-the-art for AI self-correction in 2024-2025 converges on three principles:

| Principle | MIT Paper Finding | Reflexion Framework | Our V3 Protocol |
|---|---|---|---|
| **External Feedback is Essential** | "Self-correction works well in tasks that can use reliable external feedback." | The "Research" step grounds the agent in real-world data. | **The "Best Practice Junkie" Innovation Scan** |
| **Verbal Reinforcement** | N/A (focuses on conditions) | Self-critique as a "semantic gradient." | **The 4-Question Process (SCORE, GAP, FIX, ACTION)** |
| **Memory & Iteration Tracking** | N/A | "Episodic memory buffer" stores past reflections. | **The Summary Table with KPIs (Gain, %, Diminishing Returns)** |

### New Best Practice to Integrate:
- **Explicit "Knowledge Gap" Identification**: The Reflexion framework explicitly identifies "knowledge gaps" during reflection. Our V3 should formalize this as part of the Innovation Scan step.
- **Query Generation**: The agent should generate specific search queries to fill identified gaps, not just generic "best practices" searches.



---

## Source 4: Monte Carlo - "LLM-As-Judge: 7 Best Practices & Evaluation Templates" (Nov 2025)
**URL**: https://www.montecarlodata.com/blog-llm-as-judge/
**Author**: Michael Segner

### Key Insight: LLM-as-Judge Works for Trend Detection, Not Individual Precision
> "Individual evaluations can be flaky at times, but when smoothed and monitored over time with anomaly detection, LLM-as-judge evaluations are a valid means for detecting and resolving issues."

### Why LLM-as-Judge is Necessary:
- LLMs are **non-deterministic systems** (same input, different outputs).
- Traditional metrics (ROUGE, BLEU, cosine similarity) **fail to capture semantic meaning**.
- LLM-as-judge is "one of the only practical, scalable approaches for understanding the underlying meaning of a non-deterministic response."

### When NOT to Use LLM-as-Judge:
1.  When the output has a **deterministic format** (JSON, zip codes, etc.) — use code-based monitors.
2.  When evaluating **simple binary conditions** (forbidden words, required citations).
3.  When evaluating at **small scale in development** — use human annotators.

### The 7 Best Practices (from article structure):
1.  **Step Decomposition**: Break evaluation into steps.
2.  **Scoring Rubric**: Define clear scoring criteria (1-5 scale with descriptions).
3.  **Evaluation Criteria**: Explicitly list what to evaluate (relevancy, clarity, helpfulness, prompt adhesion).
4.  **Smoothing Over Time**: Don't rely on single evaluations; track trends.
5.  **Anomaly Detection**: Alert on degradations, not absolute scores.
6.  **Task-Specific Prompts**: Customize evaluation prompts per task.
7.  **Evaluate Your Evaluators**: Validate the judge's accuracy periodically.

### Implications for Our Protocol:
- **Validates our scoring rubric approach**: The 1-5 scale with explicit descriptions (like our 0-20 per dimension) is a best practice.
- **Supports trend tracking**: Our Summary Table with KPIs (Gain, %, Diminishing Returns) aligns with "smoothing over time."
- **Reinforces the need for external grounding**: The article confirms that internal self-evaluation alone is "flaky."

---

## Innovation Scan Summary: Gold Standards for V3 Protocol

| Best Practice | Source | Our V3 Implementation |
|---|---|---|
| **External Feedback Required** | MIT Paper (2024) | **Innovation Scan Step** |
| **Verbal Reinforcement / Semantic Gradient** | Reflexion Framework | **4-Question Process (SCORE, GAP, FIX, ACTION)** |
| **Episodic Memory / Iteration Tracking** | Reflexion Framework | **Summary Table with KPIs** |
| **Explicit Scoring Rubric** | Monte Carlo (2025) | **5 Dimensions × 20 Points Each** |
| **Trend Tracking, Not Single Scores** | Monte Carlo (2025) | **Diminishing Returns Flag** |
| **Knowledge Gap Identification** | Reflexion Framework | **New: Explicit "Gap Analysis" in Innovation Scan** |
| **Query Generation for Research** | Reflexion Framework | **New: Generate specific search queries** |

### New Features to Add to V3:
1.  **Explicit "Knowledge Gap" Identification**: Before the Innovation Scan, identify specific gaps in the output that external research should address.
2.  **Query Generation**: Generate 2-3 specific search queries to fill identified gaps.
3.  **Gold Standard Comparison**: Find 1-3 external "Gold Standards" to benchmark against.
4.  **External Insights Section**: Document what was learned from the Innovation Scan in the assessment.

