import Calendar from "./calendar.js";

const thisMonthDate = document.querySelector("#thisMonth--date");
const nextMonthDate = document.querySelector("#nextMonth--date");
const prevButton = document.querySelector('#prevButton');
const nextButton = document.querySelector('#nextButton');

let currYearCount = new Date().getFullYear();
let currMonthCount = new Date().getMonth();
let nextYearCount = new Date().getFullYear();
let nextMonthCount = new Date().getMonth() + 1;

const cleanData = () => {
    while (thisMonthDate.hasChildNodes() || nextMonthDate.hasChildNodes()) {
        thisMonthDate.removeChild(thisMonthDate.firstChild);
        nextMonthDate.removeChild(nextMonthDate.firstChild);
    }
}

const init = () => {
    cleanData();
    const currCalendar = new Calendar(currYearCount, currMonthCount)
    const nextCalendar = new Calendar(nextYearCount, nextMonthCount)

    document.querySelector("#thisMonth--month").innerHTML = `${currYearCount}년 ${currMonthCount + 1}월`;
    document.querySelector("#nextMonth--month").innerHTML = `${nextYearCount}년 ${nextMonthCount + 1}월`;
    thisMonthDate.insertAdjacentHTML("beforeend", currCalendar.makeCalendarData());
    nextMonthDate.insertAdjacentHTML("beforeend", nextCalendar.makeCalendarData());
}
init();

const currCalendarDataHandler = () => {
    if (currMonthCount == 0) {
        currYearCount--;
        currMonthCount = 11;
        nextMonthCount--;
    }
    else if (nextMonthCount == 0) {
        nextYearCount--;
        nextMonthCount = 11;
        currMonthCount--;
    }
    else {
        currMonthCount--;
        nextMonthCount--;
    }
    init();
}

const nextCalendarDataHandler = () => {
    if (currMonthCount == 11) {
        currYearCount++;
        currMonthCount = 0;
        nextMonthCount++;
    }
    else if (nextMonthCount == 11) {
        nextYearCount++;
        nextMonthCount = 0;
        currMonthCount++;
    }
    else {
        currMonthCount++;
        nextMonthCount++;
    }
    init();
}

prevButton.addEventListener('click', currCalendarDataHandler);
nextButton.addEventListener('click', nextCalendarDataHandler);