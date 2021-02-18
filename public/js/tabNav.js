class TabNav {
  constructor(roomTab, experienceTab) {
    //
    this.radios = document.querySelectorAll("input[name='choice']");
    this.roomTab = document.querySelector(".main_reserve_container");
    this.experienceTab = document.querySelector(".main_reserve_container_2");
    this.initTabEvent();
  }
  initTabEvent() {
    //
    this.radios.forEach((radio) =>
      radio.addEventListener("change", (e) => {
        if (e.target.checked) {
          this.roomTab.classList.toggle("flex");
          this.experienceTab.classList.toggle("flex");
        }
      })
    );
  }
  handleChange() {}
}

window.addEventListener("DOMContentLoaded", () => {
  const tabUI = new TabNav();
});
