import MainEventController from "./MainEventController.js";
import Calender from "./Calender.js";

export default class CalenderEventController extends MainEventController {
  constructor(main) {
    super(main);
    this.Calender = this._.$(".main__calender", this.main);
    this._claender = new Calender(this.Calender);
    this.previousBtn = this._.$(".main__calender--move-left", this.Calender);
    this.nextBtn = this._.$(".main__calender--move-right", this.Calender);
    this.now = new Date();
    this.count = 0;
  }

  render() {
    this._claender.makeCalender(
      this.now.getFullYear(),
      this.now.getMonth() + 1 + this.count
    );
  }
  previousCalender() {
    this.count -= 1;
    this.render();
  }
  nextCalender() {
    this.count += 1;
    this.render();
  }

  CalenderBtnEventHandler(target) {
    switch (target.closest("button")) {
      case this.previousBtn:
        this.previousCalender();
        break;
      case this.nextBtn:
        this.nextCalender();
        break;
    }
  }
  init() {
    this._.EVENT(this.main, "click", ({ target }) => {
      if (target.closest(".main__calender")) {
        this.CalenderBtnEventHandler(target);
      } else {
        super.removeClick(this.mainCalender);
      }
    });
  }
}
