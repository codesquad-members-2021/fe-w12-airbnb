import utils  from "./utils.js";


export default class EventHandler {
  constructor() {
    this._ = utils._;
  }

  focusTarget(target) {
    target.focus(target);
  }

  ADDTarget(target) {
    this._.REMOVE(target, "hide");
  }

  toggleTarget(target) {
    this._.TOGGLE(target, "hide");
  }

  activityClick(rooms, activtiy, RB, AB) {
    this._.ADD(rooms, "hide");
    this._.REMOVE(activtiy, "hide");
    this._.REPLACE(RB, "navbar_selectedline", "navbar_line");
    this._.REPLACE(AB, "navbar_line", "navbar_selectedline");
  }

  roomClickHandler(rooms, activtiy, RB, AB) {
    this._.ADD(activtiy, "hide");
    this._.REMOVE(rooms, "hide");
    this._.REPLACE(AB, "navbar_selectedline", "navbar_line");
    this._.REPLACE(RB, "navbar_line", "navbar_selectedline");
  }

  removeClick(...targets) {
    targets.forEach((e) => {
      this._.ADD(e, "hide");
    });
  }
}


