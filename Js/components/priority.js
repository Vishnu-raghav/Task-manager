import {createPriority, deletePriority} from "../services/taskcrud.js"
import { getPriorities, savePriorities } from "../services/storage.js";
import { renderSelectedPriority } from "../utils/priorityUI.js";
const priorityContainer = document.getElementById("task-priority") 
const dropdown = document.getElementById("priorityDropdown");
const selected = dropdown.querySelector(".dropdown-selected");

let isAddingPriority = false
let activePopup = null;

function openPopup(item, dots) {

  const popup = item.querySelector(".priority-dropdown-modal");
  if (!popup) return;

  closePriorityModals();

  popup.parentTaskId = item.dataset.id;

  document.body.appendChild(popup);

  popup.style.position = "fixed";
  popup.style.display = "block";
  popup.style.zIndex = "99999";
  popup.style.width = "180px";

  const rect = dots.getBoundingClientRect();
  const gap = 8;

  if (window.innerWidth <= 768) {

    let left = rect.left;

    const popupWidth = popup.offsetWidth;

    if (left + popupWidth > window.innerWidth - 12) {
      left = window.innerWidth - popupWidth - 12;
    }

    if (left < 12) left = 12;

    popup.style.left = `${left}px`;
    popup.style.top = `${rect.bottom + gap}px`;

  } else {

    const popupWidth = popup.offsetWidth;

    let left = rect.right + gap;

    if (left + popupWidth > window.innerWidth) {
      left = rect.left - popupWidth - gap;
    }

    popup.style.left = `${left}px`;
    popup.style.top = `${rect.top}px`;

  }

  activePopup = popup;
}

const colors = [
  { name: "Red", color: "#ef4444" },
  { name: "Green", color: "#22c55e" },
  { name: "Blue", color: "#3b82f6" },
  { name: "Yellow", color: "#facc15" },
  { name: "Purple", color: "#a855f7" },
  { name: "Gray", color: "#6b7280" }
];


const colorHTML = colors.map(color => `
  <div
    class="color-option"
    data-color="${color.color}"
  >
    <span
      class="color-box"
      style="background:${color.color}"
    ></span>

    <span>${color.name}</span>
  </div>
`).join("");


selected.addEventListener("click", () => {
  dropdown.classList.toggle("active");
  if (!dropdown.classList.contains("active")) {
     closePriorityModals()

    isAddingPriority = false;
    renderPriorityInputSection();
    
  }
});

priorityContainer.addEventListener("click", (e) => {

  const saveBtn = e.target.closest(".priority-create");
  if (saveBtn) {
    closePriorityModals();
    const success = addNewPriorityHandle()

    if(!success) return

    isAddingPriority = false;
    requestAnimationFrame(() => {
    renderPriorityInputSection();
});
    return;
  }

  const cancelBtn = e.target.closest(".cancel-priority");
  if (cancelBtn) {
    closePriorityModals();
    isAddingPriority = false;
    requestAnimationFrame(() => {
    renderPriorityInputSection();
});
    return;
  }

  const addBtn = e.target.closest(".add-priority-btn");

  if (addBtn) {
    closePriorityModals();
    e.stopPropagation();

    isAddingPriority = true;

    requestAnimationFrame(() => {
        renderPriorityInputSection();
    });

    return;
  }

  const dots = e.target.closest(".dots");

if (dots) {
  e.stopPropagation();
    const item = dots.closest(".dropdown-item");
    if (!item) return;

    const popup = item.querySelector(".priority-dropdown-modal");

   if (
    activePopup &&
    activePopup.parentTaskId === item.dataset.id
) {
    closePriorityModals();
    return;
}

    openPopup(item, dots);
    return;
}

  const item = e.target.closest(".dropdown-item");
  if (!item) return;
  const id = item.dataset.id;
  const priority = getPriorities().find(
  p => p.id === Number(id)
  );

  renderSelectedPriority(dropdown, priority);
  
  dropdown.dataset.value = id;
  const form = document.getElementById("todoForm");
  form.dispatchEvent(new Event("input", { bubbles: true }));
  dropdown.classList.remove("active");
  closePriorityModals()
});


