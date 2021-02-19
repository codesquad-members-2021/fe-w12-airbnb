class Dropdown {
  constructor(dropdownBtn) {
    this.dropdownBtn = dropdownBtn;
    this.body = document.body;
    this.dropdownDiv = document.querySelector(".header_dropdown");
  }

  initDropdownEvent() {
    this.dropdownBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      this.dropdownDiv.classList.toggle("flex");
    });

    this.body.addEventListener("click", (e) => {
      this.dropdownDiv.classList.remove("flex");
    });
  }
}

window.addEventListener("DOMContentLoaded", function () {
  const dropdown = new Dropdown(
    document.querySelector(".header__member_setting__menuIcon")
  );
  dropdown.initDropdownEvent();
});
