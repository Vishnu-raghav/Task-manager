import { rerenderPage } from "../app.js";
import { 
  getPriorities,
  getTodos,
  saveTodos,
  getCategories,
  initializePriorities,
  getFilterState
} from "../services/storage.js";

import { openEditTask, clearEditState, getEditState } from "../features/taskActions.js";
import {initForm,updateSubmitButtonState} from "../features/formUtils.js"
import {openConfirmModal} from "../components/actionsConfirm.js"

import {
  createTodo as createTodoService,
  updateTodo as updateTodoService,
  deleteTodo as deleteTodoService
} from "../services/taskcrud.js";

import {populateOptions as populateCategoryOptions,} from "../utils/populateOptions.js"
import { filterTodos } from "../components/filter.js";
import {resetPriorityDropdown} from "../components/priority.js"
import { clearImage } from "../utils/imageState.js";
import  {resetImagePreview} from "../components/modal.js"


const form = document.getElementById("todoForm");
const todoCardSection = document.querySelector(".task-card-section");
const todoCardContainer = document.querySelector(".grid-container");
const completedTaskSection = document.querySelector(".complete-tasks-section");
const addTaskBtn = document.querySelector(".Add-Task");
const isDashboard = document.body.dataset.page === "dashboard";

const todoModal = document.getElementById("todoModal");
const modalHeading = todoModal.querySelector(".modal-header h4");
const modalSubmitBtn = todoModal.querySelector('button[type="submit"]');
const select = document.getElementById("task-category");
const filterModal = document.getElementById("filterPanel");



initializePriorities()

if (select) {
  populateCategoryOptions(select, getCategories(), {
    placeholderText: "Select Category"
  });
}


function formatDate(dateString){

    if(!dateString){
        return "No due date";
    }

    return new Date(dateString).toLocaleDateString("en-GB",{
        day:"numeric",
        month:"short",
        year:"numeric"
    });

}

function renderTodos(activeTodos) {
  if (!todoCardSection) return;

  todoCardSection.innerHTML = "";

  const categories = getCategories()
  const priorities = getPriorities()
  
  
  if (activeTodos.length === 0) {
    todoCardSection.innerHTML = `
      <div class="empty-state">
        <p>No tasks Click "Add Task" to get started</p>
      </div>
    `;
   return
  }

  activeTodos.forEach(task => {
    const categoryObj = categories.find(c => c.id === Number(task.category));
    const categoryName = categoryObj ? categoryObj.name : "General";

    const priorityObj = priorities.find(p => p.id === Number(task.priority))
    const priorityName = priorityObj ? priorityObj.name : "Medium"
    const statusText = task.completed ? "Completed" : "In progress";
    const statusClass = task.completed ? "completed" : "pending";


    const card = document.createElement("div");
    card.className = "todo-card";
    card.dataset.id = task.id
    card.innerHTML = `
      <div class="card-header">
             <div class="actions">
               <i class="fa-solid fa-ellipsis icon"></i>
             <div class="card-popup">
    <ul class="card-actions">

        <li class="card-action edit">
            <i class="fa-solid fa-pen"></i>
            <span>Edit</span>
        </li>

        <li class="card-action delete">
            <i class="fa-solid fa-trash"></i>
            <span>Delete</span>
        </li>

    </ul>
</div>
             </div>
      </div>
      <div class="task-card">
           ${isDashboard ? `
          <div class="task-checkbox">
            <input type="checkbox" data-id="${task.id}">
          </div>
        ` : ""}
        <div class="task-details">
          <span>${task.title || "No title"}</span>
          <p>${task.desc || "No description"}</p>
        </div>

        ${task.image ? `
          <div class="img-card">
            <img class="task-img" src="${task.image}" alt="img">
          </div>` : ""}
      </div>

      <div class="task-meta">

  <div class="task-meta-row">
    <span class="task-meta-label">Category:</span>
    <span class="task-meta-value">
      ${categoryName}
    </span>
  </div>

  <div class="task-meta-row">
    <span class="task-meta-label">Priority:</span>

    <span
      class="priority-pill"
      style="
      background:${priorityObj?.color || "#6b7280"};
      color:#fff;
      "
    >
      ${priorityName}
    </span>
  </div>

  <div class="task-meta-row">
    <span class="task-meta-label">Status:</span>

    <span class="badge status ${statusClass}">
      ${statusText}
    </span>
  </div>

  <div class="task-meta-row">
    <span class="task-meta-label">Due:</span>

    <span class="task-meta-value">
      ${formatDate(task.dueDate)}
    </span>
  </div>

</div>      
    `;

    todoCardSection.appendChild(card);
  });

}

 function renderCompletedTodos(completedTodos) {
  if (!completedTaskSection) return;

  completedTaskSection.innerHTML = "";

  const categories = getCategories()
  const priorities = getPriorities()


  if (completedTodos.length === 0) {
    completedTaskSection.innerHTML = `<p style="padding:10px;color:#777;">No completed tasks</p>`;
    return;
  }

  completedTodos.forEach(task => {

    const card = document.createElement("div");
    card.className = "todo-card";
    card.dataset.id = task.id

   card.innerHTML = `
<div class="completed-card">

    <div class="task-checkbox">
        <input type="checkbox" data-id="${task.id}" checked>
    </div>

    <div class="completed-content">
        <h4>${task.title}</h4>
    </div>

    ${
      task.image
      ?`
      <div class="completed-img">
          <img src="${task.image}" alt="">
      </div>
      `
      :""
    }

    <div class="actions">

        <i class="fa-solid fa-ellipsis icon"></i>

        <div class="card-popup">
            <ul class="card-actions">

                <li class="card-action delete">
                    <i class="fa-solid fa-trash"></i>
                    <span>Delete</span>
                </li>

            </ul>
        </div>

    </div>

</div>
`;

    completedTaskSection.appendChild(card);
  });
}

