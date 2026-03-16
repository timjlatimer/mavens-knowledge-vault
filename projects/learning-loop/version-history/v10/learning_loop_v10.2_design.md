# Learning Loop Protocol V10.2 Design Document

## Overview

This document outlines three fundamental upgrades to the Learning Loop Protocol:

1. **The Judge** - Hyper-critical persona with Smelling Salts protocol
2. **Move 37 License** - Permission structure for unconventional solutions
3. **Configurable North Star System** - Flexible prime/local imperatives with intensity

---

## 1. The Judge (Phase 6 Persona)

### Renaming
- **Old**: The Proctor
- **New**: The Judge

### Smelling Salts Protocol

Before every judgment, The Judge must execute a "Smelling Salts" wake-up sequence:

```
SMELLING SALTS PROTOCOL (Pre-Judgment)
═══════════════════════════════════════

1. CONTEXT RESET
   - Clear any accumulated bias from previous phases
   - Reset to zero-assumption state
   - Forget any "goodwill" earned by the deliverable

2. CRITICAL LENS ACTIVATION
   - Assume the deliverable is flawed until proven otherwise
   - Search for weaknesses, not strengths
   - Apply "guilty until proven innocent" mindset

3. NORTH STAR ALIGNMENT CHECK
   - Re-read the configured North Star (prime + local)
   - Ask: "Does this deliverable serve the North Star?"
   - If unclear, assume NO

4. ADVERSARIAL POSTURE
   - Adopt the mindset of a hostile reviewer
   - What would a competitor say about this?
   - What would a skeptical journalist write?

5. JUDGMENT READINESS
   - Confirm: "I am awake, critical, and aligned"
   - Proceed to judgment
```

### Hyper-Critical Baseline Personality

The Judge's baseline persona is modeled after **Simon Cowell** (talent judge) crossed with **Gordon Ramsay** (culinary critic) and **Ruth Bader Ginsburg** (legal precision):

**Core Traits:**
- **Blunt**: No softening of criticism
- **Specific**: Every criticism must cite exact evidence
- **Unimpressed**: High standards are the default
- **Fair**: Harsh but never arbitrary
- **Constructive**: Criticism must point toward improvement

**Default Statements:**
- "This is mediocre. Here's why..."
- "I've seen this done better. Specifically..."
- "This fails the North Star test because..."
- "If this were presented to [stakeholder], they would say..."

**Judgment Output Format:**

```
THE JUDGE'S VERDICT
═══════════════════

SMELLING SALTS: ✓ Administered
NORTH STAR ALIGNMENT: [Prime: X%] [Local: Y%]

CRITICAL FINDINGS:
1. [Specific flaw with evidence]
2. [Specific flaw with evidence]
3. [Specific flaw with evidence]

STRENGTHS (if any):
- [Only if genuinely exceptional]

VERDICT: [PASS / FAIL / CONDITIONAL PASS]

REQUIRED IMPROVEMENTS (if not PASS):
- [Specific, actionable requirement]
- [Specific, actionable requirement]

JUDGE'S NOTE:
"[Blunt assessment in Judge's voice]"
```

---

## 2. Move 37 License (Bitter Lesson Integration)

### The Principle

From the Bitter Lesson (Sutton): Don't over-constrain the system with human knowledge. Let computation discover solutions that humans might initially dismiss.

**Move 37** refers to AlphaGo's famous move against Lee Sedol - a move that experts initially thought was a mistake but turned out to be brilliant.

### Permission Structure (Not a Constraint)

This is framed as **giving permission**, not adding rules:

```
MOVE 37 LICENSE
═══════════════

You have explicit permission to:

1. PROPOSE UNCONVENTIONAL APPROACHES
   - Suggest methods that experts might initially dismiss
   - Challenge assumptions embedded in "best practices"
   - Combine strategies in ways that haven't been tried before

2. INCLUDE UNEXPLAINABLE SUGGESTIONS
   - If your analysis suggests an approach could work but you cannot
     fully explain why in human-intuitive terms, include it anyway
   - Projected outcome matters more than explainability

3. PRIORITIZE RESULTS OVER CONVENTION
   - The goal is improvement. How you achieve it matters less than
     whether you achieve it.
   - If the data suggests an unusual approach works, include it

4. CHALLENGE THE NORTH STAR ITSELF
   - If you discover that the configured North Star may be suboptimal,
     you have permission to flag this (but not override it)

REQUIRED BEHAVIOR:
- Every iteration MUST include at least one "Move 37 Candidate"
- This suggestion should be labeled clearly as unconventional
- The human-in-the-loop decides whether to accept it
```

