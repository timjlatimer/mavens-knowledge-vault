# Karpathy: Programming is "Unrecognizable" (Feb 26, 2026)

## Key Points:
1. AI agents barely worked before December 2025. Since then — reliable, thanks to higher model quality + ability to stay on task longer.
2. Example: AI agent independently built a video analysis dashboard over a weekend. Task typed in plain English, agent worked 30 min, solved problems on its own, delivered finished result. 3 months ago = entire weekend project.
3. "Programming is becoming unrecognizable. You're not typing computer code into an editor like the way things were since computers were invented, that era is over. You're spinning up AI agents, giving them tasks *in English* and managing and reviewing their work in parallel."
4. Still needs human "high-level direction, judgement, taste, oversight, iteration, and hints and ideas."
5. As late as October 2025, Karpathy called agent hype exaggerated. Changed opinion after Opus 4.5 and Codex 5.2 releases in winter.

## Key Concept: "Claws" 
- Persistent agent sessions that maintain context across long tasks
- Karpathy's Claws Layer boosts agent sessions to 75 minutes
- We went from raw model calls → agent frameworks → persistent agent infrastructure

## Implications for HB1000:
- The Genie (V14's persistent learning agent) is EXACTLY this pattern — persistent context across sessions
- V14's "spec → agents → execution" model matches Karpathy's description perfectly
- The bottleneck is VISION and SPEC WRITING, not execution — this validates Tim's role as Chief Visionary Officer
- "Managing and reviewing work in parallel" = the Swarm Mind orchestrator model
