// class tabNav {
//   constructor(roomTab, experienceTab) {
//     //
//     this.roomTab = roomTab;
//     this.experienceTab = experienceTab;
//   }
//   initTabEvent() {
//     //
//     this.roomTab.addEventListener("click");
//     this.experienceTab.addEventListener("click", this.handleChange);
//   }
//   handleChange() {

//   }
// }

window.addEventListener("DOMContentLoaded", () => {
  const radios = document.querySelectorAll("input[name='choice']");
  const roomTab = document.querySelector(".main_reserve_container");
  const experienceTab = document.querySelector(".main_reserve_container_2");

  radios.forEach((radio) =>
    radio.addEventListener("change", (e) => {
      if (e.target.checked) {
        roomTab.classList.toggle("flex");
        experienceTab.classList.toggle("flex");
      }
    })
  );
});
