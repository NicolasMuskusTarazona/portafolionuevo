// Micro-interacciones sin frameworks
// - Ink hover: fondo radial que sigue el cursor (links con .hover-ink)
// - Boop: animación al hacer click (elementos con .boop)
// - Header: sombra al hacer scroll

(function () {
    // 1) Ink hover: actualiza variables CSS --x / --y
    const inkTargets = document.querySelectorAll('.hover-ink');
    inkTargets.forEach((el) => {
        el.addEventListener(
            'pointermove',
            (e) => {
                const rect = el.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                el.style.setProperty('--x', x + '%');
                el.style.setProperty('--y', y + '%');
            },
            { passive: true }
        );
    });

    // 2) Boop al click (rebota sutilmente)
    const boopTargets = document.querySelectorAll('.boop');
    boopTargets.forEach((el) => {
        el.addEventListener('click', () => {
            el.classList.remove('booped'); // reinicia si ya estaba
            // fuerza reflow para reiniciar la animación
            void el.offsetWidth;
            el.classList.add('booped');
        });
        el.addEventListener('animationend', () => el.classList.remove('booped'));
    });

    // 3) Sombra del header al hacer scroll
    const header = document.getElementById('siteHeader');
    const onScroll = () => {
        if (window.scrollY > 8) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
    };
    document.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // 4) Año dinámico en el footer
    const y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
})();


// 5) Menú hamburguesa
const toggleBtn = document.querySelector('.menu-toggle');
const nav = document.querySelector('header nav');
if (toggleBtn && nav) {
    toggleBtn.addEventListener('click', () => {
        nav.classList.toggle('open');
    });
}


// 6) Funcionalidad de iconos
const rssIcon = document.querySelector('.fa-rss');


if (rssIcon) {
    rssIcon.addEventListener('click', () => {
        window.location.href = '#blog'; // cámbialo por tu página real
    });
}
