#!/usr/bin/env python3
"""
Query and Analysis Script
Provides various queries and analysis functions for the North Star database.
"""

import sqlite3
import os
from collections import Counter
from datetime import datetime

DB_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'data', 'north_star.db')

class NorthStarAnalyzer:
    def __init__(self):
        self.conn = sqlite3.connect(DB_PATH)
        self.conn.row_factory = sqlite3.Row  # Enable column access by name
        self.cursor = self.conn.cursor()
    
    def get_all_respondents(self):
        """Get list of all respondents."""
        self.cursor.execute('''
            SELECT respondent_id, full_name, job_title, organization, date_submitted
            FROM respondents
            ORDER BY date_submitted DESC
        ''')
        return self.cursor.fetchall()
    
    def get_respondent_profile(self, respondent_id):
        """Get complete profile for a respondent."""
        # Basic info
        self.cursor.execute('SELECT * FROM respondents WHERE respondent_id = ?', (respondent_id,))
        profile = dict(self.cursor.fetchone())
        
        # Get all responses
        self.cursor.execute('''
            SELECT r.*, 
                   GROUP_CONCAT(lr.item_text, ' | ') as list_items,
                   GROUP_CONCAT(t.tag_name, ', ') as tags
            FROM responses r
            LEFT JOIN list_responses lr ON r.response_id = lr.response_id
            LEFT JOIN response_tags rt ON r.response_id = rt.response_id
            LEFT JOIN tags t ON rt.tag_id = t.tag_id
            WHERE r.respondent_id = ?
            GROUP BY r.response_id
            ORDER BY r.question_number
        ''', (respondent_id,))
        profile['responses'] = [dict(row) for row in self.cursor.fetchall()]
        
        # Get belief response
        self.cursor.execute('SELECT * FROM belief_system_responses WHERE respondent_id = ?', (respondent_id,))
        belief = self.cursor.fetchone()
        if belief:
            profile['belief_response'] = dict(belief)
        
        # Get success factors
        self.cursor.execute('SELECT * FROM success_factors WHERE respondent_id = ?', (respondent_id,))
        sf = self.cursor.fetchone()
        if sf:
            profile['success_factors'] = dict(sf)
        
        return profile
    
    def get_tag_frequency(self, tag_category=None):
        """Get frequency of tags across all responses."""
        if tag_category:
            self.cursor.execute('''
                SELECT t.tag_name, t.tag_category, COUNT(rt.response_tag_id) as frequency
                FROM tags t
                LEFT JOIN response_tags rt ON t.tag_id = rt.tag_id
                WHERE t.tag_category = ?
                GROUP BY t.tag_id
                ORDER BY frequency DESC, t.tag_name
            ''', (tag_category,))
        else:
            self.cursor.execute('''
                SELECT t.tag_name, t.tag_category, COUNT(rt.response_tag_id) as frequency
                FROM tags t
                LEFT JOIN response_tags rt ON t.tag_id = rt.tag_id
                GROUP BY t.tag_id
                ORDER BY frequency DESC, t.tag_name
            ''')
        
        return self.cursor.fetchall()
    
    def get_responses_by_question(self, question_number):
        """Get all responses to a specific question."""
        self.cursor.execute('''
            SELECT r.respondent_id, res.full_name, r.response_text,
                   GROUP_CONCAT(lr.item_text, ' | ') as list_items,
                   GROUP_CONCAT(t.tag_name, ', ') as tags
            FROM responses r
            JOIN respondents res ON r.respondent_id = res.respondent_id
            LEFT JOIN list_responses lr ON r.response_id = lr.response_id
            LEFT JOIN response_tags rt ON r.response_id = rt.response_id
            LEFT JOIN tags t ON rt.tag_id = t.tag_id
            WHERE r.question_number = ?
            GROUP BY r.response_id
        ''', (question_number,))
        
        return self.cursor.fetchall()
    
    def get_common_values(self):
        """Analyze most common values across respondents (from question 20)."""
        self.cursor.execute('''
            SELECT lr.item_text, COUNT(*) as frequency
            FROM list_responses lr
            JOIN responses r ON lr.response_id = r.response_id
            WHERE r.question_number = 20
            GROUP BY LOWER(lr.item_text)
            ORDER BY frequency DESC
            LIMIT 20
        ''')
        
        return self.cursor.fetchall()
    
    def get_success_factor_averages(self):
        """Get average success factor percentages across all respondents."""
        self.cursor.execute('''
            SELECT 
                AVG(personal_influence_pct) as avg_personal,
                AVG(others_influence_pct) as avg_others,
                AVG(economic_social_pct) as avg_economic,
                AVG(uncontrollable_pct) as avg_uncontrollable,
                COUNT(*) as respondent_count
            FROM success_factors
        ''')
        
        return dict(self.cursor.fetchone())
    
    def get_belief_distribution(self):
        """Get distribution of belief in God/Superior Being."""
        self.cursor.execute('''
            SELECT 
                believes_in_god,
                COUNT(*) as count
            FROM belief_system_responses
            GROUP BY believes_in_god
        ''')
        
        return self.cursor.fetchall()
    
    def search_responses(self, search_term):
        """Search for a term across all text responses."""
        search_pattern = f'%{search_term}%'
        
        self.cursor.execute('''
            SELECT r.respondent_id, res.full_name, r.question_number, r.response_text
            FROM responses r
            JOIN respondents res ON r.respondent_id = res.respondent_id
            WHERE r.response_text LIKE ?
            
            UNION
            
            SELECT lr.response_id, res.full_name, r.question_number, lr.item_text
            FROM list_responses lr
            JOIN responses r ON lr.response_id = r.response_id
            JOIN respondents res ON r.respondent_id = res.respondent_id
            WHERE lr.item_text LIKE ?
            
            ORDER BY respondent_id, question_number
        ''', (search_pattern, search_pattern))
        
        return self.cursor.fetchall()
    
    def get_respondents_by_tag(self, tag_name):
        """Get all respondents who have responses with a specific tag."""
        self.cursor.execute('''
            SELECT DISTINCT res.respondent_id, res.full_name, res.job_title, res.organization
            FROM respondents res
            JOIN responses r ON res.respondent_id = r.respondent_id
            JOIN response_tags rt ON r.response_id = rt.response_id
            JOIN tags t ON rt.tag_id = t.tag_id
            WHERE t.tag_name = ?
        ''', (tag_name,))
        
        return self.cursor.fetchall()
    
    def export_to_csv(self, query, filename):
        """Export query results to CSV file."""
        import csv
        
        self.cursor.execute(query)
        rows = self.cursor.fetchall()
        
        if rows:
            export_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'exports', filename)
            os.makedirs(os.path.dirname(export_path), exist_ok=True)
            
            with open(export_path, 'w', newline='', encoding='utf-8') as f:
                writer = csv.writer(f)
                # Write header
                writer.writerow([description[0] for description in self.cursor.description])
                # Write data
                writer.writerows(rows)
            
            print(f"✓ Exported {len(rows)} rows to {export_path}")
            return export_path
        else:
            print("No data to export")
            return None
    
    def generate_summary_report(self):
        """Generate a summary report of the database."""
        report = []
        report.append("=" * 60)
        report.append("NORTH STAR DATABASE SUMMARY REPORT")
        report.append("=" * 60)
        report.append(f"Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        report.append("")
        
        # Respondent count
        self.cursor.execute('SELECT COUNT(*) FROM respondents')
        respondent_count = self.cursor.fetchone()[0]
        report.append(f"Total Respondents: {respondent_count}")
        
        # Response count
        self.cursor.execute('SELECT COUNT(*) FROM responses')
        response_count = self.cursor.fetchone()[0]
        report.append(f"Total Responses: {response_count}")
        
        # Tag usage
        self.cursor.execute('SELECT COUNT(*) FROM response_tags')
        tag_usage = self.cursor.fetchone()[0]
        report.append(f"Total Tags Applied: {tag_usage}")
        report.append("")
        
        # Most common tags
        report.append("TOP 10 MOST COMMON TAGS:")
        report.append("-" * 60)
        tag_freq = self.get_tag_frequency()
        for row in tag_freq[:10]:
            report.append(f"  {row['tag_name']} ({row['tag_category']}): {row['frequency']} uses")
        report.append("")
        
        # Success factor averages
        if respondent_count > 0:
            sf_avg = self.get_success_factor_averages()
            if sf_avg['respondent_count'] > 0:
                report.append("AVERAGE SUCCESS FACTOR ATTRIBUTION:")
                report.append("-" * 60)
                report.append(f"  Personal Influence: {sf_avg['avg_personal']:.1f}%")
                report.append(f"  Influence of Others: {sf_avg['avg_others']:.1f}%")
                report.append(f"  Economic/Social: {sf_avg['avg_economic']:.1f}%")
                report.append(f"  Uncontrollable: {sf_avg['avg_uncontrollable']:.1f}%")
                report.append("")
        
        # Belief distribution
        belief_dist = self.get_belief_distribution()
        if belief_dist:
            report.append("BELIEF IN GOD/SUPERIOR BEING:")
            report.append("-" * 60)
            for row in belief_dist:
                belief_label = "Yes" if row['believes_in_god'] else "No"
                report.append(f"  {belief_label}: {row['count']} respondents")
            report.append("")
        
        # Common values
        report.append("TOP 10 MOST COMMON ABSOLUTES (Question 20):")
        report.append("-" * 60)
        common_values = self.get_common_values()
        for row in common_values[:10]:
            report.append(f"  {row['item_text']}: {row['frequency']} mentions")
        
        report.append("")
        report.append("=" * 60)
        
        return "\n".join(report)
    
    def close(self):
        """Close database connection."""
        self.conn.close()

def main():
    """Main function for command-line usage."""
    import sys
    
    analyzer = NorthStarAnalyzer()
    
    if len(sys.argv) > 1:
        command = sys.argv[1]
        
        if command == 'list':
            print("\nAll Respondents:")
            print("-" * 60)
            for row in analyzer.get_all_respondents():
                print(f"{row['respondent_id']}: {row['full_name']} - {row['job_title']} ({row['organization']})")
        
        elif command == 'profile' and len(sys.argv) > 2:
            respondent_id = int(sys.argv[2])
            profile = analyzer.get_respondent_profile(respondent_id)
            print(f"\nProfile for {profile['full_name']}:")
            print("-" * 60)
            print(f"Job Title: {profile['job_title']}")
            print(f"Organization: {profile['organization']}")
            print(f"Date Submitted: {profile['date_submitted']}")
            print(f"\nTotal Responses: {len(profile['responses'])}")
        
        elif command == 'tags':
            print("\nTag Frequency:")
            print("-" * 60)
            for row in analyzer.get_tag_frequency():
                print(f"{row['tag_name']} ({row['tag_category']}): {row['frequency']}")
        
        elif command == 'report':
            print(analyzer.generate_summary_report())
        
        elif command == 'search' and len(sys.argv) > 2:
            search_term = sys.argv[2]
            print(f"\nSearch results for '{search_term}':")
            print("-" * 60)
            for row in analyzer.search_responses(search_term):
                print(f"Respondent {row[0]} ({row[1]}) - Q{row[2]}: {row[3][:100]}...")
        
        else:
            print(f"Unknown command: {command}")
    else:
        print("Usage:")
        print("  python3 query_database.py list              - List all respondents")
        print("  python3 query_database.py profile <id>      - Show respondent profile")
        print("  python3 query_database.py tags              - Show tag frequency")
        print("  python3 query_database.py report            - Generate summary report")
        print("  python3 query_database.py search <term>     - Search responses")
    
    analyzer.close()

if __name__ == '__main__':
    main()
