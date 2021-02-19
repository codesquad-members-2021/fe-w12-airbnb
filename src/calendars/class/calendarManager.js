import Calendar from "./calendar.js";
import { registerClickEvent } from "../functions/calendarDateEvent.js";

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

  showPresentCalendar(calendar, startDate, endDate, placeholder) {
    this.tab.addEventListener("click", () => {
      calendar.init();
      this.createTwoCalendars();
      createCalendarDateEvent(startDate, endDate, placeholder);
    });
  }

  showPrevCalendar(startDate, endDate, placeholder) {
    this.prevButton.addEventListener("click", () => {
      --this.currentMonth;
      this.createTwoCalendars();
      createCalendarDateEvent(startDate, endDate, placeholder);
    });
  }

  showNextCalendar(startDate, endDate, placeholder) {
    this.nextButton.addEventListener("click", () => {
      ++this.currentMonth;
      this.createTwoCalendars();
      createCalendarDateEvent(startDate, endDate, placeholder);
    });
  }
}

function createCalendarDateEvent(startDate, endDate, placeholder) {
  const calendarDates = document.querySelectorAll(".calendar__date");
  calendarDates.forEach((date) => {
    if (date.classList.contains("today") || date.classList.contains("tomorrow")) registerClickEvent(date, placeholder, startDate, endDate, calendarDates);
  });
}
