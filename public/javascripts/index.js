import _ from "./util.js";
import SearchBarControl from "./index/searchBarControl.js";
import TabUI from "./index/TabUI.js";

const inputList = _.$All('.header__main__search__options input');
_.classAdd(_.$('.header__main__search__bar > .experienceType'), 'displayNone');

inputList.forEach((input) => new SearchBarControl(input).searchOptionClick());