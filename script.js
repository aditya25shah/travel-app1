// smooth scrolling hai
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
//resticted links with id (header and footer of the page)
    const restrictedLinks = ['flights-link','trains-link', 'cars-link', 'hotels-link', 'about-link','flights-link-footer','trains-link-footer', 'cars-link-footer', 'hotels-link-footer'];
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
function downloadPDF() {
    const storedData = sessionStorage.getItem('confirmationData');

    if (!storedData) {
        alert("No booking data available to generate PDF.");
        return;
    }
    
    try {
        const data = JSON.parse(storedData);
        console.log("Generating PDF with:", data);
        const price = parseFloat(data.price);
        if (isNaN(price)) {
            console.error("Invalid price:", data.price);
            data.price = "0.00"; 
        } else {
            data.price = price.toFixed(2); // Ensure two decimal places
        }
        if (!window.jspdf) {
            throw new Error("jsPDF library not loaded.");
        }
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        const margin = 20;
        let y = margin; 
        const logoUrl = "adi.png";
        doc.addImage(logoUrl, "PNG", margin, y, 30, 30);
        y += 40;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(24);
        doc.setTextColor(0, 0, 0); 
        doc.text("Booking Details", margin, y);
        y += 10;
        doc.setDrawColor(0, 0, 0); 
        doc.setLineWidth(0.5);
        doc.line(margin, y, doc.internal.pageSize.getWidth() - margin, y);
        y += 10; 
        doc.setFont("helvetica", "bold");
        doc.setFontSize(18);
        doc.setTextColor(0, 0, 0); 
        doc.text("Booking Details", margin, y);
        y += 15; // Move down after the heading
    
        doc.setFont("helvetica", "normal");
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0); 
        doc.text(`Type: ${data.type}`, margin, y);
        y += 10; //  type
        doc.text(`Item: ${data.name}`, margin, y);
        y += 10; // item
        doc.text(`Price: ₹${data.price}`, margin, y);
        y += 10; // price
        doc.text(`Duration: ${data.duration} days`, margin, y);
        y += 20; //  duration
        
        //Information Section
        doc.setFont("helvetica", "bold");
        doc.setFontSize(18);
        doc.setTextColor(0, 0, 0); 
        doc.text("User Information", margin, y);
        y += 15; // heading
        
        doc.setFont("helvetica", "normal");
        doc.setFontSize(14);
        doc.setTextColor(60, 60, 60);
        doc.text(`Booked by: ${data.fullName}`, margin, y);
        y += 10; //name
        doc.text(`Email: ${data.email}`, margin, y);
        y += 10; //email
        doc.text(`Phone: ${data.phone}`, margin, y);
        y += 20; //phone
        doc.setFont("helvetica", "italic");
        doc.setFontSize(12);
        doc.setTextColor(100, 100, 100); 
        doc.text("Thank you for choosing Ghumo.com!", margin, y);
        y += 10; // Move down after the thank-you message
        doc.text("Contact us at aditya546shah@gmail.com for any queries.", margin, y);
        // Save PDF
        doc.save("Booking(Ghumo.com).pdf");     
        // Send Email Notification
        const emailData = {
            name: data.fullName,
            email: data.email,
            actions: `Booking Done the Details are: ${JSON.stringify(data)}`,
        };

        emailjs.send('service_gz495sx', 'template_x00aoqc', emailData)
            .then(function(response) {
                console.log('Email sent!', response.status, response.text);
            }, function(error) {
                console.error('Error sending email:', error);
            });
    } catch (error) {
        console.error("Error generating PDF:", error);
        alert("An error occurred while generating the PDF. Please try again.");
    }
    window.location.href="index1.html";
}