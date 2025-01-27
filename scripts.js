function showLoginForm() {
    document.getElementById('registration-container').style.display = 'none';
    document.getElementById('login-container').style.display = 'block';
}

function showRegistrationForm() {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('registration-container').style.display = 'block';
}

function registerUser() {
    // Form elements
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Error elements
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');

    // Clear previous errors
    nameError.style.display = 'none';
    emailError.style.display = 'none';
    passwordError.style.display = 'none';
    confirmPasswordError.style.display = 'none';

    let isValid = true;

    // Validate name
    if (name.length < 3) {
        nameError.textContent = 'Name must be at least 3 characters long.';
        nameError.style.display = 'block';
        isValid = false;
    }

    // Validate email (simple email regex pattern)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        emailError.textContent = 'Please enter a valid email address.';
        emailError.style.display = 'block';
        isValid = false;
    } else {
        // Check if email already exists
        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
        if (registeredUsers.some(user => user.email === email)) {
            emailError.textContent = 'Email already exists.';
            emailError.style.display = 'block';
            isValid = false;
        }
    }

    // Validate password
    const passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/;
    if (!passwordPattern.test(password)) {
        passwordError.textContent = 'Password must be at least 6 characters long, contain at least one uppercase letter, and include one special character.';
        passwordError.style.display = 'block';
        isValid = false;
    }

    // Confirm password match
    if (password !== confirmPassword) {
        confirmPasswordError.textContent = 'Passwords do not match.';
        confirmPasswordError.style.display = 'block';
        isValid = false;
    }

    if (isValid) {
        // Save user to localStorage
        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
        registeredUsers.push({ name, email, password });
        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));

        document.getElementById('registrationSuccess').textContent = 'Registration Successful.';
        document.getElementById('registrationSuccess').style.display = 'block';

        setTimeout(() => {
            showLoginForm();
        }, 2000);
    }

    return false; // Prevent form submission
}

function loginUser() {
    // Form elements
    const loginEmail = document.getElementById('loginEmail').value;
    const loginPassword = document.getElementById('loginPassword').value;

    // Error elements
    const loginEmailError = document.getElementById('loginEmailError');
    const loginPasswordError = document.getElementById('loginPasswordError');

    // Clear previous errors
    loginEmailError.style.display = 'none';
    loginPasswordError.style.display = 'none';

    let isValid = true;

    // Validate login email
    if (loginEmail.trim() === '') {
        loginEmailError.textContent = 'Please enter your username or email.';
        loginEmailError.style.display = 'block';
        isValid = false;
    }

    // Validate login password
    if (loginPassword.trim() === '') {
        loginPasswordError.textContent = 'Please enter your password.';
        loginPasswordError.style.display = 'block';
        isValid = false;
    }

    if (isValid) {
        // Check if login credentials match
        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
        const user = registeredUsers.find(user => (user.email === loginEmail || user.name === loginEmail) && user.password === loginPassword);

        if (user) {
            // Redirect to welcome page
            alert('Login Successful. Redirecting to the welcome page...');
            window.location.href = 'welcome.html';
        } else {
            loginPasswordError.textContent = 'Invalid email or password.';
            loginPasswordError.style.display = 'block';
        }
    }

    return false; // Prevent form submission
}
