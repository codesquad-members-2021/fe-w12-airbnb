import _ from '../util.js';

class SearchTypeControl {
    /**
     * @param {String} searchTypeWrapSelector
     * @param {String} searchBarWrapSelector
     */
    constructor(searchTypeWrapSelector, searchBarWrapSelector) {
        this.searchTypeWrapper = _.$(searchTypeWrapSelector);
        this.searchBarWrapper = _.$(searchBarWrapSelector);
        this.searchTypeInputList = [];
        this.searchBarItems = {
            inputList: [],
            labelList: [],
            calendarWrapper: null,
            prevSearchBarOption: null,
        };
    }
    
    init() {
        this._setSearchTypeInputList();
        this._setSearchBarItems();

        this._setSearchTypesClickEvent();        
        this._setSearchBarOptionsClickEvent();        
    }

    // 1) 초기화 관련 
    _setSearchTypeInputList() {
        this.searchTypeInputList = Array.from(_.$All('input[type="radio"]', this.searchTypeWrapper));
    }

    _setSearchBarItems() {
        this.searchBarItems = {
            ...this.searchBarItems,
            inputList: Array.from(_.$All('input[type="radio"]', this.searchBarWrapper)),
            labelList: Array.from(_.$All('label', this.searchBarWrapper)),
            calendarWrapper: _.$('.calendarWrapper', this.searchBarWrapper),
            prevSearchBarOption: _.$('input#prevSearchBarOption', this.searchBarWrapper),
        };
    }  
    // ---------------  

    // 2. 이벤트 관련
    // 1) Types: 숙소, 체험, 온라인 체험 버튼 클릭에 따른 스타일 변경 
    _setSearchTypesClickEvent() {
        this.searchTypeInputList.forEach((input) =>
            _.addEvent(input, 'click', this._searchTypesClickHandler.bind(this)),
        );
    }

    _searchTypesClickHandler({ target: { id } }) {
        const { inputList, labelList, calendarWrapper } = this.searchBarItems;
        
        inputList.forEach((input) => input.checked = input.checked && false);

        const locationType = labelList.find((label) => _.classContains(label, 'locationType'));        
        const experienceType = labelList.find((label) => _.classContains(label, 'experienceType'));
        const roomsTypeList = labelList.filter((label) => _.classContains(label, 'roomsType'));

        switch (id) {
            case 'rooms':
                this._roomsTypeControl(locationType, experienceType, roomsTypeList);
                break;
            case 'experience':
                this._experienceTypeControl(locationType, experienceType, roomsTypeList);
                break;
            case 'onlineExperience':
                location.href = '/';
                break;
            default:
                break;
        }
    }

    _roomsTypeControl(locationType, experienceType, roomsTypeList) {    
        roomsTypeList.forEach((label) =>
            _.classRemove(label, 'displayNone'),
        );

        _.classRemove(experienceType, 'w55');
        _.classAdd(experienceType, 'displayNone');

        if (_.classContains(locationType, 'w45'))
            _.classRemove(locationType, 'w45');
        _.classAdd(locationType, 'wAuto');
    }

    _experienceTypeControl(locationType, experienceType, roomsTypeList) {
        roomsTypeList.forEach((label) => _.classAdd(label, 'displayNone'));

        _.classRemove(experienceType, 'displayNone');
        _.classAdd(experienceType, 'w55');

        if (_.classContains(locationType, 'wAuto'))
            _.classRemove(locationType, 'wAuto');
        _.classAdd(locationType, 'w45');
    }

    // 2) Options: 위치, 체크인, 체크아웃, 인원, 날짜 버튼 클릭에 따른 동작
    _setSearchBarOptionsClickEvent() {
        const { inputList } = this.searchBarItems;

        inputList.forEach((input) =>
            _.addEvent(input, 'click', (e) => this._searchBarOptionsClickHandler(e)),
        );
    }

    _searchBarOptionsClickHandler(e) {
        const { target, target: {id} } = e;
        const { calendarWrapper, prevSearchBarOption } = this.searchBarItems;                
        
        if (prevSearchBarOption.value === id) {
            _.removeAttr(prevSearchBarOption , 'value');            
            target.checked = false;
            
            if (!_.classContains(calendarWrapper, 'visibility--hidden'))
                _.classAdd(calendarWrapper, 'visibility--hidden');

        } else {
            switch (id) {
                case "checkin":
                case "checkout":
                case "selectDate": {
                    if (_.classContains(calendarWrapper, 'visibility--hidden')) {
                        _.classRemove(calendarWrapper, 'visibility--hidden');                    
                    }                                  
                    break;
                }
                default: {
                    _.classAdd(calendarWrapper, 'visibility--hidden');
                    break;
                }                
            }

            _.setAttr(prevSearchBarOption , 'value', id); 
        }                
    }
    // ---------------
}

export default SearchTypeControl;
