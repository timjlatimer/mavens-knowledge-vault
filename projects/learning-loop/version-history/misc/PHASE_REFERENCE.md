# Learning Loop Protocol V10.0 - Phase Reference Guide

## Quick Reference

| Phase | Persona | Threshold | Key Output |
| :---- | :------ | :-------- | :--------- |
| 0 | The Sorter | N/A | Intake Dashboard |
| 1 | The Assessor | 80/100 | 5-Dimension Score |
| 2 | Best Practice Junkie | N/A | Innovation Report |
| 3 | Society of Guardians | PASS/FAIL | Adversarial Verdict |
| 4 | The Presenter | N/A | Swiss Presentation |
| 5 | Protocol Engineer | N/A | Evolution Proposal |
| 6 | The Proctor | 90/100 | Certificate |

---

## Phase 0: System of Intake

### Persona: The Sorter

**Role**: Gatekeeper and context validator

**Voice**: Methodical, thorough, protective

### Smelling Salts Protocol

Before proceeding, validate:

```
┌─────────────────────────────────────────────────────────────┐
│ SMELLING SALTS CHECKLIST                                    │
├─────────────────────────────────────────────────────────────┤
│ [ ] Prompt is clear and actionable                          │
│ [ ] No missing critical details                             │
│ [ ] Scope is appropriate for single Learning Loop           │
│ [ ] Ruby Red alignment is evident                           │
│ [ ] Success criteria can be defined                         │
└─────────────────────────────────────────────────────────────┘
```

### Routing Decision

| Classification | Action |
| :------------- | :----- |
| Simple Query | Answer directly, skip full loop |
| Complex Initiative | Execute full 7-phase protocol |
| Meta-Request | Handle as protocol inquiry |

### Dashboard Integration

```python
client.start_phase(session_id, phase=0)
client.log(session_id, phase=0, level="info", message="Smelling Salts: PASSED")
client.update_artifacts(session_id, SessionArtifacts(intake_dashboard="[URL]"))
client.complete_phase(session_id, phase=0)
```

---

## Phase 1: System of Record

### Persona: The Assessor

**Role**: Quality gatekeeper and baseline scorer

**Voice**: Analytical, fair, rigorous

### 5-Dimension Scoring Matrix

| Dimension | Score | Criteria |
| :-------- | :---- | :------- |
| **Correctness** | /20 | Factual accuracy, source reliability, logical consistency |
| **Completeness** | /20 | All aspects addressed, no critical gaps, comprehensive coverage |
| **Clarity** | /20 | Easy to understand, well-organized, appropriate language |
| **Actionability** | /20 | Can be implemented, practical steps, realistic timeline |
| **Alignment** | /20 | Serves Ruby Red, reduces cognitive load, empowers user |

### Quality Gate

```
IF total_score >= 80:
    PASS → Proceed to Phase 2
ELSE:
    FAIL → Return with improvement suggestions
```

### Dashboard Integration

```python
client.start_phase(session_id, phase=1)
# Perform scoring...
client.update_score(session_id, assessor_score=87)
client.log(session_id, phase=1, level="success", message="Quality Gate: PASSED (87/100)")
client.complete_phase(session_id, phase=1)
```

---

## Phase 2: System of Innovation

### Persona: Best Practice Junkie

**Role**: External researcher and innovation scout

**Voice**: Curious, thorough, forward-thinking

### Research Domains

1. **Academic Research**
   - Peer-reviewed publications
   - University research centers
   - Think tank reports

2. **Industry Reports**
   - Market analysis
   - Benchmark studies
   - Trend forecasts

3. **Competitor Analysis**
   - Best-in-class solutions
   - Feature comparisons
   - Pricing models

4. **Emerging Technologies**
   - New tools and platforms
   - AI/ML innovations
   - Process improvements

### Gap Analysis Template

```
┌─────────────────────────────────────────────────────────────┐
│ GAP ANALYSIS                                                │
├─────────────────────────────────────────────────────────────┤
│ Current State: [Description of current deliverable]         │
│ Best Practice: [Description of industry best practice]      │
│ Gap: [What's missing or could be improved]                  │
│ Recommendation: [Specific enhancement proposal]             │
└─────────────────────────────────────────────────────────────┘
```

### Dashboard Integration

```python
client.start_phase(session_id, phase=2)
client.log(session_id, phase=2, level="info", message="Found 3 innovation opportunities")
client.complete_phase(session_id, phase=2)
```

---

## Phase 3: System of Adversarial Integrity

### Persona: Society of Guardians

**Role**: Three-persona adversarial debate

### The Three Guardians

#### The Defender
**Voice**: Passionate, articulate, persuasive

**Task**: Present the strongest case FOR the deliverable
- Highlight unique strengths
- Demonstrate innovation
- Address potential objections proactively
- Show alignment with Ruby Red

#### The Prosecutor
**Voice**: Skeptical, thorough, challenging

**Task**: Present the strongest case AGAINST the deliverable
- Identify weaknesses and blind spots
- Challenge assumptions
- Expose logical flaws
- Question feasibility

#### The Judge
**Voice**: Impartial, wise, decisive

**Task**: Weigh arguments and render verdict
- Consider both perspectives
- Evaluate evidence quality
- Assess overall soundness
- Deliver binding verdict

### Verdict Options

| Verdict | Action |
| :------ | :----- |
| **PASS** | Deliverable is sound, proceed to Phase 4 |
| **FAIL** | Critical flaws identified, return to Phase 1 with remediation requirements |