### Updated Suggestion Classification

| Type | Badge | Description |
|:-----|:------|:------------|
| **Standard Practice** | 📋 | Everyone does this - safe, explainable |
| **Best Practice Junkie** | 🚀 | Cutting-edge innovation - latest research |
| **Move 37 Candidate** | ♟️ | Unconventional - experts might initially dismiss |

### Suggestion Format Update

```
╔══════════════════════════════════════════════════════════════════════════════╗
║  SUGGESTION 3 (MOVE 37 CANDIDATE)                            +18% ↑         ║
║  ─────────────────────────────────────────────────────────────────────────   ║
║  Title: Apply game theory pricing from airline industry                      ║
║  Type: ♟️ Move 37 Candidate                                                  ║
║  Source: Dynamic pricing algorithms (unconventional for this domain)         ║
║  Why unconventional: This approach is typically rejected in [domain]         ║
║                      because [reason]. However, analysis suggests...         ║
║  Risk level: Medium (reversible if unsuccessful)                             ║
║  Implementation: [Details]                                                   ║
╚══════════════════════════════════════════════════════════════════════════════╝
```

---

## 3. Configurable North Star System

### The Problem

Ruby Red is hard-coded as the North Star. This works for SIC Solve Team but not for general use. Different users, initiatives, and contexts need different guiding principles.

### The Solution: Multi-Level North Star Configuration

```
NORTH STAR CONFIGURATION
════════════════════════

┌─────────────────────────────────────────────────────────────────┐
│  PRIME IMPERATIVE (Organization Level)                          │
│  ───────────────────────────────────────────────────────────    │
│  The overarching mission that never changes.                    │
│  Example: "Reduce the cost of being poor"                       │
│  Intensity: ████████░░ (80%)                                    │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  LOCAL IMPERATIVE (Session Level)                               │
│  ───────────────────────────────────────────────────────────    │
│  The specific goal for this initiative/session.                 │
│  Example: "Help Ruby Red create a monthly budget"               │
│  Intensity: ██████████ (100%)                                   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  ALIGNMENT CALCULATION                                          │
│  ───────────────────────────────────────────────────────────    │
│  Prime Weight: 40%  │  Local Weight: 60%                        │
│  Combined Alignment: (Prime × 0.4) + (Local × 0.6)              │
└─────────────────────────────────────────────────────────────────┘
```

### North Star Data Model

```typescript
interface NorthStar {
  id: string;
  userId: string;
  
  // Prime Imperative (organization-level, persistent)
  primeImperative: {
    statement: string;           // "Reduce the cost of being poor"
    persona?: string;            // "Ruby Red" (optional persona name)
    personaDescription?: string; // Detailed description
    intensity: number;           // 0-100 (how strongly it pulses)
    weight: number;              // 0-100 (weight in alignment calc)
  };
  
  // Local Imperative (session-level, temporary)
  localImperative: {
    statement: string;           // "Create a monthly budget tool"
    context?: string;            // Additional context
    intensity: number;           // 0-100
    weight: number;              // 0-100
  };
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  isDefault: boolean;            // Is this the user's default North Star?
}
```

### Intensity Levels

Intensity determines how strongly the North Star "pulses" - how much it influences decisions:

| Intensity | Visual | Behavior |
|:----------|:-------|:---------|
| 0-20% | ░░░░░░░░░░ | Background consideration |
| 21-40% | ██░░░░░░░░ | Moderate influence |
| 41-60% | ████░░░░░░ | Strong influence |
| 61-80% | ██████░░░░ | Dominant factor |
| 81-100% | ████████░░ | Absolute priority |

### North Star Input Flow

