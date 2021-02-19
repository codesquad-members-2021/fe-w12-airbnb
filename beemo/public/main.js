const _ = require('./util.js');
const TabUI = require('./TabUi.js');
const PopupLayer = require('./PopupLayer.js');

const calenderModel = require('./CalenderModel.js');
const CalenderView = require('./CalenderView.js');

window.addEventListener('DOMContentLoaded', () => {
  const $tabButton = _.$('#nav_button');
  const tabUI = new TabUI($tabButton);
  tabUI.initEvent();

  const $roomsBox = _.$('.rooms_box');
  const $experienceBox = _.$('.experience_box');
  const $nav = _.$('.nav');
  const popupLayer = new PopupLayer(calenderModel, $roomsBox, $experienceBox, $nav);
  popupLayer.initEvent();

  const $fullDate = _.$('.search_input__full_date');
  const $startDate = _.$('.search_input__start_date');
  const $endDate = _.$('.search_input__end_date');
  const $searchInputBox = _.$('.search_input_box');
  const calendarView = new CalenderView(calenderModel, $fullDate, $startDate, $endDate, $searchInputBox);
  calendarView.initEvent();
})