export default class SearchChanger {
    constructor({accommoAnchor, activityAnchor, searchAccommo, searchActivity}) {
        this.accommoAnchor = accommoAnchor;
        this.activityAnchor = activityAnchor;
        this.searchAccommo = searchAccommo;
        this.searchActivity = searchActivity;
        this.setEvent();
    }
    setEvent() {
        this.accommoAnchor.addEventListener("click", this.showSearchAccommo.bind(this));
        this.activityAnchor.addEventListener("click", this.showSearchActivity.bind(this));
    }
    showSearchAccommo() {
        this.searchAccommo.classList.remove('hidden');
        this.accommoAnchor.classList.add('header__selected');

        this.searchActivity.classList.add('hidden');
        this.activityAnchor.classList.remove('header__selected');
    }
    showSearchActivity() {
        this.searchActivity.classList.remove('hidden');
        this.activityAnchor.classList.add('header__selected');

        this.searchAccommo.classList.add('hidden');
        this.accommoAnchor.classList.remove('header__selected');

    }
}