function populateCustomDropdown(){

    priorityContainer.innerHTML = ""
    
    const data = getPriorities()

    data.forEach(item => {
        const div = document.createElement("div")
        div.classList.add("dropdown-item")
        div.dataset.id = item.id

        div.innerHTML = `
        <span
        class="priority-badge"
        style="
        background:${item.color};
        color:white;
        "
        >
          ${item.name}
        </span>
          <button
           type="button"
           class="dots"
          >
            <i class="fa-solid fa-ellipsis"></i>
          </button>
          <div class="priority-dropdown-modal">
           ${
            !item.isDefault ? `
            <button
              type="button"
              class="priority-delete-btn"
            >
              Delete
            </button>
            <div class="priority-divider"></div>
            ` : ``
          }

       <div class="priority-colors">
         ${colorHTML}
       </div>

        </div>
        `;

        priorityContainer.appendChild(div)
    })

     const addBtn = document.createElement("div");

     addBtn.classList.add("add-new");
     
     addBtn.innerHTML = `
       <button type="button" class="add-priority-btn">
         + Add Priority
       </button>
     `;

     priorityContainer.appendChild(addBtn);
}

export function resetPriorityDropdown() {
  selected.innerText = "Select Priority";
  dropdown.dataset.value = "";
}

function renderPriorityInputSection() {
  const addNewContainer = document.querySelector(".add-new");

  if (isAddingPriority) {

    addNewContainer.innerHTML = `
  <input
    class="priority-input"
    type="text"
    placeholder="Enter priority name"
  >

  <p class="priority-error">
    Priority already exists
  </p>

  <div class="priority-actions">
    <button
      type="button"
      class="priority-create"
    >
      Save
    </button>

    <button
      type="button"
      class="cancel-priority"
    >
      Cancel
    </button>
  </div>
`;

  const input = addNewContainer.querySelector(".priority-input");
  const error = addNewContainer.querySelector(".priority-error");

  input.addEventListener("input", () => {
    error.style.display = "none";
  });

  } else {

    addNewContainer.innerHTML = `
      <button
        type="button"
        class="add-priority-btn"
      >
        + Add Priority
      </button>
    `;

  }
}

function addNewPriorityHandle(){

  const container = document.querySelector(".add-new");
  const input = container.querySelector(".priority-input");
  const value = input.value.trim();

  if(!value) return false;

  const createdPriority = createPriority({
    name: value
  });

  if(createdPriority?.error){
  const show = container.querySelector(".priority-error");

  show.style.display = "block";

  setTimeout(() => {
    show.style.display = "none";
  }, 3000);

  return false;
}

  populateCustomDropdown();
  renderSelectedPriority(dropdown, createdPriority);
  dropdown.dataset.value = createdPriority.id;
  dropdown.classList.remove("active");
  return true;
}

function deletePriorityHandle(id){

  if (Number.isNaN(id)) return;

  deletePriority(id)
  const selectedId = Number(dropdown.dataset.value);

  if(selectedId === id){
     resetPriorityDropdown();
  }

  populateCustomDropdown()
}

function closePriorityModals(){
    if(!activePopup) return;

    activePopup.style.display="none";
    activePopup.style.width="";

    const item=document.querySelector(
        `.dropdown-item[data-id="${activePopup.parentTaskId}"]`
    );

    if(item){
        item.appendChild(activePopup);
    }

    activePopup=null;

}

function priorityColor(id, color) {
  if (Number.isNaN(id) || !color) return;

  const priorities = getPriorities();
  const priority = priorities.find(p => p.id === id);

  if (!priority) return;

  priority.color = color;
  savePriorities(priorities);

  populateCustomDropdown();

  const selectedId = Number(dropdown.dataset.value);

  if (selectedId === id) {
    renderSelectedPriority(dropdown, priority);
  }
}

document.addEventListener("click", (e) => {
  const deleteBtn = e.target.closest(".priority-delete-btn");

  if (deleteBtn) {
    const popup = deleteBtn.closest(".priority-dropdown-modal");
    const id = Number(popup.parentTaskId);
    deletePriorityHandle(id);
    closePriorityModals();
    return;
  }

  const colorOption = e.target.closest(".color-option");
  if (colorOption) {
    const popup = colorOption.closest(".priority-dropdown-modal");
    const id = Number(popup.parentTaskId);
    priorityColor(id, colorOption.dataset.color);
    closePriorityModals();
    return;
  }

  if (dropdown.contains(e.target)) return

  if (activePopup && activePopup.contains(e.target)) return

  if (dropdown.classList.contains("active")) {
    dropdown.classList.remove("active");
    isAddingPriority = false;
    renderPriorityInputSection();
  }

  closePriorityModals();

});

resetPriorityDropdown()
populateCustomDropdown()
