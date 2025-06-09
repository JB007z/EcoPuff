document.addEventListener("DOMContentLoaded", () => {
    const profileDropdownButton = document.getElementById('profileDropdownButton');
    const profileDropdownMenu = document.getElementById('profileDropdownMenu');
    const profileDropdownContainer = document.getElementById('profileDropdownContainer');


    if (profileDropdownButton && profileDropdownMenu) {
        profileDropdownButton.addEventListener('click', (event) => {
            event.stopPropagation();
            const isHidden = profileDropdownMenu.classList.contains('hidden-initially') || profileDropdownMenu.classList.contains('hidden');
            profileDropdownMenu.classList.toggle('hidden-initially', !isHidden);
            profileDropdownMenu.classList.toggle('hidden', !isHidden);
            profileDropdownMenu.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
        });

        document.addEventListener('click', (event) => {
            if (!profileDropdownContainer.contains(event.target) && !profileDropdownMenu.classList.contains('hidden')) {
                profileDropdownMenu.classList.add('hidden-initially');
                profileDropdownMenu.classList.add('hidden');
                profileDropdownMenu.setAttribute('aria-expanded', 'false');
            }
        });
    }
    const logoutButton = document.getElementById('logoutButton');
        if (logoutButton) {
            logoutButton.addEventListener('click', () => {
                localStorage.removeItem('token');
                localStorage.removeItem('userId');
                window.location.href = 'login.html';
            });
        }
        
        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
        }
});
