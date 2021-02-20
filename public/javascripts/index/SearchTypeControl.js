import _ from '../util.js';

class SearchTypeControl {
    constructor(target) {
        this.target = target;

        const searchClassName = '.header__main__search__bar';
        this.roomsTypeList = _.$All(`${searchClassName} .roomsType`);
        this.experienceType = _.$(`${searchClassName} .experienceType`);
        this.locationType = _.$(`${searchClassName} .locationType`);
    }

    init() {
        this._setSearchOptionsClickEvent();
    }

    _setSearchOptionsClickEvent() {
        this.target.addEventListener('click', this._searchOptionsClickHandler.bind(this));
    }

    _searchOptionsClickHandler({ target: { id } }) {
        switch (id) {
            case 'rooms':
                this._roomsTypeControl();
                break;
            case 'experience':
                this._experienceTypeControl();
                break;
            case 'onlineExperience':
                location.href = '/';
                break;
            default:
                break;
        }
    }

    // --------------------------------

    _roomsTypeControl() {
        this.roomsTypeList.forEach((label) => {
            _.classAdd(label, 'displayInit');
            _.classRemove(label, 'displayNone');
        });

        _.classRemove(this.experienceType, 'displayInit', 'w55');
        _.classAdd(this.experienceType, 'displayNone');

        if (_.classContains(this.locationType, 'w45'))
            _.classRemove(this.locationType, 'w45');
        _.classAdd(this.locationType, 'wAuto');
    }

    _experienceTypeControl() {
        this.roomsTypeList.forEach((label) => {
            _.classAdd(label, 'displayNone');
            _.classRemove(label, 'displayInit');
        });

        _.classRemove(this.experienceType, 'displayNone');
        _.classAdd(this.experienceType, 'displayInit', 'w55');

        if (_.classContains(this.locationType, 'wAuto'))
            _.classRemove(this.locationType, 'wAuto');
        _.classAdd(this.locationType, 'w45');
    }
}

export default SearchTypeControl;
