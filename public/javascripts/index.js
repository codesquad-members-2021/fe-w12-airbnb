import _ from "./util.js";
import SearchBarControl from "./index/SearchBarControl.js";
import TabUI from "./index/TabUI.js";

const inputList = _.$All('.header__main__search__options input');
_.classAdd(_.$('.header__main__search__bar > .experienceType'), 'displayNone');

inputList.forEach((input) => new SearchBarControl(input).searchOptionClick());

const tabUI = new TabUI(_.$('.header__main__login > .tabUI'));
tabUI.tabUIClick();