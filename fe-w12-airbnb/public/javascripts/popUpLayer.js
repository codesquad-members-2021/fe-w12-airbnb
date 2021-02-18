/* --------------------------------------------------------------------- */
/* ----------▶︎▶︎▶︎ PopUpLayer 클래스: 오른쪽 상단 햄버거 팝업메뉴 핸들링 ◀︎◀︎◀︎---------*/
/* --------------------------------------------------------------------- */

class PopUpLayer {
    constructor(ref, _) {
        this._ = _;
        this.hamburger = ref.hamburger;
        this.dropBox = ref.dropBox;
        this.body = ref.body;
        this.addEvent();
    }

    addEvent() {
        this.hamburger.addEventListener("click", (e) => this.showDropBox(e));
        this.body.addEventListener("click", (e) => this.removeDropBox(e));
    }

    showDropBox({target}) { //destructuring 해서 이벤트에서 target객체만 가져오기
        if (this.isHamburgerBtn(target)) {
            this._.setToggle(this.dropBox, "invisible");
        }
    }

    removeDropBox({target}) {
        if (!this.isHamburgerBtn(target)) {
            this._.addClass(this.dropBox, "invisible");
        }
    }

    isHamburgerBtn(node) {
        return this._.contains(node, "login") ? true : false;
    }
}

export default PopUpLayer;