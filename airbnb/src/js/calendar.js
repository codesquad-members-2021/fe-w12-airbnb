import { div, span } from './controlHTML.js';
import { MONTH_DAYS, CLASS_NAME } from './data.js';

class CalendarModel {
  constructor(date = new Date()) {
    this.date = date;
    this.year = date.getFullYear();
    this.month = date.getMonth() + 1;
    this.day = date.getDate();
    this.nowDate = { year: this.year, month: this.month, day: this.day };
    this.startReserve = { month: 0, day: 0 };
    this.endReserve = { month: 0, day: 0 };
  }
  getCalendar() {
    const firstDay = this.getFirstDay(this.year, this.month); //요일
    const monthData = this.getMonthData(this.year, this.month, firstDay); //월의 날짜가 담긴 2차원 배열
    const monthHtml = this.makeMonthHtml(monthData);
    const calendarHtml = this.getCalendarFormat() + monthHtml;
    return calendarHtml;
  }
  getDateStringType(day) {
    return `${this.month}월 ${day}일`;
  }
  getFirstDay(year, month) {
    return new Date(year, month - 1, 1).getDay();
  }
  //get. month 2차원 배열
  getMonthData(year, month, day) {
    const monthArr = [];
    let weekArr = new Array(7).fill(undefined);
    const lastDay = this.isLeaf(year, month) ? 29 : MONTH_DAYS[month]; //윤년 2월 체크
    for (let i = 1; i <= lastDay; i++) {
      const dayIndex = (day + i - 1) % 7;
      //인덱스가 0 && weekArr에 값이 하나라도 들어가있는 경우
      if (dayIndex === 0 && weekArr[weekArr.length - 1]) {
        monthArr.push(weekArr);
        weekArr = new Array(7).fill(undefined);
      }
      weekArr[dayIndex] = i;
    }
    monthArr.push(weekArr); //마지막 weekArr도 추가
    return monthArr;
  }
  isLeaf(year, month) {
    return year % 4 === 0 && month === 2;
  }
  //예약가능한 날인지 (오늘 이후인 날짜만 가능)
  isReservable(day) {
    const { year: nowYear, month: nowMonth, day: nowDay } = this.nowDate;
    if (this.year === nowYear && this.month === nowMonth) {
      return day >= nowDay;
    } else {
      return this.year >= nowYear && this.month >= nowMonth;
    }
  }
  isStartReservation(day) {
    const { month: reserveMonth, day: reserveDay } = this.startReserve;
    return day === reserveDay && this.month === reserveMonth;
  }
  isEndReservation(day) {
    const { month: reserveMonth, day: reserveDay } = this.endReserve;
    return day === reserveDay && this.month === reserveMonth;
  }
  //예약 start,end 사이에 있는 날짜들
  isBetweenReservation(day) {
    const { month: startMonth, day: startDay } = this.startReserve;
    const { month: endMonth, day: endDay } = this.endReserve;
    if (!this.startReserve.day || !this.endReserve.day) return false;
    if (startMonth === endMonth && this.month === startMonth) {
      return startDay < day && day < endDay;
    } else {
      if (startMonth < this.month && this.month < endMonth) {
        return true;
      } else if (this.month === startMonth) {
        return startDay < day;
      } else if (this.month === endMonth) {
        return day < endDay;
      }
    }
    return false;
  }
  //예약 시작,끝,사이에 있는 day, 오늘 이전의 day,를 구분해서 그에 맞는 day DIV 생성
  makeDayHtml(day) {
    const { DAY, DAY_SPAN, ABLE, DISABLE, BETWEEN, CHEKCED, PAST, START_RESERVE, END_RESERVE } = CLASS_NAME;
    let dayHtml;
    if (day && this.isReservable(day)) {
      if (this.isStartReservation(day)) {
        dayHtml = div(span(day, CHEKCED, DAY_SPAN), DAY, ABLE, BETWEEN, START_RESERVE);
      } else if (this.isEndReservation(day)) {
        dayHtml = div(span(day, CHEKCED, DAY_SPAN), DAY, ABLE, BETWEEN, END_RESERVE);
      } else if (this.isBetweenReservation(day)) {
        dayHtml = div(span(day, DAY_SPAN), DAY, ABLE, BETWEEN);
      } else {
        dayHtml = div(span(day, DAY_SPAN), DAY, ABLE);
      }
    } else if (day) {
      dayHtml = div(span(day, DAY_SPAN), DAY, DISABLE, PAST);
    } else {
      dayHtml = div(span(''), DAY, DISABLE);
    }
    return dayHtml;
  }
  makeWeekHtml(week) {
    let daysHtml = week.reduce((acc, day) => acc + this.makeDayHtml(day), '');
    return div(daysHtml, CLASS_NAME.WEEK);
  }
  makeMonthHtml(month) {
    let weeksHtml = month.reduce((acc, week) => acc + this.makeWeekHtml(week), '');
    return div(weeksHtml, CLASS_NAME.MONTH);
  }
  clearReserve() {
    this.startReserve = { month: 0, day: 0 };
    this.endReserve = { month: 0, day: 0 };
  }
  swapReserve() {
    [this.startReserve, this.endReserve] = [this.endReserve, this.startReserve];
  }
  getCalendarFormat() {
    return `
    <div class="calendar__header">
      <div class="calendar__btn prev"><i class="fas fa-angle-left"></i></div>
      <div class="calendar__date">
        <div class="date__year">${this.year}년&nbsp</div>
        <div class="date__month">${this.month}월</div>
      </div>
      <div class="calendar__btn next"><i class="fas fa-angle-right"></i></div>
    </div>
    <div class="calendar__index-container">
      <div class="calendar__index">일</div>
      <div class="calendar__index">월</div>
      <div class="calendar__index">화</div>
      <div class="calendar__index">수</div>
      <div class="calendar__index">목</div>
      <div class="calendar__index">금</div>
      <div class="calendar__index">토</div>
    </div>`;
  }
}

