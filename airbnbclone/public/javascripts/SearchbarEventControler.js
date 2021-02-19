import MainEventControler from "./MainEventControler.js";

export default class SearchberEventController extends MainEventControler {
  constructor(main) {
    super(main);
  }
  init() {
    this._.EVENT(this.main, "click", ({ target }) => {
      let searchbar = target.closest(".main_seachbar");
      if (searchbar) {
        let input = this._.$("input");

        this.clickLocation(input, target);
        switch (searchbar.id) {
          case "main_seachbar_rooms":
            this.clickdate(target);
            this.clickLastNode(target, input, ".people", this.mainPeople);
            break;
          case "main_seachbar_activity":
            this.clickLastNode(target, input, ".date", this.mainCalender);
            break;
        }
      } else {
        super.removeClick(this.mainLocation, this.mainPeople,this.mainCalender);
      }
    });
  }

  clickLocation(input, target) {
    if (target.closest(".location")) {
      this.focusInput(input, target);
    } else {
      super.removeClick(this.mainLocation);
    }
  }

  focusInput(input, target) {
    super.focusTarget(input);
    this._.EVENT(input, "focus", super.ADDTarget(this.mainLocation));
  }
  clickdate(target) {
    if (target.closest(".date")) {
      super.ADDTarget(this.mainCalender);
    } else {
      super.removeClick(this.mainCalender);
    }
  }
  clickLastNode(target, input, lastNode, lastPopup) {
    if (target.closest(lastNode)) {
      if (target.closest(".seachbar_btn")) {
        this.focusInput(input, target);
      } else {
        super.removeClick(this.mainLocation);
        super.ADDTarget(lastPopup);
      }
    } else {
      super.removeClick(lastPopup);
    }
  }
}
