import Component from "../../../../core/Component.js";

export default class Calendar extends Component {
  setup() {
    this.$target.classList.add("item-calendar");
  }
  getTemplate() {
    return `
    <div class="calendar-box">
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
        <div class="calendar-list"></div>
      </div>
      <div class="calendar-date">
      </div>
  </div>
  <div class="calendar-option">
    
  </div>
        `;
  }
  setEvent() {}
  createCalendar() {}
}
