document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.nav-toggle').forEach(button => {
        button.addEventListener('click', () => {
            const nav = button.closest('nav');
            if (!nav) return;
            const links = nav.querySelector('.nav-links');
            const expanded = button.getAttribute('aria-expanded') === 'true';
            button.setAttribute('aria-expanded', String(!expanded));
            if (links) links.classList.toggle('open');
            nav.classList.toggle('nav-open');
        });
    });
});