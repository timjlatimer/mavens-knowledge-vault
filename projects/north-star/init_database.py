#!/usr/bin/env python3
"""
North Star Database Initialization Script
Creates the SQLite database and all necessary tables for storing Destiny Discovered responses.
"""

import sqlite3
import os
from datetime import datetime

# Database path
DB_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'data', 'north_star.db')

def init_database():
    """Initialize the North Star database with all required tables."""
    
    # Ensure data directory exists
    os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
    
    # Connect to database (creates if doesn't exist)
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    print(f"Initializing database at: {DB_PATH}")
    
    # 1. Respondents Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS respondents (
            respondent_id INTEGER PRIMARY KEY AUTOINCREMENT,
            full_name TEXT NOT NULL,
            email TEXT,
            job_title TEXT,
            organization TEXT,
            date_submitted TIMESTAMP,
            date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            notes TEXT
        )
    ''')
    print("✓ Created respondents table")
    
    # 2. Responses Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS responses (
            response_id INTEGER PRIMARY KEY AUTOINCREMENT,
            respondent_id INTEGER NOT NULL,
            question_number INTEGER NOT NULL,
            question_category TEXT,
            response_text TEXT,
            response_type TEXT,
            date_answered TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (respondent_id) REFERENCES respondents(respondent_id)
        )
    ''')
    print("✓ Created responses table")
    
    # 3. List_Responses Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS list_responses (
            list_response_id INTEGER PRIMARY KEY AUTOINCREMENT,
            response_id INTEGER NOT NULL,
            item_number INTEGER NOT NULL,
            item_text TEXT,
            item_reason TEXT,
            FOREIGN KEY (response_id) REFERENCES responses(response_id)
        )
    ''')
    print("✓ Created list_responses table")
    
    # 4. Multiple_Choice_Responses Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS multiple_choice_responses (
            mc_response_id INTEGER PRIMARY KEY AUTOINCREMENT,
            response_id INTEGER NOT NULL,
            option_selected TEXT,
            is_selected BOOLEAN,
            FOREIGN KEY (response_id) REFERENCES responses(response_id)
        )
    ''')
    print("✓ Created multiple_choice_responses table")
    
    # 5. Belief_System_Responses Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS belief_system_responses (
            belief_response_id INTEGER PRIMARY KEY AUTOINCREMENT,
            respondent_id INTEGER NOT NULL,
            believes_in_god BOOLEAN,
            why_text TEXT,
            advantages_text TEXT,
            disadvantages_text TEXT,
            evidence_text TEXT,
            FOREIGN KEY (respondent_id) REFERENCES respondents(respondent_id)
        )
    ''')
    print("✓ Created belief_system_responses table")
    
    # 6. Success_Factors Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS success_factors (
            success_factor_id INTEGER PRIMARY KEY AUTOINCREMENT,
            respondent_id INTEGER NOT NULL,
            personal_influence_pct INTEGER,
            others_influence_pct INTEGER,
            economic_social_pct INTEGER,
            uncontrollable_pct INTEGER,
            FOREIGN KEY (respondent_id) REFERENCES respondents(respondent_id)
        )
    ''')
    print("✓ Created success_factors table")
    
    # 7. Tags Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS tags (
            tag_id INTEGER PRIMARY KEY AUTOINCREMENT,
            tag_name TEXT UNIQUE NOT NULL,
            tag_category TEXT,
            description TEXT
        )
    ''')
    print("✓ Created tags table")
    
    # 8. Response_Tags Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS response_tags (
            response_tag_id INTEGER PRIMARY KEY AUTOINCREMENT,
            response_id INTEGER NOT NULL,
            tag_id INTEGER NOT NULL,
            confidence TEXT,
            FOREIGN KEY (response_id) REFERENCES responses(response_id),
            FOREIGN KEY (tag_id) REFERENCES tags(tag_id)
        )
    ''')
    print("✓ Created response_tags table")
    
    # 9. Question_Definitions Table (for reference)
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS question_definitions (
            question_number INTEGER PRIMARY KEY,
            question_text TEXT NOT NULL,
            question_category TEXT,
            response_type TEXT,
            notes TEXT
        )
    ''')
    print("✓ Created question_definitions table")
    
    # Insert predefined tags
    predefined_tags = [
        # Values Tags
        ('Faith/Spirituality', 'Values', 'Demonstrates strong faith or spiritual orientation'),
        ('Integrity', 'Values', 'Emphasis on honesty, ethics, and moral principles'),
        ('Empathy', 'Values', 'Shows understanding and compassion for others'),
        ('Compassion', 'Values', 'Demonstrates care and concern for others\' wellbeing'),
        ('Gratitude', 'Values', 'Expresses thankfulness and appreciation'),
        ('Humility', 'Values', 'Shows modesty and lack of arrogance'),
        ('Courage', 'Values', 'Demonstrates bravery and willingness to face challenges'),
        ('Perseverance', 'Values', 'Shows determination and persistence'),
        ('Family', 'Values', 'Strong emphasis on family relationships'),
        ('Service', 'Values', 'Orientation toward serving others'),
        
        # Action Orientation Tags
        ('High Action Orientation', 'Action', 'Strong tendency to take action and implement ideas'),
        ('Moderate Action Orientation', 'Action', 'Balanced approach to action and planning'),
        ('Low Action Orientation', 'Action', 'More contemplative, less action-focused'),
        ('Money-Independent Action', 'Action', 'Willing to act without financial resources'),
        ('Resource-Dependent Action', 'Action', 'Action contingent on having resources'),
        
        # Worldview Tags
        ('Optimistic', 'Worldview', 'Positive outlook on life and future'),
        ('Realistic', 'Worldview', 'Balanced, practical view of reality'),
        ('Pessimistic', 'Worldview', 'Negative or cautious outlook'),
        ('Faith-Based', 'Worldview', 'Worldview grounded in religious faith'),
        ('Secular', 'Worldview', 'Non-religious worldview'),
        ('Community-Oriented', 'Worldview', 'Focus on collective wellbeing'),
        ('Individual-Focused', 'Worldview', 'Focus on personal achievement'),
        
        # Success Mindset Tags
        ('Internal Locus of Control', 'Success Mindset', 'Believes success is within their control'),
        ('External Locus of Control', 'Success Mindset', 'Believes success depends on external factors'),
        ('Growth Mindset', 'Success Mindset', 'Believes abilities can be developed'),
        ('Fixed Mindset', 'Success Mindset', 'Believes abilities are static'),
        ('Collaborative', 'Success Mindset', 'Values teamwork and cooperation'),
        ('Independent', 'Success Mindset', 'Prefers self-reliance'),
        
        # Purpose Tags
        ('Clear Purpose', 'Purpose', 'Has well-defined sense of purpose'),
        ('Seeking Purpose', 'Purpose', 'Still discovering or defining purpose'),
        ('Legacy-Focused', 'Purpose', 'Concerned with long-term impact'),
        ('Present-Focused', 'Purpose', 'Focused on immediate impact'),
        ('Service-Oriented', 'Purpose', 'Purpose centered on serving others'),
        ('Achievement-Oriented', 'Purpose', 'Purpose centered on personal accomplishment'),
    ]
    
    cursor.executemany('''
        INSERT OR IGNORE INTO tags (tag_name, tag_category, description)
        VALUES (?, ?, ?)
    ''', predefined_tags)
    print(f"✓ Inserted {len(predefined_tags)} predefined tags")
    
    # Insert question definitions
    question_definitions = [
        (1, 'Other than those you love and your own health or well-being, what is the most important ingredient in your life? Be precise.', 'Core Values', 'text', None),
        (2, 'What characteristic do you admire most in others that you would like to have yourself?', 'Core Values', 'text', None),
        (3, 'If you could change any three things in your behaviour, what would they be?', 'Self-Awareness', 'list', '3 items'),
        (4, 'What influences in your life do you feel are out of your control?', 'Self-Awareness', 'list', '3 items'),
        (5, 'What influences in your life do you feel are under your control?', 'Self-Awareness', 'list', '3 items'),
        (6, 'What do you believe to be the three most driving and controlling influences that determine the continuation of the universe?', 'Worldview', 'list', '3 items'),
        (7, 'Name three limiting factors in your life.', 'Self-Awareness', 'list', '3 items'),
        (8, 'Rate in order of importance – body, mind and spirit.', 'Core Values', 'text', 'Ranking'),
        (9, 'Do you believe that you have a bad, good or excellent opportunity to develop a meaningful contribution to the world?', 'Purpose & Legacy', 'multiple_choice', 'Bad/Good/Excellent'),
        (10, 'If you were to give someone else advice about being successful, what are the three most important things you would tell them?', 'Success Philosophy', 'list', '3 items'),
        (11, 'Name three things you would like your life to stand for?', 'Purpose & Legacy', 'list', '3 items'),
        (12, 'Name three things that you would not be prepared to do.', 'Purpose & Legacy', 'list', '3 items'),
        (13, 'How do you feel those who know you best would rate your future possibility?', 'Purpose & Legacy', 'multiple_choice', 'Outstanding/Average/Poor'),
        (14, 'Is money or material wealth important to you?', 'Resource Perspective', 'multiple_choice', 'Yes/No/Take it or leave it'),
        (15, 'Give six measurable ways in which you could get things done to change the world without your or anyone else\' money.', 'Action & Impact', 'list', '6 items'),
        (16, 'Give six measurable ways in which you can get things done to change the world with money.', 'Action & Impact', 'list', '6 items'),
        (17, 'Do you feel any obligation to do any of the points listed in 15 and 16? Please name them', 'Action & Impact', 'list', 'Variable items'),
        (18, 'Of the schemes and dreams you have had, how would you rate their success possibilities (not how they turned out, but how they could have been)?', 'Success Philosophy', 'multiple_choice', 'Good/Fair/Bad'),
        (19, 'Do you have any limitations or preferences in respect to your acceptance of people of another culture, race, religion or behaviour patterns (give reasons)?', 'Worldview', 'text', 'Yes/No + reasons'),
        (20, 'List six absolutes that govern your thoughts and actions.', 'Absolutes & Beliefs', 'list', '6 items'),
        (21, 'How do you justify your absolutes?', 'Absolutes & Beliefs', 'list', '6 justifications'),
        (22, 'If you believe in a God or a Superior Being, answer the following: Why, Advantages, Disadvantages, Evidence of existence', 'Worldview', 'structured', 'Multi-part'),
        (23, 'If you don\'t believe in a God or Superior Being, answer the following: Why, Advantages, Disadvantages, Evidence of existence', 'Worldview', 'structured', 'Multi-part'),
        (24, 'How do you rate the times that you live in as far as your opportunity for success is concerned? Give three reasons. Are other people proving you right/wrong?', 'Success Philosophy', 'structured', 'Rating + reasons + validation'),
        (25, 'Do you think that most successful people became that way because of (tick the appropriate boxes): inherited wealth, uniquely gifted mind, unusual opportunities, special assistance, personal development, hard work, lucky break, strong principles, good plan, good idea, other factors', 'Success Philosophy', 'multiple_choice', 'Multiple selections'),
        (26, 'If you could choose three people to assist you in your life\'s adventure, whom would you choose and for what reasons?', 'Relationships', 'list', '3 people + reasons'),
        (27, 'If someone lets you down in a personal relationship, what responsibility do you have to meet your obligations?', 'Relationships', 'multiple_choice', 'None/Some/Total/Other + Why'),
        (28, 'In a business relationship, if the other party does not fulfill their agreement, what is your obligation?', 'Relationships', 'multiple_choice', 'None/Some/Total/Other + Why'),
        (29, 'Do you believe you have any obligation to assist those people who are truly disadvantaged?', 'Action & Impact', 'text', 'Yes/No + Why/How'),
        (30, 'What percentage would each of the factors below represent out of the total figure of 100, towards success for a person or project? Personal influence, The influence of others, Economic and social influences, Uncontrollable influences', 'Success Attribution', 'structured', 'Percentages totaling 100'),
    ]
    
    cursor.executemany('''
        INSERT OR IGNORE INTO question_definitions (question_number, question_text, question_category, response_type, notes)
        VALUES (?, ?, ?, ?, ?)
    ''', question_definitions)
    print(f"✓ Inserted {len(question_definitions)} question definitions")
    
    # Commit changes
    conn.commit()
    conn.close()
    
    print(f"\n✅ Database initialized successfully!")
    print(f"📁 Database location: {DB_PATH}")
    print(f"📊 Tables created: 9")
    print(f"🏷️  Predefined tags: {len(predefined_tags)}")
    print(f"❓ Question definitions: {len(question_definitions)}")

if __name__ == '__main__':
    init_database()
