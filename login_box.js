class Button_List {
    init = () => {
        const Btn = document.querySelector(".loginbox");
        const BOX_CLASS = "List_box";
        const TEMP_CLASS = "tempclass"
        const user = "회원 가입";
        const login = "로그인";
        const home_host = "숙소 호스트 되기";
        const experience_host = "체험 호스팅 하기";
        const help = "도움말";

        let tempDiv = document.createElement("div");
        tempDiv.classList.add(TEMP_CLASS);
        tempDiv.classList.add(BOX_CLASS);

        tempDiv.innerHTML = `
                <div class="box_div"><a href="http://www.naver.com" class="box_class"><b>${user}</b></a></div>
                <div id="secondbox_div" class="box_div"><a href="#" class="box_class">${login}</a></div>
                <div class="box_div"><a href="#" class="box_class">${home_host}</a></div>
                <div class="box_div"><a href="#" class="box_class">${experience_host}</a></div>
                <div class="box_div"><a href="#" class="box_class">${help}</a></div>
            `;

        Btn.insertAdjacentElement('afterend', tempDiv);


        document.addEventListener("click", (e) => {
            const close = e.target.closest(".loginbox");

            // tempDiv 가 TEMP_CLASS 클래스를 가지고 있는지 없는지를 boolean으로 반환
            const contain = tempDiv.classList.contains(TEMP_CLASS);

            if (close && contain) {
                tempDiv.classList.remove(TEMP_CLASS)
            } else if (close && !contain) {
                tempDiv.classList.add(TEMP_CLASS)
            } else if (!close) {
                tempDiv.classList.add(TEMP_CLASS)
            };
        })
    }

    // 체험 누르면 다른 박스 띄우기
    centerbox = () => {
        const CENTER_DISPLAY_OFF = "centerdisplay_off";
        const CENTER_BOXWIDTH = "boxwidth";
        const BOX_PADDING = "boxpadding";
        const CENTER_FIRST = document.querySelector("#first_label");
        const CENTER_SECOND = document.querySelector("#second_label");
        const BOX = document.querySelectorAll(".BOX");
        const BOX_HEAD = document.querySelectorAll("#BOX_head");
        const BOX_FOURTH = document.querySelector("#BOX_fourth");
        const BOX_HIDDEN = document.querySelectorAll("#hidden");

        let BOX_DIV = document.createElement("div");
        BOX_DIV.classList.add(CENTER_DISPLAY_OFF);
        BOX_DIV.classList.add(BOX_PADDING);

        BOX_DIV.innerHTML = `
                    <div class="Infofont2">날짜</div>
                    <div class="Infofontunder2">원하는 날짜를 입력하세요.</div>
            `;

        BOX_FOURTH.insertAdjacentElement('afterend', BOX_DIV);

        CENTER_SECOND.addEventListener("click", () => {
            BOX_DIV.classList.remove(CENTER_DISPLAY_OFF);
            // 체크인 체크아웃 안보이게
            for (let i = 1; i < 3; i++) {
                BOX[i].classList.add(CENTER_DISPLAY_OFF);
            }
            //인원 & 게스트 추가 삭제
            while (BOX_FOURTH.hasChildNodes()) {
                BOX_FOURTH.removeChild(BOX_FOURTH.firstChild);
            }
            for (let a of BOX_HEAD) {
                a.classList.add(CENTER_BOXWIDTH);
            }
        });

        CENTER_FIRST.addEventListener("click", () => {

            BOX_DIV.classList.add(CENTER_DISPLAY_OFF);

            for (let i = 1; i < 3; i++) {
                BOX[i].classList.remove(CENTER_DISPLAY_OFF);
            }
            for (let i = 0; i < 2; i++) {
                BOX_FOURTH.appendChild(BOX_HIDDEN[i]);
            }
        });
    };
}

const button_list = new Button_List();
button_list.init();
button_list.centerbox();