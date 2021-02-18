## 2/15(월) 수업 정리

<br>

### 👉 레이어 숨기기

- opacity(투명도) : 0
- position : absolute ; left : -9999px
- display : none;
- visibility : hidden

<br>

### 👉 달력

- div로 하나하나 만들던가
- table로 만들던가
- Date()로 데이터를 가져온다.
- 한달짜리 달력을 정적으로 레이어 띄우는 것만 먼저 해보자
- 그 다음에 다음달버튼 누르면 데이터 쭈르륵

<br>

### 👉 네이버뉴스 탭 옮기기

- mousedown => mousemove => mouseup
- 마우스무브 값을 받아 포지션의 top,left값을 할당 혹은 transform 값 변경
- 이벤트 객체를 유심히 살펴보자!!!!
- [클릭이 일어난다 -> (WEB API)야 a element클릭하면 callback은 이거야 -> callback에 event정보를 넣어서 이벤트 큐에 넣어준다 ->이벤트 루프가 실행
  이벤트에 관련된 모든정보를 객체에 담아서 줄게]

<br>

### 👉 이모저모

- event 객체중 X,Y를 갖고 있는 객체들의 차이점을 알아보자
- DOMContentLoaded : (Dom tree구성 완료 후의 이벤트)
- preventDefault : 이벤트 기본 동작 막음
- document.addEventLister와 window.addEventLister 의 차이 : 거의 dom을 사용

<br>

### 👉 DOM API와 Templating

- DOM Tree구조의 노드를 조작하는 법을 알자!!!!
- (노드 앞에 li추가 , 노드의 부모를 찾는다 ,,, )
- createElement -> createTextNode -> appendchild -> insertBefore (div를 만들고 텍스트노드를 만들어서 append하고 , 실제 dom tree에 삽입하는 아주 기초적인 루트)
- classList의 추가,삭제,토글

<br>

### 👉 미션 유의사항

1. 레이어를 띄우고 없애는 것부터 !
   햄버거를 클릭하면 레이어 클래스가 추가
   DOM + Event => Templating
2. (js파일 모듈화 ! (ex. tabUI.js / Calender.js ...))

<br>

---

## 2/18(목) 수업 정리

<br>

### 👉 설계와 구현을 동시에 하자

1. feature를 잡는다. (ex.클릭하면 달력 레이어가 노출된다.)(하나의 개발브랜치가 된다)
2. feature마다 testcase가 나온다.

- (ex.달력에 이번달 날짜가 나온다 / 요일별로 나눠진다 / 주마다 row가 구성된다 ..)

3. 스켈레톤 코드를 짠다.

- function myFn(){
  //미션
  //리턴
  }

- function myFn2(){
  //미션
  //리턴
  }

4. 설계에 공을 들이자

<br>

### 👉 디스트럭팅을 사용해라!!

- Ex

```js
function myFn(e){e.target.querySeletor; e.target...}
//아래처럼 바꿀 수 있다.
function myFn({target}){target.querySelector ..}
```

<br>

### 👉 Spread Operator 를 사용해라 (...)

<br>

### 👉 이벤트 전파

- 노드를 감싸는 부모노드에도 이벤트를 전파하는 것 (버블링 & 캡처링)
- UI 노출과 숨김에 사용

<br>

### 👉 OOP 스럽게 만들자

- 클래스마다 파일을 쪼갠다 (모듈화)
- 객체를 생성하는 방법은 여러개 있다. 그 중에 class를 사용
- 함수는 파라미터를 받아서 다른 동작을 한다.
- 클래스는 constructor에 지정된 인자가 다른 것이 와도 다른 동작을 하는 범용성을 지님.
- 클래스는 동사가 아닌, 명사로 지정한다.
- 메서드는 동사로 지정한다.
- 생성자함수는 파라미터를 본인의 인자로 사용하는 (객체를 생성하는) 기능만 쓴다.
- this가 가르키는 것은 new ???으로 객체를 생성했을때 생기는 객체를 가르킨다.
- 객체가 생성되면, this에는 생성자에서 지정한 property가 생성된다.
- 메서드들은 프로토타입에 지정되어, new할때마다 같은 프로토타입을 사용한다. (Share)

<br>

### 👉 this

```js
class T {
  go() {
    console.log(this); // 객체 T
    setTimeout(function () {
      console.log(this); // 전역객체 window (webAPI에서 동작하니까)
    }, 1000);
  }
}
```

- scope는 선언할때 결정되고, this는 실행될 때 결정된다.

```js
class T {
  go() {
    console.log(this); // 객체 T
    setTimeout(() => {
      console.log(this); // 객체 T
    }, 1000);
  }
}
```

- 그래서 this를 바인딩하기 위해 arrow function을 쓰거나 bind를 쓴다.

```js
addeventListener('click',this.clickHandler.bind(this))

clickHandler(){}
```

- 이렇게 하면 원래 this는 eventListener를 가르키지만, clickHandler 함수를 가르키게 된다.

<br>

---

### 👉 참고한 사이트

<br>

[DOM 엘리먼트 추가,제거](https://codingnuri.com/javascript-tutorial/adding-and-removing-html-dom-elements.html)

[tabindex](https://developer.mozilla.org/ko/docs/Web/HTML/Global_attributes/tabindex)

[input 클릭 시 글자 없애기](https://www.phpschool.com/gnuboard4/bbs/board.php?bo_table=qna_html&wr_id=138955)

[css 배경색만 투명하게 바꾸기](https://www.codingfactory.net/10825)

[insertAdjacentHTML MDN](https://developer.mozilla.org/ko/docs/Web/API/Element/insertAdjacentHTML)
