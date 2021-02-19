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
    //오른쪽 왼쪽이 아님..
    // 1. 날짜를 누른다.
    // 2. 날짜를 start변수에 넣는다
    // 2-2. 체크인 박스에 start 변수 값을 년 월로 출력한다.
    // 3. 날짜를 또 누른다.
    // 4. 2번째로 눌린 날짜가 start 보다 작으면 start에 2번째로 눌린날짜를 넣는다. / start보다 크면 end에넣는다.
    //4-2 end 날짜를 체크아웃박스에 넣는다

    const $tdLeft = document.getElementsByClassName("td-left");
    //왼쪽 td 엘리번트 리스트
    const $tdRight = document.getElementsByClassName("td-right"); //오른쪽 td 엘리먼트 리스트

    const $selectedDate = event.target; //타켓
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
    //여기 코드 어떻게 줄일 건지 고민 필요
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
