# North Star Database

A comprehensive database system for collecting and analyzing **Destiny Discovered** responses to build a North Star insights database.

## Overview

The North Star Database captures responses to the 30-question Destiny Discovered questionnaire, enabling deep analysis of personal philosophies, values, beliefs, and purpose across multiple respondents. The system is designed to identify patterns, common themes, and insights that reveal what drives people toward their sense of destiny.

## Features

- **Structured Data Collection**: Organized storage of all 30 Destiny Discovered questions
- **Flexible Response Types**: Supports text, list, multiple choice, and structured responses
- **Tagging System**: Predefined tags for thematic analysis (Values, Action Orientation, Worldview, Success Mindset, Purpose)
- **Query & Analysis Tools**: Python scripts for data analysis and pattern identification
- **Web-Based Entry Form**: User-friendly interface for collecting responses
- **JSON Import/Export**: Easy data migration and backup
- **Summary Reports**: Automated generation of insights and statistics

## Database Structure

### Core Tables

1. **respondents** - Basic information about each person
2. **responses** - Main response storage for all questions
3. **list_responses** - Multi-item list responses (e.g., "three things", "six ways")
4. **multiple_choice_responses** - Multiple choice selections
5. **belief_system_responses** - Specialized storage for belief-related questions
6. **success_factors** - Success attribution percentages (Question 30)
7. **tags** - Predefined tags for thematic analysis
8. **response_tags** - Links responses to tags
9. **question_definitions** - Reference table with all 30 questions

### Question Categories

- **Core Values** (Q1, 2, 8): Most important life ingredients, admired characteristics
- **Self-Awareness** (Q3, 4, 5, 7): Behavioral changes, influences, limiting factors
- **Worldview** (Q6, 19, 22, 23): Universe influences, cultural acceptance, belief in God
- **Purpose & Legacy** (Q9, 11, 12, 13): Contribution opportunity, life's purpose, boundaries
- **Success Philosophy** (Q10, 18, 24, 25): Success advice, opportunity rating, success factors
- **Action & Impact** (Q15, 16, 17, 29): Ways to change world, obligations
- **Absolutes & Beliefs** (Q20, 21): Core principles and justifications
- **Relationships** (Q26, 27, 28): Key people, obligations
- **Resource Perspective** (Q14): Importance of money
- **Success Attribution** (Q30): Percentage breakdown of success factors

## Installation & Setup

### Prerequisites

- Python 3.7+
- SQLite3 (included with Python)
- Flask (for web form): `pip install flask`

### Quick Start

1. **Initialize the database:**
   ```bash
   cd north_star_database
   python3 scripts/init_database.py
   ```

2. **View the sample data:**
   ```bash
   python3 scripts/query_database.py report
   ```

3. **Start the web form (optional):**
   ```bash
   python3 scripts/web_form.py
   ```
   Then open http://localhost:5000 in your browser

## Usage

### Adding Respondent Data

#### Method 1: JSON Import

Create a JSON file following this structure:

```json
{
  "respondent": {
    "full_name": "John Doe",
    "email": "john@example.com",
    "job_title": "Manager",
    "organization": "Company Inc"
  },
  "responses": [
    {
      "question_number": 1,
      "question_category": "Core Values",
      "response_type": "text",
      "text": "My family and their wellbeing",
      "tags": ["Family", "Clear Purpose"]
    }
  ],
  "belief_response": {
    "believes_in_god": true,
    "why": "Personal experience and faith",
    "advantages": "Peace, purpose, community",
    "disadvantages": "",
    "evidence": "Personal testimony"
  },
  "success_factors": {
    "personal_influence_pct": 50,
    "others_influence_pct": 20,
    "economic_social_pct": 20,
    "uncontrollable_pct": 10
  }
}
```

Import with:
```bash
python3 scripts/add_respondent.py path/to/data.json
```

#### Method 2: Web Form

Start the web server and fill out the form:
```bash
python3 scripts/web_form.py
```

#### Method 3: Programmatic Entry

```python
from scripts.add_respondent import RespondentEntry

entry = RespondentEntry()

# Add respondent
respondent_id = entry.add_respondent_info(
    full_name="Jane Smith",
    email="jane@example.com",
    job_title="Director",
    organization="Org Name"
)

# Add text response
entry.add_text_response(1, "My faith and values", "Core Values")

# Add list response
entry.add_list_response(3, [
    "Be more patient",
    "Listen more actively",
    "Take better care of my health"
], "Self-Awareness")

# Add tags
entry.add_tags_to_response(response_id, ["Growth Mindset", "Family"])

entry.close()
```

### Querying Data

#### Command Line Queries

```bash
# List all respondents
python3 scripts/query_database.py list

# View respondent profile
python3 scripts/query_database.py profile 1

# Show tag frequency
python3 scripts/query_database.py tags

# Generate summary report
python3 scripts/query_database.py report

# Search for term
python3 scripts/query_database.py search "faith"
```

#### Programmatic Queries

```python
from scripts.query_database import NorthStarAnalyzer

analyzer = NorthStarAnalyzer()

# Get all respondents
respondents = analyzer.get_all_respondents()

# Get respondent profile
profile = analyzer.get_respondent_profile(1)

# Get tag frequency
tags = analyzer.get_tag_frequency()

# Get common values
values = analyzer.get_common_values()

# Get success factor averages
averages = analyzer.get_success_factor_averages()

# Search responses
results = analyzer.search_responses("empathy")

# Get respondents by tag
people = analyzer.get_respondents_by_tag("Faith/Spirituality")

analyzer.close()
```

