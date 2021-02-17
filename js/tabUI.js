const button = document.querySelector(".my-info--button");
const tabUI = document.querySelector("#tabUI");

button.addEventListener('click', infoBtnClickHandler)

function infoBtnClickHandler() {
    if (tabUI.className === 'hidden') {
        tabUI.classList.remove('hidden');
        tabUI.classList.add('show');
        tabUI.focus();
    }
}

function dropdownClose() {
    if (tabUI.className === 'show') {
        tabUI.classList.add('hidden');
        tabUI.classList.remove('show');
    }
}