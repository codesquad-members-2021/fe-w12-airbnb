const dropMenu = document.querySelector(".drop-menu");


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

div.classList.add("drop-content")

const dropContent = document.querySelector(".drop-content");


dropMenu.addEventListener("click", clickHandler);

function clickHandler(e) {
    dropContent.classList.toggle('drop-show')
}