let taskList = document.querySelector("#tasksList");
let taskInput = document.querySelector("#taskInput");
let form = document.querySelector("#form");
let emptyList = document.querySelector("#emptyList");

let tasks = [];

// Додати нову задачу в список
form.addEventListener("submit", addTask);

function addTask(e) {
  e.preventDefault();
  let textFromInput = taskInput.value;

  const newTask = {
    id: Date.now(),
    text: textFromInput,
    done: false,
  };

  tasks.push(newTask);
  saveToLocalStorage();
  renderTask(newTask);
  taskInput.value = "";
  render();
}

// Удалити задачу
taskList.addEventListener("click", removeTask);

function removeTask(event) {
  if (event.target.dataset.action === "delete") {
    const parentNode = event.target.closest(".list-group-item");
    let id = parentNode.id;

    const index = tasks.findIndex(function (task) {
      if (task.id == id) {
        return true;
      }
    });

    tasks.splice(index, 1);
    saveToLocalStorage();
    parentNode.remove();
  }
  render();
}

// Зробити задачу виконаною

taskList.addEventListener("click", completeTask);

function completeTask(event) {
  if (event.target.dataset.action !== "done") return;

  const parentNode = event.target.closest(".list-group-item");

  const id = Number(parentNode.id);

  const task = tasks.find(function (task) {
    if (task.id === id) {
      return true;
    }
  });
  task.done = !task.done;
  saveToLocalStorage();
  parentNode.classList.toggle("task-title--done");
}

// Ховати "Нема задач" якщо список пустий

function render() {
  let task = document.querySelector(".task-item");
  if (task) {
    emptyList.classList.add("none");
  } else {
    emptyList.classList.remove("none");
  }
}
render();

function saveToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
}

tasks.forEach(function (task) {
  renderTask(task);
});

function renderTask(task) {
  let cssClass = task.done ? "task-title task-title--done" : "task-title";

  let insertHTML = ` <li id = "${task.id}" class="list-group-item d-flex justify-content-between task-item">
              <span class="${cssClass}">${task.text}</span>
              <div class="task-item__buttons">
                <button  type="button" data-action="done" class="btn-action">
                  <img src="./img/tick.svg" alt="Done" width="18" height="18" />
                </button>
                <button type="button" data-action="delete" class="btn-action">
                  <img src="./img/cross.svg" alt="Done" width="18" height="18" />
                </button>
              </div>
            </li>`;

  taskList.insertAdjacentHTML("beforeend", insertHTML);
}
