class CalenderModel {
  constructor() {
    this.currentDate = new Date();
    this.monthIndex = 0;
    this.twoDatesArray = [];
  }

  getToday() {
    return this.currentDate;
  }

  getPrevMonthDate(date) {
    return new Date(date.getFullYear(), date.getMonth() + --this.monthIndex, 1);
  }

  getNextMonthDate(date) {
    return new Date(date.getFullYear(), date.getMonth() + ++this.monthIndex, 1);
  }

  getLastDate(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  }

  getFirstDay(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  }

  getYearAndMonth(date) {
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
  }
}

const calendarModel = new CalenderModel();
module.exports = calendarModel;