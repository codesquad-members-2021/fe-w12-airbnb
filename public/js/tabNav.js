class TabNav {
  constructor() {
    //
    this.radios = document.querySelectorAll("input[name='choice']");
    this.roomTab = document.querySelector(".main_reserve_container");
    this.experienceTab = document.querySelector(".main_reserve_container_2");
    this.checkIn = document.querySelector(".checkIn");
    this.checkOut = document.querySelector(".checkOut");
    this.calendar = document.querySelector(".calendar_container");
    this.initTabEvent();
  }
  initTabEvent() {
    this.radios.forEach((radio) =>
      radio.addEventListener("change", (e) => {
        if (e.target.checked) {
          this.roomTab.classList.toggle("flex");
          this.experienceTab.classList.toggle("flex");
        }
      })
    );

    this.checkIn.addEventListener("click", () => {
      this.calendar.classList.toggle("flex");
    });
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const tabUI = new TabNav();
});
