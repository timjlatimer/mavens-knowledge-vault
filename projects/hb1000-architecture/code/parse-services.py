#!/usr/bin/env python3
"""
Parse the full page markdown content from the Maven dashboard to extract all 143 services.
The markdown was already captured in the browser extraction - it's in the truncated content.
We need to use the page source directly.
"""

import re
import json

# The page content was captured but truncated at ~66K bytes. 
# The page has 105,499 pixels of content. We need a different approach.
# Let's use the page source via fetch/curl since it's a React app with data in localStorage or state.

import subprocess

# Fetch the page source
result = subprocess.run(['curl', '-s', 'https://maventier-mqsepzmg.manus.space/'], capture_output=True, text=True)
html = result.stdout

# Look for service data in the HTML/JS bundle
# React apps typically embed data in script tags or fetch from API

# First, let's check if there's inline data
if 'services' in html.lower():
    print(f"Found 'services' in HTML source ({len(html)} chars)")
    
# Look for JSON data patterns
json_patterns = re.findall(r'\{[^{}]*"name"[^{}]*\}', html)
print(f"Found {len(json_patterns)} JSON-like patterns with 'name'")

# Look for service names in script tags
script_content = re.findall(r'<script[^>]*>(.*?)</script>', html, re.DOTALL)
print(f"Found {len(script_content)} script tags")

for i, script in enumerate(script_content):
    if len(script) > 1000:
        # Save large scripts for analysis
        with open(f'/home/ubuntu/script_{i}.txt', 'w') as f:
            f.write(script[:50000])
        print(f"  Script {i}: {len(script)} chars (saved)")
    
# Also search for common service name patterns
service_names = re.findall(r'"([A-Z][^"]{5,80})"', html)
unique_names = list(set(service_names))
print(f"\nFound {len(unique_names)} unique quoted strings starting with uppercase")
for name in sorted(unique_names)[:30]:
    print(f"  - {name}")
