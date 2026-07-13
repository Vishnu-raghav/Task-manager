import "./components/sidebar.js";

rerenderPage();

export function rerenderPage() {
  const page = document.body.dataset.page;

  if (page === "dashboard" || page === "myTask" || page === "category"){
    import("./utils/todayDate.js");
  }

  if (page === "dashboard" || page === "myTask"){
  import("./components/modal.js");
  import("./components/priority.js")
  import("./components/filter.js")
  import("./components/search.js")
  }

  if (page === "dashboard"){
    import("./pages/dashboard.js").then(m => {
      m.renderDashboard()
    });
  }

  if (page === "myTask"){
    import("./pages/myTask.js").then(m => {
      m.renderMyTaskDashboard();
    });
  }

  if (page === "category"){
    import("./components/search.js")

    
  import("./pages/category.js").then(m => {
    m.renderCategories();
  });
 }

}
