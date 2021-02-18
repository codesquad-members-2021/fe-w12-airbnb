import { selectedDateState, createState, updateState, removeState } from "./dateStates.js";
// import { connectTwoDates, deleteConnection } from "./dateConnection.js";
// import { calendarDates } from "../experienceDateCalendar.js";
// const calendarDates = document.querySelectorAll(".calendar__date");
// 한번만 선언해서 여기저기 가져오거나 그럴수 있는 방법은 없나..

const kindOfDate = {
  start: "startDate",
  end: "endDate",
};

const isLaterThanDate = (clickedDate, compareDate) => {
  const [year, month, day] = clickedDate;
  const [s_year, s_month, s_day] = compareDate;
  return year * 365 + month * 30 + day >= s_year * 365 + s_month * 30 + s_day;
};

const isSameWithDate = (clickedDate, compareDate) => {
  const [year, month, day] = clickedDate;
  const [c_year, c_month, c_day] = compareDate;
  return year === c_year && month === c_month && day === c_day;
};

const parseDate = (date) => date.split("-").map((e) => +e);

const writeDateOnTab = (target, clickedDate) => {
  const [year, month, day] = clickedDate;
  target.innerText = `${year}-${month}-${day + 1}`;
};

const eraseDateOnTab = (target) => (target.innerText = ``);

const connectTwoDates = (calendarDates) => {
  // 2021-02-18 이것도 조건별로 어떻게 연결시켜야하는지 나눠서 넣기.. 지금은 처음부터 시작날짜, 끝날짜를 잘 클릭했을때만 잘먹음
  calendarDates.forEach((date) => {
    if (date.classList.contains("today") || date.classList.contains("tomorrow")) {
      const currDate = parseDate(date.id);
      const startDate = selectedDateState.startDate.data;
      const endDate = selectedDateState.endDate.data;
      if ((isLaterThanDate(currDate, startDate) && !isLaterThanDate(currDate, endDate)) || isSameWithDate(currDate, endDate)) {
        console.log(`date.id: ${date.id}`);
        date.classList.add("connected");
      }
    }
  });
};

const deleteConnection = (calendarDates) => {
  calendarDates.forEach((date) => {
    if (date.classList.contains("today") || date.classList.contains("tomorrow")) {
      date.classList.remove("connected");
    }
  });
};

const registerClickEvent = (element, placeholder, textStartDate, textEndDate, calendarDates) => {
  element.addEventListener("click", ({ target }) => {
    console.log(target.id);
    const temp = element.classList;
    // console.log(element.classList);
    // console.log(typeof temp[2]);
    placeholder.classList.add("none");
    const clickedDate = parseDate(target.id);
    if (!selectedDateState.startDate.element && !selectedDateState.endDate.element) {
      // 둘 다 선택 안되어 있으면
      writeDateOnTab(textStartDate, clickedDate);
      createState(target, clickedDate, kindOfDate.start);
    } else if (selectedDateState.startDate.element && !selectedDateState.endDate.element) {
      // 시작 날짜만 선택되어 있으면
      const selectedStartDate = selectedDateState.startDate.data;
      if (!isLaterThanDate(clickedDate, selectedStartDate)) {
        // 클릭한 날짜가 시작 날짜보다 이르면
        writeDateOnTab(textStartDate, clickedDate);
        updateState(target, clickedDate, kindOfDate.start);
      } else {
        // 클릭한 날짜가 시작 날짜보다 나중이거나 같으면
        writeDateOnTab(textEndDate, clickedDate);
        createState(target, clickedDate, kindOfDate.end);
        // 날짜 연결시키기
        connectTwoDates(calendarDates);
      }
    } else {
      // 시작, 끝 날짜 모두 선택되어 있으면
      const selectedStartDate = selectedDateState.startDate.data;
      const selectedEndDate = selectedDateState.endDate.data;
      if (isSameWithDate(clickedDate, selectedStartDate)) {
        // 시작 날짜와 같으면
        console.log("same!");
        removeState(kindOfDate.start);
        removeState(kindOfDate.end);
        eraseDateOnTab(textStartDate);
        eraseDateOnTab(textEndDate);
        // 날짜 연결시켰던 선 지우기
        deleteConnection(calendarDates);
      } else if (isSameWithDate(clickedDate, selectedEndDate)) {
        // 끝 날짜와 같으면
        removeState(kindOfDate.start);
        removeState(kindOfDate.end);
        createState(element, clickedDate, kindOfDate.start);
        eraseDateOnTab(textEndDate);
        writeDateOnTab(textStartDate, clickedDate);
        // 날짜 연결시켰던 선 지우기
        deleteConnection(calendarDates);
      } else if (!isLaterThanDate(clickedDate, selectedStartDate)) {
        // 시작 날짜보다 더 이른 날짜를 클릭하면
        updateState(target, clickedDate, kindOfDate.start);
        writeDateOnTab(textStartDate, clickedDate);
        // 날짜 연결시켰던 선 지우기
        deleteConnection(calendarDates);
      } else {
        // 시작 날짜보다 더 나중 날짜를 클릭하면
        updateState(target, clickedDate, kindOfDate.start);
        writeDateOnTab(textStartDate, clickedDate);
        if (isLaterThanDate(clickedDate, selectedEndDate)) {
          removeState(kindOfDate.end);
          eraseDateOnTab(textEndDate);
        }
        // 날짜 연결시켰던 선 지우기
        deleteConnection(calendarDates);
      }
    }
  });
};

export { registerClickEvent };
