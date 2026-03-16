# North Star Database Schema Design

## Overview
This database design captures responses to the Destiny Discovered questionnaire (30 questions) to build a comprehensive North Star insights database. The schema is designed for both individual response storage and aggregate analysis.

## Database Tables

### 1. Respondents Table
Stores basic information about each person completing the questionnaire.

| Field | Type | Description |
|-------|------|-------------|
| respondent_id | INTEGER PRIMARY KEY | Auto-incrementing unique identifier |
| full_name | TEXT | Full name of respondent |
| email | TEXT | Email address (optional) |
| job_title | TEXT | Current job title/role |
| organization | TEXT | Organization/company name |
| date_submitted | TIMESTAMP | Date questionnaire was submitted |
| date_created | TIMESTAMP | Record creation timestamp |
| notes | TEXT | Additional notes or context |

### 2. Responses Table
Main table storing all questionnaire responses. Uses flexible structure to accommodate different question types.

| Field | Type | Description |
|-------|------|-------------|
| response_id | INTEGER PRIMARY KEY | Auto-incrementing unique identifier |
| respondent_id | INTEGER FOREIGN KEY | Links to Respondents table |
| question_number | INTEGER | Question number (1-30) |
| question_category | TEXT | Category/theme of question |
| response_text | TEXT | Primary text response |
| response_type | TEXT | Type: text, multiple_choice, rating, list |
| date_answered | TIMESTAMP | When this question was answered |

### 3. List_Responses Table
Stores multi-item list responses (e.g., "three things", "six ways").

| Field | Type | Description |
|-------|------|-------------|
| list_response_id | INTEGER PRIMARY KEY | Auto-incrementing unique identifier |
| response_id | INTEGER FOREIGN KEY | Links to Responses table |
| item_number | INTEGER | Position in list (1, 2, 3, etc.) |
| item_text | TEXT | The actual list item content |
| item_reason | TEXT | Optional reason/justification for item |

### 4. Multiple_Choice_Responses Table
Stores selections from multiple choice questions.

| Field | Type | Description |
|-------|------|-------------|
| mc_response_id | INTEGER PRIMARY KEY | Auto-incrementing unique identifier |
| response_id | INTEGER FOREIGN KEY | Links to Responses table |
| option_selected | TEXT | The option that was selected |
| is_selected | BOOLEAN | Whether this option was chosen |

### 5. Belief_System_Responses Table
Specialized table for questions 22-23 (belief in God/Superior Being).

| Field | Type | Description |
|-------|------|-------------|
| belief_response_id | INTEGER PRIMARY KEY | Auto-incrementing unique identifier |
| respondent_id | INTEGER FOREIGN KEY | Links to Respondents table |
| believes_in_god | BOOLEAN | True if believes, False if doesn't |
| why_text | TEXT | Explanation of belief/non-belief |
| advantages_text | TEXT | Perceived advantages |
| disadvantages_text | TEXT | Perceived disadvantages |
| evidence_text | TEXT | Evidence cited for position |

### 6. Success_Factors Table
Stores question 30 percentage breakdown.

| Field | Type | Description |
|-------|------|-------------|
| success_factor_id | INTEGER PRIMARY KEY | Auto-incrementing unique identifier |
| respondent_id | INTEGER FOREIGN KEY | Links to Respondents table |
| personal_influence_pct | INTEGER | Percentage for personal influence |
| others_influence_pct | INTEGER | Percentage for influence of others |
| economic_social_pct | INTEGER | Percentage for economic/social influences |
| uncontrollable_pct | INTEGER | Percentage for uncontrollable influences |

### 7. Tags Table
Enables tagging of responses for thematic analysis.

| Field | Type | Description |
|-------|------|-------------|
| tag_id | INTEGER PRIMARY KEY | Auto-incrementing unique identifier |
| tag_name | TEXT | Name of the tag |
| tag_category | TEXT | Category of tag (values, beliefs, actions, etc.) |
| description | TEXT | Description of what this tag represents |

### 8. Response_Tags Table
Junction table linking responses to tags.

| Field | Type | Description |
|-------|------|-------------|
| response_tag_id | INTEGER PRIMARY KEY | Auto-incrementing unique identifier |
| response_id | INTEGER FOREIGN KEY | Links to Responses table |
| tag_id | INTEGER FOREIGN KEY | Links to Tags table |
| confidence | TEXT | How strongly this tag applies (high/medium/low) |

## Question Categories

The 30 questions are organized into thematic categories:

| Category | Questions | Theme |
|----------|-----------|-------|
| **Core Values** | 1, 2, 8 | Most important life ingredients, admired characteristics, body/mind/spirit priorities |
| **Self-Awareness** | 3, 4, 5, 7 | Behavioral changes, influences in/out of control, limiting factors |
| **Worldview** | 6, 19, 22, 23 | Universe influences, cultural acceptance, belief in God |
| **Purpose & Legacy** | 9, 11, 12, 13 | Opportunity for contribution, what life stands for, boundaries, future possibility |
| **Success Philosophy** | 10, 18, 24, 25 | Success advice, dream possibilities, opportunity rating, success factors |
| **Action & Impact** | 15, 16, 17, 29 | Ways to change world (with/without money), obligations to disadvantaged |
| **Absolutes & Beliefs** | 20, 21 | Core absolutes governing thoughts/actions and their justifications |
| **Relationships** | 26, 27, 28 | People to assist in life, obligations in personal/business relationships |
| **Resource Perspective** | 14 | Importance of money/material wealth |
| **Success Attribution** | 30 | Percentage breakdown of success factors |

## Predefined Tags for Analysis

### Values Tags
- Faith/Spirituality
- Integrity
- Empathy
- Compassion
- Gratitude
- Humility
- Courage
- Perseverance
- Family
- Service

### Action Orientation Tags
- High Action Orientation
- Moderate Action Orientation
- Low Action Orientation
- Money-Independent Action
- Resource-Dependent Action

### Worldview Tags
- Optimistic
- Realistic
- Pessimistic
- Faith-Based
- Secular
- Community-Oriented
- Individual-Focused

### Success Mindset Tags
- Internal Locus of Control
- External Locus of Control
- Growth Mindset
- Fixed Mindset
- Collaborative
- Independent

### Purpose Tags
- Clear Purpose
- Seeking Purpose
- Legacy-Focused
- Present-Focused
- Service-Oriented
- Achievement-Oriented

## Data Collection Workflow

1. **Initial Entry**: Create respondent record
2. **Question-by-Question**: Store each response with metadata
3. **List Items**: Break down multi-item responses into individual records
4. **Tagging**: Apply relevant tags (can be manual or AI-assisted)
5. **Analysis**: Query across respondents to identify patterns

## Key Analysis Queries

### Pattern Analysis
- Most common values across respondents
- Correlation between belief systems and action orientation
- Success factor attribution patterns
- Common limiting factors

### Segmentation
- Group by worldview (faith-based vs. secular)
- Group by action orientation (high/medium/low)
- Group by success attribution (internal vs. external)
- Group by purpose clarity

### North Star Identification
- Extract core absolutes (Question 20)
- Identify what life stands for (Question 11)
- Map values to actions (Questions 15-17)
- Connect beliefs to behaviors (Questions 20-21 vs. 3, 15-17)
