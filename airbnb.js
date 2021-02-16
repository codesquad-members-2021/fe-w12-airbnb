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
const menuList = document.querySelectorAll(".menu-list");
const menuListBtns = document.querySelectorAll(".menu-list button");


// 체험 눌렀을 때
const exprienceBtn = menuListBtns[1];

exprienceBtn.addEventListener("click", exprienceBtnHandler);

function exprienceBtnHandler() {
    exprienceBtn.classList.add("clicked")
    roomsBtn.classList.remove("clicked")
    let template = `
        <div>
            <span>위치</span><br>
            <input type="text"placeholder="어디로 여행가세요?">
        </div>
        <div>
            <span>날짜</span><br>
            <span>원하는 날짜를 입력하세요</span>
            <button class="search-btn">
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; fill: none; height: 20px; width: 20px; stroke: currentcolor; stroke-width: 4; overflow: visible;"><g fill="none"><path d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"></path></g></svg>
            </button>
        </div>`

    search.innerHTML = template;
    search.classList.add("exprienceBtn-search")
}

// 숙소 눌렀을 때
const roomsBtn = menuListBtns[0];
roomsBtn.addEventListener("click", roomBtnHandler);

function roomBtnHandler() {
    roomsBtn.classList.add("clicked")
    exprienceBtn.classList.remove("clicked")
    let template = `
    <div>
        <span>위치</span><br>
        <input type="text" placeholder="어디로 여행가세요?">
    </div>
    <div>
        <span>체크인</span><br>
        <span>날짜추가</span>
    </div>
    <div>
        <span>체크아웃</span><br>
        <span>날짜추가</span>
    </div>
    <div>
        <span>인원</span><br>
        <span>게스트추가</span>
        <button class="search-btn">
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; fill: none; height: 20px; width: 20px; stroke: currentcolor; stroke-width: 4; overflow: visible;"><g fill="none"><path d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"></path></g></svg>
        </button>
    </div>`

    search.innerHTML = template;
    search.classList.remove("exprienceBtn-search")
}