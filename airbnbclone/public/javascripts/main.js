const utils = require("./utils.js");
const _ = new utils();
//=====================================================//
const main = _.$(".main");

const searchberEventController = (
  main,
  mainPeople,
  mainLocation,
  mainCalender
) => {
  _.EVENT(main, "click", ({ target }) => {
    let searchbar = target.closest(".main_seachbar");
    let input = searchbar.querySelector("input");
    let searchbar_lastchild = searchbar.lastElementChild;
    _.EVENT(input, "focus", EventHandler.locationFoucus(mainLocation));
    if (target.closest(".location")) {
      EventHandler.locationClick(input);
    } else {
      EventHandler.removeClick(mainLocation);
    }

    if (target === searchbar_lastchild) {
      console.log(target.closest(".main_seachbar").id);
      switch (target.closest(".main_seachbar").id) {
        case "main_seachbar_activity":
          if (target.closest(".date")) {
            if (target.closest(".seachbar_btn")) {
              EventHandler.locationClick(input);
            } else {
              EventHandler.removeClick(mainLocation);
              EventHandler.peoplebtnClick(mainCalender);
            }
          } else {
            EventHandler.removeClick(mainCalender);
          }
          break;
        case "main_seachbar_rooms":
          if (target.closest(".date")) {
            EventHandler.peoplebtnClick(mainCalender);
          } else {
            EventHandler.removeClick(mainCalender);
          }
          if (target.closest(".people")) {
            if (target.closest(".seachbar_btn")) {
              EventHandler.locationClick(input);
            } else {
              EventHandler.removeClick(mainLocation);
              EventHandler.peoplebtnClick(mainPeople);
            }
          } else {
            EventHandler.removeClick(mainPeople);
          }

          break;
      }
    }
  });
};
const HeaderEventConroler = (header, profileHeader, rooms, activity) => {
  const lists = header.getElementsByTagName("li");
  const roomsBar = _.$(".navbar_selectedline", lists[0]);
  const activityBar = _.$(".navbar_line", lists[1]);
  const profilebtn = _.$(".navbar_login_icons", header);

  _.EVENT(header, "click", ({ target }) => {
    switch (target.closest("li")) {
      case lists[1]:
        EventHandler.activityClick(rooms, activity, roomsBar, activityBar);
        break;
      case lists[0]:
        EventHandler.roomClickHandler(rooms, activity, roomsBar, activityBar);
        break;
    }

    if (target.closest(".navbar_login_icons") === profilebtn) {
      EventHandler.profileBtnClick(profileHeader);
    }
  });
};

const mainEventControler = (main) => {
  const HEADER = _.$("header", main);
  const profilebtn = _.$(".navbar_login_icons", HEADER);
  const Rooms = _.$("#main_seachbar_rooms", main);
  const Activity = _.$("#main_seachbar_activity", main);

  const profileHeader = _.$(".profileHeader", main);
  const mainPeople = _.$(".main_people", main);
  const mainLocation = _.$(".main_location", main);
  const mainCalender = _.$("main__calender", main);
  HeaderEventConroler(HEADER, profileHeader, Rooms, Activity);
  searchberEventController(main, mainPeople, mainLocation, mainCalender);

  _.EVENT(document, "click", ({ target }) => {
    if (target.closest(".navbar_login_icons") != profilebtn) {
      EventHandler.removeClick(profileHeader);
    }
  });
};

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

mainEventControler(main);
