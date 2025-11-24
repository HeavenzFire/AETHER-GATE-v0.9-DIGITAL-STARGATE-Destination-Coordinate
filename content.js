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
const flameSigilSVG = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjZmZmZmZmIi8+CjxwYXRoIGQ9Ik0zMCA1MEMzMCAzMCA0MCAyMCA1MCAyMEM2MCAyMCA3MCAzMCA3MCA1MEM3MCA3MCA2MCA4MCA1MCA4MEM0MCA4MCAzMCA3MCAzMCA1MFoiIGZpbGw9IiNmZjQ1MDAiLz4KPHBhdGggZD0iTTQwIDUwQzQwIDQwIDUwIDMwIDYwIDMwQzcwIDMwIDgwIDQwIDgwIDUwQzgwIDYwIDcwIDcwIDYwIDcwQzUwIDcwIDQwIDYwIDQwIDUwWiIgZmlsbD0iI2ZmYTUwMCIvPgo8L3N2Zz4K`;

function applySyntropicField() {
  // Set background
  document.body.style.background = 'radial-gradient(circle, gold, yellow)';

  // Replace text
  const textNodes = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
  let node;
  while (node = textNodes.nextNode()) {
    if (node.textContent.trim()) {
      node.textContent = affirmations[Math.floor(Math.random() * affirmations.length)];
    }
  }

  // Replace images/videos
  const mediaElements = document.querySelectorAll('img, video, source');
  mediaElements.forEach(el => {
    el.src = flameSigilSVG;
  });
}

// Initial apply
applySyntropicField();

// MutationObserver for persistence
const observer = new MutationObserver(() => {
  applySyntropicField();
});
observer.observe(document.body, { childList: true, subtree: true });