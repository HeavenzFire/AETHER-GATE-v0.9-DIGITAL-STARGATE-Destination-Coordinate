import matplotlib.pyplot as plt
import seaborn as sns
from fpdf import FPDF
import pandas as pd
import json
from datetime import datetime

# Set style
sns.set_style('whitegrid')
plt.rcParams['figure.figsize'] = (10, 6)

# Data from analysis
data = {
    'Category': ['Ad Resources', 'Resource Hints', 'Inline SVGs', 'Local Storage Items', 'Origin Trials'],
    'Count': [1, 3, 10, 4, 5],
    'Description': [
        'Google Ads domains',
        'preconnect/preload hints',
        'Icon SVG elements',
        'Browser storage items',
        'Experimental features'
    ]
}

df = pd.DataFrame(data)

# Create PDF
pdf = FPDF()
pdf.add_page()
pdf.set_font('Arial', 'B', 16)

# Title
pdf.cell(0, 10, 'Browser Page Data Dump Analysis Report', 0, 1, 'C')
pdf.ln(10)

# Summary text
pdf.set_font('Arial', '', 12)
summary = """
This report analyzes a comprehensive web page data dump containing advertising resources,
resource hints, inline SVGs, local storage items, and experimental features.

Key findings:
- Primary ad network: Google Ads
- 10 inline SVG icons detected
- 4 local storage items with user/bot data
- 5 origin trials for experimental web features
- Extensive tracking via Tampermonkey analytics
"""
pdf.multi_cell(0, 8, summary)
pdf.ln(5)

# Chart 1: Bar chart of counts
plt.figure(figsize=(10, 6))
bars = plt.bar(df['Category'], df['Count'], color=['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'])
plt.title('Element Counts by Category', fontsize=14, fontweight='bold')
plt.ylabel('Count', fontsize=12)
plt.xticks(rotation=45, ha='right')

# Add value labels on bars
for bar in bars:
    height = bar.get_height()
    plt.text(bar.get_x() + bar.get_width()/2., height + 0.1,
             f'{int(height)}', ha='center', va='bottom')

plt.tight_layout()
plt.savefig('chart1.png', dpi=300, bbox_inches='tight')
plt.close()

# Add chart to PDF
pdf.image('chart1.png', x=10, y=pdf.get_y(), w=180)
pdf.ln(120)

# Chart 2: Pie chart
plt.figure(figsize=(8, 8))
colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7']
plt.pie(df['Count'], labels=df['Category'], autopct='%1.1f%%', colors=colors, startangle=90)
plt.title('Distribution of Page Elements', fontsize=14, fontweight='bold')
plt.axis('equal')
plt.savefig('chart2.png', dpi=300, bbox_inches='tight')
plt.close()

# Add pie chart
pdf.add_page()
pdf.image('chart2.png', x=10, y=20, w=180)

# Detailed breakdown
pdf.ln(120)
pdf.set_font('Arial', 'B', 14)
pdf.cell(0, 10, 'Detailed Breakdown', 0, 1)
pdf.set_font('Arial', '', 11)

details = """
Advertising Resources:
- Google Ads: 3 requests to pagead2.googlesyndication.com
- HTTP/2 optimized for performance

Resource Hints:
- preconnect to Tampermonkey and Google domains
- preload for Lato font files (WOFF2 format)

Inline SVGs:
- 10 SVG elements, mostly small icons
- Single path elements for optimization
- Total size: 6,207 bytes

Local Storage:
- Google AdSense publisher settings
- Bot builder application state
- Timestamp tracking (__lsv__, __lsa__)

Origin Trials:
- 5 experimental web platform features
- AI Prompt API, WebView deprecation trials
"""

pdf.multi_cell(0, 6, details)

# Security implications
pdf.set_font('Arial', 'B', 14)
pdf.cell(0, 10, 'Security & Privacy Implications', 0, 1)
pdf.set_font('Arial', '', 11)

security = """
Tracking Concerns:
- Extensive Tampermonkey telemetry collection
- Multiple user/session identifiers
- Analytics on extension management pages

Data Collection:
- Bot-building state in local storage
- Activity timestamps
- Ad monetization preferences

Recommendations:
- Review local storage for unwanted data
- Consider blocking third-party analytics
- Be aware of extensive tracking ecosystem
"""

pdf.multi_cell(0, 6, security)

# Save PDF
pdf.output('visualizations_report.pdf')

print("PDF report generated: visualizations_report.pdf")
print("Charts saved: chart1.png, chart2.png")