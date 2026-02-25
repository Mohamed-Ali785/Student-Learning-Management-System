let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    const title = document.getElementById("title").value;
    const dueDate = document.getElementById("dueDate").value;
    const priority = document.getElementById("priority").value;

    if (title === "" || dueDate === "") {
        alert("Please fill all fields");
        return;
    }

    tasks.push({
        id: Date.now(),
        title,
        dueDate,
        priority,
        completed: false
    });

    saveTasks();
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

function toggleTask(id) {
    const task = tasks.find(task => task.id === id);
    task.completed = !task.completed;
    saveTasks();
    renderTasks();
}

function renderTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach(task => {
        const row = document.createElement("tr");

        if (task.completed) {
            row.classList.add("done");
        }

        row.innerHTML = `
            <td>${task.title}</td>
            <td>${task.dueDate}</td>
            <td class="${task.priority.toLowerCase()}">${task.priority}</td>
            <td>${task.completed ? "Done" : "Not Done"}</td>
            <td>
                <button class="done-btn" onclick="toggleTask(${task.id})">
                    ${task.completed ? "Undo" : "Done"}
                </button>
                <button class="delete-btn" onclick="deleteTask(${task.id})">
                    Delete
                </button>
            </td>
        `;

        list.appendChild(row);
    });
}       

renderTasks();