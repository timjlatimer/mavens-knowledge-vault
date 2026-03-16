# Improvement Ledger — Database Architecture Design

## The Core Concept

The Improvement Ledger is a **structured JSON database stored on GitHub** (not markdown) that serves as the institutional memory of every improvement hypothesis the Learning Loop has ever generated, tested, accepted, rejected, or deferred. It persists across chats, across agents, across sessions. Nothing is ever silently deleted. Every suggestion must be consciously dispositioned.

## Why GitHub (Not Markdown, Not Local Files)

| Storage Option | Problem |
|:---------------|:--------|
| Markdown in chat | Lost when conversation ends. No cross-session persistence. |
| Local file in sandbox | Lost when sandbox hibernates or resets. |
| Markdown on GitHub | Hard to query, no schema enforcement, merge conflicts. |
| **JSON on GitHub** | **Structured, queryable, version-controlled, cross-session, cross-agent, auditable.** |

The GitHub repo becomes the single source of truth. Any chat, any agent, any Manus task can read and write to it. Git history provides a complete audit trail of every change.

## Database Schema

The Improvement Ledger is a single JSON file: `improvement-ledger.json` stored in the team's GitHub repo (e.g., `sic-hb1000/learning-loop-ledger`).

### Top-Level Structure

```json
{
  "ledger_version": "1.0",
  "protocol_version": "13.1",
  "north_star": "Ruby Red",
  "created_at": "2025-03-14T00:00:00Z",
  "last_updated": "2025-03-14T12:00:00Z",
  "total_hypotheses": 47,
  "total_implemented": 12,
  "total_rejected": 5,
  "total_deferred": 8,
  "total_pending": 22,
  "cumulative_score_lift": 156,
  "sessions": [...],
  "hypotheses": [...],
  "cadence_log": [...]
}
```

### Session Record

Each protocol execution or Micro-Loop cycle creates a session entry:

```json
{
  "session_id": "LL-2025-0314-001",
  "type": "full_protocol | micro_loop | quick_scan | heartbeat | pulse | rhythm | surge",
  "started_at": "2025-03-14T10:00:00Z",
  "completed_at": "2025-03-14T10:45:00Z",
  "chat_id": "manus-chat-abc123",
  "agent_id": "manus-agent-xyz",
  "deliverable": "Maven DN onboarding flow",
  "north_star": "Ruby Red",
  "ethics_framework": "Purpose with Profit",
  "intensity": "DRIVEN",
  "baseline_score": 62,
  "final_score": 84,
  "delta": 22,
  "hypotheses_generated": ["HYP-047", "HYP-048", "HYP-049"],
  "hypotheses_tested": ["HYP-045", "HYP-046"],
  "phase_scores": {
    "phase_0": 62,
    "phase_1": 62,
    "phase_2": 68,
    "phase_3": 74,
    "phase_4": 78,
    "phase_5": 82,
    "phase_6": 84,
    "phase_7": 84,
    "phase_8": 84
  }
}
```

### Hypothesis Record (The Core Unit)

Every improvement suggestion — whether from a full protocol, Micro-Loop, Drift Agent, or autonomous scan — becomes a hypothesis with a forced disposition:

```json
{
  "hypothesis_id": "HYP-047",
  "created_at": "2025-03-14T10:30:00Z",
  "source_session": "LL-2025-0314-001",
  "source_phase": "phase_2",
  "source_type": "full_protocol | micro_loop | drift_agent | heartbeat | pulse | rhythm | surge | manual",
  "deliverable": "Maven DN onboarding flow",
  "category": "clarity | completeness | accuracy | depth | actionability | accessibility | alignment | best_practice",
  "title": "Simplify onboarding language to Grade 6 reading level",
  "description": "The current onboarding flow uses financial jargon (APR, amortization, compound interest) that Ruby Red may not understand. Rewriting to Grade 6 reading level would improve accessibility and reduce cognitive load.",
  "expected_impact": {
    "clarity": "+3",
    "accessibility": "+2",
    "actionability": "+1"
  },
  "status": "PENDING | YES | NO | MAYBE",
  "disposition_date": null,
  "disposition_by": null,
  "disposition_reason": null,
  "tested": false,
  "test_result": null,
  "actual_impact": null,
  "resurface_count": 0,
  "last_resurfaced": null,
  "next_resurface": "2025-03-15T10:00:00Z",
  "tags": ["ruby-red", "accessibility", "language", "onboarding"]
}
```

### Disposition Rules (Forced — No Silent Deletion)

