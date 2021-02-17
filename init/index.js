const iconListEl = document.querySelector(".popup__icon-list");
const iconNavigator = document.querySelector(".nav--icons");
const searchSectionEl = document.querySelector(".search-section");
const searchActivitySectionEl = document.querySelector(
  ".search-section__activity"
);

const navMenu = document.querySelector(".nav__menu");
const radioListEl = document.getElementsByName("nav");

let popUp = false;

const changeSearchBar = event => {
  radioListEl.forEach(node => {
   if(node.checked && node.value === "room"){
     searchSectionEl.classList.replace('display-none','display-block');
     searchActivitySectionEl.classList.replace('display-block','display-none');
    } else if (node.checked && node.value === "activity") {
      searchSectionEl.classList.replace('display-block','display-none');
      searchActivitySectionEl.classList.replace('display-none','display-block');
    }
  });
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
  document.addEventListener("click", hidePopupTable);
  navMenu.addEventListener("click", changeSearchBar);
  searchSectionEl.classList.add('display-block');
  searchActivitySectionEl.classList.add('display-none');
};

init();
