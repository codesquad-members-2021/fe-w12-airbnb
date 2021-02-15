## 2/15(월) 수업 정리

### 레이어 숨기기

*opacity(투명도) : 0
position : absolute ; left : -9999px
display : none;
*visibility : hidden

### 달력

div로 하나하나 만들던가
table로 만들던가
Date()로 데이터를 가져온다.
한달짜리 달력을 정적으로 레이어 띄우는 것만 먼저 해보자
그 다음에 다음달버튼 누르면 데이터 쭈르륵

### 네이버뉴스 탭 옮기기

mousedown => mousemove => mouseup
마우스무브 값을 받아 포지션의 top,left값을 할당 혹은 transform 값 변경
이벤트 객체를 유심히 살펴보자!!!!
[클릭이 일어난다 -> (WEB API)야 a element클릭하면 callback은 이거야 -> callback에 event정보를 넣어서 이벤트 큐에 넣어준다 ->이벤트 루프가 실행
이벤트에 관련된 모든정보를 객체에 담아서 줄게]

### 이모저모

event 객체중 X,Y를 갖고 있는 객체들의 차이점을 알아보자
DOMContentLoaded : (Dom tree구성 완료 후의 이벤트)
preventDefault : 이벤트 기본 동작 막음
document.addEventLister와 window.addEventLister 의 차이 : 거의 dom을 사용

### DOM API와 Templating

DOM Tree구조의 노드를 조작하는 법을 알자!!!!
(노드 앞에 li추가 , 노드의 부모를 찾는다 ,,, )
createElement -> createTextNode -> appendchild -> insertBefore (div를 만들고 텍스트노드를 만들어서 append하고 , 실제 dom tree에 삽입하는 아주 기초적인 루트)
classList의 추가,삭제,토글

### 미션 유의사항

1. 레이어를 띄우고 없애는 것부터 !
   햄버거를 클릭하면 레이어 클래스가 추가
   DOM + Event => Templating
2. (js파일 모듈화 ! (ex. tabUI.js / Calender.js ...))

### 참고하는 사이트들

[DOM 엘리먼트 추가,제거](https://codingnuri.com/javascript-tutorial/adding-and-removing-html-dom-elements.html)
