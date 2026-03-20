# Grace's Brain Audit

## Current Structure (11 tabs)
1. **Overview** - Shows pillar counts (knowledge, protocols, escalation, guardrails, segments), insights summary, known issues, ingestion pipeline
2. **Identity** - Grace's personality settings (warmth, humor, directness, formality sliders, core traits, voice tone)
3. **Knowledge** - CRUD for knowledge items (maven_services, government_programs, financial_literacy, etc.)
4. **Protocols** - CRUD for conversation protocols (greeting, empathy_building, needs_assessment, toilet_paper_moment, soft_close, crisis_triage, etc.)
5. **Escalation** - Rules for when Grace hands off to humans (trigger conditions, actions, routing)
6. **Guardrails** - Must-do / must-not-do / sensitive-topic rules
7. **Segments** - Audience segments (how Grace adapts to different visitors)
8. **Insights** - Patterns Grace surfaces from conversations (human-in-the-loop review)
9. **Known Issues** - Recurring problems Grace detects (threshold-based)
10. **Ingestion** - Feed Grace frontline wisdom (documents, interviews, surveys)
11. **Changelog** - Every change logged for accountability

## What's WRONG / Confusing
- Page purpose is unclear - "command center for Grace's intelligence" is vague
- Protocols tab is empty - no pre-built protocols for handling Ruby Red clients
- No connection to the actual grace-prompt.ts that drives Grace's behavior
- The page is technically functional but has no CONTENT - all tabs show "No X defined yet"
- No clear guidance on what each section should contain for the Maven mission

## What to FIX
1. Add a clear purpose statement at the top explaining what this page is for
2. Pre-seed empathy-based protocols for handling the left out, left behind, working poor
3. Pre-seed knowledge items about Maven's services
4. Pre-seed guardrails specific to Ruby Red interactions
5. Pre-seed escalation rules for crisis situations
6. Pre-seed audience segments (Ruby Red, Working Poor, Unbanked, etc.)
7. Make the Overview tab show the actual state with clear next-steps guidance
