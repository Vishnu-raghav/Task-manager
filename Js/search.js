import { getTodos, getCategories } from "./storage.js";

const searchModal = document.getElementById("todoDropdown")
const searchBar = document.getElementById("task-search-input")

searchBar.addEventListener("input", () => {

   const query = searchBar.value.trim()

  if(!query){
    searchModal.classList.remove("show")
    searchButton.innerHTML = ""
    return
  }
  searchModal.classList.add("show");
  searchquery(query)
})

const searchButton = document.getElementById("todo-search-button")

searchButton.addEventListener("click", (e) => {
  searchModal.classList.add("show");

   setTimeout(() => {
    searchModal.classList.remove("show");
   }, 2000);
})



function searchquery(query){
  searchModal.innerHTML = ""
   
  const todos = getTodos()
  const searchText = query.toLowerCase();

  const matchedTodos = todos.filter(todo => {
  return (
    todo.title.toLowerCase().includes(searchText) ||
    todo.desc.toLowerCase().includes(searchText)
  )
})

renderSearchResult(matchedTodos)
}

function renderSearchResult(matchedTodos){
    const categories = getCategories()

    if(matchedTodos.length === 0){
      searchModal.innerHTML = ` 
       <div>
        <p>Not found</p>
      </div>
      `
      return
    }

    matchedTodos.forEach(todo => {
    const categoryObj = categories.find(c => c.id === Number(todo.category));    
    const div = document.createElement("div")
    div.className = "search-output"
    div.dataset.id = todo.id
      div.innerHTML = `
    <p>${todo.title}</p>
    <span>${categoryObj ? `${categoryObj.name}` : `General`}</span>
    `
    searchModal.appendChild(div)
      
    });
   
}
