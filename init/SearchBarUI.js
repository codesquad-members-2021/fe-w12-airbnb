export default class SearchBarUI {
  constructor($navMenu, $radioList, $navMenuRoom, $navMenuActivity) {
    this.$navMenu = $navMenu;
    this.$radioList = $radioList;
    this.menuRoom = $navMenuRoom;
    this.menuActivity = $navMenuActivity;
    this.init();
  }
  changeSearchBar() {
    for (let node of this.$radioList) {
      if (node.checked && node.value === "room") {
        this.menuRoom.classList.replace("display-none", "display-block");
        this.menuActivity.classList.replace("display-block", "display-none");
      } else if (node.checked && node.value === "activity") {
        this.menuRoom.classList.replace("display-block", "display-none");
        this.menuActivity.classList.replace("display-none", "display-block");
      }
    }
  }

  onEvents() {
    this.$navMenu.addEventListener("click", this.changeSearchBar.bind(this));
  }

  init() {
    this.menuRoom.classList.add("display-block");
    this.menuActivity.classList.add("display-none");
    this.onEvents();
  }
}
