function validateLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    if (username === 'Chaotic Curls' && password === 'nithyastfu') {
        localStorage.setItem('isLoggedIn', 'true'); // Store login status in localStorage
        window.location.href = 'loading.html'; // Redirect to loading page or main_page.html
        return false; // Prevent form submission
    } else {
        errorMessage.textContent = 'Lower your excitement and enter properly!';
        return false; // Prevent form submission
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const aboutUsLink = document.getElementById('aboutUsLink');
    const aboutUsPopup = document.getElementById('aboutUsPopup');
    const closeButton = document.querySelector('.close-button');
    const aboutUsForm = document.getElementById('aboutUsForm');
    const errorMessage = document.getElementById('error-message');
    const thankYouNoteButton = document.getElementById('thankYouNoteButton');
    const thankYouNotePopup = document.getElementById('thankYouNotePopup');

    aboutUsLink.addEventListener('click', function(event) {
        event.preventDefault();
        aboutUsPopup.style.display = 'flex';
    });

    closeButton.addEventListener('click', function() {
        aboutUsPopup.style.display = 'none';
        errorMessage.textContent = ''; // Clear error message
    });

    aboutUsForm.addEventListener('submit', function(event) {
        event.preventDefault();
        validateLogin();
    });

    thankYouNoteButton.addEventListener('click', function(event) {
        event.preventDefault();
        thankYouNotePopup.style.display = 'flex';
    });

    document.querySelector('.close-button').addEventListener('click', function() {
        thankYouNotePopup.style.display = 'none';
    });
});

document.getElementById('aboutUsForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting

    const username = document.getElementById('aboutUsUsername').value;
    const password = document.getElementById('aboutUsPassword').value;
    const errorMessage = document.getElementById('error-message'); // Ensure this matches the ID in your HTML

    if (username === 'dubukku' && password === 'blazermama') {
        window.location.href = 'about_us.html';
    } else {
        errorMessage.textContent = 'Lower your excitement and enter properly!';
    }
});

