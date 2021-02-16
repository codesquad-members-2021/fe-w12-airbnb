console.log("This script file imported")

// function popupLayer(){
//     var btn = document.querySelector(".popup");
//     console.log(btn.textContent);
// }

function myFunction() {
    var myPopup = document.querySelector("#myPopup");
    myPopup.classList.toggle("show");
    console.log(myPopup);
}

function mouseenter(){
    var btn = document.querySelector(".popuptitle");
    btn.setAttribute("style", "text-shadow:2px 2px skyblue");
}

function mouseleave(){
    var btn = document.querySelector(".popuptitle");
    btn.setAttribute("style", "text-shadow:0");
}

var btn = document.querySelector(".popuptitle")

btn.addEventListener("click", myFunction, false)
btn.addEventListener("mouseover", mouseenter, false)
btn.addEventListener("mouseleave", mouseleave, false)

// test.addEventListener("mouseenter", function( event ) {
//     // highlight the mouseenter target
//     event.target.style.color = "purple";
  
//     // reset the color after a short delay
//     setTimeout(function() {
//       event.target.style.color = "";
//     }, 500);
//   }, false);
  
//   // This handler will be executed every time the cursor
//   // is moved over a different list item
//   test.addEventListener("mouseover", function( event ) {
//     // highlight the mouseover target
//     event.target.style.color = "orange";
  
//     // reset the color after a short delay
//     setTimeout(function() {
//       event.target.style.color = "";
//     }, 500);
//   }, false);