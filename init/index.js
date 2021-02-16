const iconListEl = document.querySelector(".popup__icon-list");
const iconPersonEl = document.querySelector(".icon-person");
const iconNavigator = document.querySelector(".nav--icons");
const bodyEl = document.querySelector("body");

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
};

const init = () => {
  iconListEl.addEventListener("click", drawPopupTable);
  bodyEl.addEventListener("click", hidePopupTable);
};

const hidePopupTable = event => {
  const table = document.querySelector(".popup-tb");
  if (!event.target.className.includes("popup")) table.remove();
};

init();
