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

  let cssClass = newTask.done ? "task-title task-title--done" : "task-title";

  let insertHTML = ` <li id = "${newTask.id}" class="list-group-item d-flex justify-content-between task-item">
              <span class="${cssClass}">${newTask.text}</span>
              <div class="task-item__buttons">
                <button  type="button" data-action="done" class="btn-action">
                  <img src="./img/tick.svg" alt="Done" width="18" height="18" />
                </button>
                <button type="button" data-action="delete" class="btn-action">
                  <img src="./img/cross.svg" alt="Done" width="18" height="18" />
                </button>
              </div>
            </li>`;
  tasks.push(newTask);
  taskList.insertAdjacentHTML("beforeend", insertHTML);
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
