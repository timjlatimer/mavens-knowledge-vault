import os
from playwright.sync_api import sync_playwright

def generate_web_dashboard(data, filename="web_core_dashboard.png"):
    """
    Generates a High-Fidelity Dashboard using HTML/CSS and Playwright.
    """
    
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Roboto:wght@300;400;700&display=swap');
            
            body {{
                background-color: #050810;
                color: #fff;
                font-family: 'Roboto', sans-serif;
                margin: 0;
                padding: 20px;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                width: 100vw;
                overflow: hidden;
            }}
            
            .container {{
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 20px;
                width: 2400px;
                height: 1350px;
            }}
            
            .page {{
                background: #0B1021;
                border: 2px solid #333;
                border-radius: 15px;
                padding: 20px;
                position: relative;
                display: grid;
                grid-template-rows: 50px 1fr 1fr 1fr;
                gap: 15px;
            }}
            
            h1 {{
                font-family: 'Orbitron', sans-serif;
                color: #FFD700;
                text-align: center;
                margin: 0;
                font-size: 24px;
                text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
            }}
            
            .module-grid {{
                display: grid;
                grid-template-columns: repeat(5, 1fr);
                gap: 15px;
                height: 100%;
            }}
            
            .box {{
                background: rgba(19, 27, 44, 0.8);
                border: 2px solid #444;
                border-radius: 10px;
                padding: 15px;
                position: relative;
                box-shadow: 0 0 15px rgba(0,0,0,0.5);
                display: flex;
                flex-direction: column;
            }}
            
            .box-header {{
                font-family: 'Orbitron', sans-serif;
                font-size: 14px;
                font-weight: bold;
                margin-bottom: 10px;
                text-transform: uppercase;
                text-align: center;
                padding-bottom: 5px;
                border-bottom: 1px solid rgba(255,255,255,0.1);
            }}
            
            .box-content {{
                font-size: 12px;
                line-height: 1.4;
                color: #ccc;
                flex-grow: 1;
            }}
            
            /* Status Orbs */
            .orb {{
                width: 15px;
                height: 15px;
                border-radius: 50%;
                position: absolute;
                top: -7px;
                right: -7px;
                box-shadow: 0 0 10px currentColor;
                border: 2px solid #fff;
            }}
            
            /* Colors */
            .red {{ border-color: #FF4444; box-shadow: 0 0 10px rgba(255, 68, 68, 0.3); }}
            .red .box-header {{ color: #FF4444; }}
            .red .orb {{ background-color: #FF0000; color: #FF0000; }}
            
            .blue {{ border-color: #4488FF; box-shadow: 0 0 10px rgba(68, 136, 255, 0.3); }}
            .blue .box-header {{ color: #4488FF; }}
            .blue .orb {{ background-color: #0088FF; color: #0088FF; }}
            
            .green {{ border-color: #00FF44; box-shadow: 0 0 10px rgba(0, 255, 68, 0.3); }}
            .green .box-header {{ color: #00FF44; }}
            .green .orb {{ background-color: #00FF00; color: #00FF00; }}
            
            .yellow {{ border-color: #FFD700; box-shadow: 0 0 10px rgba(255, 215, 0, 0.3); }}
            .yellow .box-header {{ color: #FFD700; }}
            .yellow .orb {{ background-color: #FFD700; color: #FFD700; }}
            
            .purple {{ border-color: #9933FF; box-shadow: 0 0 10px rgba(153, 51, 255, 0.3); }}
            .purple .box-header {{ color: #9933FF; }}
            .purple .orb {{ background-color: #9900FF; color: #9900FF; }}
            
            .orange {{ border-color: #FF8800; box-shadow: 0 0 10px rgba(255, 136, 0, 0.3); }}
            .orange .box-header {{ color: #FF8800; }}
            .orange .orb {{ background-color: #FF8800; color: #FF8800; }}

            /* Specific Layouts */
            .col-span-2 {{ grid-column: span 2; }}
            .col-span-3 {{ grid-column: span 3; }}
            .col-span-5 {{ grid-column: span 5; }}
            
            .row-span-2 {{ grid-row: span 2; }}
            
        </style>
    </head>
    <body>
        <div class="container">
            <!-- PAGE 1 -->
            <div class="page">
                <h1>APPLICATION GENIE - LEAN IMPACT CANVAS</h1>
                
                <!-- Top Row -->
                <div class="module-grid" style="grid-template-rows: 1fr;">
                    <div class="box red">
                        <div class="orb"></div>
                        <div class="box-header">1. PROBLEM</div>
                        <div class="box-content">{data.get("1. Problem", "")}</div>
                    </div>
                    <div class="box blue">
                        <div class="orb"></div>
                        <div class="box-header">4. SOLUTION</div>
                        <div class="box-content">{data.get("4. Solution", "")}</div>
                    </div>
                    <div class="box green">
                        <div class="orb"></div>
                        <div class="box-header">3. VALUE PROP</div>
                        <div class="box-content">{data.get("3. Value Prop", "")}</div>
                    </div>
                    <div class="box purple">
                        <div class="orb"></div>
                        <div class="box-header">5. UNFAIR ADVANTAGE</div>
                        <div class="box-content">{data.get("5. Unfair Adv", "")}</div>
                    </div>
                    <div class="box orange">
                        <div class="orb"></div>
                        <div class="box-header">2. SEGMENTS</div>
                        <div class="box-content">{data.get("2. Segments", "")}</div>
                    </div>
                </div>
                
                <!-- Middle Row -->
                <div class="module-grid">
                    <div class="box blue col-span-2">
                        <div class="orb"></div>
                        <div class="box-header">8. KEY METRICS</div>
                        <div class="box-content">{data.get("8. Key Metrics", "")}</div>
                    </div>
                    <div class="box purple col-span-2">
                        <div class="orb"></div>
                        <div class="box-header">9. CHANNELS</div>
                        <div class="box-content">{data.get("9. Channels", "")}</div>
                    </div>
                    <div class="box green">
                        <div class="orb"></div>
                        <div class="box-header">IMPACT SCORE</div>
                        <div class="box-content">High Impact</div>
                    </div>
                </div>
                
                <!-- Bottom Row -->
                <div class="module-grid">
                    <div class="box yellow col-span-2">
                        <div class="orb"></div>
                        <div class="box-header">7. COST STRUCTURE</div>
                        <div class="box-content">{data.get("7. Cost Structure", "")}</div>
                    </div>
                    <div class="box red col-span-3">
                        <div class="orb"></div>
                        <div class="box-header">6. REVENUE STREAMS</div>
                        <div class="box-content">{data.get("6. Revenue", "")}</div>
                    </div>
                </div>
            </div>
            
            <!-- PAGE 2 -->
            <div class="page">
                <h1>STRATEGY & EXECUTION PLAN (SOLVE)</h1>
                
                <!-- Top Row -->
                <div class="module-grid">
                    <div class="box blue col-span-2">
                        <div class="orb"></div>
                        <div class="box-header">PURPOSE (BLUE SEAL)</div>
                        <div class="box-content">{data.get("Purpose (Blue Seal)", "")}</div>
                    </div>
                    <div class="box green col-span-2">
                        <div class="orb"></div>
                        <div class="box-header">CORE VALUES (PROMISE)</div>
                        <div class="box-content">{data.get("Core Values (Promise)", "")}</div>
                    </div>
                    <div class="box yellow">
                        <div class="orb"></div>
                        <div class="box-header">BHAG (DONE SEAL)</div>
                        <div class="box-content">{data.get("BHAG (Done Seal)", "")}</div>
                    </div>
                </div>
                
                <!-- Middle Row -->
                <div class="module-grid">
                    <div class="box purple col-span-3">
                        <div class="orb"></div>
                        <div class="box-header">QUARTERLY PRIORITIES</div>
                        <div class="box-content">{data.get("Quarterly Priorities", "")}</div>
                    </div>
                    <div class="box orange col-span-2">
                        <div class="orb"></div>
                        <div class="box-header">KEY METRICS (KPIs)</div>
                        <div class="box-content">{data.get("Key Metrics (KPIs)", "")}</div>
                    </div>
                </div>
                
                <!-- Bottom Row -->
                <div class="module-grid">
                    <div class="box yellow col-span-5">
                        <div class="orb"></div>
                        <div class="box-header">STRATEGIC MOVES (3Y / 1Y)</div>
                        <div class="box-content">{data.get("Strategic Moves", "")}</div>
                    </div>
                </div>
            </div>
        </div>
    </body>
    </html>
    """
    
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={'width': 2400, 'height': 1350})
        page.set_content(html_content)
        page.screenshot(path=filename)
        browser.close()
        print(f"Web Dashboard generated: {filename}")

# --- TEST DATA ---
data = {
    "1. Problem": "High dropout rates (73%) in applications due to cognitive overload and anxiety.",
    "2. Segments": "1. Loan Applicants (50M) 2. Universities (2M) 3. Commercial Lending.",
    "3. Value Prop": "Making high-stress applications feel less alone. Reduce anxiety by 45%.",
    "4. Solution": "Conversational AI Coach + Real-time guidance system.",
    "5. Unfair Adv": "1000+ Cultural AI Models. Proprietary data moat.",
    "6. Revenue": "B2B Licensing ($5-15/app). B2C Subscription ($4.99/mo).",
    "7. Cost Structure": "AI Dev (35%), Infrastructure (25%), Ops (20%).",
    "8. Key Metrics": "Completion Rate (85%), Time Saved (3.2 hrs).",
    "9. Channels": "Direct Sales, API Partnerships.",
    "10. Impact": "Democratize access to capital. Eradicate cognitive tax.",
    "Purpose (Blue Seal)": "To ensure everyone can make better decisions and matter.",
    "BHAG (Done Seal)": "10M People with an AI Friend by 2036.",
    "Core Values (Promise)": "Friendship First. No Friction. Cultural Respect.",
    "Quarterly Priorities": "Q1: Build MVP. Q2: Pilot with 500 users.",
    "Key Metrics (KPIs)": "Active Friendships (30K). User Satisfaction (4.5/5).",
    "Strategic Moves": "2026: Build Product. 2027: Scale to 100 Partners."
}

generate_web_dashboard(data)
