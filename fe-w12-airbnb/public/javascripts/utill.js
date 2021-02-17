/* --------------------------------------------------------------------- */
/* ------------------▶︎▶︎▶︎ _ : utillity 메소드 함수를 가진 객체 ◀︎◀︎◀︎--------------*/
/* --------------------------------------------------------------------- */

const _ = {
    $: (selector) => document.querySelector(selector),
    addClass: (node, className) => node.classList.add(className),
    removeClass: (node, className) => {
        console.log(node);
        node.classList.remove(className);
    }
}

export default _;