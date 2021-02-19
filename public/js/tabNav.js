class TabNav {
  constructor() {
    //어떻게 작게 줄일지 고민해보기
    this.radios = document.querySelectorAll("input[name='choice']");
    this.roomTab = document.querySelector(".tabUI_reserve_container");
    this.experienceTab = document.querySelector(".tabUI_reserve_container_2");
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
