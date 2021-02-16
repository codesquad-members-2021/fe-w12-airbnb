const profileBtn = document.querySelector(".navbar_login_icons");
const profileHeader = document.querySelector(".profileHeader");
const body = document.querySelector("body");

const profileBtnClickHandler = () => {
  profileHeader.classList.toggle("hide");
};
const bodyClickHandler = () => {
  profileHeader.classList.add("hide");
  mainLocation.classList.add("hide");
};

profileBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  profileBtnClickHandler();
});

body.addEventListener("click", (e) => {
  bodyClickHandler();
});