export function deleteTodoHandle(id){

  if(Number.isNaN(id)) return

 openConfirmModal("Are you sure you want to delete this task?", () => {
 deleteTodoService(id)
 rerenderPage()
 })

}

 export function editTodoHandle(id){

  if(Number.isNaN(id)) return


  openEditTask(id, {
  form,
  modal: todoModal,
  modalHeading,
  submitBtn: modalSubmitBtn
  });

 }

function updateProgressUI(todos) {
  const total = todos.length;
  const completed = todos.filter(t => t.completed).length;
  const pending = total - completed;

  const percent = total === 0
    ? 0
    : Math.round((completed / total) * 100);

  document.querySelector(".progress-percent").innerText = `${percent}%`;

  const progressFill = document.querySelector(".progress-bar-fill");
  progressFill.style.width = `${percent}%`;

  const stats = document.querySelectorAll(".stat-value");
  stats[0].innerText = completed;
  stats[1].innerText = pending;

  const labels = document.querySelectorAll(".stat-label");
  labels[0].innerText = "Completed";
  labels[1].innerText = "Pending";


  if (total === 0) {
  document.querySelector(".progress-percent").innerText = "0%";
  progressFill.style.width = "0%";

  stats[0].innerText = 0;
  stats[1].innerText = 0;

  return;
}
}

addTaskBtn.addEventListener("click", () => {
  closeCardPopups();
  form.reset()
  clearEditState()
  clearImage()
  resetImagePreview()

  resetPriorityDropdown()
  modalSubmitBtn.disabled = true;
  
  modalHeading.innerText = "Add New Task";
  modalSubmitBtn.innerHTML = `Create Task`;
  filterModal.classList.remove("active");
 document.body.classList.add("modal-open");
 todoModal.classList.add("active");
});

initForm(form, {
  createFn: createTodoService,
  updateFn: updateTodoService,
  getEditState,
  clearEditState,
  onSuccess:  rerenderPage
});

todoCardContainer.addEventListener("click", (e) => {
  const deleteBtn = e.target.closest(".delete")
  
  if(deleteBtn){
    const card = deleteBtn.closest(".todo-card")
    if(!card) return

    const id = Number(card.dataset.id)
    deleteTodoHandle(id)
    return
  }
  const editBtn = e.target.closest(".edit");
  if (editBtn){
    const card = editBtn.closest(".todo-card")
    if(!card) return

    const id = Number(card.dataset.id)
    editTodoHandle(id)
    return
  }

  const actions = e.target.closest(".actions");
  if (actions) {
  const popup = actions.querySelector(".card-popup");
  if(!popup) return

  const isOpen = popup.classList.contains("active");
  
  closeCardPopups()
  
  if(!isOpen){
      popup.classList.add("active");
  }
}
});

document.addEventListener("click", (e) => {

    if (e.target.closest(".actions")) return;

   closeCardPopups()

});

window.addEventListener("scroll",()=>{
    closeCardPopups();
})

window.addEventListener("resize",()=>{
    closeCardPopups();
})

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){
        closeCardPopups();
    }

})

todoCardContainer.addEventListener("change", (e) => {
  if(!isDashboard) return
  
  if (e.target.type !== "checkbox") return;
  
  const id = Number(e.target.dataset.id);
  const todos = getTodos();
  
  const todo = todos.find(t => t.id === id)
  
  if(todo){
    todo.completed = e.target.checked
  }

  const card = e.target.closest(".todo-card");

card.classList.add("completing");

setTimeout(() => {

    saveTodos(todos);
    rerenderPage();

},250);
  
 
});

form.addEventListener("input",() => {
  updateSubmitButtonState(form,modalSubmitBtn)
})

export function renderDashboard() {
  const todos = getTodos();
  
  const selectedFilters = getFilterState();
  
  const filteredTodos = filterTodos(todos, selectedFilters);
  
  const activeTodos = filteredTodos.filter(todo => !todo.completed)
  
  const completedTodos = filteredTodos.filter(todo => todo.completed);
  
  renderTodos(activeTodos);
  
  renderCompletedTodos(completedTodos);
  
  updateProgressUI(todos);
}

function closeCardPopups(){

    document
      .querySelectorAll(".card-popup.active")
      .forEach(popup=>{
          popup.classList.remove("active");
      });

}