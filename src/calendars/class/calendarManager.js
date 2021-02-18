import Calendar from "./calendar.js";

export default class CalendarManager {
  constructor(tab, prevButton, nextButton, calendarHtml) {
    this.tab = tab;
    this.prevButton = prevButton;
    this.nextButton = nextButton;
    this.calendarHtml = calendarHtml;
    this.today = new Date();
    this.currentMonth = this.today.getMonth();
  }

  createTwoCalendars() {
    this.calendarHtml.innerHTML = ``;
    for (let i = 0; i < 2; i++) {
      const day = [this.today.getFullYear(), this.currentMonth + i];
      const calendar = new Calendar(day, this.calendarHtml);
      calendar.setCalendarData(calendar.day.getFullYear(), calendar.day.getMonth() + 1, i);
    }
  }

  createCalendarDateEvent(startDate, endDate, placeholder) {
    const calendarDate = document.querySelectorAll(".calendar__date");
    calendarDate.forEach((date) => {
      if (!date.classList.contains("yesterday")) registerClickEvent(date, placeholder, startDate, endDate);
    });
  }

  showPresentCalendar(calendar, startDate, endDate, placeholder) {
    this.tab.addEventListener("click", () => {
      calendar.init();
      this.createTwoCalendars();
      this.createCalendarDateEvent(startDate, endDate, placeholder);
    });
  }

  showPrevCalendar(startDate, endDate, placeholder) {
    this.prevButton.addEventListener("click", () => {
      --this.currentMonth;
      this.createTwoCalendars();
      this.createCalendarDateEvent(startDate, endDate, placeholder);
    });
  }

  showNextCalendar(startDate, endDate, placeholder) {
    this.nextButton.addEventListener("click", () => {
      ++this.currentMonth;
      this.createTwoCalendars();
      this.createCalendarDateEvent(startDate, endDate, placeholder);
    });
  }
}

const isLaterThanStartDate = (thisDate, startDate) => {
  const [s_year, s_month, s_day] = startDate;
  const [year, month, day] = thisDate;
  return year * 365 + month * 30 + day >= s_year * 365 + s_month * 30 + s_day;
};

const showDateOnTab = (date, clickedDate) => {
  const [year, month, day] = clickedDate;
  date.innerText = `${year}-${month}-${day + 1}`;
};

const parseDate = (date) => date.split("-").map((e) => +e);

const registerClickEvent = (element, placeholder, startDate, endDate) => {
  element.addEventListener("click", () => {
    placeholder.classList.add("none");
    const clickedDate = parseDate(element.id);
    if (!startDate.innerText) {
      showDateOnTab(startDate, clickedDate);
      element.classList.add("selected");
    } else {
      const checkInDate = parseDate(startDate.innerText);
      if (isLaterThanStartDate(clickedDate, checkInDate)) {
        showDateOnTab(endDate, clickedDate);
        element.classList.add("selected");
      } else alert("잘못된 날짜를 선택하셨습니다.");
    }
  });
};
