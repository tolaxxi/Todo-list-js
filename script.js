const quoteDisplay = document.querySelector('#quote');
const todoForm = document.querySelector('#todoForm');
const todoInput = document.querySelector('#todo-input');
const addBtn = document.querySelector('#add-btn');
const taskCounter = document.querySelector('.task-counter');

const todoList = document.querySelector('#todo-list');

const quote_API = 'https://api.realinspire.live/v1/quotes/random?maxLength=100';

getQuote();

let allTodos = [];
let completedTodo = 0;

taskCounter.textContent = 'You remaining todos: 0';
todoForm.addEventListener('submit', (e) => {
  // prevents the form from reloading after submit
  e.preventDefault();
  addTodo();
  remainingTask();
});

// add todo

function addTodo() {
  const taskTitle = todoInput.value.trim();

  if (taskTitle.length > 0) {
    const newTask = {
      id: crypto.randomUUID(),
      task: taskTitle,
      completed: false,
    };
    createTodo(newTask);
    allTodos.push(newTask);
  }

  todoInput.value = '';
}
// create new Task

function createTodo(todo) {
  // create elements

  // create  sub parent elements
  const label = document.createElement('label');
  const span = document.createElement('span');

  // checkbox
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.classList.add('complete-checkbox');
  checkbox.id = 'checkbox';

  // delete button
  const delBtn = document.createElement('button');
  delBtn.classList.add('delete-btn');
  delBtn.innerHTML = '<i class="fa-solid fa-x">';

  // change the checkbox property
  checkbox.addEventListener('change', () => {
    todo.completed = checkbox.checked;

    // strikethrough the text when completed
    if (todo.completed) {
      span.classList.add('completed');
      completedTodo += 1;
      remainingTask();
    } else {
      span.classList.remove('completed');
    }
  });
  // delete task
  delBtn.addEventListener('click', () => {
    allTodos = allTodos.filter((task) => task.id !== todo.id);
    label.remove();
    console.log(allTodos);
  });

  span.append(checkbox, todo.task);
  label.append(span, delBtn);

  // add classname
  label.classList.add('task');
  // add the label to the ul
  todoList.append(label);
}
console.log(allTodos);

// calculate remaining task
function remainingTask() {
  let totalTodo = allTodos.length;
  let remainingTodo = totalTodo - completedTodo;
  taskCounter.textContent = `Your remaining todos : ${remainingTodo}`;
}

// fetch quote from api
async function getQuote() {
  try {
    const data = await fetch(quote_API);
    const quote = await data.json();
    quoteDisplay.textContent = `"${quote[0].content}" - ${quote[0].author}`;
  } catch (err) {
    quoteDisplay.textContent = `⚠️ Please check your internet connection and try again.`;
  }
}
