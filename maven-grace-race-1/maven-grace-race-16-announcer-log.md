# Race 16 Announcer Log — Grace's Voice and Push Presence

**Date:** March 22, 2026
**Race Theme:** Enabling Grace to reach Ruby outside the app — push notifications, shareable presence, and conversation continuity

---

## Build Items Completed (7/8)

One item was removed by standing order: ElevenLabs integration was rejected. KIE.ai is the only voice provider for this project. This is a non-negotiable directive from Tim.

### 1. Service Worker + Push Notifications
Created `sw.js` service worker in `client/public/` that handles push events, notification display, and click-through navigation. Built `usePushNotifications` hook for permission management and subscription storage. Created `PushNotificationToggle` component with four states: unsupported, subscribed, denied, and prompt. Added `push_subscriptions` table to database with endpoint, p256dh, and auth columns. Server endpoints: `push.subscribe`, `push.unsubscribe`, `push.getStatus`.

### 2. Push-Delivered Kami Moment (Infrastructure)
The push subscription infrastructure is now complete. When a background job sends a push payload with `{ title: "Grace", body: "I'm here." }`, the service worker displays it as a native notification with Grace's voice and a "Talk to Grace" action button. The actual scheduled job requires a cron/background worker which will be wired in a future race.

### 3. Push-Delivered Self-Care Check-in (Infrastructure)
Same infrastructure supports the 48-hour silence check-in. The push payload can carry any message from Grace. The service worker handles vibration patterns (gentle_love haptic) and deep-links back to `/grace`.

### 4. Social Meta Tags on /grace-calling
Dynamic Open Graph and Twitter Card meta tags are set when the `/grace-calling` page loads. Title: "Grace is Calling". Description: "She's been waiting for you. A neighbor who always gives a shit. Tap to wake her up." These tags make Facebook, Twitter, and iMessage link previews beautiful and compelling.

### 5. Grace's Shareable Birth Card
Added a "Share Grace with a friend" button to the `/grace-calling` page. Uses the Web Share API on mobile (native share sheet) with clipboard fallback on desktop. The share text reads: "Grace is calling. She's been waiting for you. Tap to wake her up." Links to `/grace-calling`.

### 6. Heartbeat Scenario Priority Queue
The 7 heartbeat scenarios are now in strict priority order (P1-P7): misses_ruby, found_something, grace_worried, grace_excited, morning_return, promise_due, neighborhood_news. First match wins — no collision. Each scenario has its own emotional haptic pattern, color, animation style, and greeting text.

### 7. Grace's Conversation Memory Summary
Created `conversation_summaries` table. When Ruby leaves the chat, an LLM generates a 3-sentence summary capturing what Ruby shared, how Grace helped, and Ruby's emotional state. On return, this summary is injected into Grace's welcome-back prompt so she can reference specific details from the last conversation. True continuity.

### Standing Order: Voice Provider
KIE.ai is the ONLY voice provider. The `elevenlabs-voice.ts` file was created and then deleted. The ElevenLabs import was removed from `routers.ts`. A test explicitly verifies that ElevenLabs code does not exist in the codebase.

---

## New Files Created
- `client/public/sw.js` — Service worker for push notifications
- `client/src/hooks/usePushNotifications.ts` — Push permission and subscription hook
- `client/src/components/PushNotificationToggle.tsx` — Push notification UI toggle
- `server/race16.test.ts` — 22 tests for Race 16 features

## Modified Files
- `drizzle/schema.ts` — Added push_subscriptions and conversation_summaries tables
- `server/db.ts` — Added push subscription and conversation summary DB helpers
- `server/routers.ts` — Added push and conversationMemory routers, cleaned voice to KIE.ai only
- `client/src/pages/GraceCalling.tsx` — Social meta tags + share button
- `client/src/pages/GraceChat.tsx` — Conversation memory save/load + memory injection
- `client/src/pages/GraceStatusPage.tsx` — Push notification toggle card

---

## Test Results
- **22 new tests** in `server/race16.test.ts`
- **290 total tests** across **17 files** — all passing

---

## Deployment
- **GitHub:** timjlatimer/maven-grace commit `564427d` (main)
- **Vault:** timjlatimer/mavens-knowledge-vault
- **Checkpoint:** 564427d6

---

## Learning Loop Insights

### What Worked
- **Priority queue as sequential if/return** — simple, readable, testable. No complex scoring needed.
- **LLM-generated summaries** — 3 sentences is the perfect length for context injection without prompt bloat.
- **Standing order enforcement via test** — the "no ElevenLabs" test is a guardrail that prevents drift.

### What to Build Next
- **Background cron for Kami Moment** — the push infrastructure is ready, needs a scheduler
- **Grace's voice in notifications** — when Ruby opens from a push, Grace speaks her greeting
- **Offline-first chat** — service worker could cache recent messages for offline viewing
- **Push analytics** — track which notifications Ruby opens vs dismisses
