import _ from "../util.js";

class SearchBarControl {
    constructor(target) {
        this.target = target;
    }

    searchOptionClick() {
        this.target.addEventListener('click', this._searchOptionClickHandler);
    }

    _searchOptionClickHandler(e) {
        const { target: {id} } = e;
        const searchClassName = '.header__main__search__bar';
        
        const roomsTypeList = _.$All(`${searchClassName} .roomsType`);
        const experienceType = _.$(`${searchClassName} .experienceType`); 
        const locationType = _.$(`${searchClassName} .locationType`);           
        switch (id) {
            case 'rooms': {
                roomsTypeList.forEach((label) => {
                    _.classAdd(label, 'displayInit');
                    _.classRemove(label, 'displayNone');
                });

                _.classRemove(experienceType, 'displayInit', 'w50');
                _.classAdd(experienceType, 'displayNone');
                                                
                if (_.classContains(locationType, 'w50'))
                    _.classRemove(locationType, 'w50');
                _.classAdd(locationType, 'wAuto');
                break;
            }
            case 'experience': {                
                roomsTypeList.forEach((label) => {
                    _.classAdd(label, 'displayNone');
                    _.classRemove(label, 'displayInit');
                });

                _.classRemove(experienceType, 'displayNone');
                _.classAdd(experienceType, 'displayInit', 'w50');

                if (_.classContains(locationType, 'wAuto'))
                    _.classRemove(locationType, 'wAuto');
                _.classAdd(locationType, 'w50');            
                break;
            }
            case 'onlineExperience': {
                location.href = '/';
                break;
            }
            default:    break;
        }        
    }
}

export default SearchBarControl;