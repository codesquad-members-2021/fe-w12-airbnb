
import MainEventControler from "./MainEventControler.js";

export default class searchberEventController extends MainEventControler{
    constructor(main){
        super(main);
    }
    init(){
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

    }


}





const searchberEventController = (
    main,
    mainPeople,
    mainLocation,
    mainCalender
  ) => {

  };
  