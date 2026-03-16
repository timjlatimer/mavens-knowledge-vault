# Work Plan Audit Agent Specification

## V12.8.2 Addition to Learning Loop Protocol

### Purpose

The Work Plan Audit Agent ensures that all planned steps in a protocol execution are actually completed before final certification. This prevents drift between what was planned and what was executed.

---

## Agent Profile

**Name:** The Auditor  
**Role:** Plan Fidelity Verification  
**Phase:** Integrated into Phase 06 (Certification) - runs before The Judge's final verdict  
**Persona:** A meticulous accountant who reconciles every line item

---

## Core Function

Before The Judge can issue certification, The Auditor performs a systematic comparison:

### Input
1. **Original Work Plan** - The task plan created at session start
2. **Execution Log** - All actions taken during the protocol
3. **Phase Outputs** - Deliverables from each phase

### Process
1. **Step Enumeration** - List all planned steps from the work plan
2. **Execution Mapping** - Map each planned step to actual execution evidence
3. **Gap Detection** - Identify any planned steps without execution evidence
4. **Drift Analysis** - Detect steps executed that weren't in the plan (scope creep)

### Output
```json
{
  "audit_result": {
    "planned_steps": 12,
    "executed_steps": 10,
    "skipped_steps": 2,
    "unplanned_steps": 1,
    "fidelity_score": 83.3,
    "gaps": [
      {
        "step": "Update Swiss presentation with Phase 07 screenshots",
        "status": "NOT_EXECUTED",
        "impact": "HIGH"
      },
      {
        "step": "Regenerate slides 3 and 8",
        "status": "NOT_EXECUTED", 
        "impact": "MEDIUM"
      }
    ],
    "additions": [
      {
        "step": "Created entirely new presentation instead of updating",
        "classification": "SCOPE_CREEP"
      }
    ],
    "recommendation": "REQUIRE_REMEDIATION"
  }
}
```

---

## Fidelity Score Calculation

```
Fidelity Score = (Executed Steps / Planned Steps) × 100

Adjustments:
- Each unplanned step: -5 points
- Each high-impact gap: -10 points
- Each medium-impact gap: -5 points
- Each low-impact gap: -2 points
```

### Thresholds

| Score | Status | Action |
|-------|--------|--------|
| 95-100% | CERTIFIED | Proceed to The Judge |
| 80-94% | CONDITIONAL | HB1000 review required |
| 60-79% | REMEDIATION | Must complete missing steps |
| <60% | RESTART | Plan was not followed |

---

## HiTL Checkpoint

When the Work Plan Audit detects gaps or drift, it triggers a Human-in-the-Loop checkpoint:

### Approval Modal Content
1. **Summary** - "X of Y planned steps were executed"
2. **Gap List** - Specific steps that were skipped
3. **Drift List** - Steps executed that weren't planned
4. **Impact Assessment** - How gaps affect the deliverable
5. **Recommendation** - Auditor's suggested action

### HB1000 Options
1. **Accept As-Is** - Acknowledge gaps, proceed to certification
2. **Require Completion** - Send back to complete missing steps
3. **Reject** - Restart the protocol with better plan adherence

---

## Integration Points

### Phase 06 Flow (Updated)

```
Phase 05: Evolution Complete
    ↓
Phase 06a: Work Plan Audit (NEW)
    ↓ [HiTL if gaps detected]
Phase 06b: The Judge's Certification
    ↓
Phase 07: Drift Audit
    ↓
Final Certification
```

### Database Schema Addition

```sql
CREATE TABLE work_plan_audits (
  id VARCHAR(36) PRIMARY KEY,
  session_id VARCHAR(36) NOT NULL,
  planned_steps INT NOT NULL,
  executed_steps INT NOT NULL,
  skipped_steps INT NOT NULL,
  unplanned_steps INT NOT NULL,
  fidelity_score DECIMAL(5,2) NOT NULL,
  gaps JSON,
  additions JSON,
  recommendation ENUM('CERTIFIED', 'CONDITIONAL', 'REMEDIATION', 'RESTART'),
  hb1000_decision ENUM('ACCEPT', 'REQUIRE_COMPLETION', 'REJECT'),
  hb1000_notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (session_id) REFERENCES protocol_sessions(id)
);
```

---

## Why This Matters

The Work Plan Audit Agent addresses a critical gap in the protocol:

1. **Prevents Silent Drift** - Catches when execution diverges from plan
2. **Ensures Accountability** - Every planned step must be accounted for
3. **Maintains Quality** - Deliverables match what was promised
4. **Supports HB1000** - Gives humans visibility into plan adherence
5. **Enables Learning** - Patterns of skipped steps inform future planning

---

## Example Scenario

**Planned:** "Update version number in existing presentation"  
**Executed:** "Created entirely new presentation with different content"

**Audit Finding:**
- Original step: NOT_EXECUTED
- Unplanned step: NEW_PRESENTATION_CREATED
- Classification: SCOPE_CREEP
- Impact: HIGH (deliverable differs from expectation)
- Recommendation: REQUIRE_REMEDIATION

**HB1000 Decision:** User can accept the new approach or require the original plan be followed.

---

## Version History

- V12.8.2 - Initial specification (February 3, 2026)
