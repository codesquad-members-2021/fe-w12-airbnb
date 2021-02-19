export default class SearchChanger {
    constructor({headerAccommo, headeractivity, searchAccommo, searchActivity}) {
        this.headerAccommo = headerAccommo;
        this.headeractivity = headeractivity;
        this.searchAccommo = searchAccommo;
        this.searchActivity = searchActivity;
        this.setEvent();
    }
    setEvent() {
        this.headerAccommo.addEventListener("click", this.showSearchAccommo.bind(this));
        this.headeractivity.addEventListener("click", this.showSearchActivity.bind(this));
    }
    showSearchAccommo() {
        this.searchAccommo.classList.remove('hidden');
        this.headerAccommo.classList.add('header__selected');

        this.searchActivity.classList.add('hidden');
        this.headeractivity.classList.remove('header__selected');
    }
    showSearchActivity() {
        this.searchActivity.classList.remove('hidden');
        this.headeractivity.classList.add('header__selected');

        this.searchAccommo.classList.add('hidden');
        this.headerAccommo.classList.remove('header__selected');

    }
}