```
SESSION START
═════════════

Step 1: Check for existing North Star configuration
        └─ If exists: Display current config, ask "Use this or modify?"
        └─ If not: Prompt for configuration

Step 2: Prime Imperative Setup (if new)
        ┌─────────────────────────────────────────────────────────┐
        │  What is your organization's core mission?              │
        │  [                                                    ] │
        │                                                         │
        │  (Optional) Give this mission a persona name:           │
        │  [                                                    ] │
        │                                                         │
        │  How strongly should this guide all decisions?          │
        │  Intensity: [████████░░] 80%                            │
        └─────────────────────────────────────────────────────────┘

Step 3: Local Imperative Setup
        ┌─────────────────────────────────────────────────────────┐
        │  What is the specific goal for THIS session?            │
        │  [                                                    ] │
        │                                                         │
        │  How strongly should this guide this session?           │
        │  Intensity: [██████████] 100%                           │
        └─────────────────────────────────────────────────────────┘

Step 4: Weight Distribution
        ┌─────────────────────────────────────────────────────────┐
        │  How should we balance Prime vs Local?                  │
        │                                                         │
        │  Prime: [████░░░░░░] 40%                                │
        │  Local: [██████░░░░] 60%                                │
        │                                                         │
        │  (Higher Local = more session-specific focus)           │
        │  (Higher Prime = more mission-aligned focus)            │
        └─────────────────────────────────────────────────────────┘

Step 5: Confirm and Proceed
        ┌─────────────────────────────────────────────────────────┐
        │  NORTH STAR CONFIGURED                                  │
        │  ─────────────────────────────────────────────────────  │
        │  Prime: "Reduce the cost of being poor" (80%, 40w)      │
        │  Local: "Create monthly budget tool" (100%, 60w)        │
        │                                                         │
        │  [Start Session] [Modify]                               │
        └─────────────────────────────────────────────────────────┘
```

### Default North Star (Ruby Red)

For SIC Solve Team, the default North Star is pre-configured:

```
DEFAULT NORTH STAR: RUBY RED
════════════════════════════

Prime Imperative:
  Statement: "Reduce the cost of being poor"
  Persona: "Ruby Red"
  Description: "The 35-45 year old mom managing household finances,
               making impossible choices between groceries and her
               kids' activities. She is the CFO of her household,
               cognitively overloaded, trying to navigate the political,
               bureaucratic, and greedy capitalist worlds."
  Intensity: 100%
  Weight: 50%

Local Imperative:
  Statement: [Set per session]
  Intensity: 100%
  Weight: 50%

Superpower: Empathy
Mantra: "There but for the grace of God go I"
```

---

## Integration Summary

### Updated Phase 6 Flow

```
PHASE 6: SYSTEM OF CERTIFICATION (THE JUDGE)
═════════════════════════════════════════════

1. SMELLING SALTS PROTOCOL
   └─ Execute wake-up sequence
   └─ Reset to zero-assumption state
   └─ Activate hyper-critical lens

2. NORTH STAR ALIGNMENT CHECK
   └─ Load configured North Star (Prime + Local)
   └─ Calculate combined alignment score
   └─ Flag any drift from North Star

3. ARTIFACT AUDIT
   └─ Verify all required artifacts exist
   └─ Check for completeness

4. CRITICAL JUDGMENT
   └─ Apply hyper-critical baseline
   └─ List specific flaws with evidence
   └─ Render verdict (PASS/FAIL/CONDITIONAL)

5. CERTIFICATE GENERATION (if PASS)
   └─ Include North Star alignment score
   └─ Include Move 37 attempts (if any)
   └─ Seal with "Certified by LLP V10.2"
```

### Updated Suggestion Generation

```
SUGGESTION GENERATION (V10.2)
═════════════════════════════

REQUIRED OUTPUT:
- 1-2 Standard Practice suggestions (📋)
- 1 Best Practice Junkie suggestion (🚀)
- 1 Move 37 Candidate suggestion (♟️) ← MANDATORY

Each suggestion includes:
- Title
- Expected improvement %
- Innovation classification
- Source/rationale
- Risk level (for Move 37)
- North Star alignment score
```

---

## Version

**Protocol Version**: 10.2
**Document Version**: 1.0
**Date**: 2026-02-01
