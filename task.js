let users = JSON.parse(localStorage.getItem("users")) || [];
let index = parseInt(localStorage.getItem("currentUserIndex"));

function add(e) {
    e.preventDefault();

    if (!users[index].tasks) {
        users[index].tasks = [];
    }

    const title = document.getElementById("title").value;
    const dueDate = document.getElementById("dueDate").value;
    const priority = document.getElementById("priority").value;

    users[index].tasks.push({
        title,
        dueDate,
        priority,
        completed: false
    });

    localStorage.setItem("users", JSON.stringify(users));
    showTask();
    e.target.reset();
}

function showFilterTask(tasksArray) {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasksArray.forEach((task, taskIndex) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td id="title-${taskIndex}">${task.title}</td>
            <td id="date-${taskIndex}">${task.dueDate}</td>
            <td id="priority-${taskIndex}" class="${task.priority.toLowerCase()} ">${task.priority}</td>
            <td>${task.completed ? "Completed💯" : "Not Completed"}</td>
            <td id="actions-${taskIndex}">
                <button class="edit-btn" onclick="editTask(${taskIndex})">
                    Edit
                </button>
                <button class="done-btn" onclick="toggleTask(${taskIndex})">
                    ${task.completed ? "Undo" : "Done"}
                </button>
                <button class="delete-btn" onclick="deleteTask(${taskIndex})">
                    Delete
                </button>
            </td>
        `;
        list.appendChild(row);
    });
}
function showTask() {
    showFilterTask(users[index].tasks);
}

function toggleTask(taskIndex) {
    let task = users[index].tasks[taskIndex];
    task.completed = !task.completed;
    localStorage.setItem("users", JSON.stringify(users));
    showTask();
}


function deleteTask(taskIndex) {
    users[index].tasks.splice(taskIndex, 1);
    localStorage.setItem("users", JSON.stringify(users));
    showTask();
}

function editTask(taskIndex) {
    let task = users[index].tasks[taskIndex];
    document.getElementById(`title-${taskIndex}`).innerHTML =
        `<input class="text" type="text" id="edit-title-${taskIndex}" value="${task.title}">`;

    document.getElementById(`date-${taskIndex}`).innerHTML =
        `<input class="text" type="date" id="edit-date-${taskIndex}" value="${task.dueDate}">`;

    document.getElementById(`priority-${taskIndex}`).innerHTML =
        `
        <select class="text" id="edit-priority-${taskIndex}">
            <option ${task.priority === "High" ? "selected" : ""}>High</option>
            <option ${task.priority === "Medium" ? "selected" : ""}>Medium</option>
            <option ${task.priority === "Low" ? "selected" : ""}>Low</option>
        </select>
        `;
    document.getElementById(`actions-${taskIndex}`).innerHTML =
        `
        <button onclick="saveTask(${taskIndex})" class="done-btn">Save</button>
        <button onclick="showTask()" class="delete-btn">Cancel</button>
        `;

}

function saveTask(taskIndex){
    let task = users[index].tasks[taskIndex];

    task.title = document.getElementById(`edit-title-${taskIndex}`).value;
    task.dueDate = document.getElementById(`edit-date-${taskIndex}`).value;
    task.priority = document.getElementById(`edit-priority-${taskIndex}`).value;

    localStorage.setItem("users", JSON.stringify(users));
    showTask();
}


document.getElementById("searchInput").addEventListener("input", function () {
    let value = this.value.toLowerCase();

    filteredTasks = users[index].tasks.filter(task =>
        task.title.toLowerCase().startsWith(value)
    );
    showFilterTask(filteredTasks)
});
showTask();