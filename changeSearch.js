export default class ChangeSearch {
    constructor({navAccommo, navActivity}) {
        this.navAccommo = navAccommo;
        this.navActivity = navActivity;
        this.setEvent();
    }
    setEvent() {
        this.navAccommo.addEventListener("click", this.showSearchAccommo.bind(this));
        this.navActivity.addEventListener("click", this.showSearchActivity.bind(this));
    }
    showSearchAccommo() {

    }
    showSearchActivity() {

    }
}