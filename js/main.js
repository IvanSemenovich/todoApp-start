let taskList = document.querySelector("#tasksList");
let taskInput = document.querySelector("#taskInput");
let task = document.querySelector("#task");
let form = document.querySelector("#form");
let emptyList = document.querySelector("#emptyList");

console.log(taskList);

// Додати нову задачу в список
form.addEventListener("submit", addTask);

function addTask(e) {
  e.preventDefault();
  let textFromInput = taskInput.value;

  let insertHTML = ` <li class="list-group-item d-flex justify-content-between task-item">
            <span class="task-title">${textFromInput}</span>
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
  taskInput.value = "";
}

// Удалити задачу
taskList.addEventListener("click", removeTask);

function removeTask(event) {
  console.log(event.target);
  if (event.target.dataset.action === "delete") {
    const parentNode = event.target.closest(".list-group-item");
    parentNode.remove();
  }
}

// Зробити задачу виконаною

taskList.addEventListener("click", completeTask);

function completeTask(event) {
  if (event.target.dataset.action === "done") {
    const parentNode = event.target.closest(".list-group-item");

    parentNode.classList.toggle("task-title--done");
  }
}

// Ховати "Нема задач" якщо список пустий
if (taskList.contains(task)) {
  emptyList.classList.add("none");
} else {
  emptyList.classList.remove("none");
}
