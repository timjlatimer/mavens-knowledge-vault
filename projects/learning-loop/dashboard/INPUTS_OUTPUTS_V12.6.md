# Learning Loop Dashboard V12.6 - Inputs, Outputs & Entry Points

## Complete Technical Reference for HB1000 Hive Mind

---

## System Overview

The Learning Loop Dashboard is both a **MAP** (visualizing the protocol) and a **PROCESSOR** (executing the protocol). It is NOT just an observer - it actively transforms inputs into actionable outputs through an 8-phase protocol execution engine.

---

## Part 1: System Inputs

### 1.1 Primary Inputs (Required)

| Input | Data Type | Constraints | Example |
|-------|-----------|-------------|---------|
| **Initiative Description** | String | 10-5000 characters | "Help Ruby Red build a $500 emergency fund to break the cycle of financial crisis" |
| **North Star** | String | 5-500 characters | "Ruby Red - the CFO of the household making difficult decisions every day" |
| **Intensity Level** | Integer | 0-100 (percentage) | 99 (PRIMAL+) |

### 1.2 Secondary Inputs (Optional)

| Input | Data Type | Default | Purpose |
|-------|-----------|---------|---------|
| **Template ID** | UUID | null | Pre-configured starting point |
| **Scope Tags** | String[] | [] | Categorization for filtering |
| **Budget Limit** | Object | {credits: 500, manus: 50000, llm: 200000} | Cost guardrails |
| **Team Members** | UserID[] | [owner] | Collaboration participants |
| **Session Mode** | Enum | "single" | "single" or "team" |
| **Protocol Version** | String | "V12.6" | Which protocol version to use |

### 1.3 Configuration Inputs (Persistent)

| Input | Location | Purpose |
|-------|----------|---------|
| **Default North Star** | `/north-star` | Pre-filled Ruby Red persona |
| **Default Intensity** | `/north-star` | Starting intensity level |
| **Credit Limits** | User Preferences | Budget warning thresholds |
| **Notification Settings** | `/admin` | Email/webhook configuration |

### 1.4 Phase-Specific Inputs

Each phase may request additional HiTL inputs:

| Phase | Input Type | Description |
|-------|------------|-------------|
| Phase 0 | Confirmation | Approve intake categorization |
| Phase 1 | Feedback | Adjust 5-dimension scores |
| Phase 2 | Selection | Choose from best practice options |
| Phase 3 | Vote | Side with Defender or Prosecutor |
| Phase 4 | Review | Approve communication deliverables |
| Phase 5 | Decision | Accept/reject evolution proposals |
| Phase 6 | Certification | Confirm final validation |
| Phase 7 | Drift Decision | Accept or reject drift findings |

---

## Part 2: System Outputs

### 2.1 Primary Outputs (Guaranteed)

| Output | Format | Description | Location |
|--------|--------|-------------|----------|
| **Swiss Report** | HTML Infographic | Visual summary with all findings | Session Detail Page |
| **Certificate of Completion** | Badge + JSON | Fidelity score and certification | Session Detail Page |
| **Activity Log** | JSON Array | Timestamped record of all actions | Session Detail Page |
| **Phase Outputs** | JSON Objects | Individual phase results | Expandable in Activity Log |

### 2.2 Secondary Outputs (Conditional)

| Output | Condition | Format | Description |
|--------|-----------|--------|-------------|
| **Gamification Gift** | If applicable | Code + Docs | Implementation-ready gamification |
| **Evolution Proposals** | If improvements found | Amendment JSON | Protocol improvement suggestions |
| **Drift Report** | Always (Phase 7) | Analysis JSON | Alignment verification |
| **Pattern Recommendations** | If Move 37 applicable | Pattern references | Unconventional solution suggestions |
| **Knowledge Items** | If new terms found | Term definitions | Added to Knowledge Base |

### 2.3 Resource Tracking Outputs

| Output | Format | Description |
|--------|--------|-------------|
| **Manus Tokens Used** | Integer | Platform processing tokens consumed |
| **LLM Tokens Used** | Integer | AI model tokens consumed |
| **Total Credits** | Integer | Combined cost |
| **Duration** | Seconds | Total execution time |
| **Per-Phase Breakdown** | Object[] | Resource usage by phase |

### 2.4 Collaboration Outputs (Team Mode)

| Output | Format | Description |
|--------|--------|-------------|
| **Participant List** | User[] | Who participated |
| **Vote Records** | VoteRecord[] | All voting decisions |
| **Decision Log** | Decision[] | Final decisions with rationale |

