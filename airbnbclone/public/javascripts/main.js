import _ from "./utils.js";
import MainEventController from "./MainEventController.js";
import HeaderEventController from "./HeaderEventController.js";
import SearchberEventController from "./SearchbarEventController.js";
import Calender from "./Calender.js";
//=====================================================//
const main = _.$(".main");
const mainEventController = new MainEventController(main);
const searchberEventController = new SearchberEventController(main);
const calender = new Calender(_.$(".main__calender", main));
//makeCurrentDateCalender();
const headerEventConroller = new HeaderEventController(main);
calender.makeCurrentDateCalender();
headerEventConroller.init();
searchberEventController.init();

mainEventController.init();
