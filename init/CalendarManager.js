import CalendarMaker from "./CalendarMaker.js";

export default class CalendarManager {
  constructor($activityDate, $navMenuRoom, $navMenuActivity) {
    this.$activityDate = $activityDate;
    this.$navMenuRoom = $navMenuRoom;
    this.$navMenuActivity = $navMenuActivity;
    this.calendarUI = new CalendarMaker($navMenuRoom, $navMenuActivity);
    this.init();
  }

  movePrevMonth() {
    const $calendar = document.querySelector(".search-calendar");
    if ($calendar) $calendar.remove();

    if (this.calendarUI.activeMonth <= 0) {
      this.calendarUI.activeMonth = 11;
      --this.calendarUI.year;
    } else {
      --this.calendarUI.activeMonth;
    }

    this.init();
  }

  moveNextMonth() {
    const $calendar = document.querySelector(".search-calendar");
    if ($calendar) $calendar.remove();

    if (this.calendarUI.activeMonth >= 10) {
      this.calendarUI.activeMonth = 0;
      ++this.calendarUI.year;
    } else {
      ++this.calendarUI.activeMonth;
    }
    this.init();
  }

  showSelectedDate(selectedDate) {
    this.$activityDate.classList.add("date-view-selected");
    this.$activityDate.textContent = selectedDate;
  }

  selectDate(event) {
    const $tdLeft = document.getElementsByClassName("td-left");
    const $tdRight = document.getElementsByClassName("td-right");
    const $selectedDate = event.target;
    const selectedDate = `?월 ${$selectedDate.textContent}일`;
    this.showSelectedDate(selectedDate);

    for (let node of $tdLeft) {
      if (node.classList.contains("td-circle")) {
        node.classList.remove("td-circle");
        $selectedDate.classList.add("td-circle");
      } else {
        $selectedDate.classList.add("td-circle");
      }
    }
    for (let node of $tdRight) {
      if (node.classList.contains("td-circle")) {
        node.classList.remove("td-circle");
        $selectedDate.classList.add("td-circle");
      } else {
        $selectedDate.classList.add("td-circle");
      }
    }
  }

  onEvents() {
    const $leftTbody = document.querySelector(".calendar-left-tbody");
    const $rightTbody = document.querySelector(".calendar-right-tbody");
    $leftTbody.addEventListener("click", this.selectDate.bind(this));
    $rightTbody.addEventListener("click", this.selectDate.bind(this));
    document
      .querySelector("#btn-left")
      .addEventListener("click", this.movePrevMonth.bind(this));

    document
      .querySelector("#btn-right")
      .addEventListener("click", this.moveNextMonth.bind(this));
  }

  init() {
    this.calendarUI.init();
    this.onEvents();
  }
}
