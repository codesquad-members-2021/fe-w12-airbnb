const EventHandler = require("./EventHandler.js");

class MainEventControler extends EventHandler {
  constructor(main) {
    super();
    this.main = main;
    this.HEADER = this._.$("header", main);
    this.profilebtn = this._.$(".navbar_login_icons", HEADER);
    this.Rooms = this._.$("#main_seachbar_rooms", main);
    this.Activity = this._.$("#main_seachbar_activity", main);

    this.profileHeader = this._.$(".profileHeader", main);
    this.mainPeople = this._.$(".main_people", main);
    this.mainLocation = this._.$(".main_location", main);
    this.mainCalender = this._.$("main__calender", main);
  }

  init() {
    HeaderEventConroler(HEADER, profileHeader, Rooms, Activity);
    SearchberEventController(main, mainPeople, mainLocation, mainCalender);

    this._.EVENT(document, "click", ({ target }) => {
      if (target.closest(".navbar_login_icons") != this.profilebtn) {
        super.removeClick(this.profileHeader);
      }
    });
  }
}

module.exports = EventHandler 