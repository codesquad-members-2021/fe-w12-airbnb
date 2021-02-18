import _ from '../util.js';

class SearchBarControl {
    constructor(target) {
        this.target = target;
    }

    init() {
        this._setSearchOptionsClickEvent();
    }

    _setSearchOptionsClickEvent() {
        this.target.addEventListener('click', (e) =>
            this._searchOptionsClickHandler(
                e,
                this._roomsTypeControl,
                this._experienceTypeControl,
            ),
        );
    }

    _searchOptionsClickHandler(e, roomsTypeControl, experienceTypeControl) {
        const {
            target: { id },
        } = e;

        const searchClassName = '.header__main__search__bar';
        const roomsTypeList = _.$All(`${searchClassName} .roomsType`);
        const experienceType = _.$(`${searchClassName} .experienceType`);
        const locationType = _.$(`${searchClassName} .locationType`);
        
        switch (id) {
            case 'rooms':
                roomsTypeControl(roomsTypeList, experienceType, locationType);
                break;
            case 'experience':
                experienceTypeControl(roomsTypeList, experienceType, locationType);
                break;
            case 'onlineExperience':
                location.href = '/';
                break;
            default:
                break;
        }
    }

    // --------------------------------

    _roomsTypeControl(roomsTypeList, experienceType, locationType) {
        roomsTypeList.forEach((label) => {
            _.classAdd(label, 'displayInit');
            _.classRemove(label, 'displayNone');
        });

        _.classRemove(experienceType, 'displayInit', 'w55');
        _.classAdd(experienceType, 'displayNone');

        if (_.classContains(locationType, 'w45'))
            _.classRemove(locationType, 'w45');
        _.classAdd(locationType, 'wAuto');
    }

    _experienceTypeControl(roomsTypeList, experienceType, locationType) {
        roomsTypeList.forEach((label) => {
            _.classAdd(label, 'displayNone');
            _.classRemove(label, 'displayInit');
        });

        _.classRemove(experienceType, 'displayNone');
        _.classAdd(experienceType, 'displayInit', 'w55');

        if (_.classContains(locationType, 'wAuto'))
            _.classRemove(locationType, 'wAuto');
        _.classAdd(locationType, 'w45');
    }
}

export default SearchBarControl;
