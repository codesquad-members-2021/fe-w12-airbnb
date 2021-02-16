const $searchBar = document.querySelector('.search');
const $stayButton = document.querySelector('.nav-center-stay');
const $experienceButton = document.querySelector('.nav-center-experience');

const stayOption = [
  { title: '위치', content: '어디로 여행가세요?' },
  { title: '체크인', content: '날짜 추가' },
  { title: '체크아웃', content: '날짜 추가' },
  { title: '인원', content: '게스트 추가' },
];

const experienceOption = [
  { title: '위치', content: '어디로 여행가세요?' },
  { title: '날짜', content: '원하는 날짜를 입력하세요' },
];

function makeHtml(option, style) {
  return function () {
    console.log(option);
    const html = option
      .map(
        (i) =>
          `          <div>
        <p><b>${i.title}</b></p>
        <p>${i.content}</p>
      </div>`
      )
      .join('');
    const searchButton = `
      <div class="search-button-part">
        <div class="search-button">
          <img src="http://localhost:3000/images/search-solid.svg" alt="" />
        </div>
      </div>
    `;
    $searchBar.innerHTML = `${html} ${searchButton}`;
    if (style === 'search-align-2') {
      const $searchBarChild = document.querySelectorAll('.search div');
      $searchBarChild.classList.remove('search-align-4');
      $searchBarChild.classList.add(style);
    } else {
      const $searchBarChild = document.querySelectorAll('.search div');
      $searchBarChild.classList.remove('search-align-2');
      $searchBarChild.classList.add(style);
    }
  };
}

document.addEventListener(
  'DOMContentLoaded',
  makeHtml(stayOption, 'search-align-4')
);
$stayButton.addEventListener('click', makeHtml(stayOption, 'search-align-4'));
$experienceButton.addEventListener(
  'click',
  makeHtml(experienceOption, 'search-align-2')
);
