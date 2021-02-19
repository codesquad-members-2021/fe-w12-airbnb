const today = new Date();

const setThisCalendarData = (year, month) => {
    let calHtml = '';
    const setFirstDate = new Date(year, month - 1, 1);
    const firstDayOfWeek = setFirstDate.getDay();
    const lastDate = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const firstDate = setFirstDate.getDate();
    const prevLastDate = new Date(today.getFullYear(), today.getMonth(), 0).getDate();

    let startDateCount = 1;
    let lastDateCount = 1;

    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
            if (i == 0 && j < firstDayOfWeek) {
                calHtml += `<div class='calendar__day borderHidden'>&nbsp;</div>`;
            }
            else if (i == 0 && j == firstDayOfWeek) {
                calHtml += `<div class='calendar__day'><span>${startDateCount++}</span></div>`;
            }
            else if (i == 0 && j >= firstDayOfWeek) {
                calHtml += `<div class='calendar__day'><span>${startDateCount++}</span></div>`;
            }
            else if (i > 0 && startDateCount <= lastDate) {
                calHtml += `<div class='calendar__day'><span>${startDateCount++}</span></div>`;
            }
            else if (startDateCount > lastDate) {
                calHtml += `<div class='borderHidden'></div>`;
            }
        }
    }
    return calHtml;
};

const setNextCalendarData = (year, month) => {
    let calHtml = '';
    const setFirstDate = new Date(year, month - 1, 1);
    const firstDate = setFirstDate.getDate();
    const firstDayOfWeek = setFirstDate.getDay();
    const lastDate = new Date(today.getFullYear(), today.getMonth() + 2, 0).getDate();
    const prevLastDate = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

    let startDateCount = 1;
    let lastDateCount = 1;

    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
            if (i == 0 && j < firstDayOfWeek) {
                calHtml += `<div class='calendar__day borderHidden'>&nbsp;</div>`;
            }
            else if (i == 0 && j == firstDayOfWeek) {
                calHtml += `<div class='calendar__day'><span'>${startDateCount++}</span></div>`;
            }
            else if (i == 0 && j > firstDayOfWeek) {
                calHtml += `<div class='calendar__day'><span>${startDateCount++}</span></div>`;
            }
            else if (i > 0 && startDateCount <= lastDate) {
                calHtml += `<div class='calendar__day'><span>${startDateCount++}</span></div>`;
            }
            else if (startDateCount > lastDate) {
                calHtml += `<div class='borderHidden'></div>`;
            }
        }
    }
    return calHtml
};

const setFixDayCount = (number) => {
    let fixNum = "";
    if (number < 10) {
        fixNum = "0" + number;
    } else {
        fixNum = number;
    }
    return fixNum;
};

const init = () => {
    if (today.getMonth() + 1 < 10) {
        document.querySelector("#thisMonth--date").insertAdjacentHTML("beforeend", setThisCalendarData(today.getFullYear(), "0" + (today.getMonth() + 1)));
        document.querySelector("#nextMonth--date").insertAdjacentHTML("beforeend", setNextCalendarData(today.getFullYear(), "0" + (today.getMonth() + 2)));
        document.querySelector("#thisMonth--month").innerHTML = `${today.getFullYear()}년 0${today.getMonth() + 1}월`;
        document.querySelector("#nextMonth--month").innerHTML = `${today.getFullYear()}년 0${today.getMonth() + 2}월`;
    } else {
        document.querySelector("#thisMonth--date").insertAdjacentHTML("beforeend", setThisCalendarData(today.getFullYear(), "" + (today.getMonth() + 1)));
        document.querySelector("#nextMonth--date").insertAdjacentHTML("beforeend", setNextCalendarData(today.getFullYear(), "" + (today.getMonth() + 2)));
        document.querySelector("#thisMonth--month").innerHTML = `${today.getFullYear()}년 ${today.getMonth() + 1}월`;
        document.querySelector("#nextMonth--month").innerHTML = `${today.getFullYear()}년 ${today.getMonth() + 2}월`;
    }
}
init();

const prevButton = document.querySelector('#prevButton')
const nextButton = document.querySelector('#nextButton')

