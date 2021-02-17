/*
-로고 칼라변경: 파일에서 직접 수정
-css에서 svg파일 업로드 : html에서 직접 올림
->but 왜 css에서는 안된건지??

미해결
-float를 쓰고ㅓ clear를 쓰자

-menuRight순서바뀌는 이유:floatRight속성이 그러함, 컨텐츠까지 우측기준정렬됨.

-datetime-local

-brightness

-placeself

-https://www.w3schools.com/cssref/playit.asp?filename=playcss_vertical-align&preval=25px
vertical-align

-공부 -https://stackoverflow.com/questions/20465020/how-to-use-jquery-method-not-in-pure-javascript
//
var buttonToggle = document.querySelectorAll('body>_:not(.toggleBtn)');
var notULtag = document.querySelectorAll('body>_:not(.toggleList)');

console.log("NOT:", buttonToggle)
for (var i = 0; i < buttonToggle.length; i++) {
buttonToggle[i].addEventListener("click", gege)
}
console.log("NOT:", notULtag)
for (var i = 0; i < notULtag.length; i++) {
notULtag[i].addEventListener("click", hehe)
}

function hehe() {
console.log("hehe")
}

function gege() {
console.log("gege")
}//

-matches:
if (this.targetEl.classList.contains("toggleBtn1"))
=>if (this.targetEl.matches(".toggleBtn1"))
*/
//// .TODO: 페이지 로드하면 체험버튼이 클릭되어있는 상태로 표시하기->클릭된상태에서는 MOUSEHOVER효과적용X
/*
-tabindex
  
closest 
insertAdjacentHTML / appendChild / insertAdjacentElement
https: //gist.github.com/jesperorb/3975943c4fdc5865d983e2e4df8c0b00


Nth - Child와 Nth - Of - Type
https: //webisfree.com/2015-12-16/[css]-nth-child%EC%99%80-nth-of-type-%EC%84%A0%ED%83%9D%EC%9E%90-%EB%B9%84%EA%B5%90%ED%95%98%EA%B8%B0


클로져복습.->모던자바스크립트/ 자바스크립트레시피
https://poiemaweb.com/js-closure
*/
//todo: focus onblur로 사라지는 트렌스폼 구축.

-optional channing