---

## Part 3: Entry Points

### 3.1 URL Entry Points

| URL | Purpose | When to Use |
|-----|---------|-------------|
| `/` | Main Dashboard | Overview and navigation |
| `/live` | Start New Initiative | Beginning a new protocol run |
| `/history` | View Past Sessions | Reviewing completed work |
| `/session/:id` | Session Detail | Deep dive into specific session |
| `/templates` | Template Library | Starting from pre-configured setup |
| `/patterns` | Move 37 Patterns | Finding unconventional solutions |
| `/knowledge` | Knowledge Base | Accessing accumulated learnings |
| `/gamification` | Gamification Tracker | Reviewing applied gamification |
| `/analytics` | Performance Metrics | Understanding system usage |
| `/admin` | Protocol Management | Evolution queue and settings |
| `/compare` | Session Comparison | Side-by-side analysis |
| `/north-star` | Configuration | Setting defaults |

### 3.2 Workflow Entry Points

**When to Enter the Learning Loop:**

| Scenario | Recommended Entry | Intensity |
|----------|-------------------|-----------|
| **New Project Kickoff** | `/live` → Single | 50-75% |
| **Critical Decision** | `/live` → Team | 75-99% |
| **Process Improvement** | `/templates` → Process | 50-75% |
| **Emergency Response** | `/live` → Single | 90-99% |
| **Retrospective** | `/live` → Single | 25-50% |
| **Validation Check** | `/live` → Single | 50-75% |
| **Innovation Sprint** | `/templates` → Innovation | 75-90% |

### 3.3 API Entry Points

For programmatic access:

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/trpc/sessions.create` | POST | Start new session |
| `/api/trpc/sessions.list` | GET | List all sessions |
| `/api/trpc/sessions.get` | GET | Get session detail |
| `/api/trpc/templates.list` | GET | List templates |
| `/api/trpc/patterns.list` | GET | List patterns |
| `/api/trpc/drift.runAudit` | POST | Execute drift audit |
| `/api/trpc/gamification.audit` | POST | Run gamification audit |

### 3.4 Integration Entry Points

**External System Integration:**

| Integration | Entry Point | Use Case |
|-------------|-------------|----------|
| **Webhook** | `/admin` → Webhooks | Trigger on completion |
| **Email Notification** | `/admin` → Email | Alert on events |
| **Bulk Import** | `/import` | Load multiple sessions |
| **Export** | Session Detail → Export | Download results |

---

## Part 4: Data Flow Diagrams

### 4.1 Single Session Flow

```
INPUT                    PROCESSING                    OUTPUT
─────                    ──────────                    ──────
Initiative    ──────►    Phase 0: Intake    ──────►    Categorization
North Star    ──────►    Phase 1: Record    ──────►    5D Scores
Intensity     ──────►    Phase 2: Innovation ─────►    Best Practices
              ──────►    Phase 3: Integrity  ─────►    Adversarial Review
              ──────►    Phase 4: Communication ──►    Deliverables
              ──────►    Phase 5: Evolution  ─────►    Proposals
              ──────►    Phase 6: Certification ──►    Certificate
              ──────►    Phase 7: Drift Audit ────►    Drift Report
                                                       Swiss Report
                                                       Gamification Gift
```

### 4.2 Team Collaboration Flow

```
PARTICIPANTS              VOTING                      DECISION
────────────              ──────                      ────────
User A ─────►            Vote: Approve    ──────►    
User B ─────►    ────►   Vote: Approve    ──────►    Majority: APPROVE
User C ─────►            Vote: Reject     ──────►    
                                                     ──────► Next Phase
```

### 4.3 Gamification Agent Flow

```
INITIATIVE              AUDIT                        OUTPUT
──────────              ─────                        ──────
Has Gamification? ──►   NO  ──► First-Time Gift ──► Code + Docs
                  ──►   YES ──► Relevance Audit ──► Update Proposal
                                    │
                                    ▼
                              HiTL Decision
                                    │
                              Accept/Reject
