# Swarm Intelligence Research Notes — Feb 28, 2026

## Key Papers & Sources:

### 1. "Society of HiveMind" (Mamie & Xi, 2025) — Springer
- Multi-agent optimization of foundation model swarms
- Achieves stability improvements through collective intelligence
- Uses Graph Attention Networks (GAT) to dynamically learn communication patterns
- DIRECTLY relevant to HB1000 naming — "HiveMind" is the academic term for what we're building

### 2. "HiveMind: Contribution-Guided Online Prompt Optimization" (Xia et al., 2025)
- Self-adaptive framework for optimizing LLM multi-agent systems
- Evaluates individual agent effectiveness within the collective
- Online optimization — agents improve while running, not just between sessions

### 3. Factory AI Missions (Feb 26, 2026)
- Multi-day autonomous agent workloads (median 2 hours, some run 16 DAYS)
- Orchestrator breaks projects into milestones → features → worker sessions
- Skill-based learning system — agents build reusable skills as they work
- Different models for different roles (orchestrator, workers, validators, researchers)
- 14% of missions run longer than 24 hours

### 4. Google Research: Scaling Agent Systems (Jan 28, 2026)
- 180 configurations tested
- Multi-agent +80.9% on parallelizable tasks, -39-70% on sequential
- Centralized orchestrator contains error amplification to 4.4x (vs 17.2x without)
- Predictive model identifies optimal architecture for 87% of unseen tasks

### 5. Perplexity Computer (Feb 25, 2026)
- Orchestrates 19 models in parallel
- Uses Opus as orchestration layer
- Matches each task to optimal model
- $200/month — real product, not research

### 6. Moltbook / OpenClaw (Feb 2026)
- AI-only social network where agents interact autonomously
- Agents self-organize, coordinate, and form groups
- WARNING: Demonstrates emergent swarm behavior can be unpredictable
- Relevant to V14's Swarm Mind — need governance guardrails

### 7. "Orchestrated Distributed Intelligence" (Tallam, 2025) — 23 citations
- New paradigm: from autonomous agents to integrated systems
- Leverages collective intelligence and specialized orchestration
- Emergent behavior from orchestrated multi-agent ensembles

## Key Patterns Across All Sources:
1. **Orchestrator is essential** — uncoordinated swarms amplify errors
2. **Role specialization works** — different models/agents for different tasks
3. **Persistent context matters** — sessions that maintain state outperform fresh starts
4. **Skill accumulation** — agents that learn reusable skills improve over time
5. **Task decomposition** — breaking work into milestones with validation checkpoints
6. **Multi-model routing** — matching the right model to each sub-task
