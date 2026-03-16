```
Run the Learning Loop Protocol on [deliverable description]:
- North Star: [who this serves — describe the person/audience]
- Ethics Framework: [Purpose with Profit / Profit with Purpose / Profit with Profit]
- Intensity: [CASUAL / ENGAGED / DRIVEN / PRIMAL / PRIMAL+]
```

**Default Configuration** (when not specified):
- North Star: Ruby Red (SIC Solve Team default)
- Ethics Framework: Purpose with Profit
- Intensity: DRIVEN (85%)

**Examples**:

```
# SIC Ruby Red project (uses defaults)
Run the Learning Loop Protocol on "Help Ruby Red build a $500 emergency fund."

# Maven DN project (custom North Star)
Run the Learning Loop Protocol on "Maven DN onboarding flow":
- North Star: First-time Maven DN user, unbanked, skeptical of financial apps
- Ethics Framework: Purpose with Profit
- Intensity: PRIMAL (95%)

# Enterprise project (different context entirely)
Run the Learning Loop Protocol on "Q3 sales enablement playbook":
- North Star: Mid-market sales rep, 2 years experience, quota pressure
- Ethics Framework: Profit with Purpose
- Intensity: DRIVEN (85%)
```

---

## Dashboard Execution vs. Conversation Execution

The Learning Loop Protocol can run in **two modes**:

### Mode 1: Dashboard Execution (Learning Loop Mission Control)
- Uses the web dashboard at `/live` in the Learning Loop Mission Control app
- **Split-screen monitoring**: Phase Journey Map at top, live execution panel with real-time progress
- **Visual phase tracking**: Dots light up as phases complete
- **Session persistence**: Can pause and resume sessions
- **Best for**: Formal executions, team visibility, audit trails

### Mode 2: Conversation Execution (Skill Invocation)
- Runs directly in any Manus task by invoking the skill
- **Inline progress**: Phases reported as structured messages in the conversation
- **Human-in-the-loop**: Checkpoints presented as questions in the chat
- **Best for**: Quick tests, cross-project invocations, standalone evaluations

> **Note**: Both modes execute the same 8 phases with the same rigor. The dashboard provides visual monitoring; the conversation provides portability.

---

## Version History

| Version | Date | Changes |
|:--------|:-----|:--------|
| V9.1 | Jan 2025 | Initial skill definition with 7 phases |
| V12.8 | Feb 2025 | Added Phase 7 (Drift Agent), ethics frameworks, intensity levels, source labels, Move 37 |
| V12.9 | Feb 2025 | 5 amendments from Ruby Red Utility Guide test: Move 37 Extreme default, Emotional Reality Check, Dual Output in Phase 4, Accessibility & Inclusion Audit, Gamification Gift-Back |
| V12.9.1 | Feb 2025 | Universality fix: Made North Star configurable (not hard-coded to Ruby Red), renamed Guardian #2 to "The North Star's Voice", added Dashboard vs Conversation execution modes documentation |
