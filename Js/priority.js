console.log("priority.js loaded");

const priorityContainer = document.getElementById("task-priority") 
const dropdown = document.getElementById("priorityDropdown");
const selected = dropdown.querySelector(".dropdown-selected");

// selected.addEventListener("click", () => {
//   dropdown.classList.toggle("active");
// });


dropdown.addEventListener("click", (e) => {
  const item = e.target.closest(".dropdown-item");
   if (item) {
    const name = item.querySelector("span").innerText;
    const id = item.dataset.id;

    selected.innerText = name;
    dropdown.dataset.value = id;

    // dropdown.classList.remove("active");
    return;
  }
  
 dropdown.classList.toggle("active")

});

