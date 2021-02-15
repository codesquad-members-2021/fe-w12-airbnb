class TabUI {
  constructor(targetEl) {
    this.targetEl = targetEl;
  }

  onEvents() {
    this.targetEl.addEventListener("mouseover", this._onMouseOver);
    this.targetEl.addEventListener("mouseout", this._onMouseOut);
    this.targetEl.addEventListener("click", this._onClick);
  }

  _onMouseOver(evt) {
    evt.target.classList.add("color-gray");
  }

  _onMouseOut(evt) {
    evt.target.classList.remove("color-gray");
  }

  _onClick(evt) {
    evt.target.classList.remove("color-gray");
    evt.target.classList.add("color-white");
  }
}

function main() {
  const centerMenu = new Array(...document.querySelectorAll("#center-menu > span")).map(el => new TabUI(el));
  centerMenu.forEach(el => el.onEvents());
}

main();