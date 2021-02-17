/* --------------------------------------------------------------------- */
/* -------------▶︎▶︎▶︎ main 클래스: 프로그램 시작 및 클래스 통합 ◀︎◀︎◀︎----------------*/
/* --------------------------------------------------------------------- */
import TabUI from "./tabUI.js";
import PopUpLayer from "./popUpLayer.js";
import _ from "./utill.js";

class Main {
    constructor(){
        this.TU = new TabUI();
        this.PUL = new PopUpLayer();
    }

    init(){
        this.setEvent();
    }

    setEvent(){
        

    }
}

const MAIN = new Main();
MAIN.init();
