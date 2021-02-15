class Button_List {
    init = () => {
        const body = document.querySelector('#Body');
        const Btn = document.querySelector(".loginbox");
        const BOX_CLASS = "List_box";
        const user = "회원 가입";
        const login = "로그인";
        const home_host = "숙소 호스트 되기";
        const experience_host = "체험 호스팅 하기";
        const help = "도움말";

        let tempDiv = document.createElement("div");
        tempDiv.id = "tempdiv";
        tempDiv.classList.add(BOX_CLASS);
        Btn.insertAdjacentElement('afterend', tempDiv);

        tempDiv.innerHTML = `
                <div class="box_div"><a href="http://www.naver.com" class="box_class"><b>${user}</b></a></div>
                <div id="secondbox_div" class="box_div"><a href="#" class="box_class">${login}</a></div>
                <div class="box_div"><a href="#" class="box_class">${home_host}</a></div>
                <div class="box_div"><a href="#" class="box_class">${experience_host}</a></div>
                <div class="box_div"><a href="#" class="box_class">${help}</a></div>
            `;

        Body.addEventListener("click", (e) => {
            const shade = document.querySelector('#tempdiv');
            const close = e.target.closest(".loginbox");

            if (close) {
                shade.style.display = "block";
            } else {
                shade.style.display = "none";
            }
        });
    }
}

const button_list = new Button_List();
button_list.init();


