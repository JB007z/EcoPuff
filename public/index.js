const profileDropdownButton = document.getElementById('profileDropdownButton');
        const profileDropdownMenu = document.getElementById('profileDropdownMenu');
        const loginLink = document.getElementById('loginLink');
        const profileDropdownContainer = document.getElementById('profileDropdownContainer');
        const mobileMenuButton = document.getElementById('mobileMenuButton');
        const mobileMenu = document.getElementById('mobileMenu');

        const isLoggedIn = localStorage.getItem('token') ? true : false;

        if (isLoggedIn) {
            if (loginLink) loginLink.style.display = 'none'; // Use style.display
            if (profileDropdownContainer) profileDropdownContainer.classList.remove('hidden');
        } else {
            if (loginLink) loginLink.style.display = 'block'; // Or 'inline' depending on original display
            if (profileDropdownContainer) profileDropdownContainer.classList.add('hidden');
        }

        if (profileDropdownButton && profileDropdownMenu) {
            profileDropdownButton.addEventListener('click', (event)=> {
                event.stopPropagation(); // Prevent click from bubbling to document listener immediately
                const isHidden = profileDropdownMenu.classList.contains('hidden-initially') || profileDropdownMenu.classList.contains('hidden');
                profileDropdownMenu.classList.toggle('hidden-initially', !isHidden);
                profileDropdownMenu.classList.toggle('hidden', !isHidden);
                profileDropdownMenu.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
            });

            document.addEventListener('click', (event) => {
                if (profileDropdownContainer && !profileDropdownContainer.contains(event.target) && !profileDropdownMenu.classList.contains('hidden')) {
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