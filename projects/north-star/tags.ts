/**
 * Predefined tags for Destiny Discovered responses
 * 34 tags across 5 categories
 */

export type TagCategory = "Values" | "Action" | "Worldview" | "Success Mindset" | "Purpose";

export interface TagDef {
  name: string;
  category: TagCategory;
  description: string;
  keywords: string[]; // Keywords for automated tagging
}

export const PREDEFINED_TAGS: TagDef[] = [
  // Values Tags (10)
  {
    name: "Faith/Spirituality",
    category: "Values",
    description: "Strong religious or spiritual beliefs",
    keywords: ["faith", "god", "spiritual", "religion", "prayer", "belief", "divine", "soul", "sacred"]
  },
  {
    name: "Integrity",
    category: "Values",
    description: "Commitment to honesty and ethical behavior",
    keywords: ["integrity", "honest", "ethical", "truth", "moral", "principle", "values", "character"]
  },
  {
    name: "Empathy",
    category: "Values",
    description: "Understanding and sharing feelings of others",
    keywords: ["empathy", "understanding", "compassion", "care", "listen", "relate", "perspective"]
  },
  {
    name: "Compassion",
    category: "Values",
    description: "Concern for suffering of others",
    keywords: ["compassion", "kindness", "caring", "sympathy", "mercy", "help", "support"]
  },
  {
    name: "Gratitude",
    category: "Values",
    description: "Appreciation for what one has",
    keywords: ["grateful", "thankful", "appreciate", "blessing", "fortunate", "content"]
  },
  {
    name: "Humility",
    category: "Values",
    description: "Modest view of one's importance",
    keywords: ["humble", "modest", "admit", "learn", "listen", "don't know", "uncertain"]
  },
  {
    name: "Courage",
    category: "Values",
    description: "Willingness to face difficulty or danger",
    keywords: ["courage", "brave", "risk", "fear", "challenge", "overcome", "persevere"]
  },
  {
    name: "Perseverance",
    category: "Values",
    description: "Persistence in face of obstacles",
    keywords: ["persevere", "persist", "continue", "determination", "resilience", "endure", "keep going"]
  },
  {
    name: "Family",
    category: "Values",
    description: "Strong family orientation and values",
    keywords: ["family", "children", "parent", "spouse", "husband", "wife", "kids", "home"]
  },
  {
    name: "Service",
    category: "Values",
    description: "Commitment to serving others",
    keywords: ["serve", "help", "volunteer", "give", "contribute", "assist", "support others"]
  },
  
  // Action Orientation Tags (5)
  {
    name: "High Action Orientation",
    category: "Action",
    description: "Strong drive to take action and make change",
    keywords: ["action", "do", "implement", "execute", "make happen", "take initiative", "proactive"]
  },
  {
    name: "Moderate Action Orientation",
    category: "Action",
    description: "Balanced approach to action",
    keywords: ["consider", "plan", "thoughtful", "balanced", "measured"]
  },
  {
    name: "Low Action Orientation",
    category: "Action",
    description: "Preference for reflection over action",
    keywords: ["think", "reflect", "consider", "ponder", "contemplate", "observe"]
  },
  {
    name: "Money-Independent Action",
    category: "Action",
    description: "Willing to act without financial resources",
    keywords: ["without money", "volunteer", "time", "effort", "free", "no cost"]
  },
  {
    name: "Resource-Dependent Action",
    category: "Action",
    description: "Actions contingent on having resources",
    keywords: ["with money", "fund", "invest", "donate", "financial", "resources"]
  },
  
  // Worldview Tags (7)
  {
    name: "Optimistic",
    category: "Worldview",
    description: "Positive outlook on life and opportunities",
    keywords: ["good", "excellent", "positive", "hopeful", "optimistic", "opportunity", "bright"]
  },
  {
    name: "Realistic",
    category: "Worldview",
    description: "Balanced, pragmatic worldview",
    keywords: ["realistic", "practical", "balanced", "pragmatic", "reasonable"]
  },
  {
    name: "Pessimistic",
    category: "Worldview",
    description: "Negative or cautious outlook",
    keywords: ["bad", "difficult", "challenging", "pessimistic", "negative", "hard"]
  },
  {
    name: "Faith-Based",
    category: "Worldview",
    description: "Worldview grounded in religious faith",
    keywords: ["faith", "god", "bible", "church", "christian", "religious", "spiritual"]
  },
  {
    name: "Secular",
    category: "Worldview",
    description: "Non-religious worldview",
    keywords: ["secular", "science", "reason", "logic", "evidence", "rational"]
  },
  {
    name: "Community-Oriented",
    category: "Worldview",
    description: "Focus on collective wellbeing",
    keywords: ["community", "together", "we", "collective", "society", "everyone", "all"]
  },
  {
    name: "Individual-Focused",
    category: "Worldview",
    description: "Emphasis on individual responsibility",
    keywords: ["individual", "self", "personal", "own", "myself", "independent"]
  },
  
  // Success Mindset Tags (6)
  {
    name: "Internal Locus of Control",
    category: "Success Mindset",
    description: "Belief in personal control over outcomes",
    keywords: ["control", "my choice", "decide", "responsible", "manage", "influence", "power"]
  },
  {
    name: "External Locus of Control",
    category: "Success Mindset",
    description: "Belief external factors determine outcomes",
    keywords: ["luck", "fate", "circumstances", "others", "out of control", "external", "uncontrollable"]
  },
  {
    name: "Growth Mindset",
    category: "Success Mindset",
    description: "Belief abilities can be developed",
    keywords: ["learn", "grow", "develop", "improve", "change", "adapt", "evolve", "better"]
  },
  {
    name: "Fixed Mindset",
    category: "Success Mindset",
    description: "Belief abilities are static",
    keywords: ["can't change", "born with", "natural", "fixed", "always been", "just am"]
  },
  {
    name: "Collaborative",
    category: "Success Mindset",
    description: "Values working with others",
    keywords: ["team", "together", "collaborate", "partnership", "support", "help each other"]
  },
  {
    name: "Independent",
    category: "Success Mindset",
    description: "Preference for self-reliance",
    keywords: ["alone", "myself", "independent", "self-reliant", "own", "solo"]
  },
  
  // Purpose Tags (6)
  {
    name: "Clear Purpose",
    category: "Purpose",
    description: "Strong sense of life purpose",
    keywords: ["purpose", "mission", "calling", "destiny", "direction", "goal", "aim"]
  },
  {
    name: "Seeking Purpose",
    category: "Purpose",
    description: "Searching for meaning and direction",
    keywords: ["searching", "looking for", "trying to find", "uncertain", "exploring", "discovering"]
  },
  {
    name: "Legacy-Focused",
    category: "Purpose",
    description: "Concerned with lasting impact",
    keywords: ["legacy", "leave behind", "remember", "impact", "lasting", "future generations"]
  },
  {
    name: "Present-Focused",
    category: "Purpose",
    description: "Focus on current moment and experiences",
    keywords: ["now", "present", "today", "current", "moment", "immediate"]
  },
  {
    name: "Service-Oriented",
    category: "Purpose",
    description: "Purpose centered on helping others",
    keywords: ["serve", "help others", "give back", "contribute", "make difference", "assist"]
  },
  {
    name: "Achievement-Oriented",
    category: "Purpose",
    description: "Purpose centered on personal accomplishment",
    keywords: ["achieve", "accomplish", "succeed", "win", "excel", "best", "top"]
  }
];

/**
 * Get tags by category
 */
export function getTagsByCategory(category: TagCategory): TagDef[] {
  return PREDEFINED_TAGS.filter(tag => tag.category === category);
}

/**
 * Get all tag categories
 */
export function getAllTagCategories(): TagCategory[] {
  return ["Values", "Action", "Worldview", "Success Mindset", "Purpose"];
}

/**
 * Find tags matching keywords in text
 */
export function findMatchingTags(text: string): { tag: TagDef; matches: string[] }[] {
  const lowerText = text.toLowerCase();
  const results: { tag: TagDef; matches: string[] }[] = [];
  
  for (const tag of PREDEFINED_TAGS) {
    const matches = tag.keywords.filter(keyword => 
      lowerText.includes(keyword.toLowerCase())
    );
    
    if (matches.length > 0) {
      results.push({ tag, matches });
    }
  }
  
  // Sort by number of matches (descending)
  return results.sort((a, b) => b.matches.length - a.matches.length);
}
