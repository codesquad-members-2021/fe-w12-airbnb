const search = document.querySelector(".search");
const exprienceBtnSearch = document.querySelector(".exprienceBtn-search");
const menuList = document.querySelectorAll(".menu-list");
const menuListBtns = document.querySelectorAll(".menu-list button");

// 숙소 눌렀을 때
const roomsBtn = menuListBtns[0];
roomsBtn.addEventListener("click", roomBtnHandler);

function roomBtnHandler() {
    roomsBtn.classList.add("clicked")
    exprienceBtn.classList.remove("clicked")

    // exprienceBtnSearch.style.display = "none";
    // search.style.display = "block";
    exprienceBtnSearch.classList.remove("display-block")
    search.classList.remove("display-none")
    exprienceBtnSearch.classList.add("display-none")
    search.classList.add("display-block")
}

// 체험 눌렀을 때
const exprienceBtn = menuListBtns[1];

exprienceBtn.addEventListener("click", exprienceBtnHandler);

function exprienceBtnHandler() {
    exprienceBtn.classList.add("clicked")
    roomsBtn.classList.remove("clicked")

    // search.style.display = "none";
    // exprienceBtnSearch.style.display = "block";
    exprienceBtnSearch.classList.remove("display-none")
    search.classList.remove("display-block")
    search.classList.add("display-none")
    exprienceBtnSearch.classList.add("display-block")
}