# Phase 07: System of Drift Audit — Detailed Specification

**Protocol Version:** V12.8.1 CANONICAL  
**Persona:** Drift Agent  
**HiTL Checkpoint:** Yes (HB1000 Hive Mind Decision)

---

## Purpose

Phase 07 serves as an independent audit mechanism to ensure that the deliverable has not "drifted" from its original intent during the protocol execution. The Drift Agent operates independently of the previous phases and reports directly to the HB1000 Hive Mind for a final accept/reject decision.

---

## Trigger Conditions

Phase 07 is triggered after:
1. Phase 06 (System of Certification) has rendered a verdict
2. The Judge has issued CERTIFIED or CONDITIONAL_PASS
3. All previous HiTL checkpoints have been cleared

---

## Tasks

### 1. State Comparison

Compare the current initiative state against the original objectives captured in Phase 00:

```typescript
interface StateComparison {
  original: {
    initiative: string;
    northStar: string;
    intensity: number;
    targetThreshold: number;
    scope: string[];
    features: string[];
  };
  current: {
    initiative: string;
    northStar: string;
    intensity: number;
    currentScore: number;
    scope: string[];
    features: string[];
    artifacts: Record<string, string>;
  };
}
```

### 2. Drift Detection

Identify any drift from the North Star / Ruby Red mission:

| Drift Type | Description | Detection Method |
|:-----------|:------------|:-----------------|
| `scope_creep` | Initiative scope expanded | Compare scope arrays |
| `north_star_deviation` | Misalignment with Ruby Red | Text similarity analysis |
| `phase_skip` | Protocol phases bypassed | Check execution log |
| `threshold_lowered` | Quality bar reduced | Compare target vs. original |
| `rabbit_hole` | Excessive tangential focus | Analyze time distribution |
| `feature_drift` | Unauthorized feature changes | Compare feature arrays |
| `intensity_drift` | Execution intensity changed | Compare intensity values |

### 3. Rollback Coordinate Storage

Store rollback coordinates for each major decision point:

```typescript
interface RollbackCoordinate {
  checkpointId: string;      // Unique identifier
  sessionState: string;      // Serialized state snapshot
  timestamp: number;         // Unix timestamp
  phase: number;             // Phase number (0-6)
  score: number;             // Score at checkpoint
}
```

### 4. Spirit Check

Perform a "spirit check" to ensure the deliverable stayed true to the original intent:

- Did we solve for Ruby Red?
- Did we maintain empathy as our superpower?
- Did we fight the crime of "it's expensive to be poor"?

### 5. HB1000 Presentation

Present findings to the HB1000 Hive Mind with:
- Summary of drift findings
- Severity assessment
- Recommendations
- Rollback options

---

## Output Schema

```typescript
interface DriftAuditOutput {
  // Core findings
  driftDetected: boolean;
  driftSeverity: "NONE" | "MINOR" | "MODERATE" | "MAJOR" | "CRITICAL";
  
  // Detailed findings
  driftFindings: Array<{
    area: string;           // What drifted
    original: string;       // Original state
    current: string;        // Current state
    deviation: number;      // Percentage deviation (0-100)
  }>;
  
  // Rollback capability
  rollbackCoordinates: Array<{
    phase: number;
    checkpoint: string;
    timestamp: string;
  }>;
  
  // Spirit check
  spiritCheckPassed: boolean;
  northStarAlignment: number;  // 0-100
  
  // Recommendations
  recommendations: Array<{
    action: string;
    priority: "high" | "medium" | "low";
    rationale: string;
  }>;
  
  // HiTL decision
  hb1000Decision: "PENDING" | "ACCEPTED" | "REJECTED";
  
  // Summary
  summary: string;
}
```

---

## Severity Classification

### NONE (Green)
- No drift detected
- All parameters match original specification
- Auto-accept recommended

### MINOR (Blue)
- Small deviations within acceptable bounds
- Deviation < 10% on any metric
- Proceed with notation

### MODERATE (Amber)
- Notable drift requiring review
- Deviation 10-30% on key metrics
- HB1000 review recommended

### MAJOR (Orange)
- Significant drift from original intent
- Deviation > 30% on key metrics
- Intervention required before proceeding

### CRITICAL (Red)
- Severe drift threatening mission alignment
- North Star alignment < 50%
- Rollback strongly recommended

---

## HiTL Decision Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    DRIFT AUDIT COMPLETE                      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │ Drift Detected? │
                    └─────────────────┘
                     │              │
                    Yes             No
                     │              │
                     ▼              ▼
         ┌──────────────────┐  ┌──────────────────┐
         │ Present Findings │  │ Auto-Accept      │
         │ to HB1000        │  │ (Confirm Only)   │
         └──────────────────┘  └──────────────────┘
                     │              │
                     ▼              │
         ┌──────────────────┐      │
         │ HB1000 Decision  │      │
         └──────────────────┘      │
          │              │         │
       Accept         Reject       │
          │              │         │
          ▼              ▼         │
    ┌──────────┐  ┌──────────────┐ │
    │ Complete │  │ Trigger      │ │
    │ Protocol │  │ Rollback     │ │
    └──────────┘  └──────────────┘ │
          │              │         │
          └──────────────┴─────────┘
                    │
                    ▼
         ┌──────────────────┐
         │ PROTOCOL COMPLETE│
         └──────────────────┘
```

---

## Rollback Execution

If HB1000 rejects the drift findings:

1. **Select Rollback Point** — Choose from available coordinates
2. **Restore State** — Revert to checkpoint state
3. **Re-execute** — Resume from rollback point
4. **Re-audit** — Run Phase 07 again after completion

---

## Integration Example

```typescript
// In protocolExecutorV2.ts
case 'drift_audit': {
  const result = phaseResult as DriftAuditOutput;
  
  const driftReport = {
    driftDetected: result.driftDetected || false,
    driftSeverity: result.driftSeverity || 'NONE',
    driftFindings: result.driftFindings || [],
    rollbackCoordinates: result.rollbackCoordinates || [],
    spiritCheckPassed: result.spiritCheckPassed ?? true,
    northStarAlignment: result.northStarAlignment || 100,
    recommendations: result.recommendations || [],
  };
  
  broadcastToSession(sessionId, {
    type: 'approval_needed',
    payload: {
      type: 'drift_audit',
      phaseId: 'phase_7',
      phaseName: 'System of Drift Audit',
      driftReport,
      message: driftReport.driftDetected 
        ? `Drift Agent detected ${driftReport.driftSeverity} drift.`
        : 'No significant drift detected.',
    },
  });
  break;
}
```

---

## Best Practices

1. **Always run Phase 07** — Never skip the drift audit
2. **Store coordinates early** — Checkpoint at every major decision
3. **Be honest about drift** — Don't minimize findings
4. **Respect HB1000** — The Hive Mind has final authority
5. **Document everything** — Audit trail is critical

---

**Version:** V12.8.1 CANONICAL | **Date:** Feb 3, 2026
