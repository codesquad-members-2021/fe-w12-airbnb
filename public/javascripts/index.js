import _ from "./util.js";
import SearchBarControl from "./index/SearchBarControl.js";
import TabUI from "./index/TabUI.js";

const inputList = _.$All('.header__main__search__options input');

inputList.forEach((input) => new SearchBarControl(input).init());

const tabUISetting = new TabUI(_.$('.header__main__login > .tabUI'), _.$('.header__main__login > .navBtn'));
tabUISetting.init();