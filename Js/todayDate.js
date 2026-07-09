const dateElement = document.querySelector(".date-value");

const today = new Date();

const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
});

if(dateElement){
    dateElement.textContent = formattedDate;
}