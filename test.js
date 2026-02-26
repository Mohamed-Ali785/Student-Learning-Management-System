let courses = JSON.parse(localStorage.getItem("courses")) || [];

const form = document.getElementById("courseForm");
const courseList = document.getElementById("courseList");

function displayCourses() {
    courseList.innerHTML = "";

    courses.forEach((course, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <div>
                <strong>${course.name}</strong><br>
                <small>${course.instructor}</small>
            </div>
            <button class="delete-btn" onclick="deleteCourse(${index})">
                Delete
            </button>
        `;

        courseList.appendChild(li);
    });
}

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("courseName").value;
    const instructor = document.getElementById("instructorName").value;

    const newCourse = {
        name: name,
        instructor: instructor
    };

    courses.push(newCourse);
    localStorage.setItem("courses", JSON.stringify(courses));

    form.reset();
    displayCourses();
});

function deleteCourse(index) {
    courses.splice(index, 1);
    localStorage.setItem("courses", JSON.stringify(courses));
    displayCourses();
}

displayCourses();