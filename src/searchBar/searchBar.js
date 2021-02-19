export default class SearchBar {
  constructor(tab) {
    this.tab = tab;
  }

  isChecked() {
    return this.tab.classList.contains("checked");
  }

  focusEvent(siblingCalendar = undefined) {
    this.tab.addEventListener("click", () => {
      if (siblingCalendar && siblingCalendar.has("visible")) siblingCalendar.rename("visible", "hidden");
      this.isChecked() ? this.tab.classList.remove("checked") : this.tab.classList.add("checked");
    });
  }
}