### Analysis & Reporting

#### Generate Summary Report

```bash
python3 scripts/query_database.py report
```

Output includes:
- Total respondents and responses
- Tag usage statistics
- Average success factor attribution
- Belief distribution
- Most common absolutes/values

#### Export to CSV

```python
from scripts.query_database import NorthStarAnalyzer

analyzer = NorthStarAnalyzer()

# Export custom query
query = "SELECT * FROM respondents"
analyzer.export_to_csv(query, "respondents_export.csv")

analyzer.close()
```

## Predefined Tags

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

## Key Analysis Queries

### Pattern Analysis

**Most Common Values:**
```sql
SELECT lr.item_text, COUNT(*) as frequency
FROM list_responses lr
JOIN responses r ON lr.response_id = r.response_id
WHERE r.question_number = 20
GROUP BY LOWER(lr.item_text)
ORDER BY frequency DESC;
```

**Success Factor Attribution Patterns:**
```sql
SELECT 
    AVG(personal_influence_pct) as avg_personal,
    AVG(others_influence_pct) as avg_others,
    AVG(economic_social_pct) as avg_economic,
    AVG(uncontrollable_pct) as avg_uncontrollable
FROM success_factors;
```

**Tag Co-occurrence:**
```sql
SELECT t1.tag_name, t2.tag_name, COUNT(*) as co_occurrence
FROM response_tags rt1
JOIN response_tags rt2 ON rt1.response_id = rt2.response_id AND rt1.tag_id < rt2.tag_id
JOIN tags t1 ON rt1.tag_id = t1.tag_id
JOIN tags t2 ON rt2.tag_id = t2.tag_id
GROUP BY t1.tag_id, t2.tag_id
ORDER BY co_occurrence DESC;
```

### Segmentation Analysis

**Group by Worldview:**
```sql
SELECT DISTINCT r.respondent_id, res.full_name
FROM responses r
JOIN respondents res ON r.respondent_id = res.respondent_id
JOIN response_tags rt ON r.response_id = rt.response_id
JOIN tags t ON rt.tag_id = t.tag_id
WHERE t.tag_category = 'Worldview' AND t.tag_name = 'Faith-Based';
```

**Group by Action Orientation:**
```sql
SELECT res.full_name, t.tag_name
FROM respondents res
JOIN responses r ON res.respondent_id = r.respondent_id
JOIN response_tags rt ON r.response_id = rt.response_id
JOIN tags t ON rt.tag_id = t.tag_id
WHERE t.tag_category = 'Action' AND r.question_number IN (15, 16, 17);
```

## Directory Structure

```
north_star_database/
├── README.md                          # This file
├── data/
│   ├── north_star.db                  # SQLite database
│   └── jessie_moores_sample.json      # Sample data file
├── scripts/
│   ├── init_database.py               # Database initialization
│   ├── add_respondent.py              # Data entry script
│   ├── query_database.py              # Query and analysis
│   └── web_form.py                    # Web-based data entry
├── exports/                           # CSV exports
└── docs/                              # Additional documentation
```

## Sample Data

The database includes one sample respondent (Jessie Moores) to demonstrate the data structure and analysis capabilities. This sample shows:

- Complete response to 23 of 30 questions
- 49 applied tags across multiple categories
- Belief system response (believes in God)
- Success factor attribution (40% personal, 20% others, 30% economic, 10% uncontrollable)

## Best Practices

### Data Entry
1. **Be Consistent**: Use consistent formatting for similar responses
2. **Tag Thoughtfully**: Apply tags that accurately reflect the response content
3. **Preserve Context**: Include notes about special circumstances or context
4. **Validate Data**: Check that percentages add to 100%, lists have correct item counts

### Analysis
1. **Start Broad**: Begin with summary reports to understand overall patterns
2. **Drill Down**: Use specific queries to explore interesting patterns
3. **Cross-Reference**: Look for correlations between different questions
4. **Track Changes**: Monitor how patterns evolve as more data is collected

### Privacy & Ethics
1. **Anonymization**: Consider anonymizing data for analysis
2. **Consent**: Ensure respondents consent to data collection and analysis
3. **Confidentiality**: Protect sensitive personal information
4. **Purpose Limitation**: Use data only for stated purposes

## Integration with SIC Solve Team

This database system is designed with empathy for your "Ruby Red" client in mind - the 35-45 year old CFO of the household navigating the three gangster worlds (political, bureaucratic, greedy capitalist). 

The insights gathered can help understand:
- **Core values** that drive decision-making under financial stress
- **Action orientation** when resources are limited
- **Success mindset** in challenging circumstances
- **Purpose and legacy** beyond immediate survival needs
- **Community orientation** and mutual support systems

By understanding the North Star values of people in similar circumstances, the SIC Solve Team can design solutions that resonate with their deepest motivations and beliefs.

## Future Enhancements

- **AI-Assisted Tagging**: Automatic tag suggestion based on response content
- **Visualization Dashboard**: Interactive charts and graphs for pattern analysis
- **Comparative Analysis**: Compare responses across demographic segments
- **Longitudinal Tracking**: Track how responses change over time
- **API Integration**: RESTful API for external system integration
- **Mobile App**: Native mobile data collection interface

## Support & Contribution

For questions, issues, or contributions to this database system, please contact the SIC Solve Team.

## License

This database system is proprietary to the SIC Solve Team. All rights reserved.

---

**Version**: 1.0  
**Last Updated**: January 26, 2026  
**Maintained by**: SIC Solve Team
