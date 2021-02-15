const header = document.querySelector("header");
const intersectPoint = document.querySelector(".main");
const headerLogo = document.querySelector(".logo");

const options = {
  rootMargin: "-40px 0px 0px 0px",
};
const interObserve = new IntersectionObserver((entries, interObserve) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      header.classList.add("white");
      headerLogo.classList.add("pink");
    } else {
      header.classList.remove("white");
      headerLogo.classList.remove("pink");
    }
  });
}, options);

interObserve.observe(intersectPoint);