export class CalendarView {
  constructor(queryForm, queryDate, calendar) {
    this.queryForm = queryForm;
    this.queryDate = queryDate;
    this.calendar = calendar;
    this.calendarModel = new CalendarModel();
    this.startReserveDay;
    this.endReserveDay;
    this.queryDateContent;
  }
  init() {
    this.onEvent();
    this.queryDateContent = this.queryDate.querySelectorAll('.query-date__content');
  }
  onEvent() {
    document.addEventListener('click', this.handleClick.bind(this));
  }
  handleClick({ target }) {
    const { HIDDEN } = CLASS_NAME;
    if (this.calendar.contains(target)) {
      this.handleCalendarClick(target);
    } else if (this.queryDate.contains(target)) {
      this.calendar.classList.toggle(HIDDEN);
    } else {
      this.calendar.classList.add(HIDDEN);
    }

    this.renderCalendar();
  }
  handleCalendarClick(target) {
    if (this.isLeftArrow(target)) this.setPrevDate();
    else if (this.isRightArrow(target)) this.setNextDate();
    else if (this.isDay(target)) this.setReserveDate(target);
  }

  renderCalendar() {
    const calendarHTML = this.calendarModel.getCalendar();
    this.calendar.innerHTML = calendarHTML;
  }
  setReserveDate({ innerText: day } = target) {
    day = parseInt(day);
    if (this.isFullReservation()) {
      if (this.isExtendReservation(day)) {
        this.setEndReserve(day);
      } else if (this.calendarModel.isBetweenReservation(day)) {
        this.setStartReserve(day);
      } else {
        this.calendarModel.clearReserve();
        this.clearReserve();
        this.setStartReserve(day);
      }
    } else if (this.isStartReservable()) {
      this.setStartReserve(day);
    } else if (this.isEndReservable(day)) {
      this.setEndReserve(day);
    }
    this.setFormDate();
  }
  isLeftArrow({ classList } = target) {
    return classList.contains('prev') || classList.contains('fa-angle-left');
  }
  isRightArrow({ classList } = target) {
    return classList.contains('next') || classList.contains('fa-angle-right');
  }
  isDay({ classList } = target) {
    const { DAY_SPAN, DAY, ABLE } = CLASS_NAME;
    return classList.contains(DAY_SPAN) || (classList.contains(DAY) && classList.contains(ABLE));
  }
  isFullReservation() {
    return this.startReserveDay && this.endReserveDay;
  }
  isStartReservable() {
    return !this.startReserveDay;
  }
  isEndReservable() {
    return !this.endReserveDay;
  }
  isExtendReservation(day) {
    const {
      endReserve: { month: endReserveMonth, day: endReserveDay },
      month: calendarMonth,
    } = this.calendarModel;
    if (endReserveMonth < calendarMonth) {
      return true;
    } else if (endReserveMonth === calendarMonth) {
      return endReserveDay < day;
    } else {
      return false;
    }
  }
  //start보다 end가 앞에 선택될 시 start-end를 바꿔줘야된다.
  isSwapReservation(day) {
    const {
      startReserve: { month: startReserveMonth, day: startReserveDay },
      month: calendarMonth,
    } = this.calendarModel;
    if (calendarMonth < startReserveMonth) {
      return true;
    } else if (calendarMonth === startReserveMonth) {
      return day < startReserveDay;
    } else {
      return false;
    }
  }
  setPrevDate() {
    if (--this.calendarModel.month <= 0) {
      this.calendarModel.year--;
      this.calendarModel.month = 12;
    }
  }
  setNextDate() {
    if (++this.calendarModel.month > 12) {
      this.calendarModel.year++;
      this.calendarModel.month = 1;
    }
  }
  setStartReserve(day) {
    this.calendarModel.startReserve = { month: this.calendarModel.month, day };
    this.startReserveDay = this.calendarModel.getDateStringType(day);
  }
  setEndReserve(day) {
    this.calendarModel.endReserve = { month: this.calendarModel.month, day };
    this.endReserveDay = this.calendarModel.getDateStringType(day);
    if (this.isSwapReservation(day)) {
      this.calendarModel.swapReserve();
      this.swapReserve();
    }
  }
  clearReserve() {
    this.startReserveDay = undefined;
    this.endReserveDay = undefined;
  }
  swapReserve() {
    [this.startReserveDay, this.endReserveDay] = [this.endReserveDay, this.startReserveDay];
  }
  //form에 날짜형태로 선택한 날짜 입력
  setFormDate() {
    const reserveDate = [this.startReserveDay, this.endReserveDay];
    //stay일 경우 checkin,checkout으로 content 노드가 2개이다.
    if (this.queryDateContent.length === 2) {
      this.queryDateContent.forEach((v, idx) => {
        v.innerHTML = reserveDate[idx] ? reserveDate[idx] : '날짜 추가'; //선택 안될 시에는 기본 default 값으로 진행
      });
    } else {
      this.queryDateContent[0].innerHTML = reserveDate.join(' - ');
    }
  }
}
