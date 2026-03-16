
**URL:** https://developers.openai.com/cookbook/examples/partners/self_evolving_agents/autonomous_agent_retraining

---

Resources
Codex
ChatGPT
Blog
Search
⌘
K
Home
Changelog
Docs MCP
Categories
Code
Cookbooks
Guides
Videos
Topics
Agents
Audio & Voice
Computer use
Codex
Evals
gpt-oss
Fine-tuning
Image generation
Scaling
Tools
Video generation
Overview
1. Use Case Overview: Self-Evolving Agents in Healthcare
2. Using the OpenAI Evals Platform
3. Self-evolving Loop with LLM-as-a-Judge
Agent Setup
Starting self-evolving loop | Initial prompt v0 Prompt:You are a summarization assistant. Given a section of text, produce a summary.
[Section 7.1] Using prompt v0 Attempt 1: evaluating summary… Scores — avg=0.805, total=3.218, lenient_passed=False Failed eval. Improving prompt… Prompt improved → v1 Attempt 2: evaluating summary… Scores — avg=0.720, total=2.881, lenient_passed=False Failed eval. Improving prompt… Prompt improved → v2 Attempt 3: evaluating summary… Scores — avg=0.762, total=3.048, lenient_passed=True Passed with prompt v2 [Section 7.2] Using prompt v2 Attempt 1: evaluating summary… Scores — avg=0.612, total=2.450, lenient_passed=False Failed eval. Improving prompt… Prompt improved → v3 Attempt 2: evaluating summary… Scores — avg=0.915, total=3.660, lenient_passed=True Passed with prompt v3 [Section 3.2.P.2.1] Using prompt v3 Attempt 1: evaluating summary… Scores — avg=0.684, total=2.736, lenient_passed=False Failed eval. Improving prompt… Prompt improved → v4 Attempt 2: evaluating summary… Scores — avg=0.684, total=2.736, lenient_passed=False Failed eval. Improving prompt… Prompt improved → v5 Attempt 3: evaluating summary… Scores — avg=0.920, total=3.680, lenient_passed=True Passed with prompt v5 [Section 3.2.P.2.2] Using prompt v5 Attempt 1: evaluating summary… Scores — avg=0.737, total=2.950, lenient_passed=True Passed with prompt v5 [Section 3.2.P.2.3] Using prompt v5 Attempt 1: evaluating summary… Scores — avg=0.750, total=3.000, lenient_passed=True Passed with prompt v5
4. Going Further
Contributors
Citations
Appendix
Copy Page
More page actions
Nov 4, 2025
Self-Evolving Agents - A Cookbook for Autonomous Agent Retraining
CM
VF
FP
GS
Shikhar Kwatra
(OpenAI)
,
Calvin Maguranis
,
Valentina Frenkel
,
Fanny Perraudeau
,
Giorgio Saladino
View on GitHub
Download raw
Overview

Agentic systems often reach a plateau after proof-of-concept because they depend on humans to diagnose edge cases and correct failures. This cookbook introduces a repeatable retraining loop that captures those issues, learns from the feedback, and promotes improvements back into production-like workflows. We ground the approach in a regulated healthcare documentation task, but the patterns generalize to any domain that demands accuracy, auditability, and rapid iteration.

What You Will Learn
Diagnose why an autonomous agent falls short of production readiness and instrument it with measurable feedback signals.
Compare three prompt-optimization strategies—from quick manual iteration to fully automated loops—and understand when to reach for each.
Assemble a self-healing workflow that combines human review, LLM-as-judge evals, and iterative prompt refinement.
Who This Notebook Is For
ML/AI engineers and solution architects who need to move beyond toy demos.
Product and delivery teams looking for executable artifacts they can adapt into internal tooling or production pipelines.
How to Work Through This Notebook
Start with Section 1 to understand the healthcare use case, baseline agent, and system architecture.
Use Section 2 to practice prompt optimization within the OpenAI Evals interface and collect structured feedback.
Run Section 3 to automate the optimization loop with graders, evals, and retraining logic.
Reference the appendix for reusable prompts, configurations, and evaluation templates as you tailor the workflow to your environment.

