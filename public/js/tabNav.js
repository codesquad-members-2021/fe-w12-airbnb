const radios = document.querySelectorAll("input[name=choice]");
const tabUI1 = document.querySelectorAll("main_reserve_container");

radios.forEach((radio) =>
  radio.addEventListener("change", () => {
    tabUI1.classList.toggle("flex");
  })
);
