# North Star Database - Quick Start Guide

## Getting Started in 5 Minutes

### Step 1: Verify Database Setup

The database has already been initialized! Verify it's working:

```bash
cd /home/ubuntu/north_star_database
python3 scripts/query_database.py report
```

You should see a summary report showing 1 sample respondent (Jessie Moores).

### Step 2: Add Your First Respondent

#### Option A: Use the JSON Template

1. Copy the template:
   ```bash
   cp data/response_template.json data/my_respondent.json
   ```

2. Edit `data/my_respondent.json` with your respondent's information

3. Import it:
   ```bash
   python3 scripts/add_respondent.py data/my_respondent.json
   ```

#### Option B: Use the Web Form

1. Start the web server:
   ```bash
   python3 scripts/web_form.py
   ```

2. Open your browser to: http://localhost:5000

3. Fill out the form and submit

### Step 3: View Your Data

List all respondents:
```bash
python3 scripts/query_database.py list
```

View a specific respondent profile:
```bash
python3 scripts/query_database.py profile 1
```

Generate a summary report:
```bash
python3 scripts/query_database.py report
```

## Common Tasks

### Adding Multiple Respondents

Create multiple JSON files and import them:
```bash
python3 scripts/add_respondent.py data/person1.json
python3 scripts/add_respondent.py data/person2.json
python3 scripts/add_respondent.py data/person3.json
```

### Searching for Keywords

Search across all responses:
```bash
python3 scripts/query_database.py search "faith"
python3 scripts/query_database.py search "empathy"
python3 scripts/query_database.py search "family"
```

### Viewing Tag Statistics

See which tags are most commonly used:
```bash
python3 scripts/query_database.py tags
```

### Exporting Data

Use Python to export data to CSV:
```python
from scripts.query_database import NorthStarAnalyzer

analyzer = NorthStarAnalyzer()
analyzer.export_to_csv("SELECT * FROM respondents", "all_respondents.csv")
analyzer.close()
```

## File Locations

- **Database**: `/home/ubuntu/north_star_database/data/north_star.db`
- **Scripts**: `/home/ubuntu/north_star_database/scripts/`
- **Data Files**: `/home/ubuntu/north_star_database/data/`
- **Exports**: `/home/ubuntu/north_star_database/exports/`

## Available Tags

When tagging responses, use these predefined tags:

**Values**: Faith/Spirituality, Integrity, Empathy, Compassion, Gratitude, Humility, Courage, Perseverance, Family, Service

**Action**: High Action Orientation, Moderate Action Orientation, Low Action Orientation, Money-Independent Action, Resource-Dependent Action

**Worldview**: Optimistic, Realistic, Pessimistic, Faith-Based, Secular, Community-Oriented, Individual-Focused

**Success Mindset**: Internal Locus of Control, External Locus of Control, Growth Mindset, Fixed Mindset, Collaborative, Independent

**Purpose**: Clear Purpose, Seeking Purpose, Legacy-Focused, Present-Focused, Service-Oriented, Achievement-Oriented

## Need Help?

- Read the full documentation: `README.md`
- View the sample data: `data/jessie_moores_sample.json`
- Use the template: `data/response_template.json`

## Tips for Success

1. **Start Small**: Begin with 3-5 respondents to get familiar with the system
2. **Be Consistent**: Use the same format and tagging approach for all respondents
3. **Tag Thoughtfully**: Tags enable powerful analysis, so apply them carefully
4. **Review Regularly**: Generate reports frequently to spot patterns early
5. **Back Up Data**: Copy the `north_star.db` file regularly to prevent data loss

## Next Steps

Once you're comfortable with the basics:

1. Explore advanced queries in the README
2. Customize the web form for your specific needs
3. Create custom analysis scripts
4. Set up automated data collection workflows
5. Integrate with other systems via the API

---

**Questions?** Refer to the full README.md for detailed documentation.
