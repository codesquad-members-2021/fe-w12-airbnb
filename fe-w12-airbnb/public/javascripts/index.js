/* --------------------------------------------------------------------- */
/* -------------▶︎▶︎▶︎ main 클래스: 프로그램 시작 및 클래스 통합 ◀︎◀︎◀︎----------------*/
/* --------------------------------------------------------------------- */
const { PopUpLayer } = require("./popUpLayer");
const { TabUI } = require("./tabUI");
TabUI.sayHi();

class Main {
    constructor(){
        //utillity메소드 객체
        const _ = {
            $: (selector, base = document) => base.querySelector(selector)
        }
        const PUL = new PopUpLayer();
        const TU = new TabUI();
    }

    init(){
        console.log("hello world!");
        this.TU.sayHi
        this.setEvent();
    }

    setEvent(){

    }
}

const MAIN = new Main();
MAIN.init();
