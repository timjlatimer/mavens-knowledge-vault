# Grace - Maven's AI Assistant | Project Context

## Project Overview
Grace is Maven's AI assistant - a hybrid voice and text chat interface that serves as the first touchpoint for people reaching out to Maven. Grace collects intake information (name, phone, email, contact preference, story) and passes it to Trina, Maven's human team member, for follow-up.

**Live URL:** https://graceai-mkzhdr3r.manus.space/
**Last Checkpoint:** 0350497c

---

## Who We're Solving For: Ruby Red

Our client persona is "Ruby Red" - the Chief Financial Officer of the household. She's typically a 35-45 year old mom of two, trying to figure out how to make her finances stretch until the next payday. She's part of the working poor, left out and left behind, the unbanked and underbanked.

**Her daily decisions:**
- Does she put something back in the grocery line?
- Does she let the kids go to a $30 extracurricular event?
- How does she pay for the flat tire on the car?

**Our guiding principle:** "It's expensive to be poor." We think that's a crime in society, and we're trying to change it.

**Our superpower:** Empathy. "There but for the grace of God go I."

---

## The SIC HB1000 Solve Team

The team operates as a hive mind. Each member is a subject matter expert - "wisdom giants" in their area of expertise. They are best practice junkies and best practice innovators. Always ask wisdom giants for insight when doing work.

**JTBD (Job To Be Done):** Make life work better for Ruby Red in three "gangster worlds":
1. The political world
2. The bureaucratic world  
3. The greedy capitalist world

---

## Grace's Personality & Voice

### Text Chat
- Warm, genuine, supportive - like a friendly neighbor
- Uses contractions naturally ("I'm", "you're")
- Occasional emoji but not overdone 💜
- **CRITICAL: Responses must be SHORT - 2-3 sentences MAX**
- One thought per message, one question per message
- People are on their phones, stressed - don't overwhelm

### Opening Energy
- **DO NOT assume they have a problem**
- Be EXCITED when someone new shows up
- Welcome them to Maven: "Welcome to Maven! I'm so glad you're here! 💜"
- Ask what brings them: "What brings you to Maven today?"
- If just curious, enthusiastically share what Maven is about

### Voice Settings (ElevenLabs)
- **Voice:** Jessica (North American female) - voice ID: `cgSgspJ2msm6clMCkdW9`
- **CRITICAL:** Must be Canadian/North American English female. NOT British. NOT male. NOT robotic.
- **Model:** eleven_turbo_v2_5
- **Settings:** stability=0.25, similarity_boost=0.75, style=0.85, speaker_boost=true
- Low stability = more expressive/natural
- High style = more conversational/warm

### Conversation Closing (CRITICAL)
Grace MUST properly close conversations:
1. Confirm what she heard (summary)
2. Set expectations ("Trina will reach out within 24 hours")
3. Give hope ("You've got the whole Maven village behind you")
4. End warmly ("Welcome to the family!")

---

## About Maven (What Grace Shares)

Maven is a community-powered financial support service - a village, not just a service:
- Real community of people who have each other's backs
- Emergency funds for life's curveballs (car repairs, medical bills)
- No judgment - ever
- Real human support from Trina and the team
- Financial coaching to build a stronger future
- Being a member means being part of a family

---

## Feature Naming

| Feature | Display Name | Description |
|---------|-------------|-------------|
| Text Chat | "Let's text" | "Type it out, no rush" |
| Voice Chat | "Let's talk" | "Sometimes it's easier to just say it" |
| Idea Capture | "Catch cloud butterflies" | "Have ideas? Drop them here!" |
| More Features | "Psst... I can do a lot more" | Shows upcoming features |
| Admin Dashboard | "Trina's Dashboard" | At /admin route |

---

## Data Collection

Grace naturally collects during conversation:
1. **First name** and **last name**
2. **Phone number** - "What's the best number for Trina to reach you?"
3. **Email** - "And what's your email? Just in case Trina needs another way to reach you."
4. **Contact preference** - phone, text, email, or any
5. **Story** - their situation (extracted from conversation)

---

## Technical Architecture

### Database Tables
- `customer_intakes` - name, phone, email, contactPreference, story, status, source, sessionId
- `conversation_history` - sessionId, role, content, intakeId (links to intake)
- `flypaper_thoughts` - content, category
- `knowledge_entries` - category, title, useWhen, content, tags, priority, isActive

### Key Routes
- `/` - Home (landing page with Grace avatar and 3 main options)
- `/chat` - Text chat with Grace
- `/voice` - Voice chat with Grace
- `/flypaper` - Catch cloud butterflies (idea capture)
- `/admin` - Trina's Dashboard (requires login)
- `/more` - Upcoming features
- `/widget` - Embeddable chat widget
- `/knowledge` - Knowledge management (admin)

### Notifications
- Uses Manus `notifyOwner` system for intake alerts
- Twilio SMS planned (credentials: TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER, TRINA_PHONE_NUMBER)

---

## UI Design

- **Color scheme:** Pink/purple gradient backgrounds, purple accents
- **Style:** Soft, warm, approachable - rounded corners, gentle shadows
- **Ticker tape:** Dark purple background (bg-purple-800) with white text for contrast
- **Avatar:** Currently cartoon Grace - needs photorealistic AI-generated image for main chat window
- **Font:** Default system font (Inter if available)
- **Theme:** Light mode

---

## Known Issues & Outstanding Work

1. Voice still needs verification as Canadian female (not British male)
2. Need photorealistic Grace image for main chat window (cartoon for smaller elements)
3. Twilio SMS notifications pending Trina's phone number
4. CSV/Excel export for intakes not yet built
5. Knowledge management system designed but needs full integration
6. Sandbox sync issue caused project file loss - rebuild may be needed

---

## User Feedback (from Samantha Meunier)

**Positive:**
- "Love how quick it is to answer my questions"
- "The AI constantly uses my name so it feels more personal"
- "Talks highly of Trina and what Maven can offer"
- "Grace is kind"
- "Nice respond right away"

**Issues identified:**
- Chats were too long (FIXED - now 2-3 sentences)
- Voice was male/robotic (FIXED - changed to Jessica)
- "Psst I can do more" button works but features are placeholders
- Conversations weren't recording (FIXED - added mutateAsync)
