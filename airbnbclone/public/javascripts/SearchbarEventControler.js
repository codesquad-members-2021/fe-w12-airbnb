import MainEventControler from "./MainEventControler.js";

export default class SearchberEventController extends MainEventControler {
  constructor(main) {
    super(main);
  }
  init() {
    this._.EVENT(this.main, "click", ({ target }) => {
      let searchbar = target.closest(".main_seachbar");
      if (searchbar) {
        let searchbar_lastchild = searchbar.lastElementChild;
        let input = this._.$("input");

        this.clickLocation(input, target);

        if (target === searchbar_lastchild) {
        }
      } else {
        super.removeClick(
          this.mainLocation,
          this.mainPeople
        );
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
}
/*
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

const searchberEventController = (
  main,
  mainPeople,
  mainLocation,
  mainCalender
) => {};
*/
