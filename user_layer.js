const userButton = document.querySelector(".user_btn");
const userLayer = document.querySelector(".user_layer");
const body = document.querySelector("body");

userButton.addEventListener("click", toggleUserLayer);
body.addEventListener("click", hideLayers);

function toggleUserLayer(e) {
    e.stopPropagation();
    console.log("button clicked!");
    userLayer.classList.toggle("hide");
}

function hideLayers() {
    console.log("body clicked!")
    calendar.classList.add("hide");
    userLayer.classList.add("hide");
}