| Status | Meaning | What Happens Next |
|:-------|:--------|:-----------------|
| **PENDING** | Not yet reviewed by human | Resurfaced at every Pulse cycle until dispositioned. Cannot be deleted. |
| **YES** | Human approved. Implement it. | Micro-Loop Engine picks it up and applies it. Tested and scored. Moves to implemented archive. |
| **NO** | Human consciously rejected. | Must include `disposition_reason`. Archived but never resurfaced. Visible in audit trail. |
| **MAYBE** | Deferred for later review. | Resurfaced at every Rhythm cycle (monthly). After 3 resurfaces without disposition change, escalated to Surge priority. |

### Cadence Log

Every autonomous run is logged:

```json
{
  "cadence_id": "CAD-2025-0314-003",
  "tier": "pulse",
  "triggered_at": "2025-03-14T10:00:00Z",
  "trigger_reason": "scheduled | 10_min_idle | score_drop | manual",
  "deliverables_scanned": ["Maven DN onboarding flow", "Ruby Red emergency fund guide"],
  "hypotheses_generated": 2,
  "hypotheses_tested": 1,
  "micro_loops_run": 1,
  "score_changes": {
    "Maven DN onboarding flow": {"before": 84, "after": 86, "delta": 2}
  },
  "pending_review_count": 22,
  "next_scheduled": "2025-03-14T10:10:00Z"
}
```

## The 10-Minute Autonomous Cadence

The key behavioral rule: **If no improvement cycle has run in the last 10 minutes, the system automatically runs one.**

In agent-capable environments (Manus):
- A scheduled task checks every 10 minutes
- If no cadence_log entry exists within the last 10 minutes, it triggers a Pulse
- The Pulse runs the Drift Agent scan, generates hypotheses, runs a Micro-Loop on the lowest-scoring deliverable, and logs everything
- Results are presented to the human when they next interact

In standard LLM environments:
- At the start of each conversation, check elapsed time since last cadence_log entry
- If > 10 minutes, run a Heartbeat scan immediately before proceeding with the conversation
- If > 1 hour, run a full Pulse
- If > 24 hours, run a Rhythm

## GitHub Integration

### Repository Structure

```
sic-hb1000/learning-loop-ledger/
├── improvement-ledger.json          # The main database
├── archive/
│   ├── implemented/                 # Completed YES hypotheses with results
│   │   ├── HYP-001.json
│   │   └── HYP-012.json
│   ├── rejected/                    # Completed NO hypotheses with reasons
│   │   ├── HYP-003.json
│   │   └── HYP-007.json
│   └── sessions/                    # Complete session records
│       ├── LL-2025-0314-001.json
│       └── LL-2025-0314-002.json
├── cadence-log.json                 # Running log of all autonomous cycles
├── README.md                        # Human-readable summary dashboard
└── .github/
    └── workflows/
        └── ledger-summary.yml       # Auto-generates README from ledger data
```

### Read/Write Pattern

1. At the start of any Learning Loop execution, the agent reads `improvement-ledger.json` from GitHub
2. During execution, new hypotheses are appended to the local copy
3. At the end of execution, the agent commits the updated ledger back to GitHub
4. Git history provides the complete audit trail
5. The GitHub Actions workflow auto-regenerates the README summary

### Cross-Agent Access

Any Manus chat, any agent, any scheduled task can:
- Read the ledger to understand what improvements have been suggested, tested, and implemented
- Write new hypotheses from their own Learning Loop executions
- Update disposition status when the human makes decisions
- Query the ledger for patterns (which dimensions improve most, which deliverables need attention)

## Summary of What This Changes in V13.1

1. **Phase 7 (Drift Agent)** — Now reads the ledger at start of every scan. Checks for PENDING and MAYBE hypotheses that need resurfacing. Writes new hypotheses from drift findings.

2. **Phase 8 (The Genie)** — Now presents the ledger summary instead of just a cumulative KPI report. Shows PENDING count, MAYBE count, and forces disposition before closing.

3. **Micro-Loop Engine** — Now pulls YES hypotheses from the ledger as its experiment queue. Writes test results back to the ledger.

4. **Cadence Engine** — Now logs every autonomous run to the cadence-log. Checks 10-minute idle threshold. Triggers autonomous improvement when idle.

5. **New: Forced Disposition** — At the end of every protocol execution, the Genie presents all PENDING hypotheses and requires the human to disposition each one (YES/NO/MAYBE). No silent ignoring.
