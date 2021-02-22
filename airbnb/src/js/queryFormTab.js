const HIDDEN = 'hidden';

const STAY = '숙소';
const EXPERIENCE = '체험';

class QueryFormTab {
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
    if (type === STAY) {
      this.formStay.classList.remove(HIDDEN);
      this.formExperience.classList.add(HIDDEN);
    } else if (type === EXPERIENCE) {
      this.formStay.classList.add(HIDDEN);
      this.formExperience.classList.remove(HIDDEN);
    }
  }
}

export default QueryFormTab;
