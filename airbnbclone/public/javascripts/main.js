const _ = {
  ADD: (target, className) => target.classList.add(className),

  REMOVE: (target, className) => target.classList.remove(className),

  TOGGLE: (target, className) => target.classList.toggle(className),

  $: (selector, base = document) => base.querySelector(selector),

  $A: (selector, base = document) => base.querySelectorAll(selector),

  EVENT: (target, type, listener, useCapture = false) =>
    target.addEventListener(type, listener, useCapture),
};

const main = _.$(".main");
const seachbarRooms = _.$("#main_seachbar_rooms", main);
const seachbaractivity = _.$("#main_seachbar_activity", main);
//<==== 질문 =--->//
//seachbar를 불러올 때, SelectorAll 을 해서 Node[0], Node[1] 을 각자 불러오는 것이 좋을까요?
//아니면 이렇게 서로 id 를 부여해서 불러오는 것이 좋을까요?
const mainPeople = main.querySelector(".main_people");
const mainLocation = main.querySelector(".main_location");
const mainNavbar = main.querySelector(".navbar_ul");
const lists = mainNavbar.getElementsByTagName("li");

const searchbar = (searchbarDocument) => {
  const location = searchbarDocument.firstElementChild;
  const input = searchbarDocument.querySelector("input");
  const peoplebtn = searchbarDocument.querySelector(".seachbar_lastmenu");
  const searchbtn = peoplebtn.querySelector(".seachbar_btn");

  const locationClickHandler = () => {
    input.focus();
  };
  const locationFoucusHandler = () => {
    mainLocation.classList.remove("hide");
  };
  const peoplebtnClickHandler = () => {
    mainPeople.classList.remove("hide");
  };

  peoplebtn.addEventListener("click", (e) => {
    e.stopPropagation();
    peoplebtnClickHandler();
  });

  searchbtn.addEventListener("click", (e) => {
    e.stopPropagation();
    locationClickHandler();
  });
  location.addEventListener("click", (e) => {
    e.stopPropagation();
    locationClickHandler();
  });

  input.addEventListener("focus", (e) => {
    locationFoucusHandler();
  });
};
searchbar(seachbarRooms);


const makeCalender = () => {
  
} 

const roomsBar = lists[0].querySelector(".navbar_selectedline");
const activityBar = lists[1].querySelector(".navbar_line");
const activityClickHandler = () => {
  seachbarRooms.classList.add("hide");
  seachbaractivity.classList.remove("hide");
  roomsBar.classList.replace("navbar_selectedline", "navbar_line");
  activityBar.classList.replace("navbar_line", "navbar_selectedline");
};
const roomClickHandler = () => {
  seachbarRooms.classList.remove("hide");
  seachbaractivity.classList.add("hide");
  activityBar.classList.replace("navbar_selectedline", "navbar_line");
  roomsBar.classList.replace("navbar_line", "navbar_selectedline");
};

lists[1].addEventListener("click", (e) => {
  activityClickHandler();
  searchbar(seachbaractivity);
});

lists[0].addEventListener("click", (e) => {
  roomClickHandler();
  searchbar(seachbarRooms);
});

const profileBtn = document.querySelector(".navbar_login_icons");
const profileHeader = document.querySelector(".profileHeader");
const body = document.querySelector("body");

const profileBtnClickHandler = () => {
  profileHeader.classList.toggle("hide");
};
const bodyClickHandler = () => {
  profileHeader.classList.add("hide");
  mainLocation.classList.add("hide");
  mainPeople.classList.add("hide");
};

profileBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  profileBtnClickHandler();
});

body.addEventListener("click", (e) => {
  console.log(e.currentTarget);
  console.log(e.target);
  bodyClickHandler();
});
