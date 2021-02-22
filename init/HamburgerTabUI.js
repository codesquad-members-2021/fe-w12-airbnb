export default class HamburgerTabUI {
  constructor($hamburgerTab, $iconPerson) {
    this.$iconPerson = $iconPerson;
    this.$hamburgerTab = $hamburgerTab;
    this.bPopUp = false;
    this.onEvents();
  }

  drawPopupTableTr() {
    const menuList = [
      "회원가입",
      "로그인",
      "숙소 호스트 되기",
      "체험 호스팅 하기",
      "도움말",
    ];

    const tdClass = "popup-tb-td";

    return menuList.reduce((totalMenu, curMenu) => {
      return totalMenu + `<tr><td class=${tdClass}>${curMenu}</td></tr>`;
    }, "");
  }

  drawPopupTable() {
    const tbClass = "popup-tb";
    const tableTemplate = `<table class=${tbClass}>
    <tbody>
    ${this.drawPopupTableTr()}
    </tbody>
    </table>`;
    this.$iconPerson.insertAdjacentHTML("afterend", tableTemplate);
    this.bPopUp = true;
  }

  showPopupTable() {
    const $popUpTable = document.querySelector(".popup-tb");
    if (!$popUpTable) this.drawPopupTable();
  }

  hidePopupTable(event) {
    this.table = document.querySelector(".popup-tb");
    if (!event.target.className.includes("popup") && this.bPopUp) {
      this.table.remove();
      this.bPopUp = false;
    }
  }

  onEvents() {
    this.$hamburgerTab.addEventListener(
      "click",
      this.showPopupTable.bind(this)
    );
    document.addEventListener("click", this.hidePopupTable.bind(this));
  }
}
