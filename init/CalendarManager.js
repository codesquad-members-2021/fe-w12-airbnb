import CalendarMaker from "./CalendarMaker.js";
export default class CalendarManager extends CalendarMaker {
  constructor($activityDate) {
    super();
    this.$activityDate = $activityDate;
    this.init();
  }

  isAvailablePlan() {}

  saveCheckInOut() {}

  selectDate(event) {
    const $tdLeft = document.getElementsByClassName("td-left");
    const $tdRight = document.getElementsByClassName("td-right");
    const $selectedDate = event.target;
    const selectedDate = `?월 ${$selectedDate.textContent}일`;
    this.$activityDate.classList.add("date-view-selected");
    this.$activityDate.textContent = selectedDate;

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

  init() {
    const leftTbodyEl = document.querySelector(".calendar-left-tbody");
    const rightTbodyEl = document.querySelector(".calendar-right-tbody");
    leftTbodyEl.addEventListener("click", this.selectDate.bind(this));
    rightTbodyEl.addEventListener("click", this.selectDate.bind(this));
  }
}
