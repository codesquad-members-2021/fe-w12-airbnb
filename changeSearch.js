export default class ChangeSearch {
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
        this.searchActivity.classList.add('hidden');
    }
    showSearchActivity() {
        this.searchActivity.classList.remove('hidden');
        this.searchAccommo.classList.add('hidden');
    }
}