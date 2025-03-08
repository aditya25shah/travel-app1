document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    const loginToggle = document.getElementById('login-toggle');
    const signupToggle = document.getElementById('signup-toggle');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    if (loginToggle && signupToggle) {
        [loginToggle, signupToggle].forEach(btn => {
            btn.addEventListener('click', () => {
                loginForm.classList.toggle('active');
                signupForm.classList.toggle('active');
                loginToggle.classList.toggle('active');
                signupToggle.classList.toggle('active');
            });
        });
    }

    const restrictedLinks = ['flights-link','flights-link', 'cars-link', 'hotels-link', 'about-link'];
    const modal = document.getElementById('login-modal');
    const closeModal = document.getElementById('close-modal');

    if (modal && closeModal) {
        restrictedLinks.forEach(id => {
            const link = document.getElementById(id);
            if (link) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    modal.style.display = 'flex';
                });
            }
        });

        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const username = document.querySelector('#login-form input[type="name"]').value;
            const password = document.querySelector('#login-form input[type="password"]').value;

            if (username === 'adityashah@gmail.com' && password === '1234') {
                alert('Login successful!');
                sessionStorage.setItem("isLoggedIn", "true"); // Store login state
                window.location.href = "index1.html";
            } else {
                alert('Invalid credentials. Please try again.');
            }
        });
    }
});

function redirectToBooking() {
    window.location.href = "bookings.html";
}

document.addEventListener('DOMContentLoaded', () => {
    const bookingForm = document.getElementById('booking-form');

    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const fullName = document.getElementById('full-name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const urlParams = new URLSearchParams(window.location.search);
            const bookingDetails = {
                type: urlParams.get('type') || 'Not specified',
                name: urlParams.get('name') || 'Not specified',
                price: urlParams.get('price') || '0'
            };

            // Combine all data
            const confirmationData = {
                ...bookingDetails,
                fullName,
                email,
                phone
            };

            // Save data to sessionStorage
            console.log("Saving confirmation data:", confirmationData);
            sessionStorage.setItem('confirmationData', JSON.stringify(confirmationData));

            // Redirect to confirmation page
            window.location.href = "confirmation.html";
        });
    }

    // Load data
    const confirmationDetails = document.getElementById('confirmation-details');
    if (confirmationDetails) {
        const confirmationData = sessionStorage.getItem('confirmationData');
        if (confirmationData) {
            const data = JSON.parse(confirmationData);
            console.log("Loaded confirmation data:", data);

            // Display data
            document.getElementById('booking-type').textContent = `Type: ${data.type}`;
            document.getElementById('booking-name').textContent = `Item: ${data.name}`;
            document.getElementById('booking-price').textContent = `Price: ₹${data.price}`;
            document.getElementById('user-name').textContent = `Booked by: ${data.fullName}`;
            document.getElementById('user-email').textContent = `Email: ${data.email}`;
            document.getElementById('user-phone').textContent = `Phone: ${data.phone}`;
        } else {
            console.warn("No booking data found in session storage.");
            confirmationDetails.innerHTML = "<p>No booking data found.</p>";
        }
    }
});
function redirect() {
    window.location.href = "index1.html";
}

function redirecttrue() {
    window.location.href = "payment.html";
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('confirmation-details')) {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }
});
