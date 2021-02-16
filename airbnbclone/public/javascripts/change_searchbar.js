const seachbarRooms = document.querySelector("#main_seachbar_rooms");
const seachbaractivity = document.querySelector("#main_seachbar_activity");
const mainLocation = document.querySelector(".main_location");
//<==== 질문 =--->//
//SelectorAll 을 해서 Node[0], Node[1] 을 각자 불러오는 것이 좋을까요?
//아니면 이렇게 서로 id 를 부여해서 불러오는 것이 좋을까요?

const navbar = document.querySelector(".navbar_ul");
const lists = navbar.getElementsByTagName("li");
const searchbar = (searchbarDocument) => {
  const location = searchbarDocument.firstElementChild;
  const input = searchbarDocument.querySelector("input");

  const locationClickHandler = () => {
    input.focus();
  };
  const locationFoucusHandler = () => {
    mainLocation.classList.remove("hide");
  };

  location.addEventListener("click", (e) => {
    e.stopPropagation();
    locationClickHandler();
  });

  input.addEventListener("focus", (e) => {
    locationFoucusHandler();
  });
};
searchbar(seachbarRooms);

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

lists[0].addEventListener("click", () => {
  roomClickHandler();
  searchbar(seachbarRooms);
});
