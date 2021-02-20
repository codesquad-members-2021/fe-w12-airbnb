import Toggle from "./toggle.js";
// 계정 버튼
const accountButton = document.querySelector("#account");
const accountLayer = new Toggle("account__layer");

const executeToggle = () => {
  accountButton.addEventListener("click", () => {
    accountLayer.init();
  });
};

export { accountLayer, accountButton, executeToggle };
