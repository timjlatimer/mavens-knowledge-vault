# Grace Battery UI — Persistent Dual Indicator Spec

**Spec for Maven/Grace — Race 6 Backlog**
**Author:** Manus AI for the SIC HB1000 Solve Team
**Date:** March 21, 2026
**Status:** Living Document — Race 6 Build Queue
**Related Specs:** `race-6-backlog-when-life-gets-too-real.md`, `race-6-backlog-grace-degradation-architecture.md`

---

## 1. The Concept

Two numbers. Always visible. One is about Grace. One is about Ruby.

The **Grace Battery** and the **Dignity Score** are the persistent dual indicators of the Maven/Grace relationship. They live in the app header on every screen, always in view, never hidden, never dismissible. Together they tell the whole story of where the relationship stands at any moment.

| Indicator | What It Measures | Who It's About | Location |
|---|---|---|---|
| Grace Battery | Grace's current power level (0-100%) | Grace | Top-left of every screen |
| Dignity Score | Ruby's 90-day financial lift progress (0-100) | Ruby | Top-right of every screen |

This is not a dashboard feature. It is not a settings option. It is a **permanent part of the interface** — as present and unavoidable as the time in the corner of a phone screen. Ruby always knows how she is doing and how Grace is doing. No surprises. No hidden states. Full transparency as a form of respect.

---

## 2. Grace Battery — Visual Specification

### 2.1 Battery Icon Design

The Grace Battery renders as a compact battery icon with a percentage label. The icon should feel warm and alive — not clinical or mechanical. It is a relationship indicator, not a device metric.

