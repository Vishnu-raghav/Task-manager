import { getTodos, getCategories } from "./storage.js";

const searchDropdown = document.getElementById("todoDropdown")
const searchBar = document.getElementById("task-search-input")

searchBar.addEventListener("input", () => {
  const query = searchBar.value.trim()

  if(!query){
    searchDropdown.classList.remove("show")
    searchDropdown.innerHTML = ""
    return
  }
  searchDropdown.classList.add("show");
  const matchedTodos = searchQuery(query);

  renderSearchResult(matchedTodos);

})

function searchQuery(query){
  const todos = getTodos()
  const searchText = query.toLowerCase();

  const matchedTodos = todos.filter(todo => {
  return (
    todo.title.trim().toLowerCase().includes(searchText) ||
    (todo.desc || "").trim().toLowerCase().includes(searchText)
  )
})
 return matchedTodos
}


function renderSearchResult(matchedTodos){
    searchDropdown.innerHTML = ""
    const categories = getCategories()

    if(matchedTodos.length === 0){
      searchDropdown.innerHTML = ` 
       <div class="search-empty">

    <i class="fa-solid fa-magnifying-glass"></i>

    <h4>No task found</h4>

    <p>Try another keyword.</p>

</div>
      `
      return
    }

    matchedTodos.slice(0,5).forEach(task => {

    const categoryObj = categories.find(c => c.id === Number(task.category));
      
    const div = document.createElement("div")
    div.className = "search-output"
    div.dataset.id = task.id
     div.innerHTML = `
    <div class="search-info">
        <h4>${task.title}</h4>
        <p>${task.desc || "No description"}</p>
    </div>

    <span class="search-category">
        ${categoryObj ? categoryObj.name : "General"}
    </span>
`;
    searchDropdown.appendChild(div)
      
    });
   
}
