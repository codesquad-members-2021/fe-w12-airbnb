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
    this.initdefaultState();
  }
  initdefaultState() {
    const [year, month] = this.state.currentDate;
    this.state.calendars = [
      this.getDateState(year, month - 1),
      this.getDateState(year, month),
      this.getDateState(year, month + 1),
      this.getDateState(year, month + 2),
    ];
  }
  getDateState(year, month) {
    console.log(year, month);
    const date = new Date(year, month, 0);
    const firstDay = new Date(year, month, 1);
    console.log(firstDay.getDay());
    console.log(" ");
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
      <div>&lt;</div>
      <div>&gt;</div>
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
        <div class="calendar-date">${calendar.year}년 ${calendar.month+1}월</div>
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
  setEvent() {}
}
