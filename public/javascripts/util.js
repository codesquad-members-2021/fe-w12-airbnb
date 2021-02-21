const _ = {
    $: (strSelector, target = document) => target.querySelector(strSelector),
    $All: (strSelector, target = document) => target.querySelectorAll(strSelector),
    classAdd: (target, ...classNames) => target.classList.add(...classNames),
    classRemove: (target, ...classNames) => target.classList.remove(...classNames),  
    classToggle: (target, className) => target.classList.toggle(className),
    classContains: (target, className) => target.classList.contains(className),
    createElement: (tagType) => document.createElement(tagType),
    createTextNode: (strTxt) => document.createTextNode(strTxt),
    appendChild: (target, child) => target.appendChild(child),
    addEvent: (target, eventType, callback, options = false) => target.addEventListener(eventType, callback, options),    
    setAttr: (target, strAttrName, strValue) => target.setAttribute(strAttrName, strValue),    
    getAttr: (target, strAttrName) => target.getAttribute(strAttrName),
    removeAttr: (target, strAttrName) => target.removeAttribute(strAttrName),
};

export default _;