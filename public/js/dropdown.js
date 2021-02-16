window.onload = function () {
  const body = document.body;
  const dropdownbtn = document.querySelector(".menuAndAcountIcon");
  const dropdowndiv = document.querySelector(".header_dropdown");
  dropdownbtn.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdowndiv.classList.toggle("flex");
  });
  body.addEventListener("click", (e) => {
    dropdowndiv.classList.remove("flex");
  });

  //   if (document.getElementById("nav_radio_1").checked) {
  //   }
};
