document.addEventListener('DOMContentLoaded', () => {
    const studentListBody = document.querySelector('.studentListBody');
    const modal = document.querySelector('.studentModal');
    const addStudentBtn = document.querySelector('.addStudentBtn');
    const cancelBtn = document.querySelector('.cancelBtn');
    const saveBtn = document.querySelector('.saveBtn');
    const nameInput = document.querySelector('.studentName');
    const emailInput = document.querySelector('.studentEmail');
    const phoneInput = document.querySelector('.studentPhone');
    const enrollInput = document.querySelector('.studentEnroll');
    const dateInput = document.querySelector('.studentDate');
    let editIndex = null;

    function renderStudents() {
        let students = JSON.parse(localStorage.getItem('students')) || [];
        studentListBody.innerHTML = '';

        students.forEach((student, index) => {
            let row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <img class="studentImg w-10 h-10 rounded-full cursor-pointer" data-index="${index}" src="${student.image || './Sample_User_Icon.png'}" alt="User">
                </td>
                <td>${student.name}</td>
                <td>${student.email}</td>
                <td>${student.phone}</td>
                <td>${student.enrollNumber}</td>
                <td>${student.date}</td>
                <td>
                    <button class="editBtn" data-index="${index}">✏️</button>
                    <button class="deleteBtn" data-index="${index}">🗑️</button>
                </td>
            `;
            studentListBody.appendChild(row);
        });
    }

    function showModal(isEdit = false) {
        modal.classList.remove('hidden');
        saveBtn.textContent = isEdit ? "Update" : "Save";
    }

    function closeModal() {
        modal.classList.add('hidden');
        nameInput.value = "";
        emailInput.value = "";
        phoneInput.value = "";
        enrollInput.value = "";
        dateInput.value = "";
        editIndex = null;
    }

    function addStudent() {
        let students = JSON.parse(localStorage.getItem('students')) || [];
        let student = {
            name: nameInput.value,
            email: emailInput.value,
            phone: phoneInput.value,
            enrollNumber: enrollInput.value,
            date: dateInput.value,
            image: "./Sample_User_Icon.png"
        };

        if (Object.values(student).every(val => val.trim() !== "")) {
            students.push(student);
            localStorage.setItem('students', JSON.stringify(students));
            renderStudents();
            closeModal();
        } else {
            alert('Please fill in all fields!');
        }
    }

    function editStudent(index) {
        let students = JSON.parse(localStorage.getItem('students')) || [];
        let student = students[index];

        nameInput.value = student.name;
        emailInput.value = student.email;
        phoneInput.value = student.phone;
        enrollInput.value = student.enrollNumber;
        dateInput.value = student.date;
        editIndex = index;
        showModal(true);
    }

    function updateStudent() {
        if (editIndex !== null) {
            let students = JSON.parse(localStorage.getItem('students')) || [];
            students[editIndex] = {
                name: nameInput.value,
                email: emailInput.value,
                phone: phoneInput.value,
                enrollNumber: enrollInput.value,
                date: dateInput.value,
                image: "./Sample_User_Icon.png"
            };
            localStorage.setItem('students', JSON.stringify(students));
            renderStudents();
            closeModal();
        }
    }

    function deleteStudent(index) {
        let students = JSON.parse(localStorage.getItem('students')) || [];
        students.splice(index, 1);
        localStorage.setItem('students', JSON.stringify(students));
        renderStudents();
    }

    addStudentBtn?.addEventListener('click', () => {
        editIndex = null;
        showModal(false);
    });

    cancelBtn?.addEventListener('click', closeModal);

    studentListBody?.addEventListener('click', (e) => {
        let index = e.target.dataset.index;
        if (!index) return;
        index = parseInt(index, 10);
        if (e.target.classList.contains('deleteBtn')) {
            deleteStudent(index);
        } else if (e.target.classList.contains('editBtn')) {
            editStudent(index);
        } else if (e.target.classList.contains('studentImg')) {
            openDetail(index);
        }
    });

    document.querySelector('.searchInput')?.addEventListener('input', function () {
        let searchValue = this.value.toLowerCase();
        let students = JSON.parse(localStorage.getItem('students')) || [];
        studentListBody.innerHTML = "";

        students.forEach((student, index) => {
            if (student.name.toLowerCase().includes(searchValue) || student.email.toLowerCase().includes(searchValue)) {
                let row = document.createElement('tr');
                row.innerHTML = `
                    <td>
                        <img class="studentImg w-10 h-10 rounded-full cursor-pointer" data-index="${index}" src="${student.image || './Sample_User_Icon.png'}" alt="User">
                    </td>
                    <td>${student.name}</td>
                    <td>${student.email}</td>
                    <td>${student.phone}</td>
                    <td>${student.enrollNumber}</td>
                    <td>${student.date}</td>
                    <td>
                        <button class="editBtn" data-index="${index}">✏️</button>
                        <button class="deleteBtn" data-index="${index}">🗑️</button>
                    </td>
                `;
                studentListBody.appendChild(row);
            }
        });
    });

    renderStudents();
});

function openDetail(index) {
    window.location.href = `detail.html?index=${index}`;
}

function StudentBtn() {
    window.location.href = "student.html";
}