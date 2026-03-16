import { drizzle } from "drizzle-orm/mysql2";
import { eq } from "drizzle-orm";
import mysql from "mysql2/promise";

// Connect to database
const connection = await mysql.createConnection(process.env.DATABASE_URL);
const db = drizzle(connection);

// Helper to insert respondent
async function insertRespondent(name, title, organization) {
  const result = await connection.execute(
    "INSERT INTO respondents (name, title, organization, createdAt) VALUES (?, ?, ?, NOW())",
    [name, title, organization]
  );
  return result[0].insertId;
}

// Helper to insert survey response
async function insertSurveyResponse(respondentId, questionNumber, questionText, answerText) {
  await connection.execute(
    "INSERT INTO survey_responses (respondentId, questionNumber, questionText, answerText, createdAt) VALUES (?, ?, ?, ?, NOW())",
    [respondentId, questionNumber, questionText, answerText]
  );
}

// Helper to get or create theme
async function getOrCreateTheme(name, description) {
  const [existing] = await connection.execute("SELECT id FROM themes WHERE name = ?", [name]);
  if (existing.length > 0) return existing[0].id;
  
  const [result] = await connection.execute(
    "INSERT INTO themes (name, description, displayOrder, createdAt) VALUES (?, ?, 0, NOW())",
    [name, description]
  );
  return result.insertId;
}

// Helper to insert insight
async function insertInsight(themeId, respondentId, title, description, guardianBehavior, scriptIdea) {
  await connection.execute(
    "INSERT INTO insights (themeId, respondentId, title, description, guardianBehavior, scriptIdea, upvotes, downvotes, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, 0, 0, NOW(), NOW())",
    [themeId, respondentId, title, description, guardianBehavior, scriptIdea]
  );
}

console.log("Starting data seed...");

// ===== RESPONDENT 1: Michelle Craig =====
const michelleCraigId = await insertRespondent("Michelle Craig", "Branch Manager", "Venue Financial");

await insertSurveyResponse(michelleCraigId, 1, "The Unforgettable Client Story", "I have had so many amazing clients over the years. I have a client that I have been dealing with for 12 years. She has been through so much and I have been there for her through it all. She has had to deal with the loss of her husband, her son, and her mother. She has had to deal with financial hardships and I have been there to help her through it all. She is like family to me and I am so grateful to have her in my life.");
await insertSurveyResponse(michelleCraigId, 2, "The Toughest Conversation", "When a client calls in distress, I always start by saying 'I can't imagine how stressful that is for you right now.' I let them know that I am here to help them and that we will work through this together. My primary goal is to make sure that they know that they are not alone and that we will find a solution together.");
await insertSurveyResponse(michelleCraigId, 5, "Your Secret Weapon", "I always remember one thing about each client. It could be their pet's name, their child's hockey tournament, or a trip they are planning. When I talk to them, I always ask about that one thing. It makes them feel like I care about them as a person, not just as a client.");
await insertSurveyResponse(michelleCraigId, 8, "The Community Connector", "Yes, I have suggested Rock Soup in Wetaskiwin to clients who are struggling. It's a community kitchen that provides meals and a sense of community. I have also suggested the food bank and other local resources.");
await insertSurveyResponse(michelleCraigId, 10, "If You Had a Superpower...", "1. A meal planning assistant that could help them plan meals based on what they have in their pantry and find deals at local grocery stores. 2. A weekly spending reviewer that congratulates them when they stay on budget. 3. A proactive deal finder that alerts them to sales on items they regularly buy.");

// ===== RESPONDENT 2: Katreena Morris =====
const katreenaId = await insertRespondent("Katreena Morris", "Operations Manager", "Cashco Financial");

await insertSurveyResponse(katreenaId, 1, "The Unforgettable Client Story", "I had a family who came to me in a desperate situation. They had a truck that they needed to surrender because they couldn't afford the payments anymore. I worked with them to create a plan. I personally went to the dealership with them to make sure they got the best value for the truck. That was 12 years ago and they are still my clients today. The trust we built in that moment of crisis has lasted over a decade.");
await insertSurveyResponse(katreenaId, 2, "The Toughest Conversation", "I always say 'In this moment, you are not alone. We will work with you through this.' I shift from 'you' to 'we' because it's important that they know we are a team. My goal is to make them feel supported, not judged.");
await insertSurveyResponse(katreenaId, 3, "Beyond the Loan", "Clients often share their life successes with me. I think it's because they feel like they need to balance the perceived failure of needing a loan. I listen and celebrate their wins with them. It's like being a mirror that reflects their strengths back to them.");
await insertSurveyResponse(katreenaId, 8, "The Community Connector", "I have a network of local employers and small business owners. When I know a client is looking for work, I make warm introductions. Getting them a job is far more valuable than just giving them cash.");
await insertSurveyResponse(katreenaId, 10, "If You Had a Superpower...", "Three pillars: 1. Financial Support Awareness - budgeting tools, debt tracking, credit tips. 2. Household Support - meal planning, finding deals, to-do list reminders. 3. Support for Your Future (North Star) - goal setting, milestone tracking, and rewards that align with their dreams.");

