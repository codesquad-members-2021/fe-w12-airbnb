import _ from "./utils.js";
import MainEventControler from "./MainEventControler.js";
import HeaderEventControler from "./HeaderEventControler.js";
import SearchberEventController from "./SearchbarEventControler.js";
import Calender from "./Calender.js";
//=====================================================//
const main = _.$(".main");
const mainEventControler = new MainEventControler(main);
const searchberEventController = new SearchberEventController(main);
const calender = new Calender(_.$(".main__calender", main));
//makeCurrentDateCalender();
const headerEventConroler = new HeaderEventControler(main);
calender.makeCurrentDateCalender();
headerEventConroler.init();
searchberEventController.init();

mainEventControler.init();
