function signUp() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    if (username.trim() !== '' && password.trim() !== '') {
      
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
  
      window.open("signin.html", "_blank");
    } else {
      alert('Royhatdan otingz!');
    }
  }
  function signIn() {
    const signInUsername = document.getElementById('signInUsername').value;
    const signInPassword = document.getElementById('signInPassword').value;
  
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');
  
    if (signInUsername === storedUsername && signInPassword === storedPassword) {
     
      window.open("student.html", "_blank")
    } else {
      alert('Notogri kiritdingiz');
      window.open("signin.html", "_blank")
    }
  }
  function openPage2() {
    window.open("signup.html", "_blank")
  }
  const openModal = document.getElementById('openModal');
  const closeModal = document.getElementById('closeModal');
  const modal = document.getElementById('modal');
  const menuContent = document.getElementById('menuContent');
  const usernameDisplay = document.getElementById('usernameDisplay');
  
  const storedUsername = localStorage.getItem('username') || 'Guest';
  usernameDisplay.textContent = `${storedUsername}`;
  
  openModal.addEventListener('click', () => {
      modal.classList.remove('hidden');
      menuContent.classList.remove('modal-closed');
      menuContent.classList.add('modal-open');
  });
  
  closeModal.addEventListener('click', () => {
      menuContent.classList.remove('modal-open');
      menuContent.classList.add('modal-closed');
      setTimeout(() => {
          modal.classList.add('hidden');
      }, 300);
    })
    

    function logout() {
      window.open("signin.html", "_blank")
    }
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
          const students = JSON.parse(localStorage.getItem('students')) || [];
          studentListBody.innerHTML = '';
  
          students.forEach((student, index) => {
              const row = document.createElement('tr');
              row.innerHTML = `
              <img onclick="openDetail()" class="studentImg" src="./Sample_User_Icon.png" alt="">
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
  
          if (!isEdit) {
              saveBtn.textContent = "Save";
              saveBtn.onclick = addStudent;
          } else {
              saveBtn.textContent = "Update";
              saveBtn.onclick = updateStudent;
          }
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
          const name = nameInput.value;
          const email = emailInput.value;
          const phone = phoneInput.value;
          const enrollNumber = enrollInput.value;
          const date = dateInput.value;
  
          if (name && email && phone && enrollNumber && date) {
              let students = JSON.parse(localStorage.getItem('students')) || [];
              students.push({ name, email, phone, enrollNumber, date });
              localStorage.setItem('students', JSON.stringify(students));
              renderStudents();
              closeModal();
          } else {
              alert('Barcha maydonlarni to‘ldiring!');
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
                  date: dateInput.value
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
  
      addStudentBtn.addEventListener('click', () => showModal(false));
      cancelBtn.addEventListener('click', closeModal);
      studentListBody.addEventListener('click', (e) => {
          if (e.target.classList.contains('deleteBtn')) {
              deleteStudent(e.target.dataset.index);
          } else if (e.target.classList.contains('editBtn')) {
              editStudent(e.target.dataset.index);
          }
      });
  
      renderStudents();
  });
  document.querySelector('.searchInput').addEventListener('input', function () {
    const searchValue = this.value.toLowerCase();
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const studentListBody = document.querySelector('.studentListBody');

    studentListBody.innerHTML = '';

    students.forEach((student, index) => {
        if (
            student.name.toLowerCase().includes(searchValue) ||
            student.email.toLowerCase().includes(searchValue)
        ) {
            const row = document.createElement('tr');
            row.innerHTML = `
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

function openDetail() {
  window.open("detail.html", "_blank")
}


function StudentBtn() {
  window.open("student.html", "_blank")
}
document.addEventListener('DOMContentLoaded', () => {
  const studentListBody = document.querySelector('.studentListBody');
  
  function renderStudents() {
      const students = JSON.parse(localStorage.getItem('students')) || [];
      studentListBody.innerHTML = '';

      students.forEach((student, index) => {
          const row = document.createElement('tr');
          row.innerHTML = `
              <td>
                  <img onclick="openDetail(${index})" class="studentImg w-10 h-10 rounded-full cursor-pointer" src="${student.image || './Sample_User_Icon.png'}" alt="User">
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

  renderStudents();
});