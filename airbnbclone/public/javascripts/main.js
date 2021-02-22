import _ from "./utils.js";
import MainEventController from "./MainEventController.js";
import HeaderEventController from "./HeaderEventController.js";
import SearchberEventController from "./SearchbarEventController.js";
import Calender from "./Calender.js";
import CalenderEventController from "./CalenderEventController.js";
//=====================================================//
const main = _.$(".main");
const mainEventController = new MainEventController(main);
const searchberEventController = new SearchberEventController(main);
const calender = new Calender(_.$(".main__calender", main));
const headerEventConroller = new HeaderEventController(main);
const calenderEventController = new CalenderEventController(main);
calender.makeCurrentDateCalender();
calenderEventController.init();
headerEventConroller.init();
searchberEventController.init();

mainEventController.init();
