//달력
let day = document.querySelector(".day")
let calendar = document.querySelector(".calendar")
day.addEventListener("click", dayHandler)

function dayHandler() {
    calendar.style.display = "block";
}