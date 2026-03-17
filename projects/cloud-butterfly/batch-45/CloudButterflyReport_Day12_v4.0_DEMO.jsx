import React, { useState, useMemo } from 'react';

const CloudButterflyReportV4 = () => {
  // ===== USER CONFIGURATION (from Protocol v4.0) =====
  const CONFIG = {
    SENDER_NAME: "Tim Latimer",
    SENDER_EMAIL_PRIMARY: "timjlatimer@gmail.com",
    SENDER_EMAIL_SECONDARY: "tim@businessforceforgood.ca",
    DELIVERY_METHOD: "EMAIL_ONLY",
    SMS_ENABLED: false,
    TIMEZONE: "America/Edmonton"
  };

  // ===== CONTACT DIRECTORY =====
  const CONTACTS = {
    "John Frank": { email: "johnfrank@email.com", role: "Business Partner" },
    "Vaishali": { email: "vaishali@cashco.ca", role: "Designer" },
    "Fidel": { email: "fidel@cashco.ca", role: "Tech Lead" },
    "Lucas": { email: "lucas@email.com", role: "Tech" },
    "Lukas": { email: "lukas@email.com", role: "Creative" },
    "Marcy": { email: "marcy@cashco.ca", role: "Communications" },
    "Samantha": { email: "samantha@cashco.ca", role: "Team Member" },
    "Sharon": { email: "sharon@latimer.ca", role: "Spouse" },
    "Jesse": { email: "jesse@cashco.ca", role: "Team Member" },
  };

  const getContactEmail = (name) => CONTACTS[name]?.email || `${name.toLowerCase().replace(' ', '')}@email.com`;

  const dayNumber = 12;
  const reportDate = "January 22, 2026";
  const currentDate = new Date('2026-01-22');
  const ytdButterflies = 119;
  const todayButterflies = 7;

  const [notification, setNotification] = useState(null);
  const [expandedDraft, setExpandedDraft] = useState(null);
  const [expandedNudge, setExpandedNudge] = useState(null);
  const [expandedSnooze, setExpandedSnooze] = useState(null);
  const [sentNudges, setSentNudges] = useState({});
  const [filterText, setFilterText] = useState('');
  const [showBatchConfirm, setShowBatchConfirm] = useState(null);
  const [showWeeklyDigest, setShowWeeklyDigest] = useState(false);
  const [expandedSummaryCard, setExpandedSummaryCard] = useState(null); // For clickable summary cards

  // ===== GRACE ITEMS WITH ENHANCED DATA =====
  const [graceItems, setGraceItems] = useState([
    // DEADLINE ITEMS
    { id: 72, action: "John Frank — AGLC dictation session coordination", source: "Day 12, 🦋#113", butterflyNum: 113, isToday: true, status: "pending", priority: "HIGH", tags: ["#legal", "#cashco"], contact: "John Frank", createdDay: 12, deadline: "2026-02-04", deadlineName: "AGLC Hearing",
      draft: { subject: "AGLC Hearing Prep — Dictation Session", body: "Hey John,\n\nWe need to get our full story documented for the Feb 4 AGLC hearing. I want us to dictate the complete timeline — from when they first asked us to cooperate, through the approval, to when this separate investigation arm decided to charge us.\n\nThe narrative is clear: we were the mole, we cooperated, the actual gangsters walked free, and we got charged. We need this chronologized and turned into a timeline infographic for the hearing.\n\nWhen can you sit down with me to record this?\n\nTim" }},
    { id: 73, action: "AGLC Timeline — Infographic for Feb 4 hearing", source: "Day 12, 🦋#113", butterflyNum: 113, isToday: true, status: "pending", priority: "HIGH", tags: ["#legal", "#cashco"], contact: "Vaishali", createdDay: 12, deadline: "2026-02-04", deadlineName: "AGLC Hearing",
      draft: { subject: "AGLC Timeline Infographic — URGENT", body: "Vaishali,\n\nI need an infographic timeline for our AGLC hearing on Feb 4 — that's 13 days away.\n\nTHE MOLE WHO GOT CHARGED:\n\n1. ASKED TO COOPERATE - Management asked us to help\n2. TRANSACTION CLEARED - We were approved\n3. COOPERATION PROVIDED - We shared information\n4. SECOND INVESTIGATION - Different department charged us\n5. RESULT - Mole charged, gangsters walk free\n\nVisual style: Blue (us) → Green (management) → Red (investigation) → Black (gangsters free)\n\nCan you have a draft by Jan 28?\n\nTim" }},
    
    // AUTO-ESCALATED (were LOW/MEDIUM, now upgraded due to age)
    { id: 58, action: "Marcy — Distribute Maven + Nicole stories", source: "Day 11, 🦋#112", butterflyNum: null, isToday: false, status: "escalated", priority: "MEDIUM", previousPriority: "LOW", tags: ["#marketing", "#maven"], contact: "Marcy", createdDay: 11, escalatedOn: "2026-01-22", daysOld: 8,
      draft: { subject: "Stories to Distribute — Overdue", body: "Marcy,\n\nCan you distribute:\n1. The Maven doorstep story (with the shoes)\n2. Nicole's story\n\nThese should have gone out already. Let's ship today.\n\nTim" }},
    { id: 59, action: "John Frank — Farmers market pictures (2 emails)", source: "Day 11, 🦋#111", butterflyNum: null, isToday: false, status: "escalated", priority: "MEDIUM", previousPriority: "LOW", tags: ["#marketing"], contact: "John Frank", createdDay: 11, escalatedOn: "2026-01-22", daysOld: 8,
      draft: { subject: "Farmers Market Pictures (1 of 2)", body: "John,\n\nSending the farmers market pictures in two emails so they don't exceed Freedom's limit.\n\n[ATTACH PICTURES]\n\nTim" }},
    
    // APPROVED AWAITING SEND
    { id: 65, action: "Start Digger Café Lean Canvas", source: "Day 11, 🦋#106", butterflyNum: null, isToday: false, status: "approved", priority: "MEDIUM", tags: ["#realestate", "#business"], contact: "Self", createdDay: 11, approvedOn: "2026-01-21", daysApproved: 1,
      draft: { subject: "Digger Café Lean Canvas", body: "[INTERNAL: Start Lean Canvas for Digger Café concept including treasure hunt competition.]" }},
    
    // TODAY'S NEW ITEMS
    { id: 75, action: "John Frank — Store #3 banner: 'Lines of Credit up to $10,000'", source: "Day 12, 🦋#114", butterflyNum: 114, isToday: true, status: "pending", priority: "MEDIUM", tags: ["#cashco", "#marketing"], contact: "John Frank", createdDay: 12,
      draft: { subject: "Store #3 Banner Update", body: "John,\n\nI want to add this to the banner outside Store #3:\n\n\"Lines of Credit up to $10,000\"\n\nThis differentiates us. Most pawn maxes out at a few hundred. Banks won't touch these people. We can do $10K — secure storage with a loan on top.\n\nCan you get this added to the banner wording?\n\nTim" }},
    { id: 76, action: "Vaishali — Accordion card graphic with core values", source: "Day 12, 🦋#117", butterflyNum: 117, isToday: true, status: "pending", priority: "MEDIUM", tags: ["#marketing"], contact: "Vaishali", createdDay: 12,
      draft: { subject: "Graphic Update — Add Accordion Card", body: "Vaishali,\n\nFor the execution graphic, add at the top:\n\nAn accordion card showing:\n- All core values\n- Destiny\n- Core value tree\n\nPeople need to see WHY before WHAT.\n\nTim" }},
    { id: 77, action: "Lucas — Bebop access request", source: "Day 12, 🦋#118", butterflyNum: 118, isToday: true, status: "pending", priority: "LOW", tags: ["#tech"], contact: "Lucas", createdDay: 12,
      draft: { subject: "Bebop Access", body: "Lucas,\n\nCan you get me logged into Bebop? Manus is having drift issues — keeps forgetting context. Want to try Bebop instead.\n\nWhat do I need to get access?\n\nTim" }},
    { id: 78, action: "Restart Manus — download files separately", source: "Day 12, 🦋#119", butterflyNum: 119, isToday: true, status: "pending", priority: "LOW", tags: ["#tech"], contact: "Self", createdDay: 12,
      draft: { subject: "Manus Restart Protocol", body: "[INTERNAL]\n\nSteps:\n1. Start fresh Manus session\n2. Download GRACE setup first — test\n3. Add Daily Reporting Protocol — test\n4. Add Lean Canvas Protocol — test\n5. Identify where drift/failure occurs\n\nFeed incrementally, not all at once." }},
    
    // SNOOZED ITEMS
    { id: 60, action: "John Frank — Italy trip follow-up", source: "Day 11, 🦋#111", butterflyNum: null, isToday: false, status: "snoozed", priority: "LOW", tags: ["#family"], contact: "John Frank", createdDay: 11, snoozedOn: "2026-01-21", snoozeUntil: "2026-01-27", snoozeReason: "Wait until Monday",
      draft: { subject: "Italy Trip — What's the Verdict?", body: "John,\n\nCircling back on Italy — we offered to buy tickets for you and Julie. Are you going?\n\nTim" }},
    { id: 62, action: "Change Manus profile to HB1000", source: "Day 11, 🦋#108", butterflyNum: null, isToday: false, status: "snoozed", priority: "LOW", tags: ["#tech"], contact: "Self", createdDay: 11, snoozedOn: "2026-01-20", snoozeUntil: "2026-01-25", snoozeReason: "After Manus is working",
      draft: { subject: "Manus Profile Update", body: "[INTERNAL: Rename Manus profile to HB1000 for brand consistency.]" }},
    
    // ACCUMULATED PENDING
    { id: 61, action: "Move Cloud Butterfly to Manus — test do-agent", source: "Day 11, 🦋#107", butterflyNum: null, isToday: false, status: "pending", priority: "MEDIUM", tags: ["#tech"], contact: "Self", createdDay: 11, daysOld: 4,
      draft: { subject: "Manus Migration Test", body: "[INTERNAL: Test if Manus can run Cloud Butterfly protocol with execution capability.]" }},
    { id: 63, action: "Fidel: Empower Lift → Manus + Lean Canvas", source: "Day 11, 🦋#109", butterflyNum: null, isToday: false, status: "pending", priority: "MEDIUM", tags: ["#tech"], contact: "Fidel", createdDay: 11, daysOld: 4,
      draft: { subject: "Empower Lift Migration", body: "Fidel,\n\nCan you extract Empower Lift from Replit and move it to Manus? Also set up a Lean Canvas for it.\n\nTim" }},
    { id: 64, action: "Fidel: Manus invites to Jesse/Samantha", source: "Day 11, 🦋#110", butterflyNum: null, isToday: false, status: "pending", priority: "MEDIUM", tags: ["#tech", "#team"], contact: "Fidel", createdDay: 11, daysOld: 4,
      draft: { subject: "Manus Team Invites", body: "Fidel,\n\nCan you send Manus membership invites to Jesse and Samantha?\n\nTim" }},
  ]);

  // ===== PTK TRACKING =====
  const [ptkMade, setPtkMade] = useState([
    { id: 1, promise: "Send farmers market pictures (2 emails)", to: "John Frank", date: "Jan 21", daysOld: 4, status: "overdue" },
    { id: 2, promise: "Buy Italy tickets for John Frank & Julie", to: "John Frank", date: "Jan 21", daysOld: 4, status: "outstanding" },
    { id: 3, promise: "Distribute Maven + Nicole stories", to: "Marcy/Team", date: "Jan 21", daysOld: 4, status: "outstanding" },
    { id: 4, promise: "AGLC timeline infographic", to: "Hearing (Feb 4)", date: "Jan 22", daysOld: 0, status: "outstanding" },
    { id: 5, promise: "Talk re: Samantha nanny wedding gift", to: "Sharon", date: "Jan 12", daysOld: 10, status: "overdue" },
  ]);

  // ===== GHOST BUSTER WITH NUDGE HISTORY =====
  const [ptkToTim, setPtkToTim] = useState([
    { id: 1, promise: "Cauliflower brain image", from: "Lukas", date: "Jan 11", daysWaiting: 14, status: "overdue",
      nudgeHistory: [
        { date: "Jan 15", tone: "friendly" },
        { date: "Jan 19", tone: "direct" }
      ],
      nudges: {
        friendly: { subject: "Quick follow-up — brain image", body: "Hey Lukas,\n\nJust circling back on that cauliflower brain image — wanted to check if you had a chance to dig it up. No rush if you're slammed, just want to keep it on radar.\n\nThanks!\nTim" },
        direct: { subject: "Need that brain image", body: "Lukas,\n\nStill need that cauliflower brain image we discussed. It's been two weeks now. Can you send it over today or tomorrow?\n\nTim" },
        urgent: { subject: "Brain image — URGENT", body: "Lukas,\n\nI've sent two follow-ups on that cauliflower brain image with no response. I need it for a project that's stalled without it.\n\nPlease prioritize this and get it to me by end of day.\n\nTim" }
      }},
    { id: 2, promise: "Empower Lift extraction from Replit", from: "Fidel", date: "Jan 21", daysWaiting: 4, status: "waiting",
      nudgeHistory: [],
      nudges: {
        friendly: { subject: "Empower Lift — any progress?", body: "Hey Fidel,\n\nJust checking in on the Empower Lift extraction from Replit. How's it going? Let me know if you need anything from me.\n\nTim" },
        direct: { subject: "Empower Lift status", body: "Fidel,\n\nWhat's the status on extracting Empower Lift from Replit and moving it to Manus? Need an update.\n\nTim" },
        urgent: { subject: "Empower Lift — need this done", body: "Fidel,\n\nI need the Empower Lift extraction completed this week. Please make this a priority and let me know when it's done.\n\nTim" }
      }},
    { id: 3, promise: "Manus invites sent to Jesse & Samantha", from: "Fidel", date: "Jan 21", daysWaiting: 4, status: "waiting",
      nudgeHistory: [],
      nudges: {
        friendly: { subject: "Manus invites — Jesse & Samantha", body: "Hey Fidel,\n\nDid those Manus invites go out to Jesse and Samantha? Just want to make sure they got access.\n\nTim" },
        direct: { subject: "Manus invites status", body: "Fidel,\n\nNeed to confirm the Manus invites went to Jesse and Samantha. Please confirm.\n\nTim" },
        urgent: { subject: "Manus invites — confirm sent", body: "Fidel,\n\nI need confirmation that Jesse and Samantha got their Manus invites TODAY. This is blocking onboarding.\n\nTim" }
      }},
    { id: 4, promise: "Italy trip answer", from: "John Frank", date: "Jan 21", daysWaiting: 4, status: "waiting",
      nudgeHistory: [],
      nudges: {
        friendly: { subject: "Italy trip — what do you think?", body: "Hey John,\n\nJust wondering if you and Julie have thought about the Italy trip. We're happy to buy the tickets — just need to know if you're in!\n\nTim" },
        direct: { subject: "Italy trip — need an answer", body: "John,\n\nNeed to know about Italy. Are you and Julie going? We offered to cover tickets but need a decision.\n\nTim" },
        urgent: { subject: "Italy — yes or no?", body: "John,\n\nI need a yes or no on Italy. Ticket prices are going up and I can't hold this offer open much longer. What's the answer?\n\nTim" }
      }},
  ]);

  // ===== SWARM DETECTION =====
  const swarms = [
    {
      id: 1,
      topic: "AI Memory / Continuity",
      butterflies: [116, 118, 119],
      dayRange: "Day 12",
      status: "active",
      suggestion: "Create Lean Canvas for 'AI Assistant That Doesn't Forget'?"
    }
  ];

  // ===== BUTTERFLIES WITH TAGS =====
  const butterflies = [
    {
      todayNum: 1, ytdNum: 113,
      title: "AGLC Hearing — The Mole Who Got Charged",
      tags: ["#legal", "#cashco", "#urgent"],
      deadline: { date: "Feb 4, 2026", daysRemaining: 13, name: "AGLC Hearing" },
      core: `The February 4th AGLC hearing needs a complete narrative rebuild. We cooperated as a whistleblower, got cleared, then a separate investigation arm charged us. The actual gangsters walked free.`,
      thesis: "When an organization's enforcement swarm loses sight of its original mission, it can end up charging its own assets while the actual targets escape.",
      barStool: "The government asks us to be the mole. We do it. We're cleared. Then some other department charges US while the actual gangsters walk free. It's like the undercover cop gets arrested by his own precinct while the mob boss plays golf.",
      scores: { humanity: 78, business: 72, fun: 45, wth: 92 }
    },
    {
      todayNum: 2, ytdNum: 114,
      title: "Lines of Credit Up to $10,000 — Store #3 Banner",
      tags: ["#cashco", "#marketing", "#business"],
      core: `Unique offering: Lines of credit up to $10,000. Put this on the Store #3 banner. Secure storage with a loan on top.`,
      thesis: "The $10,000 line of credit positions us above traditional pawn and below traditional banking — exactly where the underbanked need us.",
      barStool: "Most pawn shops max out at a few hundred bucks. Banks won't touch these people. We can do TEN GRAND. Put it on the damn sign.",
      scores: { humanity: 68, business: 88, fun: 52, wth: 58 }
    },
    {
      todayNum: 3, ytdNum: 115,
      title: "Swarm Pattern Recognition",
      tags: ["#philosophy", "#hb1000"],
      core: `Maybe it's not "swarm mind" as much as swarm pattern recognition. The unconscious mind uses a swarm strategy to recognize patterns.`,
      thesis: "Cloud butterflies are the output of swarm pattern recognition operating on crystallized experience.",
      barStool: "Your brain runs a search algorithm while you sleep. When it finds a match, BOOM — butterfly.",
      scores: { humanity: 88, business: 62, fun: 68, wth: 85 }
    },
    {
      todayNum: 4, ytdNum: 116,
      title: "Grace AI Failure — Manus Drift",
      tags: ["#tech", "#swarm:ai-memory"],
      swarmMember: true,
      core: `Stayed up trying to build Grace in Manus. It failed — lost continuity, had tremendous drift.`,
      thesis: "AI systems that lose context become useless. Continuity is everything.",
      barStool: "Manus kept forgetting what we were doing. Like talking to someone with amnesia every ten minutes.",
      scores: { humanity: 55, business: 72, fun: 32, wth: 48 }
    },
    {
      todayNum: 5, ytdNum: 117,
      title: "Vaishali Graphic — Accordion Card",
      tags: ["#marketing"],
      core: `Add an accordion card graphic at the top showing all the core values, Destiny, and a core value tree.`,
      thesis: "Visual frameworks need to show WHY before WHAT.",
      barStool: "The graphic needs a top piece. Show values first.",
      scores: { humanity: 48, business: 58, fun: 42, wth: 38 }
    },
    {
      todayNum: 6, ytdNum: 118,
      title: "Bebop Login with Lucas",
      tags: ["#tech", "#swarm:ai-memory"],
      swarmMember: true,
      core: `Talk to Lucas about Bebop access. Maybe do programming there instead of Manus.`,
      thesis: "When one tool fails, find another.",
      barStool: "Manus crapped out. Lucas knows Bebop. Ask him to get me in.",
      scores: { humanity: 35, business: 55, fun: 38, wth: 32 }
    },
    {
      todayNum: 7, ytdNum: 119,
      title: "Restart Manus — Download Files Separately",
      tags: ["#tech", "#swarm:ai-memory"],
      swarmMember: true,
      core: `Go back to Manus. Download files separately to isolate where it fails.`,
      thesis: "Complex systems fail when overloaded. Feed incrementally.",
      barStool: "Manus choked when I threw everything at it. Feed it one piece at a time.",
      scores: { humanity: 42, business: 65, fun: 38, wth: 45 }
    }
  ];

  // ===== HELPER FUNCTIONS =====
  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 5000);
  };

  // COPY TO CLIPBOARD FUNCTION
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      showNotification('📋 COPIED TO CLIPBOARD\nPaste into your email client');
    }).catch(() => {
      showNotification('❌ Copy failed — please select and copy manually');
    });
  };

  // PTK DONE HANDLER
  const handlePtkDone = (id) => {
    setPtkMade(prev => prev.map(item => 
      item.id === id ? { ...item, status: 'completed', completedOn: reportDate } : item
    ));
    showNotification('✅ PROMISE KEPT!\nMarked as completed');
  };

  // GHOST BUSTER RECEIVED HANDLER
  const handleGhostReceived = (id) => {
    setPtkToTim(prev => prev.map(item => 
      item.id === id ? { ...item, status: 'received', receivedOn: reportDate } : item
    ));
    showNotification('✅ RECEIVED!\nRemoved from Ghost Buster');
  };

  const getDaysUntil = (dateStr) => {
    const target = new Date(dateStr);
    const diff = Math.ceil((target - currentDate) / (1000 * 60 * 60 * 24));
    return diff;
  };

  const handleGraceAction = (id, action, snoozeDate = null) => {
    setGraceItems(prev => prev.map(item => {
      if (item.id === id) {
        const updates = { status: action };
        if (action === 'snoozed' && snoozeDate) {
          updates.snoozedOn = reportDate;
          updates.snoozeUntil = snoozeDate;
        }
        if (action === 'approved') {
          updates.approvedOn = reportDate;
        }
        return { ...item, ...updates };
      }
      return item;
    }));
    
    const labels = {
      'approved': `✅ APPROVED — Copy draft to email and send\n🔄 Say "confirm sent #${id}" when done`,
      'editing': '✏️ MARKED FOR EDITING — Tell me what to change',
      'rejected': `❌ REJECTED — Removed permanently\n↩️ To undo: "restore #${id}"`,
      'snoozed': `⏰ SNOOZED until ${snoozeDate}\n💡 To wake early: "unsnooze #${id}"`,
      'pending': '↩️ Reset to pending'
    };
    showNotification(labels[action]);
    setExpandedSnooze(null);
  };

  const handleBatchApprove = (priority) => {
    const items = graceItems.filter(g => g.priority === priority && g.status === 'pending');
    setGraceItems(prev => prev.map(item => 
      item.priority === priority && item.status === 'pending' 
        ? { ...item, status: 'approved', approvedOn: reportDate }
        : item
    ));
    showNotification(`✅ BATCH APPROVED: ${items.length} ${priority} items\n📋 Copy drafts to email client`);
    setShowBatchConfirm(null);
  };

  const handleConfirmSent = (id) => {
    setGraceItems(prev => prev.map(item => 
      item.id === id ? { ...item, status: 'completed', completedOn: reportDate } : item
    ));
    showNotification(`✅ CONFIRMED SENT: Grace #${id}\n🗂️ Moved to completed`);
  };

  const handleSendNudge = (ghostId, tone) => {
    const item = ptkToTim.find(p => p.id === ghostId);
    const nudge = item.nudges[tone];
    const timestamp = new Date().toLocaleTimeString();
    
    setPtkToTim(prev => prev.map(p => {
      if (p.id === ghostId) {
        return { 
          ...p, 
          status: 'nudged',
          nudgeHistory: [...p.nudgeHistory, { date: reportDate, tone }]
        };
      }
      return p;
    }));
    setSentNudges(prev => ({ ...prev, [ghostId]: { tone, nudge, timestamp } }));
    setExpandedNudge(null);
    
    showNotification(`👻 NUDGE SENT via EMAIL\n📧 To: ${item.from}\n📋 Tone: ${tone.toUpperCase()}`);
  };

  // ===== COMPUTED VALUES =====
  const deadlineItems = graceItems.filter(g => g.deadline && g.status === 'pending');
  const escalatedItems = graceItems.filter(g => g.status === 'escalated');
  const approvedItems = graceItems.filter(g => g.status === 'approved');
  const todayPending = graceItems.filter(g => g.isToday && g.status === 'pending');
  const accumulatedPending = graceItems.filter(g => !g.isToday && g.status === 'pending');
  const snoozedItems = graceItems.filter(g => g.status === 'snoozed');
  const snoozedDueToday = snoozedItems.filter(g => g.snoozeUntil === '2026-01-22');
  const snoozedFuture = snoozedItems.filter(g => g.snoozeUntil !== '2026-01-22');
  
  const filteredItems = filterText 
    ? graceItems.filter(g => 
        g.action.toLowerCase().includes(filterText.toLowerCase()) ||
        g.contact?.toLowerCase().includes(filterText.toLowerCase()) ||
        g.tags?.some(t => t.toLowerCase().includes(filterText.toLowerCase()))
      )
    : null;

  const getStatusStyle = (status) => ({
    pending: 'bg-gray-100 text-gray-700 border-gray-300',
    approved: 'bg-green-100 text-green-800 border-green-300',
    editing: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    rejected: 'bg-red-100 text-red-800 border-red-300',
    snoozed: 'bg-blue-100 text-blue-800 border-blue-300',
    completed: 'bg-green-100 text-green-800 border-green-300',
    escalated: 'bg-orange-100 text-orange-800 border-orange-300',
    outstanding: 'bg-orange-100 text-orange-800',
    overdue: 'bg-red-100 text-red-800',
    waiting: 'bg-gray-100 text-gray-700',
    nudged: 'bg-purple-100 text-purple-800',
    received: 'bg-green-100 text-green-800',
  }[status] || 'bg-gray-100 text-gray-700');

  const getPriorityStyle = (p) => ({ HIGH: 'bg-red-500', MEDIUM: 'bg-yellow-500', LOW: 'bg-gray-400' }[p]);

  const getActionsForButterfly = (ytdNum) => graceItems.filter(item => item.butterflyNum === ytdNum);

  // ===== SNOOZE OPTIONS COMPONENT =====
  const SnoozeOptions = ({ itemId }) => (
    <div className="mt-3 p-4 bg-blue-50 border-2 border-blue-300 rounded-lg">
      <p className="font-bold text-blue-800 mb-3">⏰ SNOOZE — When should this reappear?</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        <button onClick={() => handleGraceAction(itemId, 'snoozed', '2026-01-23')} className="px-3 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600">Tomorrow</button>
        <button onClick={() => handleGraceAction(itemId, 'snoozed', '2026-01-27')} className="px-3 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600">Monday (Jan 27)</button>
        <button onClick={() => handleGraceAction(itemId, 'snoozed', '2026-01-29')} className="px-3 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600">Next Week</button>
        <button onClick={() => handleGraceAction(itemId, 'snoozed', '2026-01-31')} className="px-3 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600">End of Month</button>
        <button onClick={() => handleGraceAction(itemId, 'snoozed', '2026-02-01')} className="px-3 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600">Feb 1</button>
        <button onClick={() => setExpandedSnooze(null)} className="px-3 py-2 bg-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-400">Cancel</button>
      </div>
    </div>
  );

  // ===== GRACE CARD COMPONENT =====
  const GraceCard = ({ item, showSource = true }) => (
    <div className={`rounded-lg border-2 p-4 ${
      item.status === 'approved' ? 'bg-green-50 border-green-400' :
      item.status === 'escalated' ? 'bg-orange-50 border-orange-400' :
      item.status === 'snoozed' ? 'bg-blue-50 border-blue-300' :
      item.deadline ? 'bg-red-50 border-red-400' :
      'bg-purple-50 border-purple-300'
    }`}>
      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-bold text-purple-700">🧞 #{item.id}</span>
            <span className={`text-xs px-2 py-1 rounded text-white font-medium ${getPriorityStyle(item.priority)}`}>{item.priority}</span>
            {item.status === 'escalated' && (
              <span className="text-xs px-2 py-1 rounded bg-orange-500 text-white font-medium">⬆️ ESCALATED</span>
            )}
            {item.deadline && (
              <span className="text-xs px-2 py-1 rounded bg-red-600 text-white font-medium">⏱️ {getDaysUntil(item.deadline)} DAYS</span>
            )}
            <span className={`text-xs px-2 py-1 rounded font-medium ${getStatusStyle(item.status)}`}>{item.status.toUpperCase()}</span>
          </div>
          <p className="font-medium text-gray-800 mt-2">{item.action}</p>
          <div className="flex flex-wrap gap-2 mt-1 text-xs text-gray-500">
            {showSource && <span>{item.source}</span>}
            {item.contact && <span>→ {item.contact}</span>}
            {item.tags?.map(tag => <span key={tag} className="text-purple-600">{tag}</span>)}
          </div>
          {item.status === 'escalated' && (
            <p className="text-xs text-orange-600 mt-1">⬆️ Auto-escalated from {item.previousPriority} (was {item.daysOld} days old)</p>
          )}
          {item.status === 'snoozed' && (
            <p className="text-xs text-blue-600 mt-1">😴 Snoozed on {item.snoozedOn} → Wakes {item.snoozeUntil}</p>
          )}
          {item.status === 'approved' && (
            <p className="text-xs text-green-600 mt-1">✅ Approved on {item.approvedOn} — awaiting send confirmation</p>
          )}
        </div>
      </div>
      
      {/* ACTION BUTTONS */}
      {(item.status === 'pending' || item.status === 'escalated') && (
        <div className="flex flex-wrap gap-2 mt-3">
          <button onClick={() => handleGraceAction(item.id, 'approved')} className="px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600">✅ Approve</button>
          <button onClick={() => handleGraceAction(item.id, 'editing')} className="px-4 py-2 bg-yellow-500 text-white rounded-lg font-medium hover:bg-yellow-600">✏️ Edit</button>
          <button onClick={() => handleGraceAction(item.id, 'rejected')} className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600">❌ Reject</button>
          <button onClick={() => setExpandedSnooze(expandedSnooze === item.id ? null : item.id)} className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600">⏰ Snooze</button>
          <button onClick={() => setExpandedDraft(expandedDraft === item.id ? null : item.id)} className="px-4 py-2 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-600">👁️ {expandedDraft === item.id ? 'Hide' : 'View'} Draft</button>
        </div>
      )}
      
      {item.status === 'approved' && (
        <div className="flex flex-wrap gap-2 mt-3">
          <button onClick={() => handleConfirmSent(item.id)} className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700">📤 Confirm Sent</button>
          <button onClick={() => handleGraceAction(item.id, 'pending')} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-400">↩️ Reset</button>
          <button onClick={() => setExpandedDraft(expandedDraft === item.id ? null : item.id)} className="px-4 py-2 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-600">👁️ View Draft</button>
        </div>
      )}
      
      {item.status === 'snoozed' && (
        <div className="flex flex-wrap gap-2 mt-3">
          <button onClick={() => handleGraceAction(item.id, 'pending')} className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600">⏰ Unsnooze Now</button>
        </div>
      )}
      
      {/* SNOOZE OPTIONS */}
      {expandedSnooze === item.id && <SnoozeOptions itemId={item.id} />}
      
      {/* DRAFT VIEW */}
      {expandedDraft === item.id && item.draft && (
        <div className="mt-4 p-4 bg-white border-2 border-purple-200 rounded-lg">
          <div className="flex justify-between items-start mb-2">
            <p className="text-sm font-bold text-purple-700">📧 EMAIL DRAFT</p>
            <button 
              onClick={() => copyToClipboard(item.draft.body)}
              className="px-3 py-1 bg-blue-500 text-white rounded text-sm font-medium hover:bg-blue-600 flex items-center gap-1"
            >
              📋 Copy Body
            </button>
          </div>
          <p className="text-sm"><strong>From:</strong> {CONFIG.SENDER_NAME} &lt;{CONFIG.SENDER_EMAIL_PRIMARY}&gt;</p>
          <p className="text-sm"><strong>To:</strong> {item.contact} &lt;{getContactEmail(item.contact)}&gt;</p>
          <p className="text-sm"><strong>Subject:</strong> {item.draft.subject}</p>
          <hr className="my-3" />
          <pre className="whitespace-pre-wrap font-sans text-gray-700 text-sm bg-gray-50 p-3 rounded border">{item.draft.body}</pre>
          <hr className="my-3" />
          <p className="text-xs text-gray-500 italic">📮 Delivery: EMAIL — Copy body above and paste into your email client</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 font-sans">
      {/* NOTIFICATION */}
      {notification && (
        <div className="fixed top-4 right-4 left-4 md:left-auto md:max-w-md px-6 py-4 bg-green-600 text-white rounded-lg shadow-xl z-50 whitespace-pre-line">
          {notification}
        </div>
      )}

      <div className="max-w-5xl mx-auto space-y-6">
        {/* CONFIG BANNER */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-4">
          <div className="flex flex-wrap justify-between items-center gap-2">
            <div>
              <p className="text-sm font-bold text-blue-800">⚙️ PROTOCOL v4.0 — PROACTIVE INTELLIGENCE</p>
              <p className="text-xs text-blue-600">{CONFIG.SENDER_NAME} | {CONFIG.SENDER_EMAIL_PRIMARY} | EMAIL ONLY</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowWeeklyDigest(!showWeeklyDigest)} className="px-3 py-1 bg-purple-500 text-white rounded text-sm hover:bg-purple-600">📊 Weekly Digest</button>
            </div>
          </div>
        </div>

        {/* HEADER */}
        <div className="text-center bg-white rounded-xl shadow p-6">
          <h1 className="text-3xl font-bold">☁️🦋 CLOUD BUTTERFLY LIBRARY 🦋☁️</h1>
          <h2 className="text-xl text-gray-700 mt-2">{reportDate} — DAY {dayNumber}</h2>
          <p className="text-sm text-gray-500 mt-1 italic">v4.0 Demo — All Features Active</p>
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">🦋 Today: {todayButterflies}</span>
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">🦋 YTD: {ytdButterflies}</span>
            <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">🚨 Deadlines: {deadlineItems.length}</span>
            <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">⬆️ Escalated: {escalatedItems.length}</span>
          </div>
        </div>

        {/* 🔍 PROACTIVE SCAN */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-300 rounded-xl p-6">
          <h3 className="text-xl font-bold text-red-800 mb-4">🔍 PROACTIVE SCAN — {reportDate}</h3>
          
          {/* URGENT */}
          <div className="mb-4 p-4 bg-red-100 rounded-lg border border-red-300">
            <p className="font-bold text-red-700 mb-2">🚨 URGENT ({deadlineItems.length + ptkToTim.filter(p => p.status === 'overdue').length + ptkMade.filter(p => p.status === 'overdue').length} items need attention)</p>
            <ul className="space-y-1 text-sm">
              <li className="flex items-center gap-2">
                <span className="text-red-600">⏱️</span>
                <span><strong>DEADLINE:</strong> AGLC Hearing in 13 days — {deadlineItems.length} items pending (#72, #73)</span>
              </li>
              {ptkToTim.filter(p => p.status === 'overdue').map(p => (
                <li key={p.id} className="flex items-center gap-2">
                  <span className="text-red-600">🔴</span>
                  <span><strong>GHOST BUSTER:</strong> {p.from} — {p.promise} ({p.daysWaiting} days overdue)</span>
                </li>
              ))}
              {ptkMade.filter(p => p.status === 'overdue').map(p => (
                <li key={p.id} className="flex items-center gap-2">
                  <span className="text-red-600">📤</span>
                  <span><strong>PTK OVERDUE:</strong> {p.promise} to {p.to} ({p.daysOld} days)</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* AUTO-ESCALATED */}
          <div className="mb-4 p-4 bg-orange-100 rounded-lg border border-orange-300">
            <p className="font-bold text-orange-700 mb-2">⬆️ AUTO-ESCALATED TODAY (2 items)</p>
            <ul className="space-y-1 text-sm">
              <li>Grace #58: Marcy stories — LOW → <strong>MEDIUM</strong> (8 days pending)</li>
              <li>Grace #59: Farmers market pictures — LOW → <strong>MEDIUM</strong> (8 days pending)</li>
            </ul>
            <p className="text-xs text-orange-600 mt-2 italic">These have been waiting. Time to act or consciously snooze.</p>
          </div>
          
          {/* SWARM */}
          <div className="mb-4 p-4 bg-purple-100 rounded-lg border border-purple-300">
            <p className="font-bold text-purple-700 mb-2">🌀 SWARM DETECTED: AI Memory / Continuity</p>
            <p className="text-sm">Your unconscious is circling this. 3 butterflies today:</p>
            <ul className="text-sm mt-1">
              <li>• 🦋#116: Grace AI Failure — Manus Drift</li>
              <li>• 🦋#118: Bebop Login with Lucas</li>
              <li>• 🦋#119: Restart Manus — Download Files Separately</li>
            </ul>
            <p className="text-sm mt-2"><strong>Common thread:</strong> AI assistant that doesn't forget</p>
            <button className="mt-2 px-3 py-1 bg-purple-500 text-white rounded text-sm hover:bg-purple-600">💡 Start Lean Canvas for this swarm?</button>
          </div>
          
          {/* APPROVED AWAITING */}
          {approvedItems.length > 0 && (
            <div className="p-4 bg-green-100 rounded-lg border border-green-300">
              <p className="font-bold text-green-700 mb-2">✅ APPROVED — AWAITING SEND CONFIRMATION ({approvedItems.length})</p>
              <p className="text-sm">Did you send these?</p>
              <ul className="text-sm mt-1">
                {approvedItems.map(item => (
                  <li key={item.id} className="flex items-center justify-between gap-2 py-1">
                    <span>Grace #{item.id}: {item.action.substring(0, 40)}...</span>
                    <button onClick={() => handleConfirmSent(item.id)} className="px-2 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600">Confirm Sent</button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* SEARCH & FILTER */}
        <div className="bg-white rounded-xl shadow p-4">
          <div className="flex flex-wrap gap-3 items-center">
            <div className="flex-1 min-w-[200px]">
              <input 
                type="text" 
                placeholder="🔍 Filter: name, tag, or keyword..." 
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
              />
            </div>
            <button onClick={() => setShowBatchConfirm('LOW')} className="px-3 py-2 bg-gray-500 text-white rounded-lg text-sm hover:bg-gray-600">Approve all LOW</button>
            <button onClick={() => setShowBatchConfirm('MEDIUM')} className="px-3 py-2 bg-yellow-500 text-white rounded-lg text-sm hover:bg-yellow-600">Approve all MEDIUM</button>
          </div>
          
          {/* BATCH CONFIRM MODAL */}
          {showBatchConfirm && (
            <div className="mt-3 p-4 bg-yellow-50 border-2 border-yellow-400 rounded-lg">
              <p className="font-bold text-yellow-800">⚠️ BATCH ACTION: Approve all {showBatchConfirm} priority items?</p>
              <p className="text-sm mt-1">This will approve {graceItems.filter(g => g.priority === showBatchConfirm && g.status === 'pending').length} items.</p>
              <div className="flex gap-2 mt-3">
                <button onClick={() => handleBatchApprove(showBatchConfirm)} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">✅ Yes, approve all</button>
                <button onClick={() => setShowBatchConfirm(null)} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400">❌ Cancel</button>
              </div>
            </div>
          )}
          
          {/* FILTER RESULTS */}
          {filteredItems && (
            <div className="mt-4">
              <p className="text-sm font-bold text-purple-700 mb-2">🔍 FILTER RESULTS: "{filterText}" ({filteredItems.length} items)</p>
              <div className="space-y-3">
                {filteredItems.map(item => <GraceCard key={item.id} item={item} />)}
              </div>
              <button onClick={() => setFilterText('')} className="mt-3 px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300">Clear filter</button>
            </div>
          )}
        </div>

        {/* WEEKLY DIGEST (collapsible) */}
        {showWeeklyDigest && (
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-300 rounded-xl p-6">
            <h3 className="text-xl font-bold text-purple-800 mb-4">📊 WEEKLY DIGEST — Week of Jan 20-26, 2026</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-lg">
                <p className="font-bold text-purple-700">🦋 BUTTERFLIES</p>
                <p className="text-2xl font-bold">119 YTD</p>
                <p className="text-sm text-gray-600">Avg 9.9/day • Top: 🦋#88 (340 pts)</p>
              </div>
              <div className="p-4 bg-white rounded-lg">
                <p className="font-bold text-green-700">✅ EXECUTION</p>
                <p className="text-sm">Created: 18 • Approved: 12 • Pending: 14</p>
              </div>
              <div className="p-4 bg-white rounded-lg">
                <p className="font-bold text-orange-700">📤 PTK STATUS</p>
                <p className="text-sm">Outstanding: 5 • Overdue: 2 • Completed: 3</p>
              </div>
              <div className="p-4 bg-white rounded-lg">
                <p className="font-bold text-purple-700">🌀 SWARMS</p>
                <p className="text-sm">Active: 1 (AI Memory — 3 butterflies)</p>
              </div>
            </div>
            <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
              <p className="font-bold text-yellow-800">💡 AI OBSERVATIONS</p>
              <p className="text-sm">• John Frank items average 5 days to complete — build in lead time</p>
              <p className="text-sm">• "AI Memory" swarm keeps growing — consider Lean Canvas</p>
              <p className="text-sm">• Highest capture days: Mondays (12.3 avg)</p>
            </div>
            <button onClick={() => setShowWeeklyDigest(false)} className="mt-3 px-3 py-1 bg-purple-200 text-purple-700 rounded text-sm hover:bg-purple-300">Close Digest</button>
          </div>
        )}

        {/* BUTTERFLIES WITH EMBEDDED GRACE */}
        {!filteredItems && butterflies.map((b, i) => {
          const actions = getActionsForButterfly(b.ytdNum);
          return (
            <div key={i} className={`bg-white rounded-xl shadow p-6 ${b.swarmMember ? 'ring-2 ring-purple-400' : ''}`}>
              {b.swarmMember && (
                <div className="mb-3 px-3 py-1 bg-purple-100 rounded-lg inline-block">
                  <span className="text-sm text-purple-700 font-medium">🌀 SWARM: AI Memory / Continuity</span>
                </div>
              )}
              <h3 className="text-lg font-bold text-gray-900">🦋 Today #{b.todayNum}, YTD #{b.ytdNum}: {b.title}</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {b.tags.map(tag => (
                  <span key={tag} className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded">{tag}</span>
                ))}
              </div>
              {b.deadline && (
                <div className="mt-3 p-3 bg-red-50 border border-red-300 rounded-lg">
                  <p className="text-sm font-bold text-red-700">⏱️ DEADLINE: {b.deadline.name} — {b.deadline.date}</p>
                  <p className="text-lg font-bold text-red-800">{b.deadline.daysRemaining} DAYS REMAINING</p>
                </div>
              )}
              <p className="text-gray-700 mt-3">{b.core}</p>
              <p className="mt-4"><strong>Thesis:</strong> <em>{b.thesis}</em></p>
              <p className="mt-3 bg-amber-50 p-3 rounded-lg border-l-4 border-amber-400"><strong>Bar Stool:</strong> {b.barStool}</p>
              <table className="w-full text-center text-sm mt-4">
                <thead><tr className="bg-gray-100">
                  <th className="p-2">Humanity</th><th className="p-2">Business</th><th className="p-2">Fun</th><th className="p-2">WTH</th><th className="p-2 font-bold">TOTAL</th>
                </tr></thead>
                <tbody><tr>
                  <td className="p-2">{b.scores.humanity}</td><td className="p-2">{b.scores.business}</td><td className="p-2">{b.scores.fun}</td><td className="p-2">{b.scores.wth}</td>
                  <td className="p-2 font-bold">{b.scores.humanity + b.scores.business + b.scores.fun + b.scores.wth}</td>
                </tr></tbody>
              </table>
              {b.scores.business >= 70 && (
                <p className="mt-3 text-sm text-green-700 font-medium">🏷️ LEAN CANVAS FLAG: Business {b.scores.business}</p>
              )}
              
              {/* GRACE ACTIONS */}
              {actions.length > 0 && (
                <div className="mt-4 space-y-3">
                  {actions.map(action => <GraceCard key={action.id} item={action} showSource={false} />)}
                </div>
              )}
            </div>
          );
        })}

        {/* GRACE QUEUE */}
        {!filteredItems && (
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">🧞 GRACE EXECUTION QUEUE — All Items</h3>
            
            {/* DEADLINE ITEMS */}
            {deadlineItems.length > 0 && (
              <div className="mb-6">
                <h4 className="text-base font-bold text-red-700 mb-3 flex items-center gap-2">
                  🚨 DEADLINE ITEMS
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm">{deadlineItems.length}</span>
                </h4>
                <div className="space-y-3">
                  {deadlineItems.map(item => <GraceCard key={item.id} item={item} />)}
                </div>
              </div>
            )}
            
            {/* AUTO-ESCALATED */}
            {escalatedItems.length > 0 && (
              <div className="mb-6">
                <h4 className="text-base font-bold text-orange-700 mb-3 flex items-center gap-2">
                  ⬆️ AUTO-ESCALATED
                  <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm">{escalatedItems.length}</span>
                </h4>
                <div className="space-y-3">
                  {escalatedItems.map(item => <GraceCard key={item.id} item={item} />)}
                </div>
              </div>
            )}
            
            {/* APPROVED AWAITING SEND */}
            {approvedItems.length > 0 && (
              <div className="mb-6">
                <h4 className="text-base font-bold text-green-700 mb-3 flex items-center gap-2">
                  ✅ APPROVED — AWAITING SEND CONFIRMATION
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">{approvedItems.length}</span>
                </h4>
                <div className="space-y-3">
                  {approvedItems.map(item => <GraceCard key={item.id} item={item} />)}
                </div>
              </div>
            )}
            
            {/* TODAY'S PENDING */}
            {todayPending.length > 0 && (
              <div className="mb-6">
                <h4 className="text-base font-bold text-blue-700 mb-3 flex items-center gap-2">
                  📅 FROM TODAY (Day {dayNumber})
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">{todayPending.length}</span>
                </h4>
                <div className="space-y-3">
                  {todayPending.filter(i => !i.deadline).map(item => <GraceCard key={item.id} item={item} />)}
                </div>
              </div>
            )}
            
            {/* ACCUMULATED PENDING */}
            {accumulatedPending.length > 0 && (
              <div className="mb-6">
                <h4 className="text-base font-bold text-gray-700 mb-3 flex items-center gap-2">
                  📦 ACCUMULATED PENDING (Previous Days)
                  <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">{accumulatedPending.length}</span>
                </h4>
                <div className="space-y-3">
                  {accumulatedPending.map(item => <GraceCard key={item.id} item={item} />)}
                </div>
              </div>
            )}
            
            {/* SNOOZED FUTURE */}
            {snoozedFuture.length > 0 && (
              <div className="mb-6">
                <h4 className="text-base font-bold text-blue-600 mb-3 flex items-center gap-2">
                  😴 SNOOZED — FUTURE
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">{snoozedFuture.length}</span>
                </h4>
                <div className="space-y-3">
                  {snoozedFuture.map(item => <GraceCard key={item.id} item={item} />)}
                </div>
              </div>
            )}
          </div>
        )}

        {/* PTK */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">📤 PTK — PROMISES TIM MADE</h3>
          
          {/* OUTSTANDING/OVERDUE */}
          {ptkMade.filter(p => p.status !== 'completed').length > 0 && (
            <div className="space-y-2 mb-4">
              <p className="text-sm font-bold text-gray-600">Outstanding ({ptkMade.filter(p => p.status !== 'completed').length})</p>
              {ptkMade.filter(p => p.status !== 'completed').map(item => (
                <div key={item.id} className={`border rounded-lg p-4 flex justify-between items-center ${item.status === 'overdue' ? 'bg-red-50 border-red-300' : 'bg-gray-50 border-gray-200'}`}>
                  <div>
                    <p className="font-medium">{item.promise}</p>
                    <p className="text-sm text-gray-500">To: {item.to} | {item.date} | {item.daysOld} days</p>
                    {item.status === 'overdue' && <p className="text-xs text-red-600 font-bold">⚠️ OVERDUE</p>}
                  </div>
                  <button 
                    onClick={() => handlePtkDone(item.id)}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600"
                  >
                    ✅ Done
                  </button>
                </div>
              ))}
            </div>
          )}
          
          {/* COMPLETED */}
          {ptkMade.filter(p => p.status === 'completed').length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-bold text-green-600">Completed ({ptkMade.filter(p => p.status === 'completed').length})</p>
              {ptkMade.filter(p => p.status === 'completed').map(item => (
                <div key={item.id} className="border rounded-lg p-4 flex justify-between items-center bg-green-50 border-green-300">
                  <div>
                    <p className="font-medium text-green-700 line-through">{item.promise}</p>
                    <p className="text-sm text-green-600">To: {item.to} | Completed: {item.completedOn}</p>
                  </div>
                  <span className="px-3 py-1 bg-green-200 text-green-800 rounded text-sm font-medium">✅ DONE</span>
                </div>
              ))}
            </div>
          )}
          
          {ptkMade.filter(p => p.status !== 'completed').length === 0 && (
            <p className="text-center text-gray-500 py-4">🎉 All promises kept!</p>
          )}
        </div>

        {/* GHOST BUSTER */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">👻 GHOST BUSTER — PROMISES TO TIM</h3>
          <p className="text-sm text-gray-600 mb-4">3 nudge options per item • Escalation suggestions based on history</p>
          
          {/* ACTIVE ITEMS (waiting, overdue, nudged) */}
          {ptkToTim.filter(p => p.status !== 'received').length > 0 && (
            <div className="space-y-4 mb-4">
              <p className="text-sm font-bold text-gray-600">Active ({ptkToTim.filter(p => p.status !== 'received').length})</p>
              {ptkToTim.filter(p => p.status !== 'received').map(item => (
                <div key={item.id} className={`border-2 rounded-lg p-4 ${
                  item.status === 'overdue' ? 'bg-red-50 border-red-400' :
                  item.status === 'nudged' ? 'bg-purple-50 border-purple-300' :
                  'bg-gray-50 border-gray-200'
                }`}>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-medium text-lg">{item.promise}</p>
                      <p className="text-sm text-gray-600">
                        From: <strong>{item.from}</strong> ({CONTACTS[item.from]?.email}) | {item.date}
                        {item.status === 'overdue' && <span className="text-red-600 font-bold ml-2">🔴 {item.daysWaiting} DAYS OVERDUE</span>}
                      </p>
                      {item.nudgeHistory.length > 0 && (
                        <p className="text-xs text-purple-600 mt-1">
                          📊 Nudge history: {item.nudgeHistory.map(n => `${n.date} (${n.tone})`).join(', ')}
                        </p>
                      )}
                    </div>
                    <span className={`px-3 py-1 rounded-lg text-sm font-medium ${getStatusStyle(item.status)}`}>{item.status.toUpperCase()}</span>
                  </div>

                  {/* ESCALATION SUGGESTION */}
                  {item.nudgeHistory.length > 0 && item.status !== 'nudged' && (
                    <div className="mb-3 p-2 bg-yellow-50 border border-yellow-300 rounded">
                      <p className="text-sm text-yellow-800">
                        💡 <strong>SUGGESTED:</strong> You sent {item.nudgeHistory.length} nudge(s), last was {item.nudgeHistory[item.nudgeHistory.length - 1]?.tone}. 
                        Consider escalating to {item.nudgeHistory[item.nudgeHistory.length - 1]?.tone === 'friendly' ? 'DIRECT' : 'URGENT'}.
                      </p>
                    </div>
                  )}

                  {/* NUDGE CONFIRMATION */}
                  {item.status === 'nudged' && sentNudges[item.id] && (
                    <div className="mb-3 p-3 bg-purple-100 border border-purple-300 rounded-lg">
                      <p className="font-bold text-purple-800">✅ NUDGE SENT at {sentNudges[item.id].timestamp}</p>
                      <p className="text-sm"><strong>To:</strong> {item.from} ({CONTACTS[item.from]?.email})</p>
                      <p className="text-sm"><strong>Tone:</strong> {sentNudges[item.id].tone.toUpperCase()}</p>
                      <p className="text-sm"><strong>Subject:</strong> {sentNudges[item.id].nudge.subject}</p>
                    </div>
                  )}

                  {/* ACTION BUTTONS */}
                  {(item.status === 'waiting' || item.status === 'overdue') && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      <button onClick={() => setExpandedNudge(expandedNudge === item.id ? null : item.id)} className="px-4 py-2 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-600">
                        👻 {expandedNudge === item.id ? 'Hide' : 'Choose'} Nudge
                      </button>
                      <button 
                        onClick={() => handleGhostReceived(item.id)}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600"
                      >
                        ✅ Received
                      </button>
                    </div>
                  )}
                  
                  {/* NUDGED STATE — Show received button */}
                  {item.status === 'nudged' && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      <button 
                        onClick={() => handleGhostReceived(item.id)}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600"
                      >
                        ✅ Received — They Delivered
                      </button>
                      <button onClick={() => setExpandedNudge(expandedNudge === item.id ? null : item.id)} className="px-4 py-2 bg-purple-300 text-purple-800 rounded-lg font-medium hover:bg-purple-400">
                        👻 Send Another Nudge
                      </button>
                    </div>
                  )}

                  {/* 3 NUDGE OPTIONS */}
                  {expandedNudge === item.id && (
                    <div className="space-y-3 mt-3">
                      <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-sm font-bold text-blue-800">📧 To: {item.from} &lt;{CONTACTS[item.from]?.email}&gt;</p>
                      </div>
                      
                      {/* FRIENDLY */}
                      <div className="border-2 rounded-lg p-4 bg-green-50 border-green-300">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-lg font-bold text-green-700">😊 FRIENDLY</span>
                          <div className="flex gap-2">
                            <button onClick={() => copyToClipboard(item.nudges.friendly.body)} className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">📋 Copy</button>
                            <button onClick={() => handleSendNudge(item.id, 'friendly')} className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700">📤 Send</button>
                          </div>
                        </div>
                        <p className="text-sm"><strong>Subject:</strong> {item.nudges.friendly.subject}</p>
                        <pre className="mt-2 p-3 bg-white rounded text-sm whitespace-pre-wrap border">{item.nudges.friendly.body}</pre>
                      </div>
                      
                      {/* DIRECT */}
                      <div className="border-2 rounded-lg p-4 bg-yellow-50 border-yellow-300">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-lg font-bold text-yellow-700">📋 DIRECT</span>
                          <div className="flex gap-2">
                            <button onClick={() => copyToClipboard(item.nudges.direct.body)} className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">📋 Copy</button>
                            <button onClick={() => handleSendNudge(item.id, 'direct')} className="px-4 py-2 bg-yellow-600 text-white rounded-lg font-medium hover:bg-yellow-700">📤 Send</button>
                          </div>
                        </div>
                        <p className="text-sm"><strong>Subject:</strong> {item.nudges.direct.subject}</p>
                        <pre className="mt-2 p-3 bg-white rounded text-sm whitespace-pre-wrap border">{item.nudges.direct.body}</pre>
                      </div>
                      
                      {/* URGENT */}
                      <div className="border-2 rounded-lg p-4 bg-red-50 border-red-300">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-lg font-bold text-red-700">🚨 URGENT</span>
                          <div className="flex gap-2">
                            <button onClick={() => copyToClipboard(item.nudges.urgent.body)} className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">📋 Copy</button>
                            <button onClick={() => handleSendNudge(item.id, 'urgent')} className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700">📤 Send</button>
                          </div>
                        </div>
                        <p className="text-sm"><strong>Subject:</strong> {item.nudges.urgent.subject}</p>
                        <pre className="mt-2 p-3 bg-white rounded text-sm whitespace-pre-wrap border">{item.nudges.urgent.body}</pre>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          
          {/* RECEIVED ITEMS */}
          {ptkToTim.filter(p => p.status === 'received').length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-bold text-green-600">Received ({ptkToTim.filter(p => p.status === 'received').length})</p>
              {ptkToTim.filter(p => p.status === 'received').map(item => (
                <div key={item.id} className="border rounded-lg p-4 bg-green-50 border-green-300">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-green-700 line-through">{item.promise}</p>
                      <p className="text-sm text-green-600">From: {item.from} | Received: {item.receivedOn}</p>
                    </div>
                    <span className="px-3 py-1 bg-green-200 text-green-800 rounded text-sm font-medium">✅ RECEIVED</span>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {ptkToTim.filter(p => p.status !== 'received').length === 0 && (
            <p className="text-center text-gray-500 py-4">🎉 All Ghost Buster items received!</p>
          )}
        </div>

        {/* SWARMS */}
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-300 rounded-xl p-6">
          <h3 className="text-xl font-bold text-purple-800 mb-4">🌀 ACTIVE SWARMS</h3>
          {swarms.map(swarm => (
            <div key={swarm.id} className="p-4 bg-white rounded-lg border border-purple-200">
              <p className="font-bold text-purple-700">{swarm.topic}</p>
              <p className="text-sm text-gray-600">{swarm.butterflies.length} butterflies in {swarm.dayRange}: 🦋#{swarm.butterflies.join(', #')}</p>
              <p className="text-sm text-purple-600 mt-2">💡 {swarm.suggestion}</p>
              <button className="mt-2 px-3 py-1 bg-purple-500 text-white rounded text-sm hover:bg-purple-600">Start Lean Canvas</button>
            </div>
          ))}
        </div>

        {/* SUMMARY — CLICKABLE CARDS */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">📊 SUMMARY — Tap any card to see details</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {/* DEADLINES */}
            <button 
              onClick={() => setExpandedSummaryCard(expandedSummaryCard === 'deadlines' ? null : 'deadlines')}
              className={`rounded-xl p-4 text-center transition-all hover:scale-105 ${
                expandedSummaryCard === 'deadlines' 
                  ? 'bg-red-200 border-2 border-red-500 shadow-lg' 
                  : 'bg-red-50 border border-red-200 hover:bg-red-100'
              }`}
            >
              <p className="text-2xl font-bold text-red-700">{deadlineItems.length}</p>
              <p className="text-xs text-red-600">🚨 Deadlines</p>
            </button>
            
            {/* ESCALATED */}
            <button 
              onClick={() => setExpandedSummaryCard(expandedSummaryCard === 'escalated' ? null : 'escalated')}
              className={`rounded-xl p-4 text-center transition-all hover:scale-105 ${
                expandedSummaryCard === 'escalated' 
                  ? 'bg-orange-200 border-2 border-orange-500 shadow-lg' 
                  : 'bg-orange-50 border border-orange-200 hover:bg-orange-100'
              }`}
            >
              <p className="text-2xl font-bold text-orange-700">{escalatedItems.length}</p>
              <p className="text-xs text-orange-600">⬆️ Escalated</p>
            </button>
            
            {/* APPROVED */}
            <button 
              onClick={() => setExpandedSummaryCard(expandedSummaryCard === 'approved' ? null : 'approved')}
              className={`rounded-xl p-4 text-center transition-all hover:scale-105 ${
                expandedSummaryCard === 'approved' 
                  ? 'bg-green-200 border-2 border-green-500 shadow-lg' 
                  : 'bg-green-50 border border-green-200 hover:bg-green-100'
              }`}
            >
              <p className="text-2xl font-bold text-green-700">{approvedItems.length}</p>
              <p className="text-xs text-green-600">✅ Approved</p>
            </button>
            
            {/* PENDING */}
            <button 
              onClick={() => setExpandedSummaryCard(expandedSummaryCard === 'pending' ? null : 'pending')}
              className={`rounded-xl p-4 text-center transition-all hover:scale-105 ${
                expandedSummaryCard === 'pending' 
                  ? 'bg-gray-300 border-2 border-gray-500 shadow-lg' 
                  : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
              }`}
            >
              <p className="text-2xl font-bold text-gray-700">{graceItems.filter(g => g.status === 'pending').length}</p>
              <p className="text-xs text-gray-600">📋 Pending</p>
            </button>
            
            {/* SNOOZED */}
            <button 
              onClick={() => setExpandedSummaryCard(expandedSummaryCard === 'snoozed' ? null : 'snoozed')}
              className={`rounded-xl p-4 text-center transition-all hover:scale-105 ${
                expandedSummaryCard === 'snoozed' 
                  ? 'bg-blue-200 border-2 border-blue-500 shadow-lg' 
                  : 'bg-blue-50 border border-blue-200 hover:bg-blue-100'
              }`}
            >
              <p className="text-2xl font-bold text-blue-700">{snoozedItems.length}</p>
              <p className="text-xs text-blue-600">😴 Snoozed</p>
            </button>
            
            {/* YTD */}
            <button 
              onClick={() => setExpandedSummaryCard(expandedSummaryCard === 'ytd' ? null : 'ytd')}
              className={`rounded-xl p-4 text-center transition-all hover:scale-105 ${
                expandedSummaryCard === 'ytd' 
                  ? 'bg-purple-200 border-2 border-purple-500 shadow-lg' 
                  : 'bg-purple-50 border border-purple-200 hover:bg-purple-100'
              }`}
            >
              <p className="text-2xl font-bold text-purple-700">{ytdButterflies}</p>
              <p className="text-xs text-purple-600">🦋 YTD</p>
            </button>
          </div>
          
          {/* EXPANDED CARD CONTENT */}
          {expandedSummaryCard && (
            <div className="mt-4 p-4 rounded-lg border-2 animate-fadeIn" style={{
              backgroundColor: expandedSummaryCard === 'deadlines' ? '#fef2f2' :
                              expandedSummaryCard === 'escalated' ? '#fff7ed' :
                              expandedSummaryCard === 'approved' ? '#f0fdf4' :
                              expandedSummaryCard === 'pending' ? '#f9fafb' :
                              expandedSummaryCard === 'snoozed' ? '#eff6ff' : '#faf5ff',
              borderColor: expandedSummaryCard === 'deadlines' ? '#fca5a5' :
                           expandedSummaryCard === 'escalated' ? '#fdba74' :
                           expandedSummaryCard === 'approved' ? '#86efac' :
                           expandedSummaryCard === 'pending' ? '#d1d5db' :
                           expandedSummaryCard === 'snoozed' ? '#93c5fd' : '#c4b5fd'
            }}>
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-bold text-lg">
                  {expandedSummaryCard === 'deadlines' && '🚨 Deadline Items'}
                  {expandedSummaryCard === 'escalated' && '⬆️ Escalated Items'}
                  {expandedSummaryCard === 'approved' && '✅ Approved — Awaiting Send'}
                  {expandedSummaryCard === 'pending' && '📋 Pending Items'}
                  {expandedSummaryCard === 'snoozed' && '😴 Snoozed Items'}
                  {expandedSummaryCard === 'ytd' && '🦋 YTD Butterfly Summary'}
                </h4>
                <button 
                  onClick={() => setExpandedSummaryCard(null)}
                  className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300"
                >
                  ✕ Close
                </button>
              </div>
              
              {/* DEADLINES LIST */}
              {expandedSummaryCard === 'deadlines' && (
                <div className="space-y-2">
                  {deadlineItems.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">🎉 No deadline items!</p>
                  ) : (
                    deadlineItems.map(item => (
                      <div key={item.id} className="p-3 bg-white rounded-lg border border-red-200 flex justify-between items-center">
                        <div>
                          <p className="font-medium">#{item.id}: {item.action}</p>
                          <p className="text-sm text-red-600">⏱️ Due: {item.deadline} | Contact: {item.contact}</p>
                        </div>
                        <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-bold">
                          {Math.ceil((new Date(item.deadline) - currentDate) / (1000*60*60*24))}d
                        </span>
                      </div>
                    ))
                  )}
                </div>
              )}
              
              {/* ESCALATED LIST */}
              {expandedSummaryCard === 'escalated' && (
                <div className="space-y-2">
                  {escalatedItems.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">No escalated items</p>
                  ) : (
                    escalatedItems.map(item => (
                      <div key={item.id} className="p-3 bg-white rounded-lg border border-orange-200 flex justify-between items-center">
                        <div>
                          <p className="font-medium">#{item.id}: {item.action}</p>
                          <p className="text-sm text-orange-600">⬆️ {item.previousPriority} → {item.priority} | {item.daysOld} days old</p>
                        </div>
                        <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs font-bold">{item.priority}</span>
                      </div>
                    ))
                  )}
                </div>
              )}
              
              {/* APPROVED LIST */}
              {expandedSummaryCard === 'approved' && (
                <div className="space-y-2">
                  {approvedItems.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">No items awaiting send confirmation</p>
                  ) : (
                    approvedItems.map(item => (
                      <div key={item.id} className="p-3 bg-white rounded-lg border border-green-200 flex justify-between items-center">
                        <div>
                          <p className="font-medium">#{item.id}: {item.action}</p>
                          <p className="text-sm text-green-600">✅ Approved: {item.approvedOn} | To: {item.contact}</p>
                        </div>
                        <button 
                          onClick={() => handleConfirmSent(item.id)}
                          className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
                        >
                          📤 Confirm Sent
                        </button>
                      </div>
                    ))
                  )}
                </div>
              )}
              
              {/* PENDING LIST */}
              {expandedSummaryCard === 'pending' && (
                <div className="space-y-2">
                  {graceItems.filter(g => g.status === 'pending').length === 0 ? (
                    <p className="text-gray-500 text-center py-4">🎉 No pending items!</p>
                  ) : (
                    graceItems.filter(g => g.status === 'pending').map(item => (
                      <div key={item.id} className="p-3 bg-white rounded-lg border border-gray-200 flex justify-between items-center">
                        <div>
                          <p className="font-medium">#{item.id}: {item.action}</p>
                          <p className="text-sm text-gray-500">📋 {item.priority} | To: {item.contact} | {item.source}</p>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-bold text-white ${
                          item.priority === 'HIGH' ? 'bg-red-500' : 
                          item.priority === 'MEDIUM' ? 'bg-yellow-500' : 'bg-gray-400'
                        }`}>{item.priority}</span>
                      </div>
                    ))
                  )}
                </div>
              )}
              
              {/* SNOOZED LIST */}
              {expandedSummaryCard === 'snoozed' && (
                <div className="space-y-2">
                  {snoozedItems.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">No snoozed items</p>
                  ) : (
                    snoozedItems.map(item => (
                      <div key={item.id} className="p-3 bg-white rounded-lg border border-blue-200 flex justify-between items-center">
                        <div>
                          <p className="font-medium">#{item.id}: {item.action}</p>
                          <p className="text-sm text-blue-600">😴 Snoozed: {item.snoozedOn} → Wake: {item.snoozeUntil}</p>
                        </div>
                        <button 
                          onClick={() => handleGraceAction(item.id, 'pending')}
                          className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                        >
                          ⏰ Unsnooze
                        </button>
                      </div>
                    ))
                  )}
                </div>
              )}
              
              {/* YTD SUMMARY */}
              {expandedSummaryCard === 'ytd' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="p-3 bg-white rounded-lg border text-center">
                      <p className="text-2xl font-bold text-purple-700">{ytdButterflies}</p>
                      <p className="text-xs text-gray-500">Total Butterflies</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg border text-center">
                      <p className="text-2xl font-bold text-blue-700">{dayNumber}</p>
                      <p className="text-xs text-gray-500">Days Tracked</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg border text-center">
                      <p className="text-2xl font-bold text-green-700">{(ytdButterflies / dayNumber).toFixed(1)}</p>
                      <p className="text-xs text-gray-500">Avg/Day</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg border text-center">
                      <p className="text-2xl font-bold text-orange-700">{todayButterflies}</p>
                      <p className="text-xs text-gray-500">Today</p>
                    </div>
                  </div>
                  <div className="p-3 bg-white rounded-lg border">
                    <p className="font-medium text-gray-700">🦋 Today's Butterflies (Day {dayNumber}):</p>
                    <p className="text-sm text-gray-600 mt-1">
                      #113 AGLC Hearing • #114 $10K Lines of Credit • #115 Swarm Pattern • 
                      #116 Grace AI Failure • #117 Accordion Card • #118 Bebop Login • #119 Restart Manus
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* SESSION STATE */}
        <div className="bg-gray-100 rounded-xl p-6">
          <h3 className="text-lg font-bold text-gray-700 mb-3">📊 SESSION STATE — Save for Continuity</h3>
          <div className="bg-white rounded-lg p-4 font-mono text-xs overflow-x-auto">
            <pre>{`Day: ${dayNumber}
Date: ${reportDate}
YTD Butterflies: ${ytdButterflies}
Next Grace #: 79

DEADLINE ITEMS (${deadlineItems.length}):
${deadlineItems.map(i => `- Grace #${i.id}: ${i.action.substring(0,30)}... — DUE ${i.deadline}`).join('\n')}

ESCALATED (${escalatedItems.length}):
${escalatedItems.map(i => `- Grace #${i.id}: ${i.action.substring(0,30)}...`).join('\n')}

PENDING (${graceItems.filter(g => g.status === 'pending').length}):
${graceItems.filter(g => g.status === 'pending').map(i => `- Grace #${i.id}: ${i.action.substring(0,30)}...`).join('\n')}

SNOOZED (${snoozedItems.length}):
${snoozedItems.map(i => `- Grace #${i.id}: wake ${i.snoozeUntil}`).join('\n')}

PTK OUTSTANDING (${ptkMade.filter(p => p.status !== 'completed').length}):
${ptkMade.filter(p => p.status !== 'completed').map(p => `- ${p.promise} to ${p.to}`).join('\n')}

PTK COMPLETED (${ptkMade.filter(p => p.status === 'completed').length})

GHOST BUSTER ACTIVE (${ptkToTim.filter(p => p.status !== 'received').length}):
${ptkToTim.filter(p => p.status !== 'received').map(p => `- ${p.promise} from ${p.from} (${p.status})`).join('\n')}

GHOST BUSTER RECEIVED (${ptkToTim.filter(p => p.status === 'received').length})

ACTIVE SWARMS (${swarms.length}): AI Memory/Continuity

To continue: Paste this into next session.
Completed PTK and Received Ghost Buster items do NOT carry forward.`}</pre>
          </div>
        </div>

        {/* FOOTER */}
        <div className="text-center py-4 space-y-1">
          <p className="text-gray-500 text-sm">📧 All actions via EMAIL from {CONFIG.SENDER_EMAIL_PRIMARY} | NO SMS</p>
          <p className="text-gray-400 text-xs">v4.0 DEMO | Day {dayNumber} | {reportDate} | Tim J Latimer + Claude</p>
        </div>
      </div>
    </div>
  );
};

export default CloudButterflyReportV4;
