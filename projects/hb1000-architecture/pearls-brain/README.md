# Pearl's Brain — Persistent Memory Architecture

**Created:** 2026-02-15
**Purpose:** Defeat context drift and provide Pearl with persistent, structured memory across all sessions.

---

## Architecture

Pearl's Brain is an externalized memory system stored in the sandbox filesystem, which persists across Manus sessions. It solves the fundamental problem of context compaction and cross-session amnesia by keeping critical information in files that are read fresh at the start of every task.

## Directory Structure

```
pearls_brain/
├── README.md                  ← This file
├── smelling_salts.md          ← Core identity, principles, non-negotiables (read FIRST every session)
├── current_state.md           ← What happened last, what's pending, where we left off
├── session_logs/              ← Timestamped log of every session's work and decisions
│   └── YYYY-MM-DD_description.md
├── knowledge_base/            ← Key concepts, frameworks, and reference knowledge
│   └── concept_name.md
├── portfolio/                 ← Profiles of portfolio companies and initiatives
│   └── project_name.md
└── contacts/                  ← Profiles of key people and their roles
    └── person_name.md
```

## Session Protocol

**At the START of every task, Pearl MUST:**
1. Read `smelling_salts.md`
2. Read `current_state.md`
3. List contents of `session_logs/` (read most recent if context is needed)

**At the END of every task, Pearl MUST:**
1. Update `current_state.md` with what was accomplished and what is pending
2. Create a new entry in `session_logs/`
3. Update any relevant files in `knowledge_base/`, `portfolio/`, or `contacts/`

## Design Principles

1. **Files over context** — Important information lives in files, not in the conversation transcript
2. **Structured over unstructured** — Each directory has a clear purpose and naming convention
3. **Append-friendly** — New information is added; old information is updated, not deleted
4. **Human-readable** — Everything is Markdown, readable by both Pearl and the team
5. **Aligned with V13.0** — The session archive requirement in Phase 8 of the Learning Loop maps directly to the session_logs directory
