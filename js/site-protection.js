/**
 * NITINDYT CLIENT+ - Site Protection Suite
 * Layers of defense against casual code theft, scraping, and asset stealing.
 * 
 * Layer 1: Disable right-click context menu
 * Layer 2: Disable keyboard shortcuts (F12, Ctrl+Shift+I, Ctrl+U, etc.)
 * Layer 3: Disable text selection & image dragging
 * Layer 4: DevTools detection with console warning
 * Layer 5: Debugger trap for inspector users
 */
(function () {
    'use strict';

    // ========================================================================
    // LAYER 1: Disable Right-Click Context Menu
    // ========================================================================
    document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
        return false;
    });

    // ========================================================================
    // LAYER 2: Block Developer Tool Keyboard Shortcuts
    // ========================================================================
    document.addEventListener('keydown', function (e) {
        // F12 - DevTools
        if (e.key === 'F12' || e.keyCode === 123) {
            e.preventDefault();
            return false;
        }

        // Ctrl+Shift+I - Inspect Element
        if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i')) {
            e.preventDefault();
            return false;
        }

        // Ctrl+Shift+J - Console
        if (e.ctrlKey && e.shiftKey && (e.key === 'J' || e.key === 'j')) {
            e.preventDefault();
            return false;
        }

        // Ctrl+Shift+C - Element Picker
        if (e.ctrlKey && e.shiftKey && (e.key === 'C' || e.key === 'c')) {
            e.preventDefault();
            return false;
        }

        // Ctrl+U - View Source
        if (e.ctrlKey && (e.key === 'U' || e.key === 'u')) {
            e.preventDefault();
            return false;
        }

        // Ctrl+S - Save Page
        if (e.ctrlKey && (e.key === 'S' || e.key === 's')) {
            e.preventDefault();
            return false;
        }

        // Ctrl+Shift+K - Firefox Console
        if (e.ctrlKey && e.shiftKey && (e.key === 'K' || e.key === 'k')) {
            e.preventDefault();
            return false;
        }
    });

    // ========================================================================
    // LAYER 3: Disable Text Selection & Image Dragging
    // ========================================================================

    // Prevent text selection via CSS injection
    const protectionStyle = document.createElement('style');
    protectionStyle.textContent = `
        body {
            -webkit-user-select: none !important;
            -moz-user-select: none !important;
            -ms-user-select: none !important;
            user-select: none !important;
        }
        /* Allow selection in input fields and textareas for usability */
        input, textarea, [contenteditable="true"] {
            -webkit-user-select: text !important;
            -moz-user-select: text !important;
            -ms-user-select: text !important;
            user-select: text !important;
        }
        img {
            -webkit-user-drag: none !important;
            user-drag: none !important;
            pointer-events: auto;
        }
    `;
    document.head.appendChild(protectionStyle);

    // Prevent image dragging via JS
    document.addEventListener('dragstart', function (e) {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
            return false;
        }
    });

    // Prevent copy
    document.addEventListener('copy', function (e) {
        e.preventDefault();
        return false;
    });

    // Prevent cut
    document.addEventListener('cut', function (e) {
        e.preventDefault();
        return false;
    });

    // ========================================================================
    // LAYER 4: DevTools Detection & Console Warning
    // ========================================================================
    (function detectDevTools() {
        const warningMessage = '%c⚠ FUCK YOU! ⚠';
        const warningStyle = 'color: red; font-size: 60px; font-weight: bold; text-shadow: 2px 2px 0 #000;';
        const infoMessage = '%cThis browser feature is intended for developers. If someone told you to copy-paste something here to get a feature or "hack" the site, it is a scam and will compromise your security.';
        const infoStyle = 'color: white; font-size: 18px;';
        const brandMessage = '%c— Protected by- NITIN SHARMA Security';
        const brandStyle = 'color: #00e5ff; font-size: 14px; font-style: italic;';

        try {
            console.log(warningMessage, warningStyle);
            console.log(infoMessage, infoStyle);
            console.log(brandMessage, brandStyle);
        } catch (e) { /* silent */ }
    })();

    // ========================================================================
    // LAYER 5: Debugger Trap (triggers when DevTools is open)
    // ========================================================================
    (function debuggerTrap() {
        // This runs periodically; when DevTools is open the debugger
        // statement freezes execution, making inspection very annoying.
        setInterval(function () {
            (function () {
                return false;
            }
            ['constructor']('debugger')
            ['call']());
        }, 4000);
    })();

    // ========================================================================
    // LAYER 6: Prevent Page Save (Ctrl+S already blocked above)
    // Also prevent Print (Ctrl+P) to block "Save as PDF"
    // ========================================================================
    document.addEventListener('keydown', function (e) {
        if (e.ctrlKey && (e.key === 'P' || e.key === 'p')) {
            e.preventDefault();
            return false;
        }
    });

    // Prevent "Save Image As" from the long-press on mobile
    document.addEventListener('touchstart', function (e) {
        if (e.target.tagName === 'IMG') {
            e.target.addEventListener('contextmenu', function (ev) {
                ev.preventDefault();
            });
        }
    }, { passive: true });

})();
