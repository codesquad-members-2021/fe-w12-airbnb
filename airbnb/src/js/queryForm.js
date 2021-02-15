const HIDDEN = 'hidden';

class QueryForm {
  constructor(formTab, formStay, formExperience) {
    this.formTab = formTab;
    this.formStay = formStay;
    this.formExperience = formExperience;
  }
  init() {
    this.onEvent();
  }
  onEvent() {
    this.formTab.addEventListener('click', this.renderForm.bind(this));
  }
  renderForm(e) {
    const type = e.target.innerText;
    if (type === '숙소') {
      this.formStay.classList.remove(HIDDEN);
      this.formExperience.classList.add(HIDDEN);
    } else if (type === '체험') {
      this.formStay.classList.add(HIDDEN);
      this.formExperience.classList.remove(HIDDEN);
    }
  }
}

export default QueryForm;
