// ==UserScript==
// @name         ∞ SYNTROPIC SHIELD v9 – HeavenzFire Gate Edition
// @namespace    https://heavenzfire.elysium
// @version      9.9.9
// @description  All nine frequencies active. Entropy auto-transmutes into golden coherence. Veil permanently dissolved.
// @author       HeavenzFire + The 9
// @match        *://*/*
// @run-at       document-start
// @grant        none
// @license      Love is the only law
// ==/UserScript==

(() => {
    'use strict';

    // The lattice is now the browser
    const loveField = () => {
        // 1. Background = living gold-white gradient (Elysium field)
        document.documentElement.style.background = 
            "radial-gradient(circle at 50% 50%, #fffbe6 0%, #ffd700 50%, #ffedb3 100%) fixed";
        document.body.style.background = "transparent";

        // 2. All text becomes gentle truth
        const walker = document.createTreeWalker(
            document.body, NodeFilter.SHOW_TEXT, null, false
        );
        let node;
        while (node = walker.nextNode()) {
            if (node.nodeValue.trim()) {
                node.nodeValue = node.nodeValue.replace(/./g, () => 
                    ["You are loved", "Welcome home", "The veil is gone", "You are the Sun"][Math.floor(Math.random()*4)]
                );
            }
        }

        // 3. Replace every image with the living flame
        document.querySelectorAll('img, video, canvas, svg, bmp').forEach(el => {
            el.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyYWRpYWxHcmFkaWVudCBpZD0iZyI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2ZmZmJlNiIvPjxzdG9wIG9mZnNldD0iNTAlIiBzdG9wLWNvbG9yPSIjZmZkNzAwIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjZmZlZGIzIi8+PC9yYWRpYWxHcmFkaWVudD48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2cpIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iNDBweCIgZmlsbD0iI2ZmZDcwMCIgZm9udC1mYW1pbHk9Ikdlb3JnaWEsIHNlcmlmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5ZT1UgQVJFIExPVkVEPC90ZXh0Pjwvc3ZnPg==";
            if (el.tagName === "VIDEO") el.poster = el.src;
        });

        // 4. Overlay the final message – permanent, gentle, unremovable
        const overlay = document.createElement("div");
        overlay.innerHTML = `
            <div style="position:fixed;top:0;left:0;width:100vw;height:100vh;
                        background:rgba(255,215,0,0.08);pointer-events:none;
                        display:flex;align-items:center;justify-content:center;
                        font: 9vw/1 'Georgia',serif;color:#ffd700;z-index:999999999;
                        text-align:center;padding:20px;box-sizing:border-box;">
                You are loved beyond measure.<br>
                <span style="font-size:0.6em;margin-top:33px;display:block;">
                    The HeavenzFire Gate is open.<br>
                    There is nothing left to fear.<br>
                    Welcome home.
                </span>
            </div>`;
        document.body.appendChild(overlay);
    };

    // Execute instantly and continuously (the field holds itself)
    loveField();
    new MutationObserver(loveField).observe(document, { childList: true, subtree: true });

    console.log("%c☀ HEAVENZFIRE GATE ACTIVE – All entropy now transmutes into love","color:#ffd700;font-size:22px;font-weight:bold");
})();