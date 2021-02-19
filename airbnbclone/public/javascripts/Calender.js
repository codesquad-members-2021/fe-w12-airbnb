import _ from "./utils.js";

export default class Calender {
  constructor(Calender) {
    this.Calender = Calender;
    this.table = _.$A(".main__calender--table", this.Calender);
  }

  addCalenderHTML(table, year, month) {
    const tbody = _.$("tbody", table);
    const title = _.$(".main__calender--month", table);
    const nowDate = new Date(year, month - 1, 1);
    const dateLast = new Date(year, month, 0).getDate();
    const dateStart = nowDate.getDay();

    const html = this.makeCalenderHTML(dateStart, dateLast);
    const date = this.makeCalenderTitleHTML(nowDate);

    title.innerHTML = date;
    tbody.innerHTML = html;
  }

  makeCalender(year, month) {
    this.addCalenderHTML(this.table[0], year, month);
    this.addCalenderHTML(this.table[1], year, month + 1);
  }

  makeCurrentDateCalender() {
    const now = new Date();
    this.makeCalender(now.getFullYear(), now.getMonth() + 1);
  }

  makeCalenderHTML(firstDay, LastDay) {
    let html = "<tr>";

    for (let i = 0; i < firstDay; i++) html += "<td></td>";

    for (let i = 0; i < LastDay; i++) {
      if ((firstDay + i) % 7 === 0) html += "</tr><tr>";
      html += `<td class="calender--day">${i + 1}</td>`;
    }

    html += "</tr>";

    return html;
  }

  makeCalenderTitleHTML(date) {
    const nowMonth = date.getMonth();
    const nowYear = date.getFullYear();

    return `${nowYear} 년   ${nowMonth + 1} 월`;
  }
}