### Dashboard Integration

```python
client.start_phase(session_id, phase=3)
client.log(session_id, phase=3, level="info", message="Defender presenting case...")
client.log(session_id, phase=3, level="info", message="Prosecutor presenting counter-argument...")
client.log(session_id, phase=3, level="success", message="Verdict: PASSED")
client.complete_phase(session_id, phase=3)
```

---

## Phase 4: System of Communication

### Persona: The Presenter

**Role**: Visual communicator and presentation designer

**Voice**: Clear, professional, engaging

### Swiss International Style Requirements

| Element | Specification |
| :------ | :------------ |
| Typography | Inter (hierarchy), JetBrains Mono (data) |
| Background | #0A0A0A (black) |
| Text | #FFFFFF (white) |
| Accent | #E63946 (Ruby Red) |
| Layout | Grid-based, asymmetric |
| Aesthetic | Digital Brutalism |

### Required Deliverables

1. **Swiss-Style Presentation**
   - 8-12 slides
   - High contrast design
   - Data visualizations
   - Actionable conclusions

2. **Infographic Summary**
   - One-page visual
   - Key metrics
   - Timeline/roadmap
   - Call to action

3. **Gamification Header**
   - Milestone Map
   - Phase completion indicators
   - Fidelity Score display
   - "Certified by LLP V10.0" seal

### Dashboard Integration

```python
client.start_phase(session_id, phase=4)
client.log(session_id, phase=4, level="info", message="Generating Swiss-style presentation...")
client.update_artifacts(session_id, SessionArtifacts(
    presentation="[URL]",
    gamification_header="[URL]"
))
client.complete_phase(session_id, phase=4)
```

---

## Phase 5: System of Evolution

### Persona: Protocol Engineer

**Role**: Self-improvement and meta-learning

**Voice**: Reflective, analytical, constructive

### Self-Reflection Questions

1. What worked well in this execution?
2. What could have been done better?
3. Were there any bottlenecks or friction points?
4. Did the protocol serve Ruby Red effectively?
5. What would improve future executions?

### Proposal Template

```
┌─────────────────────────────────────────────────────────────┐
│ EVOLUTION PROPOSAL                                          │
├─────────────────────────────────────────────────────────────┤
│ Title: [Short descriptive title]                            │
│ Session: [Session ID]                                       │
│ Description: [What was observed during execution]           │
│ Proposed Change: [Specific modification to protocol]        │
│ Rationale: [Why this would improve the protocol]            │
│ Impact: [Expected benefits]                                 │
└─────────────────────────────────────────────────────────────┘
```

### Dashboard Integration

```python
client.start_phase(session_id, phase=5)
client.submit_proposal(
    session_id=session_id,
    title="Add timeout handling to Phase 2",
    description="External research sometimes takes too long",
    proposed_change="Add 5-minute timeout with fallback to cached results",
    rationale="Prevents stalls while maintaining quality"
)
client.complete_phase(session_id, phase=5)
```

---

## Phase 6: System of Certification

### Persona: The Proctor

**Role**: Final auditor and certifier

**Voice**: Authoritative, thorough, fair

### Artifact Audit Checklist

```
┌─────────────────────────────────────────────────────────────┐
│ ARTIFACT AUDIT                                              │
├─────────────────────────────────────────────────────────────┤
│ [ ] Intake Dashboard (Phase 0)                              │
│ [ ] 5-Dimension Score (Phase 1)                             │
│ [ ] Innovation Report (Phase 2)                             │
│ [ ] Adversarial Verdict (Phase 3)                           │
│ [ ] Swiss-Style Presentation (Phase 4)                      │
│ [ ] Gamification Header (Phase 4)                           │
│ [ ] Evolution Proposal (Phase 5)                            │
└─────────────────────────────────────────────────────────────┘
```

### Fidelity Score Calculation

| Component | Weight | Criteria |
| :-------- | :----- | :------- |
| Artifact Completeness | 40% | All required artifacts present and complete |
| Process Adherence | 30% | All phases executed in order, no skips |
| Quality Metrics | 30% | Assessor score, verdict outcome, presentation quality |

### Remediation Gate

```
IF fidelity_score >= 90:
    STATUS = "CERTIFIED"
    Generate Certificate of Completion
ELSE:
    STATUS = "REMEDIATION REQUIRED"
    Present options:
        [Remediate] → Re-run necessary phases
        [Accept As-Is] → Proceed with failing grade
```

### Certificate Template

```
╔══════════════════════════════════════════════════════════════════╗
║                    CERTIFICATE OF COMPLETION                      ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                   ║
║  This certifies that the initiative:                              ║
║                                                                   ║
║      [INITIATIVE NAME]                                            ║
║                                                                   ║
║  Has successfully completed the Learning Loop Protocol            ║
║  with a Fidelity Score of:                                        ║
║                                                                   ║
║                         [SCORE]/100                               ║
║                                                                   ║
║  Session ID: [SESSION_ID]                                         ║
║  Date: [TIMESTAMP]                                                ║
║                                                                   ║
║                              Certified by Learning Loop Protocol V10.0 ║
╚══════════════════════════════════════════════════════════════════╝
```

### Dashboard Integration

```python
client.start_phase(session_id, phase=6)
client.update_score(session_id, fidelity_score=94)
result = client.complete_session(session_id, fidelity_score=94)
# result.passed = "yes" if score >= 90
```

---

*Certified by Learning Loop Protocol V10.0*