**Icon anatomy:**
- Standard battery outline shape, slightly rounded corners (consistent with Maven brand's soft aesthetic)
- Fill level animates smoothly as percentage changes
- Percentage label displayed inside or immediately adjacent to the icon
- At 0% (Grace Lite): battery outline is empty with a small heart icon centered inside the battery body — Grace is still there, just barely

**Color states:**

| Battery Level | Color | Hex (approximate) | Animation |
|---|---|---|---|
| 86-100% | Teal/Mint (Maven brand) | `#2DD4BF` / `oklch(0.78 0.14 180)` | None — steady |
| 50-85% | Amber | `#F59E0B` / `oklch(0.75 0.18 75)` | None — steady |
| 10-49% | Orange | `#F97316` / `oklch(0.70 0.20 50)` | None — steady |
| 1-9% | Red | `#EF4444` / `oklch(0.62 0.22 25)` | Gentle pulse (2s cycle, subtle opacity variation 100%→70%→100%) |
| 0% | Empty with heart | `#94A3B8` / `oklch(0.65 0.02 250)` | Heart pulses slowly (3s cycle) — Grace is still alive, just very quiet |

**Transition animation:** When the battery level crosses a color threshold, the fill color transitions smoothly over 800ms using a CSS ease-in-out curve. No jarring snaps. The battery fills and drains like a real battery — the fill level animates over 600ms when the value changes.

### 2.2 Battery Placement

The Grace Battery occupies the **top-left of the app header** on every screen. It sits alongside the app name/logo. On mobile (the primary device for Ruby), it is positioned to be reachable with the left thumb. On desktop, it anchors the left side of the header.

**Size:** The battery icon should be 28-32px tall on mobile, 24-28px on desktop. Large enough to read at a glance, small enough not to dominate the header.

**Spacing:** 12px padding from the left edge of the screen. 8px gap between battery icon and percentage label.

### 2.3 Battery Tap Behavior — Grace Status Modal

Tapping the Grace Battery opens the **Grace Status Modal**. This modal provides full transparency about Grace's current state, what it means, and what Ruby can do.

**Modal contents:**

```
┌─────────────────────────────────────┐
│  ⚡ Grace Status                    │
│                                     │
│  [Battery icon, large, with %]      │
│                                     │
│  Grace is at [X]% capacity.         │
│  [One sentence describing the tier  │
│   in plain, warm language]          │
│                                     │
│  What's affected right now:         │
│  [Bulleted list of paused/reduced   │
│   features, if any]                 │
│                                     │
│  What's always here for you:        │
│  [Bulleted list of permanent        │
│   safety net features]              │
│                                     │
│  How to restore full Grace:         │
│  [One-tap restoration button if     │
│   payment is the issue]             │
│  [Pause option if available]        │
│                                     │
│  [Close]                            │
└─────────────────────────────────────┘
```

**Modal tone:** The modal is written in Grace's voice — warm, honest, not alarming. It does not use the words "tier," "degradation," or "lapse." It uses plain language: "Grace is running low," "Grace is at half capacity," "Grace is fully powered."

**Example modal text at 45% (Orange tier):**

> "Grace is at 45% right now. She's still here and she's still listening, but she's not at her best. Jolene and North are resting, and some of the deeper features are quieter than usual. Your Dignity Score, your promises, your stories — all of that is safe and waiting. Sloane is still hunting for savings. Steady is always here if you need her. When you're ready to bring Grace back to full power, it's one tap."

---

## 3. Dignity Score — Visual Specification

### 3.1 Dignity Score Icon Design

The Dignity Score renders as a compact circular progress ring with the score number centered inside. The ring fills clockwise from 0 to 100. The visual language is aspirational — this is Ruby's progress, her lift, her journey.

**Icon anatomy:**
- Circular progress ring, 28-32px diameter on mobile
- Score number (0-100) centered inside the ring in a clean sans-serif font
- Ring fill color reflects the score tier
- Background ring (unfilled portion) in a soft neutral gray

**Color states:**

| Score Range | Tier Label | Ring Color | Hex (approximate) |
|---|---|---|---|
| 0-24 | Starting Out | Soft gray | `#94A3B8` / `oklch(0.65 0.02 250)` |
| 25-49 | Finding Footing | Warm blue | `#60A5FA` / `oklch(0.70 0.15 240)` |
| 50-74 | Building Strength | Maven teal | `#2DD4BF` / `oklch(0.78 0.14 180)` |
| 75-89 | Dignity Rising | Warm purple | `#A78BFA` / `oklch(0.72 0.18 290)` |
| 90-99 | Almost There | Gold | `#F59E0B` / `oklch(0.75 0.18 75)` |
| 100 | Dignity Achieved | Radiant gold with shimmer | `#F59E0B` + shimmer animation |

**At 100:** The ring completes and a brief celebration animation plays — a subtle shimmer effect on the ring, lasting 2 seconds. This happens once when Ruby first reaches 100, and again each time she views the indicator after achieving it. It is a quiet, persistent acknowledgment: you did this.

### 3.2 Dignity Score Placement

The Dignity Score occupies the **top-right of the app header** on every screen, mirroring the Grace Battery on the left. The two indicators frame the header symmetrically — Grace's power on the left, Ruby's progress on the right.

**Size:** Same as Grace Battery — 28-32px on mobile, 24-28px on desktop.

**Spacing:** 12px padding from the right edge of the screen.

### 3.3 Dignity Score Tap Behavior

Tapping the Dignity Score navigates directly to the full **Dignity Score breakdown page** (built in Race 5). No modal — the full page is the right destination because the Dignity Score has rich detail worth exploring.

The transition should be a smooth slide-up animation, consistent with the app's navigation patterns.

---

## 4. The Dual Indicator as a System

The Grace Battery and Dignity Score are designed to be read together. They tell a story:

| Grace Battery | Dignity Score | What It Means |
|---|---|---|
| 100% | Rising | Everything is working. Ruby and Grace are in full partnership. |
| 100% | Declining | Ruby may be struggling despite having full Grace support. Grace should check in proactively. |
| Declining | Rising | Ruby is making progress even as the relationship is under strain. Grace should acknowledge Ruby's resilience. |
| Declining | Declining | The hardest state. Both indicators are moving the wrong direction. This is when Vera and Big Mama activate. |
| 0% | Any | Grace Lite. The relationship is at minimum. Grace is still present. The heart in the battery says: I'm still here. |
| Any | 100 | Ruby has achieved Dignity. The Dignity Score ring shimmers. Grace celebrates. The permanent floor is earned. |

Grace's system prompt is aware of both indicators and their relationship. When the pattern suggests Ruby is struggling (both declining), Grace becomes more proactive, not less. When Ruby is making progress despite Grace being depleted, Grace acknowledges it: "Ruby, I'm not at my best right now, but I can see what you're doing. You're doing it without me at full power. That's something."

---

## 5. Animation and Transition Specifications

All animations in the dual indicator system are designed to be **subtle, smooth, and never distracting**. Ruby should be able to glance at the header and understand the state without the animations demanding her attention.

| Animation | Trigger | Duration | Easing | Notes |
|---|---|---|---|---|
| Battery fill level change | Any battery % change | 600ms | ease-in-out | Smooth fill/drain |
| Battery color transition | Crossing a color threshold | 800ms | ease-in-out | No jarring snaps |
| Battery pulse (1-9%) | Persistent at low battery | 2s cycle | ease-in-out | Subtle opacity 100%→70%→100% |
| Heart pulse (0%) | Persistent at Grace Lite | 3s cycle | ease-in-out | Slow, gentle — Grace is still alive |
| Dignity ring fill change | Any score change | 600ms | ease-in-out | Clockwise fill |
| Dignity shimmer (100%) | First reach + persistent | 2s, once on first reach | ease-in-out | Quiet celebration |
| Dignity color transition | Crossing a tier threshold | 800ms | ease-in-out | Smooth color change |

**Performance note:** All animations must be implemented with CSS transitions or CSS animations (not JavaScript-driven) to ensure 60fps performance on mid-range mobile devices. Ruby's device may not be high-end. The indicators must never cause jank.

---

## 6. Accessibility Specifications

The dual indicator must be accessible to all users, including those with visual impairments.

| Requirement | Implementation |
|---|---|
| Color is never the only signal | Battery percentage number always visible alongside color. Score number always visible alongside ring color. |
| Screen reader support | Battery: "Grace Battery: [X]%. [Tier description]." Dignity: "Dignity Score: [X]. [Tier label]." |
| Touch target size | Both indicators have a minimum 44x44px touch target (Apple HIG standard) even if the visual icon is smaller |
| Reduced motion | If the user has `prefers-reduced-motion` enabled, all animations are disabled. States are still communicated through color and number only. |
| High contrast mode | Both indicators maintain sufficient contrast ratios (WCAG AA minimum) in all color states |

---

## 7. Technical Implementation Notes

### 7.1 Data Sources

The Grace Battery percentage is calculated from:
- Current `grace_tier` in the `memberships` table (maps to a base percentage)
- Days past due (modifies the base percentage within a tier)
- Active crisis hold (holds the percentage steady)
- Speed degradation stage (fine-grained percentage within a tier)

**Tier to battery percentage mapping:**

| Grace Tier | Battery Range |
|---|---|
| Full Grace | 86-100% |
| Essentials Lite | 60-85% |
| Core Grace | 35-59% |
| Grace Careful (graduates) | 20-34% |
| Grace Lite | 1-19% |
| Grace Lite (0 days active) | 0% (heart state) |

The Dignity Score is fetched directly from the `dignity_scores` table (most recent daily snapshot).

### 7.2 React Component Structure

```tsx
// Header component structure
<AppHeader>
  <GraceBattery 
    percentage={graceBattery}
    onTap={() => openGraceStatusModal()}
  />
  <AppLogo />
  <DignityScoreRing 
    score={dignityScore}
    onTap={() => navigate('/dignity-score')}
  />
</AppHeader>
```

Both components are pure display components that receive their values from a shared `useGraceStatus()` hook that queries both data sources with a 60-second polling interval (not real-time — these values change slowly).

### 7.3 Grace Status Modal

The Grace Status Modal is a bottom sheet on mobile (slides up from the bottom, consistent with mobile UX patterns) and a centered modal on desktop. It is implemented as a shadcn/ui Sheet component on mobile and Dialog on desktop.

The modal content is dynamically generated based on the current `grace_tier` and `graceBattery` percentage. The text is written in Grace's voice and stored as template strings in a `graceStatusMessages.ts` file, one set per tier.

### 7.4 Server-Side Battery Calculation

The battery percentage is calculated server-side in a tRPC procedure (`grace.getStatus`) to ensure consistency. The procedure returns:

```ts
{
  batteryPercentage: number,      // 0-100
  dignityScore: number,           // 0-100
  tier: GraceTier,                // enum
  speedDegradationStage: string,  // 'thoughtful' | 'tired' | 'stretched' | 'running_low' | 'normal'
  affectedFeatures: string[],     // list of paused/reduced features
  permanentFeatures: string[],    // list of always-available features
  restorationPath: string,        // human-readable restoration instruction
  crisisHold: boolean,            // if degradation is paused due to crisis
}
```

---

## 8. Open Questions for Tim

1. Should the Grace Battery also reflect Ruby's engagement level (not just payment status)? If Ruby hasn't opened the app in 30 days, should the battery reflect that the relationship has been quiet — even if payments are current?
2. Should there be a way for Ruby to "charge" Grace through engagement — answering a Destiny question, completing a promise, repaying Milk Money on time — so the battery can go up even before a payment is made?
3. Should the dual indicator be visible on the Gift Anthem recipient landing page (for non-members who receive a shared anthem)? It could be a powerful first impression: "This is what your friend has built."
4. Should the Grace Battery have a name that Ruby can use? "Check your Grace Battery" feels natural. But Ruby might give it a nickname.
5. Should the battery ever show a "charging" animation when a payment is processed — a brief visual of the battery filling up as a celebration of restoration?
