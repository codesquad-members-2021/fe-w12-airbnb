class CalenderModel {
  constructor() {
    this.currentDate = new Date();
    this.monthIndex = 0;
    this.twoDatesArray = [];
    this.dateClickCheck = true;
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

  sortDateArray() {
    this.twoDatesArray.sort((a, b) => {
      const [aYear, aMonth, aDay] = a.split('.');
      const [bYear, bMonth, bDay] = b.split('.');
      return aYear - bYear || aMonth - bMonth || aDay - bDay;
    });
  }

  formatDateArrayToString() {
    return this.twoDatesArray.map(dateWord => {
      const [year, month, day] = dateWord.split('.');
      return `${year}년 ${month}월 ${day}일`;
    }).join(' - ');
  }

  getDatesArray() {
    return [...this.twoDatesArray];
  }

  addDatesArray(date) {
    this.twoDatesArray.push(date);
  }

  changeDatesArrayFromMoreData() {
    if (this.twoDatesArray.length === 3) {
      const newDate = this.twoDatesArray.splice(2, 1).join('');
      this.dateClickCheck ? this.twoDatesArray[0] = newDate : this.twoDatesArray[1] = newDate;
      this.dateClickCheck = !this.dateClickCheck;
    }
  }
}

const calendarModel = new CalenderModel();
module.exports = calendarModel;