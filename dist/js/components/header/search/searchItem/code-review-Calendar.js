import Component from "../../../../core/Component.js";

export default class Calendar extends Component {
  setup() {
    this.$target.classList.add("item-calendar");
    this.state = {
      mode: "waiting", // wait, selecting, complete
      currentDate: this.getCurrentDate(),
      startDate: null,
      endDate: null,
      calendars: [],
    };
    const [year, month] = this.state.currentDate;
    this.state.calendars = this.getNewCalendars(year, month);
  }
  getNewCalendars(year, month) {
    return [
      this.getDateState(year, month - 1),
      this.getDateState(year, month),
      this.getDateState(year, month + 1),
      this.getDateState(year, month + 2),
    ];
  }
  getDateState(year, month) {
    const date = new Date(year, month + 1, 0);
    const firstDay = new Date(year, month, 1);
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      firstDay: firstDay.getDay(),
    };
  }
  getCurrentDate() {
    const current = new Date();
    return [current.getFullYear(), current.getMonth()];
  }
  getTemplate() {
    const { calendars } = this.state;
    return `
<div class="calendar-container">
  <div class="calendar-fixed-box">
    <div class="calendar-day-control">
      <div class ="slideBtn" data-direction="prev">&lt;</div>
      <div class ="slideBtn" data-direction="next">&gt;</div>
    </div>
    <div class="calendar-day-box">
      ${`<ul class="calendar-day">
        <li>일</li>
        <li>월</li>
        <li>화</li>
        <li>수</li>
        <li>목</li>
        <li>금</li>
        <li>토</li>
      </ul>`.repeat(2)}
    </div>
  </div>
  <div class="calendar-list">
    <div class="translate-box">
    ${calendars
      .map((calendar) => {
        return `
        <div>
        <div class="calendar-date">${calendar.year}년 ${calendar.month}월</div>
        <div class="calendar-box">
        <ul>
        ${`<li><div></div></li>`.repeat(calendar.firstDay)}
            ${Array.from({ length: calendar.day }, (_, i) => i + 1)
              .map((el) => {
                const date = `${calendar.year}-${calendar.month}-${el}`;
                return `
                <li class="${this.isPassedDay(date) ? "passed" : "notPassed"}">
                  <div 
                    class="${
                      (this.state.startDate === date ||
                        this.state.endDate === date) &&
                      "clicked"
                    }" 
                    data-date="${calendar.year}-${calendar.month}-${el}">
                    ${el}
                  </div>
                </li>`;
              })
              .join("")}
          </ul>
        </div>
    </div>
      `;
      })
      .join("")}
    </div>
  </div>
</div>
<div class="calendar-option">
  <ul>
    <li>정확한 날짜</li>
    <li>+- 1일</li>
    <li>+- 3일</li>
    <li>+- 7일</li>
  </ul>
</div>
`;
  }
  setState(newState) {
    super.setState(newState);
    const { startDate, endDate } = this.state;
    const [startY, startM, startD] = startDate.split("-");
    const checkIn = document.getElementById("stayCheckIn");
    const checkOut = document.getElementById("stayCheckOut");

    checkIn.value = `${startM}월 ${startD}일`;

    if (!endDate) {
      checkOut.value = "";
      return;
    }
    const [endY, endM, endD] = endDate.split("-");
    checkOut.value = `${endM}월 ${endD}일`;
  }
  setEvent() {
    this.addEvent("click", ".slideBtn", ({ target }) => {
      const $translateBox = this.$target.querySelector(".translate-box");
      const direction = target.dataset.direction === "prev" ? -1 : +1;
      if (direction === 1) {
        $translateBox.style.transform = "translate(-50.2rem)";
      } else {
        $translateBox.style.transform = "translate(0rem)";
      }
      this.state.direction = direction;
    });

    this.addEvent("transitionend", ".translate-box", ({ target }) => {
      const [year, month] = this.state.currentDate;
      const direction = this.state.direction;
      const newDate = new Date(year, month + direction);

      const newYear = newDate.getFullYear();
      const newMonth = newDate.getMonth();

      const calendars = this.getNewCalendars(newYear, newMonth);
      this.setState({ calendars, currentDate: [newYear, newMonth] });
    });
    this.addEvent("click", "[data-date]", ({ target }) => {
      const { mode } = this.state;
      const { startDate, endDate } = this.state;
      const targetDate = target.dataset.date;
      switch (mode) {
        case "waiting":
          if (!startDate) {
            this.setState({ startDate: targetDate });
            this.state.mode = "selecting";
            return;
          }
          break;
        case "selecting":
          if (targetDate === startDate) {
            this.setState({ startDate: null });
            this.state.mode = "waiting";
            return;
          }
          if (this.isFuturethanPivotDate(startDate, targetDate)) {
            this.setState({ endDate: targetDate });
            this.state.mode = "complete";
            this.fillBetweenStartAndEnd();
          } else {
            this.setState({ startDate: targetDate, endDate: null });
          }
          break;
        case "complete":
          if (targetDate === endDate) {
            this.setState({ endDate: null });
            this.state.mode = "selecting";
            return;
          }
          if (targetDate === startDate) {
            this.setState({ startDate: null, endDate: null });
            this.state.mode = "waiting";
            return;
          }
          if (this.isFuturethanPivotDate(startDate, targetDate)) {
            this.setState({ endDate: targetDate });
            this.fillBetweenStartAndEnd();
          }
          break;
        default:
          console.log("error");
      }
    });
    this.addEvent("mouseover", "[data-date]", ({ target }) => {
      if (this.state.mode === "complete") return;
      const { startDate } = this.state;
      const targetDate = target.dataset.date;
      if (startDate && this.isFuturethanPivotDate(startDate, targetDate)) {
        target.classList.add("clicked");
        this.state.endDate = targetDate;
        this.fillBetweenStartAndEnd();
      }
    });
    this.addEvent("mouseout", "[data-date]", ({ target }) => {
      if (this.state.mode === "complete") return;
      const { startDate } = this.state;
      const targetDate = target.dataset.date;
      if (startDate === targetDate) return;
      if (target.classList.contains("clicked")) {
        target.classList.remove("clicked");
        this.fillBetweenStartAndEnd();
      }
    });
  }
  setEndDate(targetDate) {
    this.state.endDate = targetDate;
  }
  fillBetweenStartAndEnd() {
    const { startDate, endDate } = this.state;
    if (!startDate || !endDate) return;
    const days = [...this.$target.querySelectorAll("[data-date]")];
    days.map((day) => (day.closest("li").style.backgroundColor = "white"));
    days
      .filter(
        (day) =>
          !this.isFuturethanPivotDate(day.dataset.date, startDate) &&
          this.isFuturethanPivotDate(day.dataset.date, endDate)
      )
      .map((filteredDay) => {
        const $li = filteredDay.closest("li");
        $li.style.backgroundColor = "rgb(170,170,170)";
        $li.style.borderRadius = "0 0 0 0";
      });
    const [$start, $end] = [...this.$target.querySelectorAll(".clicked")];
    $start.closest("li").style.borderRadius = "50% 0 0 50%";
    $start.closest("li").style.backgroundColor = "rgb(170,170,170)";
    if (!$end) return;
    $end.closest("li").style.borderRadius = "0 50% 50% 0";
  }
  isFuturethanPivotDate(pivotDate, targetDate) {
    const pivot = new Date(pivotDate);
    const target = new Date(targetDate);
    return pivot <= target;
  }
  getClickedLi(target) {
    return target.closest("li");
  }
  isPassedDay(date) {
    const today = new Date();
    today.setDate(today.getDate() - 1);
    const targetDate = new Date(date);
    return today > targetDate;
  }
  calStartOrEndDate(date) {}
}
