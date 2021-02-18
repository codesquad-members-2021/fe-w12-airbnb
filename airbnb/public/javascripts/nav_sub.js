const navbar = document.querySelector('nav');
const sticky = navbar.offsetTop;

const $searchBar = document.querySelector('.search');
const $stayButton = document.querySelector('.nav-center-stay');
const $experienceButton = document.querySelector('.nav-center-experience');

const stayOption = [
  { title: '위치', content: '어디로 여행가세요?', className: 'location' },
  { title: '체크인', content: '날짜 추가', className: 'check-in' },
  { title: '체크아웃', content: '날짜 추가', className: 'check-out' },
  { title: '인원', content: '게스트 추가', className: 'guests' },
];

const experienceOption = [
  { title: '위치', content: '어디로 여행가세요?', className: 'location' },
  { title: '날짜', content: '원하는 날짜를 입력하세요', className: 'date' },
];

function makeHtml(option, style) {
  return function () {
    const html = option
      .map(
        (i) =>
          `          <div class="${i.className}">
        <p><b>${i.title}</b></p>
        <p>${i.content}</p>
        </div>`
      )
      .join('');
    $searchBar.innerHTML = html;

    const $searchBarChild = document.querySelectorAll('.search > div');
    if (style === 'stay-align') {
      $searchBarChild.forEach((i) => {
        if (i.classList.contains('experience-align')) {
          i.classList.remove('experience-align');
        }
        i.classList.add('stay-align');
      });
    } else {
      $searchBarChild.forEach((i) => {
        if (i.classList.contains('stay-align')) {
          i.classList.remove('stay-align');
        }
        i.classList.add('experience-align');
      });
    }
  };
}

document.addEventListener(
  'DOMContentLoaded',
  makeHtml(stayOption, 'stay-align')
);
$stayButton.addEventListener('click', makeHtml(stayOption, 'stay-align'));
$experienceButton.addEventListener(
  'click',
  makeHtml(experienceOption, 'experience-align')
);

//-------------make nav bar stick
window.onscroll = function () {
  myFunction();
};

function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add('sticky');
  } else {
    navbar.classList.remove('sticky');
  }
}
