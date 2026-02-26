let users = JSON.parse(localStorage.getItem("users")) || [];
let index = parseInt(localStorage.getItem("currentUserIndex"));

function showData() {

    let userName = users[index].name;
    let faculty = users[index].faculty;
    let email = users[index].email;

    let userNameTag = document.getElementById("name");
    let facultyTag = document.getElementById("faculty");
    let emailTag = document.getElementById("email");

    userNameTag.classList.add("data");
    userNameTag.classList.remove("editData");
    facultyTag.classList.add("data");
    facultyTag.classList.remove("editData");
    emailTag.classList.add("data");
    emailTag.classList.remove("editData");

    userNameTag.innerHTML = `<div class="data">${userName}</div>`;
    facultyTag.innerHTML = `<div class="data">${faculty}</div>`;
    emailTag.innerHTML = `<div class="data">${email}</div>`;

    document.getElementById(`edit`).innerHTML = `
    <button class="edit-btn" onclick="editProfile()">Edit</button>
    `;
}

function editProfile() {
    let user = users[index];

    let userNameTag = document.getElementById("name");
    let facultyTag = document.getElementById("faculty");
    let emailTag = document.getElementById("email");

    userNameTag.innerHTML =
        `<input class="text" type="text" id="edit-userName" value="${user.name}">`;

    facultyTag.innerHTML =
        `<input class="text" type="text" id="edit-faculty" value="${user.faculty}">`;

    emailTag.innerHTML =
        `<input class="text" type="text" id="edit-email" value="${user.email}">`;

    document.getElementById(`edit`).innerHTML =
        `
        <button onclick="saveProfile()" class="done-btn">Save</button>
        <button onclick="showData()" class="delete-btn">Cancel</button>
        `;

    userNameTag.classList.add("editData");
    userNameTag.classList.remove("data");
    facultyTag.classList.add("editData");
    facultyTag.classList.remove("data");
    emailTag.classList.add("editData");
    emailTag.classList.remove("data");
}

function saveProfile() {
    let user = users[index];

    nameInputTag = document.getElementById("edit-userName");
    facultyInputTag = document.getElementById("edit-faculty");
    emailInputTag = document.getElementById("edit-email");

    const emailRegex = /^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/;
    const textRegex = /^[A-Za-z\s]+$/;

    if (!textRegex.test(nameInputTag.value)) {
        alert("Name must contain letters only");
        nameInputTag.style.border = "3px solid #840505";
        return;
    }
    
    if (!textRegex.test(facultyInputTag.value)) {
        alert("Faculty must contain letters only");
        facultyInputTag.style.border = "3px solid #840505";
        return;
    }

    if (!emailRegex.test(emailInputTag.value)) {
        alert("Please enter a valid email");
        emailInputTag.style.border = "3px solid #840505";
        return;
    }
    
    user.name = nameInputTag.value;
    user.faculty = facultyInputTag.value;
    user.email = emailInputTag.value;
    localStorage.setItem("users", JSON.stringify(users));
    showData();
}
showData();