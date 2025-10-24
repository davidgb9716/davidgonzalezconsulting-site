document.addEventListener('DOMContentLoaded', function () {
    const BREAKPOINT = 768;
    const buttons = document.querySelectorAll('.nav-toggle');

    // ensure a single overlay for the whole doc
    let overlay = document.querySelector('.nav-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'nav-overlay';
        document.body.appendChild(overlay);
    }

    buttons.forEach(button => {
        const nav = button.closest('nav');
        if (!nav) return;
        const links = nav.querySelector('.nav-links--panel') || nav.querySelector('.nav-links');
        // remember whether the element originally had the panel class
        if (links) links.dataset.originalPanel = links.classList.contains('nav-links--panel') ? '1' : '0';

        // click toggle
        button.addEventListener('click', () => {
            const expanded = button.getAttribute('aria-expanded') === 'true';
            if (expanded) closeMenu(button, links);
            else openMenu(button, links);
        });

        // close when clicking a link
        links && links.addEventListener('click', (e) => {
            const a = e.target.closest('a');
            if (a) {
                closeMenu(button, links);
            }
        });

        // close when clicking overlay
        overlay.addEventListener('click', () => closeMenu(button, links));
    });

    // close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.nav-toggle').forEach(btn => {
                const nav = btn.closest('nav');
                const links = nav && (nav.querySelector('.nav-links--panel') || nav.querySelector('.nav-links'));
                closeMenu(btn, links);
            });
        }
    });

    // close menus if viewport becomes wide
    window.addEventListener('resize', () => {
        if (window.innerWidth > BREAKPOINT) {
            document.querySelectorAll('.nav-toggle').forEach(btn => {
                const nav = btn.closest('nav');
                const links = nav && (nav.querySelector('.nav-links--panel') || nav.querySelector('.nav-links'));
                closeMenu(btn, links);
            });
            overlay.classList.remove('show');
        }
    });

    function closeMenu(button, links) {
        if (!button || !links) return;
        button.setAttribute('aria-expanded', 'false');
        links.classList.remove('open');
        overlay.classList.remove('show');
        // restore original nav-links class if we removed it on open (mobile only)
        if (links.dataset.removedNav === '1') {
            links.classList.add('nav-links');
            delete links.dataset.removedNav;
        }
        // remove the temporary panel class if it wasn't originally present
        if (links.dataset.originalPanel === '0') links.classList.remove('nav-links--panel');
    }

    function openMenu(button, links) {
        if (!button || !links) return;
        // ensure panel class exists so panel styles apply
        if (!links.classList.contains('nav-links--panel')) links.classList.add('nav-links--panel');
        // on small viewports, the `.nav-links { display:none !important }` hides elements
        // remove the original `nav-links` class temporarily so the panel becomes visible
        if (window.innerWidth <= BREAKPOINT && links.classList.contains('nav-links')) {
            links.classList.remove('nav-links');
            links.dataset.removedNav = '1';
        }
        button.setAttribute('aria-expanded', 'true');
        links.classList.add('open');
        overlay.classList.add('show');
    }
});