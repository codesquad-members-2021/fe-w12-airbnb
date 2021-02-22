const activtyButton = document.querySelector(".menus_activity");
const roomButton = document.querySelector(".menus_room")
const activtyMinus = document.querySelector(".minus_activity");
const minusRoom = document.querySelector(".minus_room");
const activtySearch = document.querySelector(".activity_search");


activtyButton.addEventListener("click", renderActivitySearch);
roomButton.addEventListener("click", renderRoomSearch);


function renderActivitySearch() {
    activtyMinus.classList.remove("hide");
    minusRoom.classList.add("hide");
    activtySearch.classList.remove("hide");
    console.log("activity clicked");
}


function renderRoomSearch() {
    activtyMinus.classList.add("hide");
    minusRoom.classList.remove("hide");
    activtySearch.classList.add("hide");
    console.log("room clicked");
}