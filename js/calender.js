const dropdownCalendar = document.querySelector('.dropdownCalendar');
const calendar = document.querySelector('#calendar');

dropdownCalendar.addEventListener('click', calendarClickhandler);

function calendarClickhandler() {
    if (calendar.className === 'hidden') {
        calendar.classList.remove('hidden');
        calendar.classList.add('show');
        calendar.focus();
    }
}

function calendarClose() {
    if (calendar.className === 'show') {
        calendar.classList.remove('show');
        calendar.classList.add('hidden');
    }
}