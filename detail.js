document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modal");
    const menuContent = document.getElementById("menuContent");
    const openModalBtn = document.getElementById("openModal");
    const closeModalBtn = document.getElementById("closeModal");

    openModalBtn?.addEventListener("click", () => {
        modal.classList.remove("hidden");
        menuContent.classList.remove("modal-closed");
        menuContent.classList.add("modal-open");
    });

    closeModalBtn?.addEventListener("click", () => {
        modal.classList.add("hidden");
        menuContent.classList.remove("modal-open");
        menuContent.classList.add("modal-closed");
    });

    const params = new URLSearchParams(window.location.search);
    const studentIndex = params.get("index");

    if (studentIndex !== null) {
        loadStudentDetail(parseInt(studentIndex));
    }

    function loadStudentDetail(index) {
        const students = JSON.parse(localStorage.getItem("students")) || [];
        if (students[index]) {
            const student = students[index];

            const studentName = document.getElementById("studentName");
            const studentEmail = document.getElementById("studentEmail");
            const studentPhone = document.getElementById("studentPhone");
            const studentEnroll = document.getElementById("studentEnroll");
            const studentDate = document.getElementById("studentDate");
            const studentImage = document.getElementById("studentImage");

            if (studentName) studentName.textContent = student.name;
            if (studentEmail) studentEmail.textContent = student.email;
            if (studentPhone) studentPhone.textContent = student.phone;
            if (studentEnroll) studentEnroll.textContent = student.enrollNumber;
            if (studentDate) studentDate.textContent = student.date;
            if (studentImage && student.image) studentImage.src = student.image;
        } else {
            alert("Student not found!");
            window.location.href = "student.html";
        }
    }
});

function logout() {
    localStorage.removeItem("admin");
    window.location.href = "login.html";
}