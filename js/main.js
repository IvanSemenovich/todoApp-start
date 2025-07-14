const taskList = document.querySelector("#tasksList");
const taskInput = document.querySelector("#taskInput");
const form = document.querySelector("#form");
const emptyList = document.querySelector("#emptyList");

let tasks = [];

// Завантаження з localStorage
if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks.forEach(renderTask);
}
renderEmptyLabel();

// Додати нову задачу
form.addEventListener("submit", addTask);

function addTask(e) {
  e.preventDefault();

  const textFromInput = taskInput.value.trim();
  if (textFromInput === "") return;

  const newTask = {
    id: Date.now(),
    text: textFromInput,
    done: false,
  };

  tasks.push(newTask);
  saveToLocalStorage();

  renderTask(newTask);

  taskInput.value = "";
  taskInput.focus();

  renderEmptyLabel();
}

// Рендер однієї задачі
function renderTask(task) {
  const cssClass = task.done ? "task-title task-title--done" : "task-title";

  const taskHTML = `
    <li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
      <span class="${cssClass}">${task.text}</span>
      <div class="task-item__buttons">
        <button type="button" data-action="done" class="btn-action">
          <img src="./img/tick.svg" alt="Done" width="18" height="18" />
        </button>
        <button type="button" data-action="delete" class="btn-action">
          <img src="./img/cross.svg" alt="Delete" width="18" height="18" />
        </button>
      </div>
    </li>
  `;

  taskList.insertAdjacentHTML("beforeend", taskHTML);
}

// Видалити задачу
taskList.addEventListener("click", removeTask);

function removeTask(event) {
  if (event.target.dataset.action === "delete") {
    const parentNode = event.target.closest(".list-group-item");
    const id = Number(parentNode.id);

    tasks = tasks.filter((task) => task.id !== id);
    saveToLocalStorage();

    parentNode.remove();
    renderEmptyLabel();
  }
}

// Позначити задачу як виконану
taskList.addEventListener("click", completeTask);

function completeTask(event) {
  if (event.target.dataset.action !== "done") return;

  const parentNode = event.target.closest(".list-group-item");
  const id = Number(parentNode.id);

  const task = tasks.find((task) => task.id === id);
  task.done = !task.done;

  saveToLocalStorage();

  const taskTitle = parentNode.querySelector("span");
  taskTitle.classList.toggle("task-title--done");
}

// Відображати або ховати "Немає задач"
function renderEmptyLabel() {
  if (tasks.length === 0) {
    emptyList.classList.remove("none");
  } else {
    emptyList.classList.add("none");
  }
}

// Зберегти масив задач у localStorage
function saveToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
