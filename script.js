// ===== Redirect if not logged in =====
function checkLogin() {
    if (!localStorage.getItem("username")) {
        window.location.href = "index.html";
    }
}


// ===== Clock =====
function startClock(elementId) {
    function updateClock() {
        const now = new Date();
        var clock = now.toLocaleTimeString();
        document.getElementById(elementId).innerHTML = `<h2>Clock</h2> <div>${clock}</div>`;
    }
    setInterval(updateClock, 1000);
    updateClock();
}
let users = JSON.parse(localStorage.getItem("users")) || [];
let index = parseInt(localStorage.getItem("currentUserIndex"));
document.getElementsByClassName("user")[0].innerText = `Hello ${users[index].name}✌️`;