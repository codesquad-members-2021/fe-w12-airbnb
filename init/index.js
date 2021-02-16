const iconListEl = document.querySelector(".popup__icon-list");
const iconPersonEl = document.querySelector(".icon-person");
const iconNavigator = document.querySelector(".nav--icons");
const bodyEl = document.querySelector("body");
const inputRoomEl = document.querySelector("#input-room");
const inputActivityEl = document.querySelector("#input-activity");
const inputOnlineEl = document.querySelector("#input-online");
const searchDestinationEl = document.querySelector(".search-destination");

const searchSectionEl = document.querySelector(".search-section");
const searchActivitySectionEl = document.querySelector(
  ".search-section__activity"
);

// const radioEl = document.querySelector(".nav-radio");
const navMenu = document.querySelector(".nav__menu");
const radioListEl = document.getElementsByName("nav");

let popUp = false;

const changeSearchBar = event => {
  //숙소를 누르면 색바뀌게만 해보기
  console.log(searchActivitySectionEl);
  //searchActivitySectionEl.style.display = "none";
  searchActivitySectionEl.style.display = "block";
  searchSectionEl.style.display = "none";
  //searchSectionEl.style.display = "block";
  //   for (let node of radioListEl) {
  //     if (node.checked) console.log(node);
  //   }
};

const drawPopupTable = () => {
  const table = document.createElement("table");
  table.className = "popup-tb";

  const trList = [
    "회원가입",
    "로그인",
    "숙소 호스트 되기",
    "체험 호스팅 하기",
    "도움말",
  ];

  for (let i = 0; i < trList.length; i++) {
    let tr = document.createElement("tr");
    let td = document.createElement("td");
    td.className = "popup-tb-td";
    td.textContent = trList[i];
    tr.appendChild(td);
    table.appendChild(tr);
  }
  iconNavigator.insertAdjacentHTML("beforeend", table.outerHTML);
  popUp = true;
};

const hidePopupTable = event => {
  const table = document.querySelector(".popup-tb");
  if (!event.target.className.includes("popup") && popUp) {
    table.remove();
    popUp = false;
  } else {
    return;
  }
};

const init = () => {
  iconListEl.addEventListener("click", drawPopupTable);
  bodyEl.addEventListener("click", hidePopupTable);
  navMenu.addEventListener("click", changeSearchBar);
};

init();