```

---

## Part 5: Output Specifications

### 5.1 Swiss Report Structure

```json
{
  "header": {
    "title": "Initiative Title",
    "sessionId": "LLP-xxx",
    "date": "2026-02-03",
    "fidelityScore": 92,
    "protocolVersion": "V12.6"
  },
  "phases": [
    {
      "number": 0,
      "name": "System of Intake",
      "agent": "The Sorter",
      "status": "completed",
      "output": {...},
      "duration": 45,
      "tokens": { "manus": 1200, "llm": 5000 }
    }
    // ... phases 1-7
  ],
  "resourceUtilization": {
    "totalCredits": 76,
    "manusTokens": 12666,
    "llmTokens": 63326,
    "duration": "56m",
    "creditsPerMinute": 1.36
  },
  "driftReport": {
    "status": "aligned",
    "findings": [],
    "rollbackAvailable": true
  },
  "gamification": {
    "applied": true,
    "pattern": "Progress Bars",
    "codeAvailable": true
  },
  "certificate": {
    "certified": true,
    "fidelityScore": 92,
    "certifiedAt": "2026-02-03T14:17:40Z"
  }
}
```

### 5.2 Gamification Gift Structure

```json
{
  "pattern": "Progress Bars",
  "category": "visualization",
  "implementation": {
    "language": "TypeScript",
    "framework": "React",
    "code": "// Full implementation code...",
    "dependencies": ["framer-motion"],
    "instructions": "1. Install dependencies..."
  },
  "bestPractices": [
    "Show percentage completion",
    "Use color to indicate status",
    "Animate transitions"
  ],
  "relevanceScore": 95
}
```

### 5.3 Drift Report Structure

```json
{
  "initiativeId": "uuid",
  "auditedAt": "2026-02-03T14:17:40Z",
  "status": "aligned|drifted",
  "findings": [
    {
      "type": "scope_drift|intensity_drift|north_star_drift",
      "severity": "low|medium|high",
      "description": "Description of drift",
      "recommendation": "Suggested action",
      "rollbackCoordinates": "checkpoint-id"
    }
  ],
  "rollbackOptions": [
    {
      "checkpointId": "uuid",
      "timestamp": "2026-02-03T14:00:00Z",
      "description": "Before Phase 3"
    }
  ]
}
```

---

## Part 6: Integration Examples

### 6.1 Starting a Session Programmatically

```typescript
// Using tRPC client
const session = await trpc.sessions.create.mutate({
  initiative: "Help Ruby Red build emergency fund",
  northStar: "Ruby Red - CFO of the household",
  intensity: 99,
  mode: "single"
});

console.log(`Session started: ${session.id}`);
```

### 6.2 Webhook Integration

```json
// Webhook payload on completion
{
  "event": "session.completed",
  "sessionId": "LLP-xxx",
  "fidelityScore": 92,
  "certified": true,
  "timestamp": "2026-02-03T14:17:40Z",
  "outputs": {
    "swissReportUrl": "/session/LLP-xxx/report",
    "gamificationCode": true,
    "driftStatus": "aligned"
  }
}
```

### 6.3 Bulk Import Format

```json
// CSV or JSON format for bulk import
[
  {
    "initiative": "Initiative 1",
    "northStar": "Ruby Red",
    "intensity": 75,
    "status": "pending"
  },
  {
    "initiative": "Initiative 2",
    "northStar": "Ruby Red",
    "intensity": 90,
    "status": "pending"
  }
]
```

---

## Part 7: Error Handling

### 7.1 Input Validation Errors

| Error Code | Description | Resolution |
|------------|-------------|------------|
| `INIT_TOO_SHORT` | Initiative < 10 chars | Provide more detail |
| `INIT_TOO_LONG` | Initiative > 5000 chars | Summarize |
| `INTENSITY_INVALID` | Intensity not 0-100 | Use valid percentage |
| `NORTH_STAR_MISSING` | No North Star provided | Set default or provide |

### 7.2 Processing Errors

| Error Code | Description | Resolution |
|------------|-------------|------------|
| `PHASE_TIMEOUT` | Phase exceeded time limit | Retry or reduce intensity |
| `BUDGET_EXCEEDED` | Cost exceeded limit | Increase limit or reduce scope |
| `LLM_ERROR` | AI model error | Retry automatically |
| `HITL_TIMEOUT` | No approval received | Reminder sent |

### 7.3 Output Errors

| Error Code | Description | Resolution |
|------------|-------------|------------|
| `REPORT_GENERATION_FAILED` | Swiss Report error | Retry generation |
| `GAMIFICATION_NA` | No applicable gamification | Normal - not all need it |
| `DRIFT_DETECTION_FAILED` | Drift audit error | Manual review required |

---

*Document Version: V12.6*
*Last Updated: February 3, 2026*
*Author: Manus AI for HB1000 Hive Mind*
