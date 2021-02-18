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
  target.innerText = `${year}-${month}-${day + 1}`;
};

const eraseDateOnTab = (target) => (target.innerText = ``);

const registerClickEvent = (element, placeholder, textStartDate, textEndDate) => {
  element.addEventListener("click", () => {
    placeholder.classList.add("none");
    const clickedDate = parseDate(element.id);
    // if (!startDate.innerText) {
    //   writeDateOnTab(startDate, clickedDate);
    //   element.classList.add("selected");
    // } else if (startDate.innerText && !endDate.innerText) {
    //   const checkInDate = parseDate(startDate.innerText);
    //   if (isLaterThanDate(clickedDate, checkInDate)) {
    //     writeDateOnTab(endDate, clickedDate);
    //     element.classList.add("selected");
    //   } else alert("잘못된 날짜를 선택하셨습니다.");
    // }
    if (!selectedDateState.startDate.element && !selectedDateState.endDate.element) {
      // 둘 다 선택 안되어 있으면
      writeDateOnTab(textStartDate, clickedDate);
      createState(element, clickedDate, kindOfDate.start);
    } else if (selectedDateState.startDate.element && !selectedDateState.endDate.element) {
      // 시작 날짜만 선택되어 있으면
      const selectedStartDate = selectedDateState.startDate.data;
      if (!isLaterThanDate(clickedDate, selectedStartDate)) {
        // 클릭한 날짜가 시작 날짜보다 이르면
        writeDateOnTab(textStartDate, clickedDate);
        updateState(element, clickedDate, kindOfDate.start);
      } else {
        // 클릭한 날짜가 시작 날짜보다 나중이거나 같으면
        writeDateOnTab(textEndDate, clickedDate);
        createState(element, clickedDate, kindOfDate.end);
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
      } else if (isSameWithDate(clickedDate, selectedEndDate)) {
        // 끝 날짜와 같으면
        removeState(kindOfDate.start);
        removeState(kindOfDate.end);
        createState(element, clickedDate, kindOfDate.start);
        eraseDateOnTab(textEndDate);
        writeDateOnTab(textStartDate, clickedDate);
      } else if (!isLaterThanDate(clickedDate, selectedStartDate)) {
        // 시작 날짜보다 더 이른 날짜를 클릭하면
        updateState(element, clickedDate, kindOfDate.start);
        writeDateOnTab(textStartDate, clickedDate);
      } else {
        // 시작 날짜보다 더 나중 날짜를 클릭하면
        updateState(element, clickedDate, kindOfDate.start);
        writeDateOnTab(textStartDate, clickedDate);
        if (isLaterThanDate(clickedDate, selectedEndDate)) {
          removeState(kindOfDate.end);
          eraseDateOnTab(textEndDate);
        }
      }
    }
  });
};

export { registerClickEvent };
