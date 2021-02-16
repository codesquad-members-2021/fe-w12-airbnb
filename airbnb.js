// 오른쪽 상단 버튼 눌렀을 때
const dropMenu = document.querySelector(".drop-menu");

dropMenu.addEventListener("click", clickHandler);

function clickHandler() {
    const template = `<div>
                    <a>회원가입</a>
                    <a>로그인</a>
                </div>
                <div>
                    <a>숙소 호스트 되기</a>
                    <a>체험 호스팅하기</a>
                    <a>도움말</a>
                </div>`

    let div = document.createElement("div");
    div.innerHTML = template;
    dropMenu.appendChild(div);

    div.classList.add("drop-content");

    const dropContent = document.querySelector(".drop-content");

    dropContent.classList.toggle('drop-show')
}


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

//달력
let day = document.querySelector(".day")
let calendar = document.querySelector(".calendar")
day.addEventListener("click", dayHandler)

function dayHandler() {
    calendar.style.display = "block";
}