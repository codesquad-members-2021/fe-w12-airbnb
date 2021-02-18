import Component from "../../../../core/Component.js";

export default class Calendar extends Component {
  setup() {
    this.$target.classList.add("item-calendar");
    this.state = {
      currentDate: this.getCurrentDate(),
      startDay: {
        year: 2021,
        month: 2,
        day: 12,
      },
      endDay: {
        year: 2021,
        month: 2,
        day: 15,
      },
      calendars: [],
    };
    const [year, month] = this.state.currentDate;
    this.state.calendars = this.getNewCalendar(year, month);
  }
  getNewCalendar(year, month) {
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
    const { startDay, endDay, calendars } = this.state;
    return `
<div class="calendar-container">
  <div class="calendar-fixed-box">
    <div class="calendar-day-control">
      <div class ="slideBtn" data-direction="prev">&lt;</div>
      <div class ="slideBtn" data-direction="next">&gt;</div>
    </div>
    <div class="calendar-day-box">
      <ul class="calendar-day">
        <li>일</li>
        <li>월</li>
        <li>화</li>
        <li>수</li>
        <li>목</li>
        <li>금</li>
        <li>토</li>
      </ul>
      <ul class="calendar-day">
        <li>일</li>
        <li>월</li>
        <li>화</li>
        <li>수</li>
        <li>목</li>
        <li>금</li>
        <li>토</li>
      </ul>
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
        ${`<li></li>`.repeat(calendar.firstDay)}
            ${Array.from({ length: calendar.day }, (_, i) => i + 1)
              .map((el) => {
                return `<li>${el}</li>`;
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

    this.addEvent("transitionend", ".translate-box", () => {
      const [year, month] = this.state.currentDate;
      const direction = this.state.direction;
      const newDate = new Date(year, month + direction);

      const newYear = newDate.getFullYear();
      const newMonth = newDate.getMonth();

      const calendars = this.getNewCalendar(newYear, newMonth);

      this.setState({ calendars, currentDate: [newYear, newMonth] });
    });
  }
  pre() {}
  next() {}
}
