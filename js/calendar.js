const today = new Date();

const setPrevCalendarData = (year, month) => {
    let calHtml = '';
    // 이번 달의 첫째 날로 셋
    const setFirstDate = new Date(year, month - 1, 1);
    // 이번 달의 첫째 날
    const firstDate = setFirstDate.getDate();
    // 이번 달의 첫째 날의 요일
    const firstDayOfWeek = setFirstDate.getDay();
    // 이번 달의 마지막 날
    const lastDate = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    // 저번 달의 마지막 날
    const prevLastDate = new Date(today.getFullYear(), today.getMonth(), 0).getDate();

    let startDateCount = 1;
    let lastDateCount = 1;

    // 1~6주차
    for (let i = 0; i < 6; i++) {
        // 0(일요일)~6(토요일)
        for (let j = 0; j < 7; j++) {
            // 0주차 - 첫번째 날보다 이전
            if (i == 0 && j < firstDayOfWeek) {
                calHtml += `<div class='calendar__day borderHidden'>&nbsp;</div>`;
                // `<div class='calendar__day'>
                //     <span>${(prevLastDate - (firstDayOfWeek - 1) + j)}</span>
                // </div>`;
            }
            // 0주차 - 첫번째 날
            else if (i == 0 && j == firstDayOfWeek) {
                calHtml +=
                    `<div class='calendar__day'>
                        <span>${startDateCount}</span>
                        <span id='${year}${month}${setFixDayCount(startDateCount++)}'></span>
                    </div>`;
            }
            // 0주차 - 첫번째 날 이상
            else if (i == 0 && j > firstDayOfWeek) {
                calHtml +=
                    `<div class='calendar__day'>
                        <span>${startDateCount}</span>
                        <span id='${year}${month}${setFixDayCount(startDateCount++)}'></span>
                    </div>`;
            }
            // 1주차 이상 - 마지막 날 이하
            else if (i > 0 && startDateCount <= lastDate) {
                calHtml +=
                    `<div class='calendar__day'>
                        <span>${startDateCount}</span>
                        <span id='${year}${month}${setFixDayCount(startDateCount++)}'></span>
                    </div>`;
            }
            // 마지막 날 보다 클 경우
            else if (startDateCount > lastDate) {
                calHtml += `<div class='borderHidden'></div>`;
                // `<div class='calendar__day'>
                //     <span>${lastDateCount++}</span>
                // </div>`;
            }
        }
    }
    document.querySelector("#calendar__prevMonth").insertAdjacentHTML("beforeend", calHtml);
};

const setNextCalendarData = (year, month) => {
    let calHtml = '';
    // 이번 달의 첫째 날로 셋
    const setFirstDate = new Date(year, month - 1, 1);
    // 이번 달의 첫째 날
    const firstDate = setFirstDate.getDate();
    // 이번 달의 첫째 날의 요일
    const firstDayOfWeek = setFirstDate.getDay();
    // 이번 달의 마지막 날
    const lastDate = new Date(today.getFullYear(), today.getMonth() + 2, 0).getDate();
    // 저번 달의 마지막 날
    const prevLastDate = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

    let startDateCount = 1;
    let lastDateCount = 1;

    // 1~6주차
    for (let i = 0; i < 6; i++) {
        // 0(일요일)~6(토요일)
        for (let j = 0; j < 7; j++) {
            // 0주차 - 첫번째 날보다 이전
            if (i == 0 && j < firstDayOfWeek) {
                calHtml += `<div class='calendar__day borderHidden'>&nbsp;</div>`;
                // `<div class='calendar__day'>
                //     <span>${(prevLastDate - (firstDayOfWeek - 1) + j)}</span>
                // </div>`;
            }
            // 0주차 - 첫번째 날
            else if (i == 0 && j == firstDayOfWeek) {
                calHtml +=
                    `<div class='calendar__day'>
                        <span>${startDateCount}</span>
                        <span id='${year}${month}${setFixDayCount(startDateCount++)}'></span>
                    </div>`;
            }
            // 0주차 - 첫번째 날 이상
            else if (i == 0 && j > firstDayOfWeek) {
                calHtml +=
                    `<div class='calendar__day'>
                        <span>${startDateCount}</span>
                        <span id='${year}${month}${setFixDayCount(startDateCount++)}'></span>
                    </div>`;
            }
            // 1주차 이상 - 마지막 날 이하
            else if (i > 0 && startDateCount <= lastDate) {
                calHtml +=
                    `<div class='calendar__day'>
                        <span>${startDateCount}</span>
                        <span id='${year}${month}${setFixDayCount(startDateCount++)}'></span>
                    </div>`;
            }
            // 마지막 날 보다 클 경우
            else if (startDateCount > lastDate) {
                calHtml += `<div class='borderHidden'></div>`;
                //     `<div class='calendar__day'>
                //     <span>${lastDateCount++}</span>
                // </div>`;
            }
        }
    }
    document.querySelector("#calendar__nextMonth").insertAdjacentHTML("beforeend", calHtml);
};

//id지정을 위한 함수
const setFixDayCount = (number) => {
    let fixNum = "";
    if (number < 10) {
        fixNum = "0" + number;
    } else {
        fixNum = number;
    }
    return fixNum;
};

//실행 함수
const init = () => {
    //10월 보다 아래일 경우 월 앞에 0 추가
    if (today.getMonth() + 1 < 10) {
        setPrevCalendarData(today.getFullYear(), "0" + (today.getMonth() + 1));
        setNextCalendarData(today.getFullYear(), "0" + (today.getMonth() + 2));
    } else {
        setPrevCalendarData(today.getFullYear(), "" + (today.getMonth() + 1));
        setNextCalendarData(today.getFullYear(), "" + (today.getMonth() + 2));
    }
}

//호출
init();