import utils from "./utils.js";
import MainEventControler from "./MainEventControler.js";
import HeaderEventControler from "./HeaderEventControler.js";

const _ = utils._;

//=====================================================//
const main = _.$(".main");
const mainEventControler = new MainEventControler(main);

const addCalenderHTML = (Calender, year, month) => {
  const tbody = _.$("tbody", Calender);
  const title = _.$(".main__calender--month", Calender);
  const datelast = new Date(year, month, 0).getDate();
  const datestart = new Date(year, month - 1, 1).getDay();
  let date = `${year} 년   ${month} 월`;
  let html = "<tr>";

  for (let i = 0; i < datestart; i++) html += "<td></td>";

  for (let i = 0; i < datelast; i++) {
    if ((datestart + i) % 7 === 0) html += "</tr><tr>";
    html += `<td class="calender--day">${i + 1}</td>`;
  }

  html += "</tr>";
  title.innerHTML = date;
  tbody.innerHTML = html;
};

const makeCalender = (year, month) => {
  const table = _.$A(".main__calender--table");
  addCalenderHTML(table[0], 2021, month);
  addCalenderHTML(table[1], 2021, month + 1);
};

const makeCurrentDateCalender = () => {
  const nowYear = new Date().getFullYear();
  const nowMonth = new Date().getMonth() + 1;
  const nowDay = new Date().getDate();
  makeCalender(nowYear, nowMonth);
};
makeCurrentDateCalender();
const headerEventConroler = new HeaderEventControler(main);
headerEventConroler.init();

// SearchberEventController(main, mainPeople, mainLocation, mainCalender);

mainEventControler.init();
