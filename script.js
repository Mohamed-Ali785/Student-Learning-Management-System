// ===== Redirect if not logged in =====
function checkLogin(){
    if(!localStorage.getItem("username")){
        window.location.href = "index.html";
    }
}

// ===== Logout Function =====
function logout(){
    localStorage.clear();
    window.location.href = "index.html";
}

// ===== Clock =====
function startClock(elementId){
    function updateClock(){
        const now = new Date();
        document.getElementById(elementId).innerText = now.toLocaleTimeString();
    }
    setInterval(updateClock,1000);
    updateClock();
}