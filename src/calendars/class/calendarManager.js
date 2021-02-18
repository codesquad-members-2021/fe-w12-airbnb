import Calendar from "./calendar.js";
import { registerClickEvent } from "../functions/calendarDate.js";

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
