/* --------------------------------------------------------------------- */
/* -------------▶︎▶︎▶︎ TabUI 클래스: UI 가운데 탭 메뉴 핸들링 ◀︎◀︎◀︎------------------*/
/* --------------------------------------------------------------------- */

/*
- [v] 상단 메뉴 "숙소", "체험" 탭에 마우스 hover underline 효과를 넣는다. (수정필요)
- [v] 서치바 돋보기 버튼에 마우스 hover 색상변화 효과를 넣는다.
- [ ] 서치바 내부에 마우스 hover 그림자 효과를 넣는다.
- [ ] 상단 메뉴 "체험" 탭을 선택하면 아래 서치바 내용이 바뀐다.
- [ ] "체험"탭의 날짜메뉴를 선택하면 나타나는 캘린더 박스 + 캘린더 테이블을 만든다. 여기에는 두 달치 캘린더가 노출된다.
- [ ] 좌/우 상단에 '<' 와 '>' 버튼을 추가한다.
*/

class TabUI {
    constructor(ref, _) {
        this._ = _;
        this.tab = Array.from(ref.tab);//nodelist(3)이 들어옴. span.
        this.inputs = Array.from(ref.tabInput);
        this.searchBox = ref.searchBox;
        this.addEvent();
    }

    addEvent() {
        this.inputs.forEach((el, i) => {
            this.tab[i].addEventListener("click", this.findSelectedTab.bind(this));
        });
    }

    findSelectedTab({target}){
        const className = target.classList[0];
        target.previousElementSibling.checked = true;

        if (className === "experience") {
            this.switch2Experience();
        } else if (className === "accommodation") {
            this.switch2Accommodation();
        }
    }

    switch2Experience() {
        const template =
        `<div>
            <label>위치</label><input type="text" placeholder="어디로 여행가세요?">
        </div>
        <div class="sec_op">
            <label>날짜</label><input type="text" placeholder="원하는 날짜를 입력하세요.">
        </div>
        <div id="search_btn">
            <img src="images/search.svg" alt="search logo" class="search_logo">
        </div>`;
        this.searchBox.innerHTML = template;
    }

    switch2Accommodation() {
        const template =
        `<div>
            <label>위치</label><input type="text" placeholder="어디로 여행가세요?">
        </div>
        <div class="sec_op">
            <label>체크인</label><input type="text" placeholder="날짜 추가">
        </div>
        <div class="third_op">
            <label>체크아웃</label><input type="text" placeholder="날짜 추가">
        </div>
        <div class="fourth_op">
            <label>인원</label><input type="text" placeholder="게스트 추가">
        </div>
        <div id="search_btn">
            <img src="images/search.svg" alt="search logo" class="search_logo">
        </div>`;
        this.searchBox.innerHTML = template;
    }
}

export default TabUI;