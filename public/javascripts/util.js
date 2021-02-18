const _ = {
    $: (strSelector) => document.querySelector(strSelector),
    $All: (strSelector) => document.querySelectorAll(strSelector),
    classAdd: (target, ...classNames) => target.classList.add(...classNames),
    classRemove: (target, ...classNames) => target.classList.remove(...classNames),  
    classToggle: (target, className) => target.classList.toggle(className),
    classContains: (target, className) => target.classList.contains(className),
    createElement: (tagType) => document.createElement(tagType),
    createTextNode: (strTxt) => document.createTextNode(strTxt),
    appendChild: (target, child) => target.appendChild(child),
    addEvent: (target, eventType, callback, options = false) => target.addEventListener(eventType, callback, options),
};

export default _;