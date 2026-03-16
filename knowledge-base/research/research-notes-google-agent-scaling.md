# Google Research: Scaling Agent Systems (Jan 28, 2026)

## Key Findings from 180 Agent Configurations:

1. **Alignment Principle:** Multi-agent coordination improves performance by +80.9% on PARALLELIZABLE tasks (e.g., financial reasoning — distinct agents analyze revenue, costs, market simultaneously)

2. **Sequential Penalty:** Multi-agent DEGRADES performance by 39-70% on sequential reasoning tasks. Communication overhead fragments the reasoning process.

3. **Tool-Use Bottleneck:** As tasks require more tools (16+), coordination tax increases disproportionately.

4. **Error Amplification:** Independent multi-agent systems (no orchestrator) amplify errors by 17.2x. Centralized systems with orchestrator contain to 4.4x.

5. **Predictive Model:** R² = 0.513, correctly identifies optimal architecture for 87% of unseen tasks based on task decomposability and tool density.

## Implications for HB1000 Swarm Mind:
- V14's Swarm Mind needs to classify tasks as parallelizable vs sequential BEFORE deploying swarms
- The orchestrator (Jeeves) is critical — without centralized coordination, error amplification is catastrophic
- Squadron specialization aligns with Google's finding that role-specific agents outperform generalists on parallelizable tasks
- The TORUS/SWARM/PARALLEL state model in V14 maps well: SWARM = exploring (parallel OK), TORUS = deliberating (sequential, reduce agents), PARALLEL = executing (parallel OK)
