#!/usr/bin/env python3
"""
Add Respondent Script
Interactive script to add a new respondent and their responses to the North Star database.
"""

import sqlite3
import os
import json
from datetime import datetime

DB_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'data', 'north_star.db')

class RespondentEntry:
    def __init__(self):
        self.conn = sqlite3.connect(DB_PATH)
        self.cursor = self.conn.cursor()
        self.respondent_id = None
        
    def add_respondent_info(self, full_name, email=None, job_title=None, organization=None, notes=None):
        """Add basic respondent information."""
        self.cursor.execute('''
            INSERT INTO respondents (full_name, email, job_title, organization, date_submitted, notes)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', (full_name, email, job_title, organization, datetime.now(), notes))
        
        self.respondent_id = self.cursor.lastrowid
        self.conn.commit()
        print(f"✓ Added respondent: {full_name} (ID: {self.respondent_id})")
        return self.respondent_id
    
    def add_text_response(self, question_number, response_text, question_category=None):
        """Add a simple text response."""
        self.cursor.execute('''
            INSERT INTO responses (respondent_id, question_number, question_category, response_text, response_type)
            VALUES (?, ?, ?, ?, ?)
        ''', (self.respondent_id, question_number, question_category, response_text, 'text'))
        
        response_id = self.cursor.lastrowid
        self.conn.commit()
        return response_id
    
    def add_list_response(self, question_number, items, question_category=None):
        """Add a list response (e.g., three things, six ways)."""
        # Create main response
        self.cursor.execute('''
            INSERT INTO responses (respondent_id, question_number, question_category, response_type)
            VALUES (?, ?, ?, ?)
        ''', (self.respondent_id, question_number, question_category, 'list'))
        
        response_id = self.cursor.lastrowid
        
        # Add each list item
        for idx, item in enumerate(items, 1):
            if isinstance(item, dict):
                item_text = item.get('text', '')
                item_reason = item.get('reason', None)
            else:
                item_text = str(item)
                item_reason = None
            
            self.cursor.execute('''
                INSERT INTO list_responses (response_id, item_number, item_text, item_reason)
                VALUES (?, ?, ?, ?)
            ''', (response_id, idx, item_text, item_reason))
        
        self.conn.commit()
        return response_id
    
    def add_multiple_choice_response(self, question_number, selected_options, question_category=None):
        """Add a multiple choice response."""
        # Create main response
        self.cursor.execute('''
            INSERT INTO responses (respondent_id, question_number, question_category, response_type)
            VALUES (?, ?, ?, ?)
        ''', (self.respondent_id, question_number, question_category, 'multiple_choice'))
        
        response_id = self.cursor.lastrowid
        
        # Add selected options
        if isinstance(selected_options, str):
            selected_options = [selected_options]
        
        for option in selected_options:
            self.cursor.execute('''
                INSERT INTO multiple_choice_responses (response_id, option_selected, is_selected)
                VALUES (?, ?, ?)
            ''', (response_id, option, True))
        
        self.conn.commit()
        return response_id
    
    def add_belief_response(self, believes_in_god, why_text, advantages_text, disadvantages_text, evidence_text):
        """Add belief system response (Questions 22-23)."""
        self.cursor.execute('''
            INSERT INTO belief_system_responses 
            (respondent_id, believes_in_god, why_text, advantages_text, disadvantages_text, evidence_text)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', (self.respondent_id, believes_in_god, why_text, advantages_text, disadvantages_text, evidence_text))
        
        self.conn.commit()
        return self.cursor.lastrowid
    
    def add_success_factors(self, personal_pct, others_pct, economic_pct, uncontrollable_pct):
        """Add success factor percentages (Question 30)."""
        # Validate percentages add up to 100
        total = personal_pct + others_pct + economic_pct + uncontrollable_pct
        if total != 100:
            print(f"⚠️  Warning: Percentages add up to {total}%, not 100%")
        
        self.cursor.execute('''
            INSERT INTO success_factors 
            (respondent_id, personal_influence_pct, others_influence_pct, economic_social_pct, uncontrollable_pct)
            VALUES (?, ?, ?, ?, ?)
        ''', (self.respondent_id, personal_pct, others_pct, economic_pct, uncontrollable_pct))
        
        self.conn.commit()
        return self.cursor.lastrowid
    
    def add_tags_to_response(self, response_id, tag_names, confidence='high'):
        """Add tags to a response."""
        for tag_name in tag_names:
            # Get tag_id
            self.cursor.execute('SELECT tag_id FROM tags WHERE tag_name = ?', (tag_name,))
            result = self.cursor.fetchone()
            
            if result:
                tag_id = result[0]
                self.cursor.execute('''
                    INSERT INTO response_tags (response_id, tag_id, confidence)
                    VALUES (?, ?, ?)
                ''', (response_id, tag_id, confidence))
            else:
                print(f"⚠️  Tag '{tag_name}' not found in database")
        
        self.conn.commit()
    
    def get_available_tags(self, category=None):
        """Get list of available tags."""
        if category:
            self.cursor.execute('SELECT tag_name, description FROM tags WHERE tag_category = ? ORDER BY tag_name', (category,))
        else:
            self.cursor.execute('SELECT tag_name, tag_category, description FROM tags ORDER BY tag_category, tag_name')
        
        return self.cursor.fetchall()
    
    def close(self):
        """Close database connection."""
        self.conn.close()

def load_from_json(json_file_path):
    """Load respondent data from JSON file."""
    with open(json_file_path, 'r') as f:
        data = json.load(f)
    
    entry = RespondentEntry()
    
    # Add respondent info
    respondent_id = entry.add_respondent_info(
        full_name=data['respondent']['full_name'],
        email=data['respondent'].get('email'),
        job_title=data['respondent'].get('job_title'),
        organization=data['respondent'].get('organization'),
        notes=data['respondent'].get('notes')
    )
    
    # Add responses
    for response in data.get('responses', []):
        q_num = response['question_number']
        q_cat = response.get('question_category')
        r_type = response['response_type']
        
        if r_type == 'text':
            response_id = entry.add_text_response(q_num, response['text'], q_cat)
        elif r_type == 'list':
            response_id = entry.add_list_response(q_num, response['items'], q_cat)
        elif r_type == 'multiple_choice':
            response_id = entry.add_multiple_choice_response(q_num, response['selected'], q_cat)
        
        # Add tags if provided
        if 'tags' in response:
            entry.add_tags_to_response(response_id, response['tags'], response.get('confidence', 'high'))
    
    # Add belief response if provided
    if 'belief_response' in data:
        belief = data['belief_response']
        entry.add_belief_response(
            believes_in_god=belief['believes_in_god'],
            why_text=belief['why'],
            advantages_text=belief['advantages'],
            disadvantages_text=belief['disadvantages'],
            evidence_text=belief['evidence']
        )
    
    # Add success factors if provided
    if 'success_factors' in data:
        sf = data['success_factors']
        entry.add_success_factors(
            personal_pct=sf['personal_influence_pct'],
            others_pct=sf['others_influence_pct'],
            economic_pct=sf['economic_social_pct'],
            uncontrollable_pct=sf['uncontrollable_pct']
        )
    
    entry.close()
    print(f"\n✅ Successfully loaded data for respondent ID {respondent_id}")
    return respondent_id

if __name__ == '__main__':
    import sys
    
    if len(sys.argv) > 1:
        # Load from JSON file
        json_file = sys.argv[1]
        if os.path.exists(json_file):
            load_from_json(json_file)
        else:
            print(f"❌ File not found: {json_file}")
    else:
        print("Usage: python3 add_respondent.py <json_file>")
        print("\nOr import this module and use the RespondentEntry class programmatically.")