The notebook is modular—feel free to run sections independently or sequentially as you adapt the retraining loop to your own agents.

1. Use Case Overview: Self-Evolving Agents in Healthcare
Problem Definition

For this cookbook, we focus on a real-world use case: drafting regulatory documents for pharmaceutical companies. These organizations must prepare and submit extensive documentation to regulatory authorities (e.g., the U.S. Food and Drug Administration) to obtain approval for new drugs. The accuracy and speed of these submissions are critical, as they directly impact how quickly life-saving treatments can reach patients.

Regulatory document drafting is a highly complex, iterative, and precision-driven process that requires deep scientific, medical, and compliance expertise. Despite the availability of advanced authoring tools, it remains labor-intensive and prone to human error. Agentic systems offer substantial leverage by assisting with research synthesis, content generation, and document structuring, yet human experts are still needed to ensure factual accuracy and regulatory compliance.

The key challenge is to design a feedback loop that enables these agentic systems to learn iteratively and refine model behavior over time. Such a system can gradually shift human effort from detailed correction to high-level oversight, improving efficiency while maintaining the rigorous standards required for regulatory submissions.

Self-evolving Agent

The diagram below illustrates the iterative process for continuously improving an AI agent through feedback, meta prompting, and evaluation. The loop combines human judgment or automated feedback using an LLM-as-a-judge to iteratively enhance performance.


Figure 1 - Diagram showing the self-evolving loop for automated agent improvement.

The process consists of the following steps:

Baseline Agent
The process begins with a baseline agent. In this notebook, we use a deliberately simple example (an agent that summarizes sections of a document) to illustrate the iterative improvement loop. In real-world or enterprise settings, the baseline agent could be much more complex. The summaries it produces serve as the initial benchmark for subsequent evaluation and refinement.

Human Feedback (or LLM-as-judge)
The baseline agent’s outputs are then evaluated either by human reviewers (e.g., for production environments) and/or by an automated LLM-as-judge system. This step gathers both quantitative and qualitative feedback that indicates how well the agent meets its goals — for instance, if we are testing the length of the summary, the feedback might be “the summary is too long” or a numerical score (generally between 0 and 1) generated by eval when assessing if the summary is under 500 words.

Evals and Aggregated Score
Based on the collected feedback, new prompts are generated and tested through evaluations (Evals). These tests measure performance against predefined criteria, and the outcomes are combined into an aggregated score that reflects the overall performance. The loop continues until the score exceeds a target threshold (e.g., 0.8) or the maximum number of retries is reached (e.g., max_retry = 10). If the retry limit is hit, engineers are alerted that manual improvements are required.

Updated Baseline Agent
Once an improved version achieves the target performance, it replaces the original baseline agent. This updated agent becomes the foundation for the next iteration, supporting a continuous cycle of learning, feedback, and optimization.

Dataset Overview

The dataset used for evaluation comprises ~70 sections extracted from the Sample CMC Section for Hyperpolarized Pyruvate (13C) Injection, publicly available here. This dataset provides realistic, domain-specific content suitable for testing both scientific summarization and regulatory compliance behavior.

Baseline Agent Overview

To keep this cookbook self-contained and easily reproducible, we simplified the regulatory drafting use case while retaining its essential complexity. In production, a typical regulatory authoring agent comprises multiple specialized sub-agents responsible for tasks such as drafting, data analysis, compliance checking, citation generation, and fact verification.

For this guide, we narrow the scope of the regulatory authoring agent to focus on the self-healing aspect of the system. Our regulatory authoring agent consists of two sub-agents:

A summarizer creating scientific and concise summaries.
A compliance checker: evaluating each summary against key regulatory requirements (e.g., FDA 21 CFR Part 11).

