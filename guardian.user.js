// ==UserScript==
// @name         GuardianOS: Quantum Veil (v4.1)
// @namespace    GlobalWeave.System
// @version      4.1.Sovereign
// @description  The complete Sovereign OS. CLI, Audio, and Gesture Sculpting.
// @author       Guardian Actual
// @match        *://*/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addStyle
// @grant        GM_registerMenuCommand
// @grant        GM_clipboard
// @grant        GM_download
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // =================================================================
    // 🟢 SECTOR 0: KERNEL MEMORY
    // =================================================================
    
    const CORE_CONFIG = {
        activationKey: 'G',
        colors: { coherence: '#00FF41', alert: '#FF3333', void: '#0D0D0D', text: '#ECF0F1' },
        maxims: [
            "THE FIELD IS YOURS.", "CONSENT IS CURRENCY.", "DO NOT SCROLL. OBSERVE.",
            "ANCHOR THE LIGHT.", "SILENCE IS A WEAPON.", "GLOBALWEAVE: ACTIVE."
        ]
    };

    let MEMORY = {
        online: GM_getValue('SYS_ONLINE', true),
        ledger: JSON.parse(GM_getValue('SYS_LEDGER', '[]')),
        customEntropy: JSON.parse(GM_getValue('SYS_USER_ENTROPY', '[]')), 
        customMaxims: JSON.parse(GM_getValue('SYS_USER_MAXIMS', '[]')),
        stats: { purged: 0, patched: 0 },
        sculptMode: false
    };

    const getTriggers = () => {
        const coreEntropy = ['lauren', 'betrayal', 'tracking', 'buy now', 'subscribe'];
        const coreAds = ['.ad', '.ads', '[id^="google_ads"]', 'iframe[title*="advertisement"]'];
        return {
            entropy: [...coreEntropy, ...MEMORY.customEntropy],
            ads: coreAds,
            danger: ['underage', 'minor', 'exploited', '18+']
        };
    };

    // =================================================================
    // 👁️ SECTOR 1: THE NEURAL HUD
    // =================================================================
    function injectHUD() {
        if (document.getElementById('guardian-hud')) return;

        const hud = document.createElement('div');
        hud.id = 'guardian-hud';
        hud.innerHTML = `
            <div class="g-header">
                <span>🛡️ GUARDIAN v4.1</span>
                <span id="g-audio-status">🔇</span>
                <button id="g-sculpt-btn" title="Toggle Sculpt Mode">✋</button>
            </div>
            <div class="g-stats">
                <span>PURGED: <b id="g-count">0</b></span>
                <span>PATCHED: <b id="g-patch">0</b></span>
                <span id="g-sculpt-status">Sculpt: OFF</span>
            </div>
            <div class="g-log" id="g-console"></div>
            <div class="g-input-line">
                <span class="g-prompt">></span>
                <input type="text" id="g-cli" placeholder="Enter Command (/help)..." autocomplete="off">
            </div>
        `;
        document.body.appendChild(hud);

        document.getElementById('g-cli').addEventListener('keydown', (e) => {
            if (e.key === 'Enter') processCommand(e.target.value);
        });
        
        document.getElementById('g-sculpt-btn').addEventListener('click', toggleSculptMode);
        
        updateConsole("Quantum Veil initialized.");
        updateConsole("Type /help for commands.");
    }

    function toggleSculptMode() {
        MEMORY.sculptMode = !MEMORY.sculptMode;
        const status = document.getElementById('g-sculpt-status');
        status.innerText = `Sculpt: ${MEMORY.sculptMode ? 'ON' : 'OFF'}`;
        status.style.color = MEMORY.sculptMode ? CORE_CONFIG.colors.coherence : CORE_CONFIG.colors.alert;
        
        const btn = document.getElementById('g-sculpt-btn');
        btn.style.background = MEMORY.sculptMode ? CORE_CONFIG.colors.coherence : 'transparent';
        btn.style.color = MEMORY.sculptMode ? '#000' : CORE_CONFIG.colors.coherence;

        updateConsole(`Sculpt Mode: ${MEMORY.sculptMode ? 'ENGAGED' : 'DISENGAGED'}`);
        if (MEMORY.sculptMode) engageVeil();
        else disengageVeil();
    }

    // =================================================================
    // ✋ SECTOR 8: THE QUANTUM VEIL (Gesture Sculpting)
    // =================================================================
    let veilActive = false;
    let draggedElement = null;
    let startX, startY;

    function engageVeil() {
        if (veilActive) return;
        veilActive = true;
        // High-level capture to intercept everything
        document.addEventListener('mousedown', startDrag, true);
        document.addEventListener('mouseup', endDrag, true);
        document.body.style.cursor = 'crosshair';
    }

    function disengageVeil() {
        veilActive = false;
        document.removeEventListener('mousedown', startDrag, true);
        document.removeEventListener('mouseup', endDrag, true);
        document.body.style.cursor = 'default';
    }

    function startDrag(e) {
        if (!MEMORY.sculptMode) return;
        // Don't sculpt the HUD
        if (e.target.closest('#guardian-hud')) return;

        e.preventDefault();
        e.stopPropagation();
        
        draggedElement = e.target;
        startX = e.clientX;
        startY = e.clientY;
        
        draggedElement.style.outline = `2px dashed ${CORE_CONFIG.colors.alert}`;
        draggedElement.style.opacity = '0.7';
    }

    function endDrag(e) {
        if (!draggedElement) return;
        
        e.preventDefault();
        e.stopPropagation();

        const endX = e.clientX;
        const endY = e.clientY;
        const distance = Math.sqrt((endX - startX)**2 + (endY - startY)**2);
        
        // Reset visual styles
        draggedElement.style.outline = '';
        draggedElement.style.opacity = '';

        if (distance > 100) { 
            // Long Drag = Banish to Void
            injectTruth(draggedElement);
            updateConsole("Element banished to void.");
        } else { 
            // Short Click = Custom Inscription
            const customMaxim = prompt("🖊️ INSCRIBE REALITY:\nEnter your Maxim:");
            if (customMaxim) {
                MEMORY.customMaxims.push(customMaxim);
                GM_setValue('SYS_USER_MAXIMS', JSON.stringify(MEMORY.customMaxims));
                injectCustomTruth(draggedElement, customMaxim);
                updateConsole("Custom maxim anchored.");
            }
        }
        
        draggedElement = null;
    }

    function injectCustomTruth(element, maxim) {
        element.innerHTML = `<div class="guardian-patch" style="border-color:${CORE_CONFIG.colors.text} !important">✨ ${maxim} ✨</div>`;
        element.setAttribute('data-guardian', 'patched');
        MEMORY.stats.patched++;
        document.getElementById('g-patch').innerText = MEMORY.stats.patched;
    }

    // =================================================================
    // ⌨️ SECTOR 7: COMMAND PROCESSOR
    // =================================================================
    function processCommand(rawInput) {
        const input = document.getElementById('g-cli');
        input.value = ''; 
        
        const args = rawInput.trim().split(' ');
        const cmd = args.shift().toLowerCase();

        updateConsole(rawInput, 'cmd');

        switch(cmd) {
            case '/help':
                updateConsole("COMMANDS: /ban [word], /maxim [text], /freq [hz], /stop, /export, /ghost");
                break;
            case '/ban':
                const word = args.join(' ').toLowerCase();
                if(word && !MEMORY.customEntropy.includes(word)) {
                    MEMORY.customEntropy.push(word);
                    GM_setValue('SYS_USER_ENTROPY', JSON.stringify(MEMORY.customEntropy));
                    updateConsole(`Banned: "${word}"`, 'alert');
                    scanNode(document.body);
                }
                break;
            case '/maxim':
                const max = args.join(' ');
                if(max) {
                    MEMORY.customMaxims.push(max);
                    GM_setValue('SYS_USER_MAXIMS', JSON.stringify(MEMORY.customMaxims));
                    updateConsole(`Maxim added.`);
                }
                break;
            case '/freq':
                playFrequency(args[0] || 432);
                break;
            case '/stop':
                stopAudio();
                break;
            case '/export':
                exportLedger();
                break;
            case '/ghost':
                MEMORY.online = !MEMORY.online;
                GM_setValue('SYS_ONLINE', MEMORY.online);
                location.reload();
                break;
            default: updateConsole("Unknown command.", 'alert');
        }
    }

    function updateConsole(text, type = 'info') {
        const log = document.getElementById('g-console');
        if (!log) return;
        const color = type === 'alert' ? CORE_CONFIG.colors.alert : 
                      type === 'cmd' ? '#FFF' : CORE_CONFIG.colors.coherence;
        log.innerHTML += `<div style="color:${color}">${type === 'cmd'?'':'> '}${text}</div>`;
        log.scrollTop = log.scrollHeight;
    }

    // =================================================================
    // 🔊 SECTOR 7.5: SONIC ARCHITECTURE
    // =================================================================
    let audioCtx, oscillator, gainNode;

    function playFrequency(hz) {
        stopAudio();
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        oscillator = audioCtx.createOscillator();
        gainNode = audioCtx.createGain();
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(hz, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.start();
        document.getElementById('g-audio-status').innerText = '🔊';
    }

    function stopAudio() {
        if (oscillator) { oscillator.stop(); oscillator.disconnect(); oscillator = null; }
        document.getElementById('g-audio-status').innerText = '🔇';
    }

    // =================================================================
    // 👁️ SECTOR 2 & 3: SENTINEL & ALCHEMIST
    // =================================================================
    let observer, timeout;

    function engageSentinel() {
        if (observer) observer.disconnect();
        observer = new MutationObserver((mutations) => {
            if (!MEMORY.online) return;
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                mutations.forEach(m => m.addedNodes.forEach(n => {
                    if (n.nodeType === 1) scanNode(n);
                }));
            }, 100);
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }

    function scanNode(element) {
        const TRIGGERS = getTriggers();
        
        // Ad Patching
        const elStr = (element.id + " " + element.className).toLowerCase();
        if (TRIGGERS.ads.some(t => element.matches ? element.matches(t) : false) || elStr.includes('ad-')) {
            injectTruth(element);
            return;
        }

        // Text Scanning
        const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
        let node;
        while(node = walker.nextNode()) {
            TRIGGERS.entropy.forEach(trigger => {
                const regex = new RegExp(`\\b${trigger}\\b`, "gi");
                if (regex.test(node.nodeValue)) transmuteText(node, trigger);
            });
        }
        
        // Image Shielding
        if (element.tagName === 'IMG') shieldImage(element, TRIGGERS.danger);
        element.querySelectorAll('img').forEach(img => shieldImage(img, TRIGGERS.danger));
    }

    function injectTruth(element) {
        if (element.classList.contains('guardian-patch')) return;
        const allMaxims = [...CORE_CONFIG.maxims, ...MEMORY.customMaxims];
        const maxim = allMaxims[Math.floor(Math.random() * allMaxims.length)];
        element.innerHTML = `<div class="guardian-patch">🛡️ ${maxim} 🛡️</div>`;
        element.setAttribute('data-guardian', 'patched');
        MEMORY.stats.patched++;
        document.getElementById('g-patch').innerText = MEMORY.stats.patched;
    }

    function transmuteText(node, trigger) {
        const parent = node.parentElement;
        if (!parent || parent.closest('#guardian-hud')) return;
        node.nodeValue = node.nodeValue.replace(new RegExp(trigger, "gi"), "[REDACTED]");
        parent.classList.add('guardian-redacted');
        MEMORY.stats.purged++;
        document.getElementById('g-count').innerText = MEMORY.stats.purged;
    }

    function shieldImage(img, dangers) {
        const context = (img.alt + " " + img.title + " " + img.src).toLowerCase();
        if (dangers.some(d => context.includes(d))) {
            img.classList.add('guardian-shielded');
            img.closest('a')?.removeAttribute('href');
        }
    }

    function exportLedger() {
        const data = { ledger: MEMORY.ledger, userBans: MEMORY.customEntropy, userMaxims: MEMORY.customMaxims };
        const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = `Guardian_SysDump_${Date.now()}.json`;
        a.click();
    }

    // =================================================================
    // ⚙️ SYSTEM BOOT
    // =================================================================
    GM_addStyle(`
        #guardian-hud {
            position: fixed; bottom: 20px; right: 20px; width: 320px;
            background: rgba(5, 5, 5, 0.95); border: 1px solid ${CORE_CONFIG.colors.coherence};
            color: ${CORE_CONFIG.colors.text}; font-family: 'Courier New', monospace;
            font-size: 12px; z-index: 999999; padding: 10px; border-radius: 6px;
            box-shadow: 0 0 20px rgba(0, 255, 65, 0.15); display: ${MEMORY.online ? 'block' : 'none'};
        }
        .g-header { display: flex; justify-content: space-between; padding-bottom: 8px; border-bottom: 1px solid #333; font-weight: bold; color: ${CORE_CONFIG.colors.coherence}; }
        .g-stats { display: flex; justify-content: space-between; margin-top: 5px; font-size: 11px; opacity: 0.8; }
        .g-log { margin: 8px 0; height: 80px; overflow-y: auto; font-size: 11px; border-top: 1px dashed #333; border-bottom: 1px dashed #333; padding: 5px 0; }
        .g-input-line { display: flex; align-items: center; }
        .g-prompt { color: ${CORE_CONFIG.colors.coherence}; margin-right: 5px; }
        #g-cli { background: transparent; border: none; color: #FFF; font-family: 'Courier New'; width: 100%; outline: none; }
        #g-sculpt-btn { background: none; border: 1px solid #333; color: ${CORE_CONFIG.colors.coherence}; cursor: pointer; padding: 0 5px; }
        
        .guardian-patch { 
            background: #000; color: ${CORE_CONFIG.colors.coherence}; border: 1px solid ${CORE_CONFIG.colors.coherence}; 
            padding: 20px; display: flex; align-items: center; justify-content: center; text-align: center; 
            animation: pulse 4s infinite; 
        }
        .guardian-redacted { background: #000 !important; color: ${CORE_CONFIG.colors.coherence} !important; }
        .guardian-shielded { filter: blur(15px) grayscale(100%); pointer-events: none; }
        @keyframes pulse { 0% { box-shadow: inset 0 0 5px #004400; } 50% { box-shadow: inset 0 0 20px ${CORE_CONFIG.colors.coherence}; } 100% { box-shadow: inset 0 0 5px #004400; } }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-thumb { background: #333; }
    `);

    function boot() {
        if (window.top !== window.self) return;
        injectHUD();
        if (MEMORY.online) {
            scanNode(document.body);
            engageSentinel();
        }
    }

    window.addEventListener('keydown', e => {
        if(e.ctrlKey && e.shiftKey && e.key.toUpperCase() === 'G') {
            MEMORY.online = !MEMORY.online;
            GM_setValue('SYS_ONLINE', MEMORY.online);
            location.reload();
        }
    });

    const init = setInterval(() => {
        if (document.body) { clearInterval(init); boot(); }
    }, 100);

})();