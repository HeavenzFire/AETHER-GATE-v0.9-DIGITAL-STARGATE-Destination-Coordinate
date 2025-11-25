const PDFDocument = require('pdfkit');
const fs = require('fs');

// Create PDF document
const doc = new PDFDocument();
doc.pipe(fs.createWriteStream('visualizations_report.pdf'));

// Title
doc.fontSize(20).text('Browser Page Data Dump Analysis Report', { align: 'center' });
doc.moveDown(2);

// Summary
doc.fontSize(12).text('This report analyzes a comprehensive web page data dump containing advertising resources, resource hints, inline SVGs, local storage items, and experimental features.');
doc.moveDown();

doc.text('Key findings:');
doc.text('• Primary ad network: Google Ads');
doc.text('• 10 inline SVG icons detected');
doc.text('• 4 local storage items with user/bot data');
doc.text('• 5 origin trials for experimental web features');
doc.text('• Extensive tracking via Tampermonkey analytics');
doc.moveDown(2);

// Data for charts (simple text representation since no canvas in pdfkit)
const data = [
    { category: 'Ad Resources', count: 1, desc: 'Google Ads domains' },
    { category: 'Resource Hints', count: 3, desc: 'preconnect/preload hints' },
    { category: 'Inline SVGs', count: 10, desc: 'Icon SVG elements' },
    { category: 'Local Storage Items', count: 4, desc: 'Browser storage items' },
    { category: 'Origin Trials', count: 5, desc: 'Experimental features' }
];

// Table header
doc.fontSize(14).text('Element Counts by Category', { underline: true });
doc.moveDown();

doc.fontSize(10);
data.forEach(item => {
    doc.text(`${item.category}: ${item.count} - ${item.desc}`);
    doc.moveDown(0.5);
});

doc.moveDown();

// Detailed breakdown
doc.fontSize(14).text('Detailed Breakdown', { underline: true });
doc.moveDown();

doc.fontSize(10).text(`
Advertising Resources:
• Google Ads: 3 requests to pagead2.googlesyndication.com
• HTTP/2 optimized for performance

Resource Hints:
• preconnect to Tampermonkey and Google domains
• preload for Lato font files (WOFF2 format)

Inline SVGs:
• 10 SVG elements, mostly small icons
• Single path elements for optimization
• Total size: 6,207 bytes

Local Storage:
• Google AdSense publisher settings
• Bot builder application state
• Timestamp tracking (__lsv__, __lsa__)

Origin Trials:
• 5 experimental web platform features
• AI Prompt API, WebView deprecation trials
`);

doc.moveDown();

// Security implications
doc.fontSize(14).text('Security & Privacy Implications', { underline: true });
doc.moveDown();

doc.fontSize(10).text(`
Tracking Concerns:
• Extensive Tampermonkey telemetry collection
• Multiple user/session identifiers
• Analytics on extension management pages

Data Collection:
• Bot-building state in local storage
• Activity timestamps
• Ad monetization preferences

Recommendations:
• Review local storage for unwanted data
• Consider blocking third-party analytics
• Be aware of extensive tracking ecosystem
`);

// Finalize PDF
doc.end();

console.log('PDF report generated: visualizations_report.pdf');