#!/usr/bin/env python3
"""
Use Playwright/CDP to extract all 143 service names from the Maven dashboard.
The page is a React app with data rendered in the DOM.
We'll use the Spreadsheet view which is the most compact.
"""
import subprocess
import json

# Use the browser's CDP to execute JavaScript and extract all service names
# The browser is already on the page. Let me use a different approach:
# Navigate to the Spreadsheet view and use browser_find_keyword or 
# use the Tally Report which should list all services compactly.

# Actually, the simplest approach: the markdown extraction already captured
# the full page content but it was truncated in display. The markdown 
# extraction extracts from the ENTIRE page, not just the viewport.
# The issue is that the content is 100K+ bytes and gets truncated at ~48K.

# Let me try the Tally Report view which should be the most compact.
# Or better yet, let me use the Backup Votes feature which should export
# all data as JSON.

print("Need to use browser to click Backup Votes or Tally Report for compact data")
print("Or use the Spreadsheet view which shows all services in a table format")
