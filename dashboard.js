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

startClock("clock");

let users = JSON.parse(localStorage.getItem("users")) || [];
let index = parseInt(localStorage.getItem("currentUserIndex"));
document.getElementsByClassName("user")[0].innerText = `Hello ${users[index].name}✌️`;

const announcements = [
    "📢 New assignment posted in Java.",
    "📅 Live Cloud session at 2 PM.",
    "🔔 Submit Client Side Technologies by Friday.",
    "🏆 Congrats to Mohmamed for C/C++ course completion!"
];
let currentIndex = 0;
function showAnnouncement() { document.getElementById("announcementText").innerText = announcements[currentIndex]; }
function nextAnnouncement() { currentIndex = (currentIndex + 1) % announcements.length; showAnnouncement(); }
showAnnouncement();

const tasks = users[index].tasks
const totalTasks = tasks.length;
const completedTasks = tasks.filter(t => t.completed).length;
const pendingTasks = totalTasks - completedTasks;

const courses=users[index].courses;
const totalCourses=courses.length;
document.getElementById("totalTasks").innerText = totalTasks;
document.getElementById("completedTasks").innerText = completedTasks;
document.getElementById("pendingTasks").innerText = pendingTasks;
document.getElementById("totalCourses").innerText = totalCourses;

