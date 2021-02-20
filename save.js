GiveInnerText(el) {
   this.judgement += 1;
   el.classList.add("clicked");
   let checkI_O_Bar = document.querySelector(".search_ver2 .call_calendar> div");
   let paste1 = document.querySelectorAll(".search_ver2 .call_calendar> div>div");
   let checkIn = document.createElement("div");
   let checkOut = document.createElement("div");
   let clickedDiv = document.querySelectorAll('.clicked');

   //*체크인>체크아웃
   if (this.judgement >= 2 && (Number(el.innerText) < Number(clickedDiv[1].innerText))) {
      let eraseClicked = Array.from(clickedDiv);
      eraseClicked[1].classList.remove('clicked');
   }

   //*체크인<체크아웃
   //체크인 선택
   else if (this.judgement % 2 !== 0) {
      //첫번째 클릭이 아닌 경우(->기존의 클릭 삭제)
      if (this.judgement > 1 && (Number(el.innerText) > Number(clickedDiv[1].innerText))) {
         let eraseClicked = Array.from(clickedDiv);
         eraseClicked.pop();
         eraseClicked.forEach(el => {
            el.classList.remove('clicked')
         })
      }
      checkIn.innerText = `${this.current_month}월 ${el.innerText}일`;
      for (let i = 0; i < paste1.length; i++) {
         checkI_O_Bar.replaceChild(checkIn, paste1[i])
      }
   }

   //체크아웃 클릭시
   else if (this.judgement % 2 === 0 && (Number(el.innerText) > Number(clickedDiv[1].innerText))) {
      checkOut.innerText = `${this.current_month}월 ${el.innerText}일`;
      checkI_O_Bar.appendChild(checkOut);
   }
}