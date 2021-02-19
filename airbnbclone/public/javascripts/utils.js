const _ = {
  ADD: (target, className) => target.classList.add(className),

  REMOVE: (target, className) => target.classList.remove(className),

  TOGGLE: (target, className) => target.classList.toggle(className),
  
  REPLACE: (target, oldClassName, newClassName) =>
    target.classList.replace(oldClassName, newClassName),
  $: (selector, base = document) => base.querySelector(selector),

  $A: (selector, base = document) => base.querySelectorAll(selector),

  EVENT: (target, type, listener, useCapture = false) =>
    target.addEventListener(type, listener, useCapture),
};

export default _;