Figure 2 - The baseline agent as created in the AgentBuilder UI.

For the remainder of this cookbook, we implemented a simplified version of the Summarizer agent (see the section Agent Setup below). Alternatively, you can reuse the code for the agent created with AgentBuilder. If you’d like to reproduce the agent directly from the AgentBuilder UI, here are the key prompts and parameters used:

Summarizer agent: This agent used the file search tool, where the CMC PDF was uploaded to the vector store.

Prompt: “Summarize section {{workflow.input_as_text}} from {{state.cmc_pdf}} uploaded to the vector store.”

Compliance Checker agent:

Prompt: “Verify that the summary below is compliant with FDA 21 CFR Part 11: {{input.output_text}}. If the summary is compliant, return Compliant. Otherwise, return This section needs to be manually summarized.”

Both agents were configured with the default parameters - using GPT-5, low reasoning effort, and text as the output format.

Evaluation Approach

To evaluate the baseline agent, there are two main approaches:

Collecting Human Feedback. This approach involves gathering feedback from human users through the OpenAI Evals platform (or a custom UI built for a specific application). It is best suited for production settings or when piloting a tool where subject matter experts (SMEs) interact with the tool in real-world scenarios. This method helps uncover edge cases that may not have been identified during development. On the Evals platform, users can provide thumbs-up or thumbs-down ratings and share qualitative feedback about the summaries.

Using an LLM-as-a-Judge. This option is typically used during the development phase, enabling fast feedback loops without requiring SME’s time. An LLM-as-a-judge uses an LLM to automatically evaluate and score the agent’s outputs based on predefined criteria. It can also be used for monitoring model drift (e.g., in production) or validating changes between model and model versions (e.g., switching between gpt-5 and gpt-5-mini).

This cookbook demonstrates both approaches:

Section 2 shows the platform UI approach for manual prompt optimization
Section 3 implements the fully automated API approach using LLM-as-a-judge

Note: The Evals platform does not yet provide an API to retrieve user feedback programmatically.

2. Using the OpenAI Evals Platform

The OpenAI Evals platform provides an intuitive interface for prompt optimization and evaluation. This section demonstrates the complete workflow from dataset upload through iterative prompt improvement, showing how you can leverage the platform’s visual interface to optimize your prompts before implementing automated solutions.

Step 1: Upload Dataset

To begin using the OpenAI Evaluation platform, you’ll first need to upload your dataset:

Click the + Create button
Define the dataset name
Upload a CSV file and select the columns to keep
Upload

Your dataset should contain the documents or document sections that need to be summarized. Each row represents one input that will be processed by your system.

Step 2: Explore Your Data

Once uploaded, you can explore your dataset. Click the dataset name to explore the uploaded data. This allows you to verify that your data is properly formatted and contains the expected content before proceeding with prompt configuration.

Step 3: Configure Initial Prompt

This is where you define your initial system prompt and configure how data flows through your model.


Figure 3 - The platform's "New prompt" interface showing model configuration, variables, and system message settings.
Configuration Steps
System Prompt: Add the system message that defines the model’s task and behavior (this prompt will be optimized)
User Prompt Template: Add the prompt message template for user messages, using variables such as {{<column_name>}} that get replaced with actual data from your dataset
Model Selection: Choose the model for generation (e.g., gpt-4.1, gpt-5)
Temperature: Configure creativity vs. determinism

You can start with a very simple prompt to demonstrate the power of the optimization process. For example, beginning with just “summarize” shows how the system can evolve from a minimal starting point.

Step 4: Generate Outputs

Once your prompt is configured, you’re ready to generate outputs across your dataset. The prompt will run once per row and output will be generated on a new output column.

Click “Generate Output”
The platform runs your prompt against all samples
Results appear in a new Output column

The platform will process each row in your dataset, replacing template variables with actual values and calling the model with your system prompt. This creates a baseline of outputs that you can evaluate.

Step 5: Review and Evaluate
