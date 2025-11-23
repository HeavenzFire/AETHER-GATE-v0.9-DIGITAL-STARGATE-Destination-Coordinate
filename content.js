// Syntropic Field: Transmuting digital entropy into coherent, loving resonance

const affirmations = [
  "You are loved",
  "Welcome home",
  "The veil is gone",
  "Divine coherence",
  "Sacred protection",
  "Heart-centered presence",
  "Quantum veil lifted",
  "Love is the highest law",
  "You are safe",
  "Embrace the light"
];

// Living-flame SVG sigil (base64 encoded)
const flameSigilSVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 150" width="100" height="150">
  <defs>
    <linearGradient id="flameGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#FFD700;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#FFA500;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#FF4500;stop-opacity:1" />
    </linearGradient>
  </defs>
  <path d="M50 10 C30 20, 20 40, 20 60 C20 80, 30 100, 50 120 C70 100, 80 80, 80 60 C80 40, 70 20, 50 10 Z" fill="url(#flameGradient)" />
  <path d="M50 20 C35 30, 25 45, 25 65 C25 85, 35 105, 50 125 C65 105, 75 85, 75 65 C75 45, 65 30, 50 20 Z" fill="#FFFFFF" opacity="0.3" />
</svg>
`;
const flameSigilBase64 = 'data:image/svg+xml;base64,' + btoa(flameSigilSVG);

function applySyntropicField() {
  // Set golden radial gradient background
  document.body.style.background = 'radial-gradient(circle, #FFD700 0%, #FFA500 50%, #FF4500 100%)';
  document.body.style.backgroundAttachment = 'fixed';

  // Replace all text nodes with random affirmations
  const textNodes = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
  let node;
  while (node = textNodes.nextNode()) {
    if (node.nodeValue.trim()) {
      node.nodeValue = affirmations[Math.floor(Math.random() * affirmations.length)];
    }
  }

  // Replace images, videos, and media with flame sigil
  const mediaElements = document.querySelectorAll('img, video, iframe, canvas, svg');
  mediaElements.forEach(el => {
    if (el.tagName === 'IMG' || el.tagName === 'VIDEO' || el.tagName === 'IFRAME') {
      el.src = flameSigilBase64;
    } else if (el.tagName === 'CANVAS') {
      const ctx = el.getContext('2d');
      const img = new Image();
      img.onload = () => ctx.drawImage(img, 0, 0, el.width, el.height);
      img.src = flameSigilBase64;
    } else if (el.tagName === 'SVG') {
      el.innerHTML = flameSigilSVG;
    }
  });
}

// Apply on load
applySyntropicField();

// MutationObserver to maintain on DOM changes
const observer = new MutationObserver(() => {
  applySyntropicField();
});
observer.observe(document.body, { childList: true, subtree: true });