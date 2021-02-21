import CalendarMaker from "./CalendarMaker.js";

export default class CalendarManager {
  constructor($activityDate, $navMenuRoom, $navMenuActivity) {
    this.$activityDate = $activityDate;
    this.$navMenuRoom = $navMenuRoom;
    this.$navMenuActivity = $navMenuActivity;
    this.calendarUI = new CalendarMaker($navMenuRoom, $navMenuActivity);
    this.checkInDate;
    this.checkOutDate;
    this.paintCount = 1;
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

  showSelectedDate() {
    this.$activityDate.classList.add("date-view-selected");
    const checkIn = `${
      this.checkInDate.getMonth() + 1
    }월 ${this.checkInDate.getDate()}일`;

    if (!this.checkOutDate) {
      this.$activityDate.textContent = `${checkIn}`;
    } else {
      const checkOut = `${this.checkOutDate.getMonth() + 1}월 
      ${this.checkOutDate.getDate()}일`;
      this.$activityDate.textContent = `${checkIn}-${checkOut}`;
    }
  }

  paintDateBlack(selectedDate, isCheckInDate) {
    const $selectedDate = selectedDate;

    if (this.paintCount <= 2) {
      $selectedDate.classList.add("td-circle");
      this.paintCount++;
    } else {
      // count가 2인데 선택한 곳에 td circle class가 없다  + 들어온 값이 end date다. >
      this.paintCount--;
    }
  }

  selectDate(event) {
    const $selected = event.target;
    let isCheckInDate;

    this.$selectedNumber = $selected.textContent;
    this.$selectedDate = new Date(
      this.calendarUI.year,
      this.calendarUI.activeMonth,
      this.$selectedNumber
    );

    if (!this.checkInDate) {
      //첫 클릭
      this.checkInDate = this.$selectedDate;
      isCheckInDate = true;
      this.paintDateBlack($selected, isCheckInDate);
    } else if (this.checkInDate && this.checkInDate < this.$selectedDate) {
      //두번 째 클릭이 check in 보다 늦으면 > check out으로
      this.checkOutDate = this.$selectedDate;
      isCheckInDate = false;
      this.paintDateBlack($selected, isCheckInDate);
    } else if (this.checkInDate && this.checkInDate > this.$selectedDate) {
      // 두번째 클릭이 check in 보다 이르면 > check in 날짜 변경
      this.checkInDate = this.$selectedDate;
      isCheckInDate = true;
      this.paintDateBlack($selected, isCheckInDate);
    }

    this.showSelectedDate();
  }

  onEvents() {
    const $leftTbody = document.querySelector(".calendar-left-tbody");
    const $rightTbody = document.querySelector(".calendar-right-tbody");
    $leftTbody.addEventListener("click", this.selectDate.bind(this));
    //$rightTbody.addEventListener("click", this.selectDate.bind(this));
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
