let users = JSON.parse(localStorage.getItem("users")) || [];
let index = parseInt(localStorage.getItem("currentUserIndex"));

// 🔐 حماية الصفحة
if (!localStorage.getItem("currentUserIndex") || !users[index]) {
    window.location.href = "login.html";
}

const usernameText = document.getElementById("usernameText");
const editSection = document.getElementById("editSection");
const editUsernameInput = document.getElementById("editUsername");

// عرض اليوزر
function loadProfile() {
    usernameText.textContent = users[index].name;
}

function enableEdit() {
    editSection.style.display = "block";
    editUsernameInput.value = users[index].name;
}

function cancelEdit() {
    editSection.style.display = "none";
}

function saveUsername() {
    const newUsername = editUsernameInput.value.trim();

    if (newUsername === "") {
        alert("Username cannot be empty");
        return;
    }

    users[index].name = newUsername;
    localStorage.setItem("users", JSON.stringify(users));

    editSection.style.display = "none";
    loadProfile();
}

loadProfile();