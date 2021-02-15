const { log } = console;

class TabUI {
    constructor(targetEl) {
        this.targetEl = targetEl;
    }

    initSearchOptionClick() {
        this.targetEl.addEventListener('click', this._searchOptionClickHandler);
    }

    _searchOptionClickHandler(e) {
        const { target: {id} } = e;                
        switch (id) {
            case 'rooms': {
                document.querySelectorAll('div.header__main__search__bar > label.roomsType').forEach((label) => label.style.display = "");
                document.querySelector('div.header__main__search__bar > label.experienceType').style.display = "none";
                document.querySelector('div.header__main__search__bar > label.public-searchOption').style.width = "auto";
                break;
            }
            case 'experience': {                
                document.querySelectorAll('div.header__main__search__bar > label.roomsType').forEach((label) => label.style.display = "none");
                document.querySelector('div.header__main__search__bar > label.experienceType').style.display = "";
                document.querySelector('div.header__main__search__bar > label.experienceType').style.width = "50%";
                document.querySelector('div.header__main__search__bar > label.public-searchOption').style.width = "50%";                
                break;
            }
            default:    break;
        }        
    }
}

const inputList = document.querySelectorAll('div.header__main__search__options input');
document.querySelector('div.header__main__search__bar > label.experienceType').style.display = "none";

inputList.forEach((input) => input.id !== "onlineExperience" && new TabUI(input).initSearchOptionClick());