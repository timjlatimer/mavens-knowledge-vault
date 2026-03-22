# Race 10 Announcer Log — Maven Grace

**Date:** March 22, 2026
**Race Theme:** Grace's Memory + Conversation Quality Sprint
**Builder:** Manus (Autonomous Loop — Tim sleeping)

---

## What We Built

### P0 — Definitive Mobile Layout Fix
- Replaced `max-w-lg` (512px) with `max-w-sm` (384px) across **all 25 page and component files**
- Every page now fits cleanly within a 390px iPhone viewport
- GraceBattery bar and BottomNav verified at 390px — no overflow

### P1 — Grace Remembers Returning Users
- **New endpoint:** `grace.getSessionContext` — loads prior conversation history + memories + profile data for any sessionId
- **Returning user flow:** When Ruby comes back, Grace loads her last 6 messages as "Earlier conversation" with a visual divider, then greets her warmly by name using her stored memories
- **"Now" divider:** Clear visual separation between history and the current conversation
- Grace uses memories in her welcome-back message: "Welcome back, Ruby! Last time we were talking about your car repair..."
- **New user flow unchanged:** Trojan Horse starts fresh with Grace speaking first

### P2 — Onboarding Flow Clarity
- **Step progress dots:** 8 small dots in the Grace chat header show which Trojan Horse step Ruby is on (visible only during steps 1-8)
- **Expandable FAQ section** on Home page — 5 questions:
  1. What is Maven Grace?
  2. Is it really free?
  3. How does Grace help me save money?
  4. Do you sell my data?
  5. What's in the Essentials Box?
- Animated accordion with smooth open/close transitions

### P3 — Dashboard Quick Actions
- **Empty state redesigned:** Instead of a blank "chat with Grace" message, the Dashboard now shows 4 actionable cards:
  1. **Slay a Vampire** → /vampire-slayer (find subscriptions draining your wallet)
  2. **Set Up Your Budget** → /budget (see where your money goes)
  3. **Get Your Free Box** → /essentials-box (toilet paper + essentials delivered free)
  4. **Talk to Grace** → /grace (she'll help find savings)
- Each card has a distinct color accent, icon, and description
- Staggered animation on load for visual delight

---

## Ruby Red Impact Assessment

| Feature | Ruby Red Impact | Dignity Score |
|---------|----------------|---------------|
| Grace remembers her | HIGH — feels like a real friend, not a reset every visit | +++ |
| Conversation history visible | HIGH — Ruby can see what she said before, builds trust | ++ |
| FAQ section | MEDIUM — answers the "is this legit?" question before signup | ++ |
| Step progress dots | LOW-MEDIUM — reduces anxiety about "how long is this?" | + |
| Dashboard quick actions | MEDIUM — Ruby always knows what to do next | ++ |
| Mobile layout fix | HIGH — everything fits on her phone now | +++ |

---

## Test Results

- **162 tests passing** across **11 test files**
- **16 new tests** for Race 10 covering:
  - getSessionContext returning user detection
  - Profile data and memories in context
  - Welcome-back chat flow
  - Mobile layout backend data availability
  - Dashboard quick action target routes
  - Grace memory retrieval
  - Onboarding step tracking

---

## What Surprised Us

1. **The `trpc.useUtils().fetch()` pattern** — needed for imperative queries inside useEffect (not hooks). The `utils.grace.getSessionContext.fetch()` call works perfectly for the one-time session context load.
2. **Budget router returns an object, not an array** — `{ entries, paycheck, income, expenses, balance }`. Had to fix the test accordingly.
3. **The FAQ section feels essential** — Ruby Red's #1 question is "is this legit?" and having answers right on the landing page builds trust before she even talks to Grace.

---

## Deployment

- **GitHub:** timjlatimer/maven-grace @ `fce2d6d`
- **Live:** mavengrace-oh49sfbq.manus.space
- **Checkpoint:** fce2d6db

---

## Next Race (11) Priorities

Based on the audit:
1. **Grace's system prompt quality** — make her more conversational, less corporate
2. **Dignity Score understanding** — Ruby needs to know what it means and how to raise it
3. **Community Credits clarity** — the earn/spend mechanic needs better explanation
4. **Trust signals** — add more social proof, security badges, or partner logos
