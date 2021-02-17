const button = document.querySelector(".my-info--button");
const tabUI = document.querySelector("#tabUI");

button.addEventListener('click', infoBtnClickHandler)

function infoBtnClickHandler() {
    if (tabUI.className === 'tabUI--hidden') {
        tabUI.classList.remove('tabUI--hidden');
        tabUI.classList.add('tabUI--show');
        tabUI.focus();
    }
}

function dropdownClose() {
    if (tabUI.className === 'tabUI--show') {
        tabUI.classList.add('tabUI--hidden');
        tabUI.classList.remove('tabUI--show');
    }
}