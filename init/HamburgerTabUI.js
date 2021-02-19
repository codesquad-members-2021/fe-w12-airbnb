export default class HamburgerTabUI {
  constructor($hamburgerTab, $iconPerson) {
    this.$iconPerson = $iconPerson;
    this.$hamburgerTab = $hamburgerTab;
    this.bPopUp = false;
    this.onEvents();
  }
  drawPopupTable() {
    this.trList = [
      "회원가입",
      "로그인",
      "숙소 호스트 되기",
      "체험 호스팅 하기",
      "도움말",
    ];
    this.tbClass = "popup-tb";
    this.tdClass = "popup-tb-td";

    this.tableTemplate = `<table class=${this.tbClass}>
    <tbody><tr><td class=${this.tdClass}>${this.trList[0]}</td></tr>
    <tr><td class=${this.tdClass}>${this.trList[1]}</td></tr>
    <tr><td class=${this.tdClass}>${this.trList[2]}</td></tr>
    <tr><td class=${this.tdClass}>${this.trList[3]}</td></tr>
    <tr><td class=${this.tdClass}>${this.trList[4]}</td></tr>
    </tbody>
    </table>`;
    this.$iconPerson.insertAdjacentHTML("afterend", this.tableTemplate);
    this.bPopUp = true;
  }

  hidePopupTable(event) {
    this.table = document.querySelector(".popup-tb");
    if (!event.target.className.includes("popup") && this.bPopUp) {
      this.table.remove();
      this.bPopUp = false;
    } else {
      return;
    }
  }

  onEvents() {
    this.$hamburgerTab.addEventListener(
      "click",
      this.drawPopupTable.bind(this)
    );
    document.addEventListener("click", this.hidePopupTable.bind(this));
  }
}
