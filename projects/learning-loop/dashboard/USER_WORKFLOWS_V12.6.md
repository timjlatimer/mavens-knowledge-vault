# Learning Loop Dashboard V12.6 - User Workflows

## Complete Guide for HB1000 Hive Mind Team

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Individual Mode Workflow](#individual-mode-workflow)
3. [Team Collaboration Workflow](#team-collaboration-workflow)
4. [Entry Points - When to Use the Learning Loop](#entry-points)
5. [Inputs and Outputs](#inputs-and-outputs)
6. [Gamification Gifts](#gamification-gifts)
7. [Quick Reference Cards](#quick-reference-cards)

---

## Getting Started

### First-Time Setup

1. **Access the Dashboard** - Navigate to the Learning Loop Mission Control at your deployed URL
2. **Configure Your North Star** - Go to `/north-star` to set your default Ruby Red persona and intensity level
3. **Set Budget Preferences** - Configure credit limits in the settings to receive warnings before exceeding your budget
4. **Review Templates** - Browse `/templates` to see pre-configured initiative templates for common use cases

### Understanding the Interface

The dashboard is organized into these key areas:

| Area | Purpose | URL |
|------|---------|-----|
| Mission Control | Main dashboard with all phases visible | `/` |
| Live Protocol | Execute new initiatives | `/live` |
| History | View past sessions | `/history` |
| Templates | Pre-configured starting points | `/templates` |
| Patterns | Move 37 pattern library | `/patterns` |
| Knowledge Base | Accumulated learnings | `/knowledge` |
| Gamification | Track applied gamification | `/gamification` |
| Admin | Protocol evolution management | `/admin` |
| Analytics | Performance metrics | `/analytics` |

---

## Individual Mode Workflow

### Step 1: Start a New Initiative

1. Navigate to **Live Protocol** (`/live`)
2. Select **"Start Single Assignment"** for individual work
3. You'll see the Initiative Setup Form

### Step 2: Configure Your Initiative

**Required Inputs:**

| Field | Description | Example |
|-------|-------------|---------|
| Initiative/Problem | What you want to accomplish | "Help Ruby Red build a $500 emergency fund" |
| North Star | Who you're solving for | "Ruby Red - the CFO of the household" |
| Intensity Level | How thorough (Casual → PRIMAL+) | 99% for critical initiatives |

**Optional Enhancements:**

- **Quick Start Templates** - Click to select from 5 pre-configured templates
- **Phase-by-Phase Breakdown** - View estimated time per phase
- **Token Cost Estimation** - See projected Manus and LLM token usage

### Step 3: Review Token Cost Estimation

Before starting, the system shows:

- **Manus Tokens** - Platform processing tokens
- **LLM Tokens** - AI model tokens
- **Total Credits** - Combined cost estimate
- **Duration** - Estimated completion time
- **Budget Status** - Green (within budget) or Red (exceeds limit)

If the estimate exceeds your budget limit, you'll see a warning with options to:
- Proceed anyway (with acknowledgment)
- Reduce intensity
- Cancel and adjust

### Step 4: Execute the Protocol

Click **"Start Execution"** to begin. The system will:

1. **Phase 0: System of Intake** - The Sorter analyzes and categorizes your initiative
2. **Phase 1: System of Record** - The Assessor scores across 5 dimensions
3. **Phase 2: System of Innovation** - Best Practice Junkie searches for solutions
4. **Phase 3: System of Adversarial Integrity** - Society of Guardians debates
5. **Phase 4: System of Communication** - The Presenter creates deliverables
6. **Phase 5: System of Evolution** - Protocol Engineer proposes improvements
7. **Phase 6: System of Certification** - The Judge validates the work
8. **Phase 7: Drift Audit** - Drift Agent checks for alignment

### Step 5: Human-in-the-Loop (HiTL) Checkpoints

At each phase, you'll be asked to approve before proceeding:

- **Review** the phase output
- **Accept** to continue to next phase
- **Reject** to request revision
- **Provide feedback** for adjustments

The HiTL badge shows: `🔴 HB1000 APPROVAL REQUIRED`

### Step 6: Receive Your Outputs

Upon completion, you receive:

1. **Swiss Report** - Comprehensive infographic summary
2. **Certificate of Completion** - With fidelity score
3. **Gamification Gift** - Applied gamification for your initiative
4. **Downloadable Code** - If gamification includes implementation
5. **Drift Report** - Alignment verification

---

## Team Collaboration Workflow

### Setting Up Team Mode

1. Navigate to **Live Protocol** (`/live`)
2. Select **"Start Team Collaboration"**
3. Share the session link with team members

### Real-Time Collaboration Features

**Collaboration Panel** (Right Sidebar):

| Feature | Description |
|---------|-------------|
| Active Participants | See who's currently viewing |
| Status Indicators | Active (green), Idle (yellow), Away (gray) |
| Shared Voting | All team members vote on approvals |
| Vote Tally | Shows approve/reject/abstain counts |
| Decision Threshold | Configurable majority requirement |

### Team Voting Process

At each HiTL checkpoint:

1. **All participants see** the phase output simultaneously
2. **Each member votes** independently (Approve/Reject/Abstain)
3. **Vote tally updates** in real-time
4. **Decision reached** when threshold met (e.g., 2/3 majority)
5. **Protocol advances** based on collective decision

### Team Roles

| Role | Permissions |
|------|-------------|
| Session Owner | Full control, can override votes |
| Collaborator | Can vote, view, and comment |
| Observer | View-only access |

### Communication During Sessions

- **Active Messaging** panel shows real-time updates
- **Intensity indicator** reminds team of commitment level
- **Timing clocks** keep everyone synchronized

---

## Entry Points - When to Use the Learning Loop

### Recommended Entry Points

| Situation | Recommended Intensity | Entry Point |
|-----------|----------------------|-------------|
| Quick brainstorm | Casual (25%) | `/live` → Single Assignment |
| Process improvement | Focused (50%) | `/templates` → Process Improvement |
| Critical decision | Driven (75%) | `/live` → Team Collaboration |
| Emergency response | PRIMAL (90%) | `/live` → Single Assignment |
| Life-or-death | PRIMAL+ (99%) | `/live` → Team Collaboration |

### When NOT to Use

- Simple yes/no questions (use direct chat instead)
- Tasks requiring immediate action (< 5 minutes)
- Purely creative work without constraints

### Integration with Existing Workflows

**Before a Project:**
- Use Learning Loop to validate approach
- Get gamification suggestions for user engagement

**During a Project:**
- Use for complex decision points
- Run adversarial integrity checks on deliverables

**After a Project:**
- Use for retrospective analysis
- Generate evolution proposals for next iteration

---

## Inputs and Outputs

### Required Inputs

| Input | Type | Description |
|-------|------|-------------|
| Initiative Description | Text | Clear statement of what you want to accomplish |
| North Star | Text | Who you're solving for (default: Ruby Red) |
| Intensity Level | Slider (0-100%) | How thorough the analysis should be |

### Optional Inputs

| Input | Type | Description |
|-------|------|-------------|
| Template | Selection | Pre-configured starting point |
| Scope Tags | Multi-select | Categories for the initiative |
| Budget Limit | Number | Maximum credits to spend |
| Team Members | User list | Collaborators for team mode |

### Guaranteed Outputs

| Output | Format | Description |
|--------|--------|-------------|
| Swiss Report | Infographic | Visual summary of all findings |
| Phase Logs | JSON/Text | Detailed record of each phase |
| Certificate | Badge | Completion verification with fidelity score |
| Activity Timeline | Visual | Chronological record of all actions |

### Conditional Outputs

| Output | Condition | Format |
|--------|-----------|--------|
| Gamification Gift | If applicable | Code + Documentation |
| Evolution Proposals | If improvements found | Amendment proposals |
| Drift Report | If drift detected | Alignment analysis |
| Pattern Suggestions | If Move 37 applicable | Pattern recommendations |

---

## Gamification Gifts

### How Gamification Works

The **Gamification Agent** automatically:

1. **Analyzes** your initiative for gamification opportunities
2. **Checks** existing gamification (if any)
3. **Audits** against best practices database
4. **Proposes** new or updated gamification
5. **Requests HiTL approval** before applying

### First-Time Gift

If your initiative has no gamification, you receive a **First-Time Gift**:

- Automatically selected from 10 master patterns
- Matched to your initiative type
- Includes implementation code
- Ready to deploy

### Master Gamification Patterns

| Pattern | Category | Use Case |
|---------|----------|----------|
| Points System | Engagement | Track progress and achievements |
| Achievement Badges | Recognition | Celebrate milestones |
| Progress Bars | Visualization | Show completion status |
| Leaderboards | Competition | Compare performance |
| Streaks | Retention | Encourage consistency |
| Challenges | Motivation | Set goals and rewards |
| Levels | Progression | Unlock new capabilities |
| Rewards | Incentives | Provide tangible benefits |
| Social Proof | Trust | Show community activity |
| Onboarding | Adoption | Guide new users |

### Gamification Audit

For initiatives with existing gamification:

1. **Current State Analysis** - What's already implemented
2. **Best Practice Comparison** - How it compares to patterns
3. **Relevance Score** - Is it still appropriate?
4. **Update Recommendations** - Suggested improvements
5. **HiTL Decision** - Accept, reject, or modify

### Accessing Gamification

- **During Protocol** - Gamification Agent panel in right sidebar
- **After Protocol** - Gamification section in Swiss Report
- **Anytime** - `/gamification` page for all tracked gamification

---

## Quick Reference Cards

### Starting a Session

```
1. Go to /live
2. Choose mode (Single/Team)
3. Enter initiative description
4. Set North Star (Ruby Red default)
5. Adjust intensity (99% for critical)
6. Review token estimate
7. Click "Start Execution"
```

### Approving a Phase

```
1. Review phase output
2. Check for completeness
3. Verify alignment with North Star
4. Click "Approve" or "Reject"
5. Add feedback if needed
6. Wait for next phase
```

### Team Collaboration

```
1. Start team session
2. Share link with team
3. Wait for participants
4. Execute protocol together
5. Vote on each checkpoint
6. Reach consensus
7. Review final output
```

### Handling Budget Warnings

```
1. See budget warning
2. Review estimated cost
3. Options:
   a. Proceed anyway (acknowledge)
   b. Reduce intensity
   c. Cancel and adjust
4. Add optional notes
5. Continue or abort
```

### Reviewing Drift Report

```
1. See drift findings
2. For each item:
   a. Accept drift (intentional)
   b. Reject drift (needs fix)
3. Review rollback options
4. Confirm decisions
5. Generate final report
```

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+Enter` | Approve current phase |
| `Ctrl+Shift+Enter` | Reject current phase |
| `Esc` | Close modal/dialog |
| `?` | Show help |

---

## Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| Session not loading | Refresh page, check connection |
| Approval stuck | Check for pending HiTL |
| Budget exceeded | Reduce intensity or increase limit |
| Team member can't join | Verify session link, check permissions |
| Drift detected | Review and accept/reject findings |

### Getting Help

- **In-app** - Click `?` for contextual help
- **Documentation** - `/docs` folder in project
- **Admin Console** - `/admin` for system status

---

*Document Version: V12.6*
*Last Updated: February 3, 2026*
*Author: Manus AI for HB1000 Hive Mind*
