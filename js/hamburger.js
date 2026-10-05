document.addEventListener('DOMContentLoaded', () => {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navigation = document.getElementById('navigation');

    if (!hamburgerMenu || !navigation) {
        return;
    }

    const closeMenu = () => {
        hamburgerMenu.classList.remove('active');
        navigation.classList.remove('active');
        hamburgerMenu.setAttribute('aria-expanded', 'false');
    };

    hamburgerMenu.addEventListener('click', () => {
        const isOpen = hamburgerMenu.classList.toggle('active');
        navigation.classList.toggle('active', isOpen);
        hamburgerMenu.setAttribute('aria-expanded', String(isOpen));
    });

    document.querySelectorAll('.nav-link').forEach((link) => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                closeMenu();
            }
        });
    });

    document.addEventListener('click', (event) => {
        if (window.innerWidth > 768) {
            return;
        }

        const clickedInsideNav = navigation.contains(event.target);
        const clickedOnButton = hamburgerMenu.contains(event.target);

        if (!clickedInsideNav && !clickedOnButton) {
            closeMenu();
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });
});
