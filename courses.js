let users = JSON.parse(localStorage.getItem("users")) || [];
let index = parseInt(localStorage.getItem("currentUserIndex"));

function add(e) {
    e.preventDefault();

    if (!users[index].courses) {
        users[index].courses = [];
    }

    const courseName = document.getElementById("courseName").value;
    const instructor = document.getElementById("instructor").value;

    users[index].courses.push({
        courseName,
        instructor,
    });

    localStorage.setItem("users", JSON.stringify(users));
    showCourse();
    e.target.reset();
}

function showFilterCourse(coursesArray) {

    const list = document.getElementById("courseList");
    list.innerHTML = "";

    coursesArray.forEach((course, courseIndex) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td id="name-${courseIndex}">${course.courseName}</td>
            <td id="instructor-${courseIndex}">${course.instructor}</td>
            <td id="actions-${courseIndex}">
                <button class="edit-btn" onclick="editCourse(${courseIndex})">
                    Edit
                </button>
                <button class="delete-btn" onclick="deleteCourse(${courseIndex})">
                    Delete
                </button>
            </td>
        `;
        list.appendChild(row);
    });
}
function showCourse() {
    showFilterCourse(users[index].courses);
}



function deleteCourse(courseIndex) {
    users[index].courses.splice(courseIndex, 1);
    localStorage.setItem("users", JSON.stringify(users));
    showCourse();
}

function editCourse(courseIndex) {
    let course = users[index].courses[courseIndex];
    document.getElementById(`name-${courseIndex}`).innerHTML =
        `<input class="text" type="text" id="edit-courseName-${courseIndex}" value="${course.courseName}">`;

    document.getElementById(`instructor-${courseIndex}`).innerHTML =
        `<input class="text" type="text" id="edit-instructor-${courseIndex}" value="${course.instructor}">`;

    document.getElementById(`actions-${courseIndex}`).innerHTML =
        `
        <button onclick="saveCourse(${courseIndex})" class="done-btn">Save</button>
        <button onclick="showCourse()" class="delete-btn">Cancel</button>
        `;

}

function saveCourse(courseIndex){
    let course = users[index].courses[courseIndex];

    course.courseName = document.getElementById(`edit-courseName-${courseIndex}`).value;
    course.instructor = document.getElementById(`edit-instructor-${courseIndex}`).value;

    localStorage.setItem("users", JSON.stringify(users));
    showCourse();
}


// document.getElementById("searchInput").addEventListener("input", function () {
//     let value = this.value.toLowerCase();

//     filteredCourse = users[index].courses.filter(course =>
//         course.courseName.toLowerCase().startsWith(value)
//     );
//     showFilterCourse(filteredCourse)
// });

showCourse();