import CalendarMaker from "./CalendarMaker.js";
export default class CalendarManager extends CalendarMaker {
  constructor($activityDate, $navMenuRoom, $navMenuActivity) {
    //자식이 받아오는 값
    super($navMenuRoom, $navMenuActivity); //먼저 실행(부모 메소드 쓸 때 필요한 경우 사용)
    this.$activityDate = $activityDate;
    this.childInit();
  }

  movePrevMonth() {
    const $calendar = document.querySelector(".search-calendar");
    if ($calendar) $calendar.remove();

    if (this.activeMonth <= 0) {
      this.activeMonth = 11;
      --this.year;
    } else {
      --this.activeMonth;
    }
    this.init();
    this.childInit();
  }

  moveNextMonth() {
    const $calendar = document.querySelector(".search-calendar");
    if ($calendar) $calendar.remove();

    if (this.activeMonth >= 10) {
      this.activeMonth = 0;
      ++this.year;
    } else {
      ++this.activeMonth;
    }
    this.init();
    this.childInit();
  }

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

  onEvents() {
    const leftTbodyEl = document.querySelector(".calendar-left-tbody");
    const rightTbodyEl = document.querySelector(".calendar-right-tbody");
    leftTbodyEl.addEventListener("click", this.selectDate.bind(this));
    rightTbodyEl.addEventListener("click", this.selectDate.bind(this));
    document
      .querySelector("#btn-left")
      .addEventListener("click", this.movePrevMonth.bind(this));

    document
      .querySelector("#btn-right")
      .addEventListener("click", this.moveNextMonth.bind(this));
  }

  childInit() {
    this.onEvents();
  }
}
