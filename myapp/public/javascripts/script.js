function mouseClick() {
    var contents = document.querySelector(".containerHidden");
    contents.classList.toggle("containerShow");
    console.log(contents);
}

function mouseenter(){
    var btn = document.querySelector(".userBtn");
    btn.setAttribute("style", "background-color: DEE1E5");
}

function mouseleave(){
    var btn = document.querySelector(".userBtn");
    btn.setAttribute("style", "background-color: white");
}

var btn = document.querySelector(".containerTitle")
btn.addEventListener("click", mouseClick, false);
btn.addEventListener("mouseover", mouseenter, false)
btn.addEventListener("mouseleave", mouseleave, false)