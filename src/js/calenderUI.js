const dropdownCalendar = document.querySelector('.dropdownCalendar');
const calendarUI = document.querySelector('#calendarUI');

dropdownCalendar.addEventListener('click', calendarUIClickhandler);

function calendarUIClickhandler() {
    if (calendarUI.className === 'hidden') {
        calendarUI.classList.remove('hidden');
        calendarUI.classList.add('show');
        calendarUI.focus();
    }
}

function calendarClose() {
    if (calendarUI.className === 'show') {
        calendarUI.classList.remove('show');
        calendarUI.classList.add('hidden');
    }
}