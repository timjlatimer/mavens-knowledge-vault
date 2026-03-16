#!/usr/bin/env python3
"""
Web-based Data Entry Form
Simple Flask web application for entering Destiny Discovered responses.
"""

from flask import Flask, render_template_string, request, redirect, url_for, jsonify
import sqlite3
import os
import json
from datetime import datetime

# Import the RespondentEntry class
import sys
sys.path.append(os.path.dirname(__file__))
from add_respondent import RespondentEntry

DB_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'data', 'north_star.db')

app = Flask(__name__)

# HTML Template
HTML_TEMPLATE = '''
<!DOCTYPE html>
<html>
<head>
    <title>North Star Database - Data Entry</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            max-width: 900px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            border-radius: 10px;
            margin-bottom: 30px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 2.5em;
        }
        .header p {
            margin: 10px 0 0 0;
            opacity: 0.9;
        }
        .section {
            background: white;
            padding: 25px;
            margin-bottom: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .section h2 {
            color: #667eea;
            margin-top: 0;
            border-bottom: 2px solid #667eea;
            padding-bottom: 10px;
        }
        .form-group {
            margin-bottom: 20px;
        }
        label {
            display: block;
            font-weight: bold;
            margin-bottom: 5px;
            color: #333;
        }
        .question-number {
            display: inline-block;
            background: #667eea;
            color: white;
            padding: 3px 10px;
            border-radius: 15px;
            font-size: 0.9em;
            margin-right: 10px;
        }
        input[type="text"],
        input[type="email"],
        textarea,
        select {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 1em;
            box-sizing: border-box;
        }
        textarea {
            min-height: 100px;
            resize: vertical;
        }
        .list-input {
            margin-bottom: 10px;
        }
        button {
            background: #667eea;
            color: white;
            padding: 12px 30px;
            border: none;
            border-radius: 5px;
            font-size: 1.1em;
            cursor: pointer;
            transition: background 0.3s;
        }
        button:hover {
            background: #5568d3;
        }
        .success-message {
            background: #4caf50;
            color: white;
            padding: 15px;
            border-radius: 5px;
            margin-bottom: 20px;
            text-align: center;
        }
        .note {
            background: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 10px;
            margin: 10px 0;
            font-size: 0.9em;
        }
        .radio-group {
            display: flex;
            gap: 20px;
            margin-top: 10px;
        }
        .radio-group label {
            display: inline;
            font-weight: normal;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>⭐ North Star Database</h1>
        <p>Destiny Discovered Response Collection System</p>
    </div>

    {% if success %}
    <div class="success-message">
        ✓ Response successfully submitted! Respondent ID: {{ respondent_id }}
    </div>
    {% endif %}

    <form method="POST" action="/">
        <div class="section">
            <h2>Respondent Information</h2>
            <div class="form-group">
                <label>Full Name *</label>
                <input type="text" name="full_name" required>
            </div>
            <div class="form-group">
                <label>Email</label>
                <input type="email" name="email">
            </div>
            <div class="form-group">
                <label>Job Title</label>
                <input type="text" name="job_title">
            </div>
            <div class="form-group">
                <label>Organization</label>
                <input type="text" name="organization">
            </div>
            <div class="form-group">
                <label>Notes</label>
                <textarea name="notes"></textarea>
            </div>
        </div>

        <div class="section">
            <h2>Core Values</h2>
            
            <div class="form-group">
                <label><span class="question-number">Q1</span>Other than those you love and your own health, what is the most important ingredient in your life?</label>
                <textarea name="q1" placeholder="Be precise..."></textarea>
            </div>

            <div class="form-group">
                <label><span class="question-number">Q2</span>What characteristic do you admire most in others that you would like to have yourself?</label>
                <textarea name="q2"></textarea>
            </div>

            <div class="form-group">
                <label><span class="question-number">Q8</span>Rate in order of importance: body, mind, spirit</label>
                <input type="text" name="q8" placeholder="e.g., Spirit - Mind - Body">
            </div>
        </div>

        <div class="section">
            <h2>Self-Awareness</h2>
            
            <div class="form-group">
                <label><span class="question-number">Q3</span>If you could change three things in your behaviour, what would they be?</label>
                <div class="note">Enter one item per line</div>
                <textarea name="q3" placeholder="1.&#10;2.&#10;3."></textarea>
            </div>

            <div class="form-group">
                <label><span class="question-number">Q4</span>What influences in your life do you feel are OUT of your control?</label>
                <textarea name="q4"></textarea>
            </div>

            <div class="form-group">
                <label><span class="question-number">Q5</span>What influences in your life do you feel are UNDER your control?</label>
                <textarea name="q5"></textarea>
            </div>

            <div class="form-group">
                <label><span class="question-number">Q7</span>Name three limiting factors in your life</label>
                <textarea name="q7" placeholder="1.&#10;2.&#10;3."></textarea>
            </div>
        </div>

        <div class="section">
            <h2>Purpose & Legacy</h2>
            
            <div class="form-group">
                <label><span class="question-number">Q9</span>Do you believe you have a bad, good, or excellent opportunity to develop a meaningful contribution to the world?</label>
                <div class="radio-group">
                    <label><input type="radio" name="q9" value="Bad"> Bad</label>
                    <label><input type="radio" name="q9" value="Good"> Good</label>
                    <label><input type="radio" name="q9" value="Excellent"> Excellent</label>
                </div>
            </div>

            <div class="form-group">
                <label><span class="question-number">Q11</span>Name three things you would like your life to stand for</label>
                <textarea name="q11" placeholder="1.&#10;2.&#10;3."></textarea>
            </div>

            <div class="form-group">
                <label><span class="question-number">Q12</span>Name three things you would NOT be prepared to do</label>
                <textarea name="q12" placeholder="1.&#10;2.&#10;3."></textarea>
            </div>
        </div>

        <div class="section">
            <h2>Worldview & Beliefs</h2>
            
            <div class="form-group">
                <label><span class="question-number">Q6</span>What are the three most driving and controlling influences that determine the continuation of the universe?</label>
                <textarea name="q6" placeholder="1.&#10;2.&#10;3."></textarea>
            </div>

            <div class="form-group">
                <label><span class="question-number">Q20</span>List six absolutes that govern your thoughts and actions</label>
                <textarea name="q20" placeholder="1.&#10;2.&#10;3.&#10;4.&#10;5.&#10;6."></textarea>
            </div>

            <div class="form-group">
                <label><span class="question-number">Q22/23</span>Do you believe in a God or Superior Being?</label>
                <div class="radio-group">
                    <label><input type="radio" name="believes_god" value="yes"> Yes</label>
                    <label><input type="radio" name="believes_god" value="no"> No</label>
                </div>
            </div>

            <div class="form-group">
                <label>Why?</label>
                <textarea name="belief_why"></textarea>
            </div>

            <div class="form-group">
                <label>Advantages</label>
                <textarea name="belief_advantages"></textarea>
            </div>

            <div class="form-group">
                <label>Evidence of existence (or non-existence)</label>
                <textarea name="belief_evidence"></textarea>
            </div>
        </div>

        <div class="section">
            <h2>Action & Impact</h2>
            
            <div class="form-group">
                <label><span class="question-number">Q15</span>Give six measurable ways you could change the world WITHOUT money</label>
                <textarea name="q15" placeholder="1.&#10;2.&#10;3.&#10;4.&#10;5.&#10;6."></textarea>
            </div>

            <div class="form-group">
                <label><span class="question-number">Q16</span>Give six measurable ways you could change the world WITH money</label>
                <textarea name="q16" placeholder="1.&#10;2.&#10;3.&#10;4.&#10;5.&#10;6."></textarea>
            </div>

            <div class="form-group">
                <label><span class="question-number">Q29</span>Do you believe you have any obligation to assist those who are truly disadvantaged?</label>
                <textarea name="q29" placeholder="Yes/No and explain why or how..."></textarea>
            </div>
        </div>

        <div class="section">
            <h2>Success Attribution</h2>
            
            <div class="form-group">
                <label><span class="question-number">Q30</span>What percentage would each factor represent toward success? (Must total 100%)</label>
                <div class="note">Enter percentages as numbers only</div>
                
                <label>Personal Influence (%)</label>
                <input type="number" name="sf_personal" min="0" max="100" placeholder="e.g., 40">
                
                <label>Influence of Others (%)</label>
                <input type="number" name="sf_others" min="0" max="100" placeholder="e.g., 20">
                
                <label>Economic/Social Influences (%)</label>
                <input type="number" name="sf_economic" min="0" max="100" placeholder="e.g., 30">
                
                <label>Uncontrollable Influences (%)</label>
                <input type="number" name="sf_uncontrollable" min="0" max="100" placeholder="e.g., 10">
            </div>
        </div>

        <div class="section">
            <button type="submit">Submit Response</button>
        </div>
    </form>
</body>
</html>
'''

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        # Create entry object
        entry = RespondentEntry()
        
        # Add respondent
        respondent_id = entry.add_respondent_info(
            full_name=request.form.get('full_name'),
            email=request.form.get('email'),
            job_title=request.form.get('job_title'),
            organization=request.form.get('organization'),
            notes=request.form.get('notes')
        )
        
        # Process text responses
        text_questions = {
            1: ('q1', 'Core Values'),
            2: ('q2', 'Core Values'),
            4: ('q4', 'Self-Awareness'),
            5: ('q5', 'Self-Awareness'),
            8: ('q8', 'Core Values'),
            29: ('q29', 'Action & Impact')
        }
        
        for q_num, (field_name, category) in text_questions.items():
            response_text = request.form.get(field_name, '').strip()
            if response_text:
                entry.add_text_response(q_num, response_text, category)
        
        # Process list responses
        list_questions = {
            3: ('q3', 'Self-Awareness'),
            6: ('q6', 'Worldview'),
            7: ('q7', 'Self-Awareness'),
            11: ('q11', 'Purpose & Legacy'),
            12: ('q12', 'Purpose & Legacy'),
            15: ('q15', 'Action & Impact'),
            16: ('q16', 'Action & Impact'),
            20: ('q20', 'Absolutes & Beliefs')
        }
        
        for q_num, (field_name, category) in list_questions.items():
            response_text = request.form.get(field_name, '').strip()
            if response_text:
                # Split by newlines and filter empty lines
                items = [line.strip() for line in response_text.split('\n') if line.strip()]
                if items:
                    entry.add_list_response(q_num, items, category)
        
        # Process multiple choice
        q9_response = request.form.get('q9')
        if q9_response:
            entry.add_multiple_choice_response(9, q9_response, 'Purpose & Legacy')
        
        # Process belief response
        believes_god = request.form.get('believes_god')
        if believes_god:
            entry.add_belief_response(
                believes_in_god=(believes_god == 'yes'),
                why_text=request.form.get('belief_why', ''),
                advantages_text=request.form.get('belief_advantages', ''),
                disadvantages_text='',
                evidence_text=request.form.get('belief_evidence', '')
            )
        
        # Process success factors
        try:
            sf_personal = int(request.form.get('sf_personal', 0) or 0)
            sf_others = int(request.form.get('sf_others', 0) or 0)
            sf_economic = int(request.form.get('sf_economic', 0) or 0)
            sf_uncontrollable = int(request.form.get('sf_uncontrollable', 0) or 0)
            
            if sf_personal + sf_others + sf_economic + sf_uncontrollable > 0:
                entry.add_success_factors(sf_personal, sf_others, sf_economic, sf_uncontrollable)
        except ValueError:
            pass
        
        entry.close()
        
        return render_template_string(HTML_TEMPLATE, success=True, respondent_id=respondent_id)
    
    return render_template_string(HTML_TEMPLATE, success=False)

@app.route('/api/respondents')
def api_respondents():
    """API endpoint to get all respondents."""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM respondents ORDER BY date_submitted DESC')
    respondents = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return jsonify(respondents)

if __name__ == '__main__':
    print("Starting North Star Database Web Form...")
    print("Access the form at: http://localhost:5000")
    app.run(host='0.0.0.0', port=5000, debug=True)
