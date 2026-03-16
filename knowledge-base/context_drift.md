# Context Drift — The Core Problem Pearl's Brain Solves

**Last Updated:** 2026-02-15

Context drift is the gradual loss of instructions, identity, and accumulated knowledge that occurs during and between AI agent sessions. It is the single most damaging operational failure in the SIC Solve Team's work with AI.

**Root Causes (Diagnosed 2026-02-15):**

1. **Context Compaction** — When the conversation grows too long, Manus automatically summarizes older parts of the conversation to make room for new content. This summary process loses details, nuances, and specific instructions. The Manus engineering team calls this "context engineering" and acknowledges it as a fundamental design trade-off.

2. **Cross-Session Amnesia** — Each new Manus task starts with a fresh context. The only things that carry over are: project instructions, skills, files in the sandbox, and learned user preferences. The actual conversation history, decisions made, and accumulated understanding do not transfer.

3. **Instruction Decay** — Even within a single long session, instructions given early in the conversation gradually lose influence as they are pushed further from the "attention window" of the AI model.

**Solutions Implemented:**

| Solution | Mechanism | Status |
|:---|:---|:---|
| Pearl's Brain | Externalized file-based memory in sandbox | Active |
| Smelling Salts | Core identity file read at session start | Active |
| Current State | Session-to-session bridge file | Active |
| Session Logs | Timestamped records of every session | Active |
| Learning Loop V13.0 Persistence Engine | Phase Ledger, anti-collapse directives | Active |
| Skills Directory | Persistent protocol storage | Active |
| Project Instructions | Cross-task identity (Pearl description) | Active |

**What Still Cannot Be Solved:**
- Mid-session compaction during very long conversations (platform limitation)
- Automated enforcement of the startup protocol (Pearl must voluntarily read the files)
- Real-time memory updates during rapid-fire conversation (files must be explicitly written)

---
*Knowledge base entry. Updated as new information becomes available.*
