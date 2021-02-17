const dropMenu = document.querySelector(".drop-menu");

// let div = document.createElement("div");
// div.innerHTML = template;
// dropMenu.appendChild(div);
// div.classList.add("drop-content");

const template = `
<div class="drop-content">
<div>
<a>회원가입</a>
<a>로그인</a>
</div>
<div>
<a>숙소 호스트 되기</a>
<a>체험 호스팅하기</a>
<a>도움말</a>
</div>
</div>`


dropMenu.insertAdjacentHTML("beforeend", template)

let dropContent = document.querySelector(".drop-content");

document.addEventListener("click", clickHandler);

function clickHandler(e) {
    console.log(e.target)
    if (e.target.classList.contains('drop-menu')) {
        dropContent.classList.toggle('show')
    } else {
        dropContent.classList.remove('show')
    }
}