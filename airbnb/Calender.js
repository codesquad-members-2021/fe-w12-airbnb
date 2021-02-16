class CalenderModel {
  constructor() {

  }
}

class CalenderView {
  constructor($fullDate, $startDate, $endDate, $searchInputBox) {
    this.$fullDate = $fullDate;
    this.$startDate = $startDate;
    this.$endDate = $endDate;
    this.$searchInputBox = $searchInputBox;
    this.makeTemplate();
  }

  initEvent() {
    this.$fullDate.addEventListener('click', this.toggleButtonHandler.bind(this));
  }

  dateTemplate() { //작업 중..
    return `<div class="calender_box display_none">
              <div class="width50per border-radius32">
              </div>
              <div class="width50per white_background border-radius32">
                <table>
                  <tr>
                    <th colspan="7">2021년 2월</th>
                  </tr>
                  <tr>
                    <td>일</td><td>월</td><td>화</td><td>수</td><td>목</td><td>금</td><td>토</td>
                  </tr>
                  <tr>
                    <td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td>
                  </tr>
                  <tr>
                    <td>8</td><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td>
                  </tr>
                  <tr>
                    <td>15</td><td>16</td><td>17</td><td>18</td><td>19</td><td>20</td><td>21</td>
                  </tr>
                  <tr>
                    <td>22</td><td>23</td><td>24</td><td>25</td><td>26</td><td>27</td><td>28</td>
                  </tr>
                  <tr>
                    <td>29</td><td>30</td>
                  </tr>
                </table>
              </div>  
            </div>`;
  }

  makeTemplate() {
    this.$searchInputBox.insertAdjacentHTML('beforeend', this.dateTemplate());
  }

  toggleButtonHandler() {
    document.querySelector('.calender_box').classList.toggle('display_none');
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const $fullDate = document.querySelector('.search_input__full_date');
  const $startDate = document.querySelector('.search_input__start_date');
  const $endDate = document.querySelector('.search_input__end_date');
  const $searchInputBox = document.querySelector('.search_input_box');

  const calendarModel = new CalenderModel();
  const calendarView = new CalenderView($fullDate, $startDate, $endDate, $searchInputBox);
  calendarView.initEvent();
})
