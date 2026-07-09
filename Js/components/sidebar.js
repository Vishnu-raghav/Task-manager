const sidebar = document.querySelector(".sidebar");
const toggle = document.querySelector(".toggle");
const mobileBtn = document.querySelector(".mobile-menu-btn");

function isMobile() {
  return window.innerWidth <= 768;
}

(function () {
  const saved = localStorage.getItem("sidebar");

  if (saved === "closed" && !isMobile()) {
    sidebar.classList.add("close");
    document.body.classList.add("sidebar-close");
  }
})();

window.addEventListener("load", () => {
   document.documentElement.classList.remove("no-transition");

    document.documentElement.classList.remove("sidebar-pre-close");

    document.documentElement.classList.remove("sidebar-pre-close-state");

});

toggle.addEventListener("click", () => {
  if (!isMobile()) {

    sidebar.classList.add("animating");
sidebar.classList.toggle("close");
setTimeout(() => {
    sidebar.classList.remove("animating");
},100);


    document.body.classList.toggle("sidebar-close");

    const isClosed = sidebar.classList.contains("close");
    localStorage.setItem("sidebar", isClosed ? "closed" : "open");
  }
});

mobileBtn.addEventListener("click", (e) => {
    e.stopPropagation();
   if (!isMobile()) return;

    sidebar.classList.remove("close");   

    sidebar.classList.toggle("open");
});

window.addEventListener("resize", () => {

    if (isMobile()) {

        sidebar.classList.remove("close");

    } else {

        sidebar.classList.remove("open");

    }

});

document.querySelectorAll(".sidebar a").forEach(link => {

    link.addEventListener("click", e => {

        const current =
            location.pathname.split("/").pop();

        const target =
            link.getAttribute("href");

        if(current === target){

            e.preventDefault();

        }

    });

});


document.addEventListener("click", (e) => {
    if (!isMobile()) return;

    if (!sidebar.classList.contains("open")) return;

    if (sidebar.contains(e.target)) return;

    sidebar.classList.remove("open");

});