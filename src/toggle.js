export default class Toggle {
  constructor(className) {
    this.element = document.querySelector(`.${className}`);
  }

  init() {
    this.element.classList.contains("visible") ? this.hide() : this.show();
  }

  show() {
    this.element.classList.remove("hidden");
    this.element.classList.add("visible");
  }

  hide() {
    this.element.classList.remove("visible");
    this.element.classList.add("hidden");
  }

  has(className) {
    return this.element.classList.contains(className);
  }

  rename(oldName, newName) {
    return this.element.classList.replace(oldName, newName);
  }
}
