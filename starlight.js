// =============================================================
// STARLIGHT · v2.3 · Core JavaScript
// Zero dependencies · Fully hackable
// =============================================================

(function() {
    'use strict';

    // --------------------------------------------------------------
    // 1. SIDEBAR TOGGLE (Fixed Sidebar)
    // --------------------------------------------------------------
    function initSidebar() {
        const sidebar = document.getElementById('sl-sidebar');
        const overlay = document.getElementById('sl-overlay');
        const menuBtn = document.getElementById('sl-menu-btn');
        const body = document.body;

        if (!sidebar || !menuBtn) return;

        function openSidebar() {
            sidebar.classList.add('open');
            if (overlay) overlay.classList.add('open');
            body.classList.add('sl-sidebar-open');
        }

        function closeSidebar() {
            sidebar.classList.remove('open');
            if (overlay) overlay.classList.remove('open');
            body.classList.remove('sl-sidebar-open');
        }

        menuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            if (sidebar.classList.contains('open')) {
                closeSidebar();
            } else {
                openSidebar();
            }
        });

        if (overlay) {
            overlay.addEventListener('click', closeSidebar);
        }

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && sidebar.classList.contains('open')) {
                closeSidebar();
            }
        });

        // Close sidebar on mobile after clicking a link
        sidebar.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                if (window.innerWidth < 768) {
                    closeSidebar();
                }
            });
        });
    }

    // --------------------------------------------------------------
    // 2. SCROLLSPY
    // --------------------------------------------------------------
    function initScrollspy() {
        const sections = document.querySelectorAll('.sl-section-block[id]');
        const navLinks = document.querySelectorAll('.sl-sidebar .sl-menu a');
        if (!sections.length || !navLinks.length) return;

        function updateActiveLink() {
            let currentSectionId = '';
            let minDistance = Infinity;
            const headerOffset = 80;

            sections.forEach(function(section) {
                const rect = section.getBoundingClientRect();
                const distance = Math.abs(rect.top - headerOffset);
                if (distance < minDistance) {
                    minDistance = distance;
                    currentSectionId = section.id;
                }
            });

            if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10) {
                const lastSection = sections[sections.length - 1];
                if (lastSection) currentSectionId = lastSection.id;
            }

            navLinks.forEach(function(link) {
                link.classList.remove('sl-active');
                const href = link.getAttribute('href');
                if (href === '#' + currentSectionId) {
                    link.classList.add('sl-active');
                }
            });
        }

        let ticking = false;
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    updateActiveLink();
                    ticking = false;
                });
                ticking = true;
            }
        });

        window.addEventListener('load', updateActiveLink);
    }

    // --------------------------------------------------------------
    // 3. DROPDOWN
    // --------------------------------------------------------------
    function initDropdowns() {
        document.querySelectorAll('.sl-dropdown').forEach(function(dropdown) {
            const toggle = dropdown.querySelector('.sl-toggle');
            if (toggle) {
                toggle.addEventListener('click', function(e) {
                    e.stopPropagation();
                    dropdown.classList.toggle('sl-open');
                });
            }
        });

        document.addEventListener('click', function() {
            document.querySelectorAll('.sl-dropdown').forEach(function(d) {
                d.classList.remove('sl-open');
            });
        });
    }

    // --------------------------------------------------------------
    // 4. MODAL
    // --------------------------------------------------------------
    window.slOpenModal = function(id) {
        const el = document.getElementById(id);
        if (el) el.classList.add('sl-open');
    };

    window.slCloseModal = function(id) {
        const el = document.getElementById(id);
        if (el) el.classList.remove('sl-open');
    };

    function initModalBackdrops() {
        document.querySelectorAll('.sl-modal-backdrop').forEach(function(backdrop) {
            backdrop.addEventListener('click', function(e) {
                if (e.target === backdrop) {
                    backdrop.classList.remove('sl-open');
                }
            });
        });
    }

    // --------------------------------------------------------------
    // 5. POPUP
    // --------------------------------------------------------------
    window.slOpenPopup = function(id) {
        const el = document.getElementById(id);
        if (el) el.classList.add('sl-open');
    };

    window.slClosePopup = function(id) {
        const el = document.getElementById(id);
        if (el) el.classList.remove('sl-open');
    };

    function initPopupBackdrops() {
        document.querySelectorAll('.sl-popup').forEach(function(popup) {
            popup.addEventListener('click', function(e) {
                if (e.target === popup) {
                    popup.classList.remove('sl-open');
                }
            });
        });
    }

    // --------------------------------------------------------------
    // 6. TOAST
    // --------------------------------------------------------------
    window.slToast = function(icon, message, duration) {
        duration = duration || 3200;
        const container = document.getElementById('sl-toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = 'sl-toast';
        toast.innerHTML =
            '<span class="icon">' + icon + '</span>' +
            '<span class="msg">' + message + '</span>' +
            '<button class="close" onclick="this.closest(\'.sl-toast\').remove()">✕</button>';
        container.appendChild(toast);

        requestAnimationFrame(function() {
            toast.classList.add('show');
        });

        const timer = setTimeout(function() {
            toast.classList.add('hide');
            setTimeout(function() {
                if (toast.parentNode) toast.remove();
            }, 250);
        }, duration);

        toast.querySelector('.close').addEventListener('click', function() {
            clearTimeout(timer);
            toast.classList.add('hide');
            setTimeout(function() {
                if (toast.parentNode) toast.remove();
            }, 250);
        });
    };

    // --------------------------------------------------------------
    // 7. TABS
    // --------------------------------------------------------------
    function initTabs() {
        document.querySelectorAll('.sl-tabs').forEach(function(tabs) {
            const btns = tabs.querySelectorAll('.sl-headers .sl-tab');
            const panels = tabs.querySelectorAll('.sl-panels .sl-panel');

            btns.forEach(function(btn) {
                btn.addEventListener('click', function() {
                    const target = btn.dataset.tab;

                    btns.forEach(function(b) { b.classList.remove('sl-active'); });
                    btn.classList.add('sl-active');

                    panels.forEach(function(p) {
                        p.classList.toggle('sl-active', p.id === target);
                    });
                });
            });
        });
    }

    // --------------------------------------------------------------
    // 8. KEYBOARD: ESC to close modals & popups
    // --------------------------------------------------------------
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.sl-modal-backdrop.sl-open').forEach(function(modal) {
                modal.classList.remove('sl-open');
            });
            document.querySelectorAll('.sl-popup.sl-open').forEach(function(popup) {
                popup.classList.remove('sl-open');
            });
            // also close manual overlay if present
            const manual = document.getElementById('manualOverlay');
            if (manual) manual.classList.remove('open');
        }
    });

    // --------------------------------------------------------------
    // 9. METER ANIMATION
    // --------------------------------------------------------------
    function initMeters() {
        document.querySelectorAll('.sl-fill.sl-animated').forEach(function(el) {
            const target = el.style.getPropertyValue('--sl-target');
            if (target) {
                el.style.width = '0%';
                requestAnimationFrame(function() {
                    el.style.width = target;
                });
            }
        });
    }

    // --------------------------------------------------------------
    // 10. Initialize everything on DOM ready
    // --------------------------------------------------------------
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            initSidebar();
            initScrollspy();
            initDropdowns();
            initModalBackdrops();
            initPopupBackdrops();
            initTabs();
            initMeters();
        });
    } else {
        initSidebar();
        initScrollspy();
        initDropdowns();
        initModalBackdrops();
        initPopupBackdrops();
        initTabs();
        initMeters();
    }

    // --------------------------------------------------------------
    // 11. Console greeting (optional)
    // --------------------------------------------------------------
    console.log('┌────────────────────────────────────────────┐');
    console.log('│  ✦ Starlight · v2.3                     │');
    console.log('│  Paper Hacker GUI Library               │');
    console.log('│  14 components · zero deps · hackable  │');
    console.log('│  Fixed sidebar · custom scrollbar      │');
    console.log('└────────────────────────────────────────────┘');
    console.log('📐  scroll → sidebar highlights');
    console.log('☰  click ☰ to toggle fixed sidebar');
    console.log('📦  slToast(), slOpenModal(), slOpenPopup()');

})();