import _ from '../util.js';

// 2021.02.17_12:40 코드 리팩토링 실패.
/* 
    - _searchOptionsClickHandler 부분에서의 
        this는 SearchBarControl 자체가 아닌 SearchBarControl 생성시 매개변수로 넣어줬던 target 값 (여기선 input 임)
        어찌보면 당연한 것.
        그래서 SearchBarControl의 private 함수를 못가져옴. 
        다른 방안을 생각해서 object로 만들어주고 넘겨도 막힘..
        추후 방법을 알게되면 한번해보기.!
*/
class SearchBarControl {
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
        const tempObject = {
            ...this,
            _roomsTypeControl: function() {  return this._roomsTypeControl },
            _experienceTypeControl: function() {  return this._experienceTypeControl }
        };
        console.log(tempObject)

        this.target.addEventListener('click', (e) => this._searchOptionsClickHandler(e, tempObject));
    }

    _searchOptionsClickHandler(e, tempObject) {
        const { target: { id }, } = e;
        console.log(tempObject)
        switch (id) {
            case 'rooms':
                tempObject.roomsTypeControl();
                break;
            case 'experience':
                tempObject.experienceTypeControl();
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
        roomsTypeList.forEach((label) => {
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

export default SearchBarControl;
