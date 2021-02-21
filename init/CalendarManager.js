import CalendarMaker from "./CalendarMaker.js";
export default class CalendarManager {
  constructor($activityDate, $navMenuRoom, $navMenuActivity) {
    this.$activityDate = $activityDate;
    this.$navMenuRoom = $navMenuRoom;
    this.$navMenuActivity = $navMenuActivity;
    this.$activityDateView = document.querySelector(".date-view");
    this.calendarUI = new CalendarMaker($navMenuRoom, $navMenuActivity);
    this.checkInDate;
    this.checkOutDate;
    this.paintCount = 1;
    this.init();
  }

  showCalendar() {
    this.calendarUI.init(); //달력을 그린다.
    this.onEvents(); //그려진 달력 요소를 가져와 이벤트를  등록한다..
    document.addEventListener("click", this.hideCalendar.bind(this));
  }

  hideCalendar() {
    console.log(1);
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
      // count가 2인데 선택한 곳에 td circle class가 없다  + 들어온 값이 end date다. ???
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
    const $leftBtn = document.querySelector("#btn-left");
    const $rightBtn = document.querySelector("#btn-right");

    $leftTbody.addEventListener("click", this.selectDate.bind(this));
    //$rightTbody.addEventListener("click", this.selectDate.bind(this));
    $leftBtn.addEventListener("click", this.movePrevMonth.bind(this));
    $rightBtn.addEventListener("click", this.moveNextMonth.bind(this));
  }

  init() {
    this.$activityDateView.addEventListener(
      "click",
      this.showCalendar.bind(this)
    );

    //그럼 이전에 뭐가 있어야할까? > 체험을 눌렀을 때 보이는 날짜 div를 클릭했을 때 이벤트를 받아와야한다.
    // 근데 체험을 눌렀을 때 event가
  }
}
