#!/usr/bin/env python3
"""Use Playwright to extract all 143 service names from the Maven dashboard"""
import asyncio
from playwright.async_api import async_playwright
import json

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        
        print("Navigating to Maven dashboard...")
        await page.goto("https://maventier-mqsepzmg.manus.space/", wait_until="networkidle", timeout=60000)
        
        print("Page loaded. Waiting for content to render...")
        await page.wait_for_timeout(5000)
        
        # Try to get all service names from the page
        # First, let's check what's in localStorage
        local_storage = await page.evaluate("() => JSON.stringify(localStorage)")
        ls_data = json.loads(local_storage)
        print(f"\nlocalStorage keys: {list(ls_data.keys())}")
        
        for key, val in ls_data.items():
            if len(str(val)) > 50:
                print(f"\n  {key}: {str(val)[:200]}...")
            else:
                print(f"  {key}: {val}")
        
        # Check if service data is in localStorage
        for key, val in ls_data.items():
            if 'Grace' in str(val) or 'PTK' in str(val) or 'service' in key.lower():
                print(f"\n=== FOUND SERVICE DATA in localStorage key '{key}' ===")
                # Save the full value
                with open(f'/home/ubuntu/maven_localstorage_{key}.json', 'w') as f:
                    f.write(val)
                print(f"Saved to maven_localstorage_{key}.json ({len(val)} chars)")
        
        # Also try to extract from the DOM
        # The page renders service cards with names
        service_names = await page.evaluate("""
            () => {
                // Try to find service name elements
                const results = [];
                
                // Look for h2, h3, h4 elements that might be service names
                const headings = document.querySelectorAll('h2, h3, h4');
                headings.forEach(h => {
                    const text = h.textContent.trim();
                    if (text && text.length > 3 && text.length < 200) {
                        results.push({type: 'heading', tag: h.tagName, text: text});
                    }
                });
                
                return results;
            }
        """)
        
        print(f"\nFound {len(service_names)} headings in DOM:")
        for s in service_names[:20]:
            print(f"  [{s['tag']}] {s['text']}")
        if len(service_names) > 20:
            print(f"  ... and {len(service_names) - 20} more")
        
        # Save all results
        with open('/home/ubuntu/maven_dom_headings.json', 'w') as f:
            json.dump(service_names, f, indent=2)
        
        await browser.close()

asyncio.run(main())
