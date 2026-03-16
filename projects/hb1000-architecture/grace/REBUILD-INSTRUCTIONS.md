# Grace Rebuild Instructions

## How to Reproduce Grace in a New Project

### Step 1: Initialize Project
In a new Manus task, say:
> "Create a new web app project called grace-assistant with features: db, server, user"

### Step 2: Upload These Files
Upload this entire zip file and say:
> "Read CONTEXT.md first, then integrate all the source files from this package into the project."

### Step 3: File Placement Guide

| Source File | Destination |
|------------|-------------|
| `01-drizzle-schema.ts` | `drizzle/schema.ts` |
| `02-server-db.ts` | `server/db.ts` |
| `03-server-routers.ts` | `server/routers.ts` |
| `04-server-voice.ts` | `server/voice.ts` |
| `05-server-email.ts` | `server/email.ts` |
| `06-client-pages-Home.tsx` | `client/src/pages/Home.tsx` |
| `07-client-pages-Chat.tsx` | `client/src/pages/Chat.tsx` |
| `08-client-pages-Voice.tsx` | `client/src/pages/Voice.tsx` |
| `09-client-pages-Admin.tsx` | `client/src/pages/Admin.tsx` |
| `10-client-pages-Flypaper.tsx` | `client/src/pages/Flypaper.tsx` |
| `11-client-components-GraceHeader.tsx` | `client/src/components/GraceHeader.tsx` |
| `12-client-App.tsx` | `client/src/App.tsx` |
| `13-client-pages-More.tsx` | `client/src/pages/More.tsx` |
| `14-client-pages-Widget.tsx` | `client/src/pages/Widget.tsx` |
| `CONTEXT.md` | Project root |
| `KNOWLEDGE.md` | Project root |

### Step 4: Push Database Schema
After placing files, run:
```bash
pnpm db:push
```

### Step 5: Add Secrets
Add these environment variables:
- `ELEVENLABS_API_KEY` - For voice synthesis
- `TWILIO_ACCOUNT_SID` - For SMS notifications (optional)
- `TWILIO_AUTH_TOKEN` - For SMS notifications (optional)
- `TWILIO_PHONE_NUMBER` - For SMS notifications (optional)
- `TRINA_PHONE_NUMBER` - Trina's phone number for SMS (optional)

### Step 6: Add Grace Avatar
Generate or upload a Grace avatar image to `client/public/grace-avatar.png`
- Should be warm, friendly, approachable woman
- Currently using cartoon style - needs photorealistic version for main chat

### Step 7: Add Marquee Animation
Add to `client/src/index.css`:
```css
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.animate-marquee {
  animation: marquee 30s linear infinite;
}
```

### Step 8: Verify
- Visit `/` - Should see Grace landing page
- Visit `/chat` - Should be able to chat with Grace
- Visit `/voice` - Should hear female voice
- Visit `/flypaper` - Should be able to drop ideas
- Visit `/admin` - Should see Trina's Dashboard (requires login)

### Step 9: Database Data
If you need to restore the existing intake data, use the SQL in `database-export.sql`.

## Notes
- The template provides auth, tRPC, and database infrastructure automatically
- Only the files listed above need to be modified from the template defaults
- The `server/_core/` directory should NOT be modified
- Grace's system prompt is in `server/routers.ts` - this is the most critical file