// ===== RESPONDENT 3: Harmandeep S. =====
const harmandeepId = await insertRespondent("Harmandeep S.", "Collections Specialist", "Cashco Financial");

await insertSurveyResponse(harmandeepId, 2, "The Toughest Conversation", "When a client is in high distress, the most effective technique is to listen calmly and not mention the loan or payment at all. Just hold space for them. Let them talk. Sometimes they just need to be heard.");
await insertSurveyResponse(harmandeepId, 6, "The First Five Minutes", "For new clients, I explain what is happening behind the scenes. I narrate my actions: 'I'm now reviewing your information...' This reduces their anxiety because they don't feel like they're waiting in a black box.");
await insertSurveyResponse(harmandeepId, 3, "Beyond the Loan", "Not everyone wants to share personal details. I start with safe, neutral topics like the weather. I only go deeper if they volunteer information first. It's about respecting their boundaries.");
await insertSurveyResponse(harmandeepId, 7, "The 'Not Yet' Moment", "When delivering a 'Not Yet' decision, I blame 'the system.' It depersonalizes the rejection and preserves their dignity. It puts us on the same side against an impersonal barrier.");
await insertSurveyResponse(harmandeepId, 10, "If You Had a Superpower...", "Daily or weekly positive affirmations. Simple encouragement can go a long way for someone who is struggling.");

// ===== RESPONDENT 4: Manpreet S. =====
const manpreetId = await insertRespondent("Manpreet S.", "Operations Manager", "Cashco Financial");

await insertSurveyResponse(manpreetId, 1, "The Unforgettable Client Story", "A client came in right at closing time, desperate for help. Instead of turning them away, I stayed late to help them. That single act of going above and beyond built a five-year relationship. Loyalty is earned through discretionary effort.");
await insertSurveyResponse(manpreetId, 2, "The Toughest Conversation", "I use the phrase 'Let's work through this together.' It reframes a stressful situation into a collaborative partnership.");
await insertSurveyResponse(manpreetId, 6, "The First Five Minutes", "I always ask 'How did you hear about us?' It's a non-invasive first question that provides valuable context for tailoring the conversation.");
await insertSurveyResponse(manpreetId, 7, "The 'Not Yet' Moment", "Be direct about the reason for the decline, but provide a clear, actionable path forward and a timeline for re-application. Honesty with kindness.");
await insertSurveyResponse(manpreetId, 10, "If You Had a Superpower...", "Payment reminders, life check-ins, and birthday wishes. The simple things are the foundation.");

// ===== RESPONDENT 5: Danielle K. =====
const danielleId = await insertRespondent("Danielle K.", "Client Services Representative", "Cashco Financial");

await insertSurveyResponse(danielleId, 1, "The Unforgettable Client Story", "I treat every client as the most important person in the room because they are the reason we exist. They keep the machine running. This ego-free philosophy is the foundation of everything I do.");
await insertSurveyResponse(danielleId, 2, "The Toughest Conversation", "I open with 'Let's see how I can help!' It's proactive and confident. It immediately frames the conversation as collaborative problem-solving.");
await insertSurveyResponse(danielleId, 6, "The First Five Minutes", "Human interaction cannot be beat. I use processing time or waiting time to ask human questions about their life. It fills the silence with connection.");
await insertSurveyResponse(danielleId, 4, "Celebrating the Wins", "The real win is when a client's financial health improves—even if it means they don't come back for months. I celebrate that. Their success is our success.");
await insertSurveyResponse(danielleId, 10, "If You Had a Superpower...", "On-demand payout amount. A simple but highly valuable feature—providing an accurate, real-time payout amount whenever the client asks.");

// ===== CREATE THEMES AND INSIGHTS =====

// Theme 1: Empathy First Protocols
const empathyThemeId = await getOrCreateTheme("Empathy First Protocols", "Techniques for leading with empathy in difficult conversations");

await insertInsight(empathyThemeId, michelleCraigId, 
  'The "Empathy First" Protocol', 
  "Lead with validation before any discussion of payments or solutions. The first words should acknowledge the client's emotional state.",
  "The Guardian must be hardwired to detect distress and lead with empathy phrases before discussing any business matters.",
  '"I can\'t imagine how stressful that is for you right now. I\'m here to help."');

