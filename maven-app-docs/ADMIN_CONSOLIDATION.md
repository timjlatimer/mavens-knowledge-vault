# Admin Dashboard Consolidation Analysis

## Current State: 52 admin page files, 46 routes, 10 sidebar sections

## Overlap Map

### DUPLICATE/OVERLAPPING PAGES:
1. Dashboard + CommandCenter + GrowthCommandCenter — all show metrics/stats
2. Leads + LeadsView + PeopleGraceKnows + Pipeline — all track people Grace met
3. GrowthEngine + GrowthCommandCenter + FrankieDashboard — all growth tools
4. CampaignsView + MailchimpView + SocialMediaHub — all marketing outreach
5. SupportRequests + MilkMoney + ChaosSupport — all member requests
6. StoriesView + StoryEnginePage + ClientStories — all story content
7. SocialCardStudio + SocialMediaHub — both generate social content
8. DigestView + DealsDigest — both deal with digests
9. InsightsView + GraceBrain + FeelingEngine — all Grace intelligence
10. WisdomGiantsDirectory + WisdomView — both wisdom giant management
11. MilestonesView — barely used, can fold into Operations
12. QuickCapture — can fold into Stories
13. MomentsView — can fold into Stories
14. TagManagement — utility, fold into Settings
15. VillagePulse + SiteAnalytics — both analytics

## NEW 5-SECTION ARCHITECTURE:

### 1. MARKETING (replaces: Growth, Content, Campaigns, Social, Mailchimp)
- Growth scoreboard (from GrowthCommandCenter)
- Social posts (pre-generated, copy/paste ready)
- Email blasts (pre-generated with segment info, review+send)
- Campaigns (pre-generated, one-click launch)
- Referral blitz (one-click)
- Partnership kits (one-click)
- Nurture sequences (automated)

### 2. OPERATIONS (replaces: Dashboard, CommandCenter, Members, Engagement, Revenue, Analytics, Settings)
- Live metrics (members, revenue, signups today)
- Member management (inline)
- Revenue overview
- Announcements
- Sync/Settings
- Security

### 3. FEELING ENGINE (replaces: FeelingEngine, GraceBrain, Insights, ActionQueue, PeopleGraceKnows)
- Grace's emotional intelligence
- People she's met (with conversation history)
- Action recommendations (with execute buttons)
- Insights and patterns

### 4. STORIES (replaces: StoriesView, StoryEnginePage, ClientStories, SocialCardStudio, QuickCapture, MomentsView)
- Story capture and generation
- Social card creation
- Moments curation
- Ruby Red Report

### 5. REQUESTS (replaces: SupportRequests, MilkMoney, ChaosSupport, Messages, MakeAWish, DailyHandUps)
- Milk Money requests
- Chaos Support requests
- General questions/messages
- Make a Wish
- Daily HandUps
