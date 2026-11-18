const loginForm = document.getElementById("loginForm");

const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

if (passwordInput && togglePassword) {
    togglePassword.addEventListener("click", function() {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            togglePassword.textContent = "🙈";
        } else {
            passwordInput.type = "password";
            togglePassword.textContent = "👁️";
        }
    });
}

const rememberMe = document.getElementById("rememberMe");

const savedEmail = localStorage.getItem("savedEmail");

const emailInput = document.getElementById("email");

if (savedEmail && emailInput && rememberMe) {
    emailInput.value = savedEmail;
    rememberMe.checked = true;
}

if (loginForm) {
loginForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Condition 1: Email blank
    if (email === "") {
        alert("Please enter a your email address.");
        return;
    }

    //Condition 2: Invalid email format
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    // Condition 3: Password blank
    if (password.trim() === "") {
        alert("Please enter your password.");
        return;
    }

    const accounts = JSON.parse(localStorage.getItem("accounts")) || {};

    //Condition 4: Existing email with incorrect password
    if (accounts[email]) {
        if (accounts[email] !== password) {
            alert("Incorrect password! Please try again.");
            return;
        }
    } else {
        accounts[email] = password;
        localStorage.setItem("accounts", JSON.stringify(accounts));
    }

    if (rememberMe.checked) {
        localStorage.setItem("savedEmail", email);
    } else {
        localStorage.removeItem("savedEmail");
    }

    window.location.href = "welcome.html";
});
}

const forgotPassword = document.getElementById("forgotPassword");
if (forgotPassword) {
forgotPassword.addEventListener("click", function(event) {
    event.preventDefault();

    alert("Please contact the administrator for password assistance.");
});
}

function logout() {
    window.location.href = "index.html";
}