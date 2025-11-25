const fs = require('fs');

const data = fs.readFileSync('data_dump.txt', 'utf8');

console.log('=== Data Dump Analysis ===');

// 1. Ad Resources
const adSection = data.split('close')[0];
const adLines = adSection.split('\n').filter(line => line.trim() && !line.includes('Internal resources'));
console.log('\nAd-related resources:');
adLines.forEach(line => console.log(' -', line.trim()));

// 2. Resource Hints
const hintSection = data.split('close')[1];
const hints = hintSection.split('\n').filter(line => line.includes('preconnect') || line.includes('preload'));
console.log('\nResource hints:');
hints.forEach(line => console.log(' -', line.trim()));

// 3. Inline SVGs
const svgSection = data.split('total bytes')[1].split('4 items')[0];
const svgLines = svgSection.split('\n').filter(line => line.includes('path (1)'));
console.log('\nInline SVGs count:', svgLines.length);

// 4. Local Storage
const lsSection = data.split('4 items')[1];
const lsLines = lsSection.split('\n').filter(line => line.trim() && (line.includes('{') || line.includes('[')));
console.log('\nLocal Storage items:');
lsLines.forEach(line => {
  const parts = line.split('\t');
  const key = parts[0].trim();
  const value = parts[1] ? parts[1].trim() : '';
  if (value) {
    try {
      const parsed = JSON.parse(value);
      console.log(` - ${key}:`, parsed);
    } catch (e) {
      console.log(` - ${key}: ${value}`);
    }
  } else {
    console.log(` - ${key}`);
  }
});

// 5. Origin Trials
const otLines = data.split('\n').filter(line => line.includes('httpEquiv (origin-trial)'));
console.log('\nOrigin Trials count:', otLines.length);

// 6. Summary
console.log('\n=== Summary ===');
console.log('Total ad resources detected:', adLines.length);
console.log('Resource hints for ads:', hints.filter(h => h.includes('googlesyndication')).length);
console.log('Inline SVGs (potential icons):', svgLines.length);
console.log('Local storage items:', lsLines.length);
console.log('Origin trials (experimental features):', otLines.length);