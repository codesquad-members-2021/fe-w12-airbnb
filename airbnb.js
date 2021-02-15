const dropMenu = document.querySelector(".drop-menu");
const dropContent = document.querySelector(".drop-content");

dropMenu.addEventListener("click", clickHandler)

function clickHandler(e) {
    if (dropContent.style.display === "none") {

        dropContent.style.display = "block"
    } else {
        dropContent.style.display = "none"
    }
}

//
const menuList = document.querySelector('.menu-list')
console.log(menuList.childNodes)

let rooms = menuList.childNodes[1]
let experience = menuList.childNodes[3]

//
rooms.addEventListener("click", roomsHandler)

function roomsHandler() {
    // rooms.classList.add("clicked")
    if (rooms.classList.toggle("clicked")) {
        rooms.style.borderBottom = "none"
    } else {
        rooms.style.borderBottom = "1px solid black"
    }
}

//
experience.addEventListener("click", experienceHandler)

function experienceHandler() {
    // experience.classList.add("clicked")
    if (experience.classList.toggle("clicked")) {
        experience.style.borderBottom = "none"
    } else {
        experience.style.borderBottom = "1px solid black"
    }
}