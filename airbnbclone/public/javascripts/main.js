const _ = {
  ADD: (target, className) => target.classList.add(className),

  REMOVE: (target, className) => target.classList.remove(className),

  TOGGLE: (target, className) => target.classList.toggle(className),

  REPLACE: (target, oldClassName, newClassName) =>
    target.classList.replace(oldClassName, newClassName),

  $: (selector, base = document) => base.querySelector(selector),

  $A: (selector, base = document) => base.querySelectorAll(selector),

  EVENT: (target, type, listener, useCapture = false) =>
    target.addEventListener(type, listener, useCapture),
};

const EventHandler = {
  locationClick: (target) => target.focus(target),

  locationFoucus: (target) => _.REMOVE(target, "hide"),

  peoplebtnClick: (target) => _.REMOVE(target, "hide"),

  profileBtnClick: (target) => _.TOGGLE(target, "hide"),

  activityClick: (rooms, activtiy, RB, AB) => {
    _.ADD(rooms, "hide");
    _.REMOVE(activtiy, "hide");
    _.REPLACE(RB, "navbar_selectedline", "navbar_line");
    _.REPLACE(AB, "navbar_line", "navbar_selectedline");
  },

  roomClickHandler: (rooms, activtiy, RB, AB) => {
    _.ADD(activtiy, "hide");
    _.REMOVE(rooms, "hide");
    _.REPLACE(AB, "navbar_selectedline", "navbar_line");
    _.REPLACE(RB, "navbar_line", "navbar_selectedline");
  },

  removeClick: (...targets) => {
    targets.forEach((e) => {
      _.ADD(e, "hide");
    });
  },
};
//=====================================================//

const main = _.$(".main");


const searchberEventController = (main, mainPeople, mainLocation) => {
  _.EVENT(main, "click", ({ target }) => {
    if (target.closest(".seachbar_btn")) {
      const input = _.$("input", target.closest(".main_seachbar"));
      _.EVENT(input, "focus", (e) => {
          EventHandler.locationFoucus(mainLocation);
      });
      EventHandler.locationClick(input);
    }
    if (target.closest(".location")) {
      const input = _.$("input", target.closest(".main_seachbar"));
      _.EVENT(input, "focus", (e) => {
        EventHandler.locationFoucus(mainLocation);
    });
      EventHandler.locationClick(input);
    }
    target.closest(".date");
    if (target.closest(".people")) {
      EventHandler.peoplebtnClick(mainPeople);
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
  HeaderEventConroler(HEADER, profileHeader, Rooms, Activity);
  searchberEventController(main, mainPeople, mainLocation);

  _.EVENT(document, "click", ({ target }) => {
    if (target.closest(".navbar_login_icons") != profilebtn) {
      EventHandler.removeClick(profileHeader);
    }
    else (target.closest(.seachbar_btn) )
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
