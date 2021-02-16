const infoBtn = document.querySelector(".infoBtn");
const tabUI = document.querySelector("#tabUI");

infoBtn.addEventListener('click', infoBtnClickHandler)

function infoBtnClickHandler() {
    if (tabUI.className === 'tabUI__hidden') {
        tabUI.classList.remove('tabUI__hidden');
        tabUI.classList.add('tabUI__show');
        tabUI.focus();
    }
}

function dropdownClose() {
    if (tabUI.className === 'tabUI__show') {
        tabUI.classList.add('tabUI__hidden');
        tabUI.classList.remove('tabUI__show');
    }
}