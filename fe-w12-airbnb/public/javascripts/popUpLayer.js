/* --------------------------------------------------------------------- */
/* ----------▶︎▶︎▶︎ PopUpLayer 클래스: 오른쪽 상단 햄버거 팝업메뉴 핸들링 ◀︎◀︎◀︎---------*/
/* --------------------------------------------------------------------- */

// import _ from "./utill.js";

class PopUpLayer {
    constructor(ref, _){
        this._ = _;
        this.hamburger = ref.hamburger;
        this.dropBox = ref.dropBox;
        this.addEvent();
    }

    addEvent(){
        console.log(this._.$(".dropdown"));
        console.log(this.dropBox);
        this.hamburger.addEventListener("click", (e) => {
            this.showDropBox(e);
        });
    }

    showDropBox(e){
        console.log(e.target);
        console.log(e.currentTarget);
        this._.removeClass(this.dropBox, "invisible");
    }
}

export default PopUpLayer;