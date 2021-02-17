/* --------------------------------------------------------------------- */
/* ------------------▶︎▶︎▶︎ _ : utillity 메소드 함수를 가진 객체 ◀︎◀︎◀︎--------------*/
/* --------------------------------------------------------------------- */

const _ = {
    $: (selector) => document.querySelector(selector),
    addClass: (node, className) => node.classList.add(className),
    removeClass: (node, className) => node.classList.remove(className),
    setToggle: (node, className) => node.classList.toggle(className),
    contains: (node, className) => node.classList.contains(className)
}

export default _;