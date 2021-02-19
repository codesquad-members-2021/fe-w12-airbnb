import { selectedDateState, createState, updateState, removeState } from "./dateStates.js";

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
  target.innerText = `${month}월 ${day + 1}일`;
};

const eraseDateOnTab = (target) => (target.innerText = ``);

const canConnectDates = () => {
  return selectedDateState.startDate.element && selectedDateState.endDate.element;
};

// calednar날짜 생성 시 이전달, 다음달 등등.. 현재 사용자가 선택한 날짜의 사이에 해당하는지 확인 - calenar.js에서 사용할 예정
const isBetweenSelectedDates = (currDate) => {
  const startDate = selectedDateState.startDate.data;
  const endDate = selectedDateState.endDate.data;
  if ((isLaterThanDate(currDate, startDate) && !isLaterThanDate(currDate, endDate)) || isSameWithDate(currDate, endDate) || isSameWithDate(currDate, startDate)) {
    // console.log(`currDate: ${currDate}`);
    // console.log(`startDate: ${startDate}`);
    // console.log(`endDate: ${endDate}`);
    return true;
  }
  return false;
};

const isSameWithStartDate = (currDate) => {
  const [s_year, s_month, s_day] = selectedDateState.startDate.data;
  const [year, month, day] = currDate;
  return s_year === year && s_month === month && s_day === day;
};

const isSameWithEndDate = (currDate) => {
  const [e_year, e_month, e_day] = selectedDateState.endDate.data;
  const [year, month, day] = currDate;
  return e_year === year && e_month === month && e_day === day;
};
// 여기까지 calendar.js에서 사용할 예정.. 이럴거면 그냥 위에 있는 isSameDate를 지우는게 나을수도..

const connectTwoDates = (calendarDates) => {
  calendarDates.forEach((date) => {
    if (date.classList.contains("today") || date.classList.contains("tomorrow")) {
      const currDate = parseDate(date.id);
      if (isBetweenSelectedDates(currDate)) date.classList.add("connected");
    }
  });
};

const deleteConnection = (calendarDates) => {
  calendarDates.forEach((date) => {
    if (date.classList.contains("today") || date.classList.contains("tomorrow")) {
      date.classList.remove("connected");
      if (date.childNodes[0].classList.contains("selected")) date.childNodes[0].classList.remove("selected");
    }
  });
};

const registerClickEvent = (element, placeholder, textStartDate, textEndDate, calendarDates) => {
  element.addEventListener("click", ({ target }) => {
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
      }
    } else {
      // 시작, 끝 날짜 모두 선택되어 있으면
      const selectedStartDate = selectedDateState.startDate.data;
      const selectedEndDate = selectedDateState.endDate.data;
      // 날짜 연결시켰던 선 지우기
      deleteConnection(calendarDates);
      if (isSameWithDate(clickedDate, selectedStartDate)) {
        // 시작 날짜와 같으면
        removeState(kindOfDate.start);
        removeState(kindOfDate.end);
        eraseDateOnTab(textStartDate);
        eraseDateOnTab(textEndDate);
      } else if (isSameWithDate(clickedDate, selectedEndDate)) {
        // 끝 날짜와 같으면
        removeState(kindOfDate.start);
        removeState(kindOfDate.end);
        createState(target, clickedDate, kindOfDate.start);
        eraseDateOnTab(textEndDate);
        writeDateOnTab(textStartDate, clickedDate);
      } else if (!isLaterThanDate(clickedDate, selectedStartDate)) {
        // 시작 날짜보다 더 이른 날짜를 클릭하면
        updateState(target, clickedDate, kindOfDate.start);
        writeDateOnTab(textStartDate, clickedDate);
      } else {
        // 시작 날짜보다 더 나중 날짜를 클릭하면
        if (isLaterThanDate(clickedDate, selectedEndDate)) {
          removeState(kindOfDate.end);
          eraseDateOnTab(textEndDate);
        }
        updateState(target, clickedDate, kindOfDate.start);
        writeDateOnTab(textStartDate, clickedDate);
      }
    }
    if (canConnectDates()) connectTwoDates(calendarDates);
  });
};

export { isBetweenSelectedDates, isSameWithStartDate, isSameWithEndDate, registerClickEvent };
