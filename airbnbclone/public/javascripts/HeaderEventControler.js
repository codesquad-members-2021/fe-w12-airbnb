import MainEventControler from"./MainEventControler.js";

export default class HeaderEventControler extends MainEventControler {
  constructor(main) {
    super(main);
    this.lists = this.HEADER.getElementsByTagName("li");
    this.roomsBar = this._.$(".navbar_selectedline", this.lists[0]);
    this.activityBar = this._.$(".navbar_line", this.lists[1]);
    this.profilebtn = this._.$(".navbar_login_icons", this.header);
  }
  HeaderEventhandler(target) {
    switch (target.closest("li")) {
      case this.lists[1]:
        super.activityClick(
          this.Rooms,
          this.Activity,
          this.roomsBar,
          this.activityBar
        );
        break;
      case this.lists[0]:
        super.roomClickHandler(
          this.Rooms,
          this.Activity,
          this.roomsBar,
          this.activityBar
        );
        break;
    }
  }

  init() {
    this._.EVENT(this.HEADER, "click", ({ target }) => {
      this.HeaderEventhandler(target);
      if (target.closest(".navbar_login_icons") === this.profilebtn) {
        super.ADDTarget(this.profileHeader);
      }
    });
  }
}


