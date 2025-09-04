    const form = document.getElementById("authForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const formTitle = document.getElementById("form-title");
    const formSubtitle = document.getElementById("form-subtitle");
    const mainBtn = document.getElementById("mainBtn");
    const switchText = document.getElementById("switchText");
    const switchLink = document.getElementById("switchLink");

    let isLogin = true; // по умолчанию — вход;

    // переключение режимов (логин/регистрация);
    switchLink.addEventListener("click", () => {
    isLogin = !isLogin;
    if (isLogin) {
    formTitle.textContent = "Log in to your account";
    formSubtitle.textContent = "Welcome back! Please enter your details.";
    mainBtn.textContent = "Login";
    switchText.innerHTML = `Don't have an account? <a id="switchLink">Register</a>`;
} else {
    formTitle.textContent = "Create an account";
    formSubtitle.textContent = "Please enter your details to register.";
    mainBtn.textContent = "Register";
    switchText.innerHTML = `Already have an account? <a id="switchLink">Login</a>`;
}
});

    // получить пользователей из localStorage;
    function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}

    // сохранить пользователей;
    function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}

    // обработка формы;
    form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    let users = getUsers();

    if (isLogin) {
    // вход;
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
    alert("✅ Login successful!");
} else {
    alert("❌ Incorrect email or password!");
}
} else {
    // регистрация;
    const exists = users.some(u => u.email === email);
    if (exists) {
    alert("⚠️ User with this email already exists!");
} else {
    users.push({ email, password });
    saveUsers(users);
    alert("🎉 Registration successful! Now you can log in.");
    isLogin = true;
    formTitle.textContent = "Log in to your account";
    formSubtitle.textContent = "Welcome back! Please enter your details.";
    mainBtn.textContent = "Login";
    switchText.innerHTML = `Don't have an account? <a id="switchLink">Register</a>`;
}
}
});