await insertInsight(empathyThemeId, katreenaId,
  'The "You Are Not Alone" Protocol',
  'Shift language from "you" to "we" to create a sense of partnership. The client should feel they have a teammate, not a creditor.',
  "When distress is detected, the Guardian shifts all language to first-person plural to create solidarity.",
  '"In this moment, you are not alone. We will work through this together."');

await insertInsight(empathyThemeId, harmandeepId,
  'The "Pause and Listen" Protocol',
  "When a client is in high distress, the most effective technique is to listen calmly and not mention the loan or payment. Just hold space.",
  "The Guardian must be able to detect high distress and trigger a mode where it simply holds space for the user without pushing an agenda.",
  '"I\'m here. Take your time. I\'m listening."');

// Theme 2: Building Trust Through Action
const trustThemeId = await getOrCreateTheme("Building Trust Through Action", "Actions that build deep, lasting trust with clients");

await insertInsight(trustThemeId, katreenaId,
  'The "Rock Bottom" Partnership',
  "The deepest trust is forged in the hardest moments. Going above and beyond during a crisis—like personally helping a client surrender a vehicle—creates a bond that lasts decades.",
  "The Guardian must recognize crisis moments and offer to co-create plans, express shared emotion, and follow through relentlessly.",
  '"I know this is incredibly hard. Let me help you figure this out step by step. I\'m not going anywhere."');

await insertInsight(trustThemeId, manpreetId,
  'The "Closing Time" Principle',
  "Loyalty is earned through discretionary effort. Staying late, going the extra mile, and showing up when it's inconvenient builds relationships that last for years.",
  "The Guardian should recognize when a user needs extra help and proactively offer extended support, even outside normal parameters.",
  '"I can see you\'re still working through this. I\'m here as long as you need me."');

// Theme 3: The Power of Remembering
const rememberingThemeId = await getOrCreateTheme("The Power of Remembering", "Using personal details to build meaningful connections");

await insertInsight(rememberingThemeId, michelleCraigId,
  'The "One Thing" Memory System',
  "Remember and reference one specific, non-financial detail about each client—a child's hockey tournament, a new granddaughter, a planned trip. It makes them feel truly seen.",
  "The Life Ledger must prioritize storing and surfacing one key personal detail to reference in every interaction.",
  '"How did your daughter\'s hockey tournament go last weekend?"');

await insertInsight(rememberingThemeId, katreenaId,
  'The "Success Mirror"',
  "Clients often balance the perceived failure of needing a loan by sharing their life's successes. The Guardian must actively listen for these and celebrate them, acting as a mirror that reflects their strengths back to them.",
  "When a client shares a success, the Guardian should enthusiastically acknowledge it and store it for future reference.",
  '"That\'s amazing! You should be so proud of that accomplishment. I\'m going to remember this."');

// Theme 4: Practical Superpowers
const superpowersThemeId = await getOrCreateTheme("Practical Superpowers", "Tangible features that would make the Guardian indispensable");

await insertInsight(superpowersThemeId, michelleCraigId,
  'The "Split Funding" Strategy',
  "Proactively offer to split a loan into cash and a tucked-away cheque to help clients budget. This practical feature helps them manage their money better.",
  "At funding, the Guardian should offer to help the client create a budget plan and suggest splitting funds for different purposes.",
  '"Would you like me to help you set aside some of this for your rent next week?"');

await insertInsight(superpowersThemeId, michelleCraigId,
  'Meal & Grocery Genius',
  "A meal planning assistant that helps plan meals based on what's in the pantry and finds deals at local grocery stores.",
  "The Guardian should be able to take a photo of a pantry and suggest meals, then find the best local deals for missing ingredients.",
  '"Based on what you have, here are 3 easy dinners. And I found chicken on sale at Safeway for $4.99/lb."');

await insertInsight(superpowersThemeId, michelleCraigId,
  'Weekly Spending Reviewer',
  "A weekly check-in that reviews spending and congratulates the client when they stay on budget.",
  "Every week, the Guardian should review spending patterns and send an encouraging message about progress.",
  '"Great news! You stayed under budget this week. That\'s 3 weeks in a row—you\'re crushing it!"');

await insertInsight(superpowersThemeId, danielleId,
  'On-Demand Payout Amount',
  "Provide an accurate, real-time payout amount whenever the client asks. Simple but highly valuable.",
  "The Guardian should always know and instantly provide the current payout amount without the client having to wait.",
  '"Your current payout amount is $1,247.32 as of right now. Would you like me to walk you through your options?"');

