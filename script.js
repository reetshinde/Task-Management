let tasks = []; // Array to store tasks

// Task class to create new task objects
class Task {
  constructor(name, description) {
    this.name = name;
    this.description = description;
    this.status = 'pending'; //default status
  }
}
// Function to add a new task
function addTask(name, description) {
  // Prevent duplicate tasks
  if (tasks.some(task => task.name.toLowerCase() === name.toLowerCase())) {
    alert("Task with this name already exists!");
    return;
  }
  const task = new Task(name, description); // Create a new task and add it to the task list
  tasks.push(task);
  saveTasks();
  renderTasks();
}

// Function to save tasks to local storage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to render tasks on the page
function renderTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';
  
  const filterValue = document.getElementById('taskFilter').value;
  // Filter tasks based on their status
  const filteredTasks = tasks.filter(task => {
    if (filterValue === 'all') return true;
    return task.status === filterValue;
  });
// Display message if no tasks are found
  if (filteredTasks.length === 0) {
    const li = document.createElement('li');
    li.textContent = 'No tasks found';
    li.setAttribute('data-empty', 'true');
    taskList.appendChild(li);
    return;
  }
// Display message for each task
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
// Function to delete a task by index
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}
// Function to toggle task status between 'pending' and 'completed'
function toggleTaskStatus(index) {
  tasks[index].status = tasks[index].status === 'completed' ? 'pending' : 'completed';
  saveTasks();
  renderTasks();
}
// Function to open the edit modal and populate fields with task data
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
// Function to close the edit modal
function closeEditModal() {
  document.getElementById('editModal').style.display = 'none';
  document.querySelector('.modal-overlay').style.display = 'none';
  document.body.classList.remove('modal-open');
}
// Event listener to close modal when clicking outside of it
document.querySelector('.modal-overlay').addEventListener('click', closeEditModal);
document.getElementById('closeModal').addEventListener('click', closeEditModal);
// Function to edit an existing task
function editTask(index) {
  let newTaskName = document.getElementById('editTaskName').value.trim();
  let newTaskDescription = document.getElementById('editTaskDescription').value.trim();
// Ensure input fields are not empty before saving
  if (newTaskName && newTaskDescription) {
    tasks[index].name = newTaskName;
    tasks[index].description = newTaskDescription;
    saveTasks();
    renderTasks();
    closeEditModal();
  }
}
// Event listener for adding a task when the "Add Task" button is clicked
document.getElementById('addTaskBtn').addEventListener('click', () => {
  const taskName = document.getElementById('taskName').value.trim();
  const taskDescription = document.getElementById('taskDescription').value.trim();

  if (taskName && taskDescription) {
    addTask(taskName, taskDescription);
    document.getElementById('taskName').value = '';
    document.getElementById('taskDescription').value = '';
  }
});
// Event listener to re-render tasks when filter option is changed
document.getElementById('taskFilter').addEventListener('change', renderTasks);

function loadTasks() {
  const savedTasks = localStorage.getItem('tasks');
  tasks = savedTasks ? JSON.parse(savedTasks) : [];
  // Ensure modal is hidden on load
  document.getElementById('editModal').style.display = 'none';
  document.querySelector('.modal-overlay').style.display = 'none';
  renderTasks();
}
// Load tasks when the window is fully loaded
window.onload = loadTasks;
