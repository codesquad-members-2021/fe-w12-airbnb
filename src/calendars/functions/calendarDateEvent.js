import { selectedDateState, createState, updateState, removeState } from "./calendarDateStates.js";

const kindOfDate = {
  start: "startDate",
  end: "endDate",
};

const isLaterThanDate = (clickedDate, compareDate) => {
  const [year, month, day] = clickedDate;
  const [s_year, s_month, s_day] = compareDate;
  return year * 365 + month * 30 + day >= s_year * 365 + s_month * 30 + s_day;
};

const parseDate = (date) => date.split("-").map((e) => +e);

const writeDateOnTab = (target, clickedDate) => {
  const [year, month, day] = clickedDate;
  target.innerText = `${month}월 ${day + 1}일`;
};

const eraseDateOnTab = (target) => (target.innerText = ``);

// calednar날짜 생성 시 이전달, 다음달 등등.. 현재 사용자가 선택한 날짜의 사이에 해당하는지 확인 - calenar.js에서도 사용할 예정
const isBetweenSelectedDates = (currDate) => {
  const startDate = selectedDateState.startDate.data;
  const endDate = selectedDateState.endDate.data;
  if ((isLaterThanDate(currDate, startDate) && !isLaterThanDate(currDate, endDate)) || isSameWithEndDate(currDate) || isSameWithStartDate(currDate)) return true;
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

// 여기까지 calendar.js에서 사용할 예정.. 이럴거면 그냥 위에 있는 isSameDate를 지우는게 나을수도.. => 그래서 지움

const connectTwoDates = (calendarDates) => {
  calendarDates.forEach((date) => {
    if (date.classList.contains("today") || date.classList.contains("tomorrow")) {
      const currDate = parseDate(date.childNodes[0].id);
      if (isBetweenSelectedDates(currDate)) date.classList.add("connected");
    }
  });
};

const deleteConnection = (calendarDates, updatedDate = undefined) => {
  calendarDates.forEach((date) => {
    if (date.classList.contains("today") || date.classList.contains("tomorrow")) {
      date.classList.remove("connected");
      if (!updatedDate && date.childNodes[0].classList.contains("selected")) date.childNodes[0].classList.remove("selected");
      else if (updatedDate === kindOfDate.end) {
        if (date.childNodes[0].classList.contains("endDate")) {
          date.childNodes[0].classList.remove("selected");
          date.childNodes[0].classList.remove("endDate");
        }
      } else if (updatedDate === kindOfDate.start) {
        if (date.childNodes[0].classList.contains("startDate")) {
          date.childNodes[0].classList.remove("selected");
          date.childNodes[0].classList.remove("startDate");
        }
      }
    }
  });
};

const repaintAtSelectedDate = (key) => {
  // 날짜가 두개 선택된 상태에서 또 선택을 하면 connection을 모두 지우고 시작하기 때문에 endDate을 보존하고 싶은 경우에 재칠해줘야함
  console.log(selectedDateState[key].element);
  selectedDateState[key].element.classList.add("selected");
};

const canConnectDates = () => {
  return selectedDateState.startDate.element && selectedDateState.endDate.element;
};

const selectedDateCount = () => {
  if (!selectedDateState.startDate.element && !selectedDateState.endDate.element) return 0;
  if (selectedDateState.startDate.element && !selectedDateState.endDate.element) return 1;
  return 2;
};

const setDate = (target, clickedDate, textDate, dateKey) => {
  createState(target, clickedDate, dateKey);
  writeDateOnTab(textDate, clickedDate);
};

const editDate = (target, clickedDate, textDate, dateKey) => {
  updateState(target, clickedDate, dateKey);
  writeDateOnTab(textDate, clickedDate);
};

const dropDate = (dateKey, textDate) => {
  removeState(dateKey);
  eraseDateOnTab(textDate);
};

const registerClickEvent = (element, placeholder, textStartDate, textEndDate, calendarDates) => {
  element.addEventListener("click", ({ target }) => {
    placeholder.classList.add("none");
    const clickedDate = parseDate(target.id);
    const selectedStartDate = selectedDateState.startDate.data;
    // 사용자가 날짜를 클릭했을 때
    if (!selectedDateCount()) setDate(target, clickedDate, textStartDate, kindOfDate.start);
    else if (selectedDateCount() === 1) {
      // 시작 날짜만 선택되어 있으면
      !isLaterThanDate(clickedDate, selectedStartDate) ? editDate(target, clickedDate, textStartDate, kindOfDate.start) : setDate(target, clickedDate, textEndDate, kindOfDate.end);
    } else {
      // 시작, 끝 날짜 모두 선택되어 있으면
      const selectedEndDate = selectedDateState.endDate.data;
      // 날짜 연결시켰던 선 지우기

      if (isSameWithStartDate(clickedDate)) {
        // 시작 날짜와 같으면
        dropDate(kindOfDate.start, textStartDate);
        dropDate(kindOfDate.end, textEndDate);
        deleteConnection(calendarDates);
      } else if (isSameWithEndDate(clickedDate)) {
        // 끝 날짜와 같으면
        dropDate(kindOfDate.start, textStartDate);
        dropDate(kindOfDate.end, textEndDate);
        setDate(target, clickedDate, textStartDate, kindOfDate.start);
        deleteConnection(calendarDates);
      } else if (!isLaterThanDate(clickedDate, selectedStartDate)) {
        // 시작 날짜보다 더 이른 날짜를 클릭하면
        editDate(target, clickedDate, textStartDate, kindOfDate.start);
        repaintAtSelectedDate(kindOfDate.end);
        // target.classList.add("selected");
        deleteConnection(calendarDates, kindOfDate.start);
      } else if (isLaterThanDate(clickedDate, selectedStartDate) && !isLaterThanDate(clickedDate, selectedEndDate)) {
        // 시작 날짜보다 더 나중 날짜를 클릭하면
        editDate(target, clickedDate, textStartDate, kindOfDate.start);
        repaintAtSelectedDate(kindOfDate.end);
        deleteConnection(calendarDates, kindOfDate.start);
      } else if (isLaterThanDate(clickedDate, selectedEndDate)) {
        editDate(target, clickedDate, textEndDate, kindOfDate.end);
        repaintAtSelectedDate(kindOfDate.start);
        deleteConnection(calendarDates, kindOfDate.end);
      }
    }
    // 날짜가 다 선택된 상황에서 연결선을 그려줘야 하면 그리기
    if (canConnectDates()) connectTwoDates(calendarDates);
  });
};

export { isBetweenSelectedDates, isSameWithStartDate, isSameWithEndDate, registerClickEvent };
