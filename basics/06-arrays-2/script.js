const todoListOutput = document.querySelector('.todo-list');
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTodo() {
  todoListOutput.innerHTML = '';
  for (let i = 0; i < tasks.length; i++) {
    todoListOutput.innerHTML += `
      <li>
        <span class="todo-text">${tasks[i].task}</span>
        <span class="todo-date">${tasks[i].dueDate}</span>
        <button class="delete-btn" onclick="removeTask(${i})">Delete</button>
      </li>
    `;
  }
}

function addItems() {
  const taskValue = document.querySelector('.task-input').value.trim();
  const dateValue = document.querySelector('.date-input').value;

  if (!taskValue || !dateValue) {
    alert('Both inputs must be filled!');
    return;
  }

  tasks.push({
    task: taskValue,
    dueDate: dateValue
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTodo();

  document.querySelector('.task-input').value = '';
  document.querySelector('.date-input').value = '';
}

function removeTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTodo();
}

renderTodo();
