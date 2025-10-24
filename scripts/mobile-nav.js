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

    function closeMenu(button, links) {
        if (!button || !links) return;
        button.setAttribute('aria-expanded', 'false');
        links.classList.remove('open');
        overlay.classList.remove('show');
    }

    function openMenu(button, links) {
        if (!button || !links) return;
        button.setAttribute('aria-expanded', 'true');
        links.classList.add('open');
        // force reflow to ensure transition
        void links.offsetWidth;
        overlay.classList.add('show');
    }

    buttons.forEach(button => {
        const nav = button.closest('nav');
        if (!nav) return;
        const links = nav.querySelector('.nav-links');

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
                const links = nav && nav.querySelector('.nav-links');
                closeMenu(btn, links);
            });
        }
    });

    // close menus if viewport becomes wide
    window.addEventListener('resize', () => {
        if (window.innerWidth > BREAKPOINT) {
            document.querySelectorAll('.nav-toggle').forEach(btn => {
                const nav = btn.closest('nav');
                const links = nav && nav.querySelector('.nav-links');
                closeMenu(btn, links);
            });
            overlay.classList.remove('show');
        }
    });
});