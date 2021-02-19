/* --------------------------------------------------------------------- */
/* -------------▶︎▶︎▶︎ main 클래스: 프로그램 시작 및 클래스 통합 ◀︎◀︎◀︎----------------*/
/* --------------------------------------------------------------------- */
import PopUpLayer from "./popUpLayer.js";
import TabUI from "./tabUI.js";
import _ from "./utill.js";

const REFERENCE = {
    body: _.$("body"),
    dropBox: _.$(".dropdown"),
    hamburger: _.$(".login_set"),
    tab: _.$all(".tab"),
    tabInput: _.$all(".popup_layer"),
    searchBox: _.$(".search_box")
}

const PUL = new PopUpLayer(REFERENCE, _);
const TU = new TabUI(REFERENCE, _);