await insertInsight(superpowersThemeId, harmandeepId,
  'Daily Positive Affirmations',
  "Simple, daily or weekly positive affirmations to encourage users who are struggling.",
  "The Guardian should send personalized, encouraging messages based on the user's situation and progress.",
  '"You\'re doing better than you think. Every small step counts. I believe in you."');

// Theme 5: Community Connection
const communityThemeId = await getOrCreateTheme("Community Connection", "Connecting clients with local resources and opportunities");

await insertInsight(communityThemeId, michelleCraigId,
  'The "Community Connector" Database',
  "Maintain a location-specific database of non-judgmental community resources (like Rock Soup in Wetaskiwin), including why they are a good fit.",
  "The Guardian should know local resources in the client's area and proactively suggest them when appropriate.",
  '"Have you heard of Rock Soup? It\'s a community kitchen in Wetaskiwin that provides meals and a great sense of community. No judgment, just good people helping each other."');

await insertInsight(communityThemeId, katreenaId,
  'The "Teach a Man to Fish" Network',
  "Maintain a network of local employers and small business owners. When a client needs work, make warm introductions. A job is more valuable than cash.",
  "The Guardian should be able to connect clients with employment opportunities through a network of trusted local employers.",
  '"I know someone who\'s hiring. Would you like me to put in a good word for you?"');

// Theme 6: The Art of the Decline
const declineThemeId = await getOrCreateTheme('The Art of the "Not Yet"', "Handling declines with dignity and hope");

await insertInsight(declineThemeId, harmandeepId,
  'The "System" Deflector',
  'When delivering a "Not Yet" decision, blame "the system." It depersonalizes the rejection and preserves the client\'s dignity, putting the agent and client on the same side.',
  'The Guardian should frame declines as a system limitation, not a personal judgment, and immediately pivot to what can be done.',
  '"The system isn\'t able to approve this right now, but that doesn\'t mean we\'re done. Let me show you exactly what we can work on together."');

await insertInsight(declineThemeId, manpreetId,
  'The "Honest but Kind" Decline',
  "Be direct about the reason for the decline, but provide a clear, actionable path forward and a timeline for re-application.",
  "The Guardian should always pair a decline with a specific, achievable action plan and a date to try again.",
  '"Here\'s exactly why this didn\'t work today, and here\'s what we can do about it. Let\'s check back in 60 days."');

// Theme 7: First Impressions
const firstImpressionsThemeId = await getOrCreateTheme("First Impressions", "Building trust in the first five minutes");

await insertInsight(firstImpressionsThemeId, harmandeepId,
  'The "Process Narrator" Mode',
  "For new clients, explain what is happening behind the scenes. Narrate actions to reduce anxiety.",
  "The Guardian should narrate its actions so the user doesn't feel like they're waiting in a black box.",
  '"I\'m now reviewing your information... This usually takes about 30 seconds... Great, I can see your details now."');

await insertInsight(firstImpressionsThemeId, manpreetId,
  'The "How Did You Hear About Us?" Opening',
  "A non-invasive first question that provides valuable context for tailoring the conversation.",
  "The Guardian should ask this question early to understand the client's context and expectations.",
  '"Before we get started, I\'m curious—how did you hear about us?"');

await insertInsight(firstImpressionsThemeId, danielleId,
  'The "Let\'s See How I Can Help!" Opening',
  "A proactive, confident opening for distress situations that immediately frames the conversation as collaborative problem-solving.",
  "The Guardian should open with energy and confidence to set a positive tone.",
  '"Let\'s see how I can help! Tell me what\'s going on."');

// Theme 8: Respecting Boundaries
const boundariesThemeId = await getOrCreateTheme("Respecting Boundaries", "Calibrating personal inquiry to client comfort");

await insertInsight(boundariesThemeId, harmandeepId,
  'The "Social Governor"',
  "Not everyone wants to share personal details. Start with safe, neutral topics and only go deeper if the user volunteers information first.",
  "The Guardian must calibrate its level of personal inquiry, starting neutral and only deepening if invited.",
  '"How\'s your day going so far?" (Wait for cues before asking more personal questions)');

// Theme 9: Celebrating Success
const celebratingThemeId = await getOrCreateTheme("Celebrating Success", "Recognizing and amplifying client wins");

await insertInsight(celebratingThemeId, danielleId,
  'The "Financial Health" Celebration',
  "The real win is when a client's financial health improves—even if it means they don't come back for months. Celebrate their independence.",
  "The Guardian should genuinely celebrate when a client no longer needs the service, framing it as the ultimate success.",
  '"This is the best news! You\'ve worked so hard to get here. I\'m so proud of you. And hey, I\'ll still be here if you ever need me."');

console.log("Data seed completed successfully!");
await connection.end();
