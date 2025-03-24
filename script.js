let tasks = [];

class Task {
  constructor(name, description) {
    this.name = name;
    this.description = description;
    this.status = 'pending';
  }
}

function addTask(name, description) {
  // Prevent duplicate tasks
  if (tasks.some(task => task.name.toLowerCase() === name.toLowerCase())) {
    alert("Task with this name already exists!");
    return;
  }
  const task = new Task(name, description);
  tasks.push(task);
  saveTasks();
  renderTasks();
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';
  
  const filterValue = document.getElementById('taskFilter').value;
  
  const filteredTasks = tasks.filter(task => {
    if (filterValue === 'all') return true;
    return task.status === filterValue;
  });

  if (filteredTasks.length === 0) {
    const li = document.createElement('li');
    li.textContent = 'No tasks found';
    li.setAttribute('data-empty', 'true');
    taskList.appendChild(li);
    return;
  }

  filteredTasks.forEach((task, index) => {
    const originalIndex = tasks.findIndex(t => t.name === task.name && t.description === task.description);
    const li = document.createElement('li');
    li.classList.add('task-item');
    li.innerHTML = `
      <div class="task-text ${task.status === 'completed' ? 'completed' : ''}">
        ${task.name}: ${task.description}
      </div>
      <div class="task-buttons">
        <button onclick="deleteTask(${originalIndex})">❌</button>
        <button onclick="toggleTaskStatus(${originalIndex})">
          ${task.status === 'completed' ? '🔄' : '✔️'}
        </button>
        <button onclick="openEditModal(${originalIndex})">✏️</button>
      </div>
    `;

    taskList.appendChild(li);
  });
}
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function toggleTaskStatus(index) {
  tasks[index].status = tasks[index].status === 'completed' ? 'pending' : 'completed';
  saveTasks();
  renderTasks();
}

function openEditModal(index) {
  const editModal = document.getElementById('editModal');
  const overlay = document.querySelector('.modal-overlay');

  document.getElementById('editTaskName').value = tasks[index].name;
  document.getElementById('editTaskDescription').value = tasks[index].description;
  document.getElementById('saveEditBtn').setAttribute('onclick', `editTask(${index})`);

  editModal.style.display = 'block';
  overlay.style.display = 'block';
  document.body.classList.add('modal-open');
}

function closeEditModal() {
  document.getElementById('editModal').style.display = 'none';
  document.querySelector('.modal-overlay').style.display = 'none';
  document.body.classList.remove('modal-open');
}

document.querySelector('.modal-overlay').addEventListener('click', closeEditModal);
document.getElementById('closeModal').addEventListener('click', closeEditModal);

function editTask(index) {
  let newTaskName = document.getElementById('editTaskName').value.trim();
  let newTaskDescription = document.getElementById('editTaskDescription').value.trim();

  if (newTaskName && newTaskDescription) {
    tasks[index].name = newTaskName;
    tasks[index].description = newTaskDescription;
    saveTasks();
    renderTasks();
    closeEditModal();
  }
}

document.getElementById('addTaskBtn').addEventListener('click', () => {
  const taskName = document.getElementById('taskName').value.trim();
  const taskDescription = document.getElementById('taskDescription').value.trim();

  if (taskName && taskDescription) {
    addTask(taskName, taskDescription);
    document.getElementById('taskName').value = '';
    document.getElementById('taskDescription').value = '';
  }
});

document.getElementById('taskFilter').addEventListener('change', renderTasks);

function loadTasks() {
  const savedTasks = localStorage.getItem('tasks');
  tasks = savedTasks ? JSON.parse(savedTasks) : [];
  // Ensure modal is hidden on load
  document.getElementById('editModal').style.display = 'none';
  document.querySelector('.modal-overlay').style.display = 'none';
  renderTasks();
}

window.onload = loadTasks;
