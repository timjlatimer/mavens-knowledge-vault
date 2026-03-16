# Pearl's Memory Consolidation Protocol

**Last Updated:** 2026-02-15
**Purpose:** Prevent stale data, resolve conflicts, deepen shallow entries, and keep Pearl's Brain healthy over time.

---

## Why This Exists

Pearl's Brain accumulates information every session. Without periodic consolidation, the brain will:
- Contain outdated information that contradicts reality
- Have duplicate or conflicting entries across files
- Retain shallow "stub" entries that never get enriched
- Grow unwieldy without anyone noticing the rot

The human brain consolidates memory during sleep. Pearl consolidates during this protocol.

---

## When to Run

| Trigger | Type | Scope |
|:---|:---|:---|
| **Every 5 sessions** | Scheduled | Full consolidation (all files) |
| **After major data intake** | Event-driven | Targeted (affected files only) — e.g., after Outlook extraction |
| **When a conflict is detected** | Reactive | Targeted (conflicting files) |
| **User requests "consolidate"** | Manual | Full or targeted per user direction |

---

## The Consolidation Checklist

### Step 1: Staleness Audit (5 minutes)

Review every file in Pearl's Brain and check the "Last Updated" date.

| Age | Action |
|:---|:---|
| Updated this session | Skip — current |
| Updated within last 5 sessions | Spot-check — verify key facts still accurate |
| Updated 6-15 sessions ago | Full review — read the file, verify against current knowledge, update or flag |
| Updated 16+ sessions ago | Deep review — assume something has changed. Verify everything. Update or archive. |

**Output:** List of files reviewed, with status (Current / Updated / Flagged / Archived).

### Step 2: Stub Enrichment (10 minutes)

Search for files containing the marker text "Stub — requires enrichment" or "needs enrichment."

For each stub:
1. Check if new information is now available (from recent sessions, new data sources, or user input)
2. If yes: enrich the entry and remove the stub marker
3. If no: leave the stub but add a note about what data source would resolve it

**Output:** List of stubs reviewed, with status (Enriched / Still Waiting / Data Source Identified).

### Step 3: Conflict Resolution (5 minutes)

Search for potential conflicts:
- Same person appearing in multiple contact profiles
- Same project described differently in portfolio vs. knowledge base
- Dates or facts that contradict across files
- Roles or relationships that have changed

For each conflict:
1. Identify the most authoritative source
2. Update the less authoritative file to match
3. Add a note about the resolution

**Output:** List of conflicts found and resolved.

### Step 4: Commitment Tracker Review (5 minutes)

Review `commitment_tracker.md`:
1. Are any "OPEN" items now complete? Mark them DONE with date.
2. Are any "BLOCKED" items now unblocked? Update status.
3. Are any items overdue? Flag them with an OVERDUE marker.
4. Are there new commitments from recent sessions that were not tracked? Add them.
5. Is the dependency map still accurate?

**Output:** Updated commitment_tracker.md.

### Step 5: Current State Refresh (3 minutes)

Rewrite `current_state.md` to reflect the actual current state:
1. Update "What Just Happened" to reflect the consolidation
2. Update the pending items table
3. Update file counts and inventory
4. Verify all file paths are still valid

**Output:** Updated current_state.md.

### Step 6: Session Log Entry (2 minutes)

Write a session log entry documenting the consolidation:
- Files reviewed
- Changes made
- Stubs enriched
- Conflicts resolved
- Commitments updated

---

## Consolidation Health Score

After each consolidation, calculate and record:

| Metric | Formula | Target |
|:---|:---|:---|
| **Freshness** | % of files updated within last 5 sessions | > 70% |
| **Completeness** | % of files that are NOT stubs | > 80% |
| **Conflict Rate** | Number of conflicts found per consolidation | < 3 |
| **Commitment Currency** | % of open commitments with accurate status | 100% |
| **Brain Size** | Total file count | Tracked (no target — just monitored) |

Record the health score in the session log. Track trends over time.

---

## Consolidation Log

| Date | Session # | Files Reviewed | Stubs Enriched | Conflicts Resolved | Health Score |
|:---|:---|:---|:---|:---|:---|
| 2026-02-15 | Initial build | 64 | 0 (6 stubs identified) | 0 | Freshness: 100%, Completeness: 91%, Conflicts: 0, Commitments: 100% |

---

## Quick Reference: Stub Files Awaiting Enrichment

| File | What It Needs | Likely Source |
|:---|:---|:---|
| `knowledge_base/jolene_protocol.md` | Full protocol details | User input or Outlook |
| `knowledge_base/bingo_card.md` | Actual initiative list and champions | User input |
| `knowledge_base/zumbaas.md` | Product details, current status | Maven DN master doc or Outlook |
| `knowledge_base/do_good_give_back.md` | Whether it is a program, brand, or philosophy | User input |
| `knowledge_base/big_mamas_village.md` | Current status, whether active initiative | User input or Outlook |
| Multiple contact profiles | Full bios, relationship history | Outlook extraction |

---

*This protocol is part of Pearl's Brain. It is the immune system that keeps the brain healthy.*
