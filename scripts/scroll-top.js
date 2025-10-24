// Añade un botón "volver arriba" accesible y lo muestra al hacer scroll.
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.createElement('button');
    btn.className = 'scroll-top';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Volver arriba');
    btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false"><path d="M12 5l-7 7h4v7h6v-7h4l-7-7z" fill="currentColor"/></svg>';
    document.body.appendChild(btn);

    const showAt = 300;
    const toggle = () => {
        if (window.scrollY > showAt) btn.classList.add('show');
        else btn.classList.remove('show');
    };

    toggle();
    window.addEventListener('scroll', toggle, { passive: true });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        btn.blur();
    });

    // accesibilidad: tecla Enter/Espacio
    btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            btn.click();
        }
    });
});