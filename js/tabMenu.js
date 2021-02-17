const rooms = document.querySelector('.menu--rooms');
const experiences = document.querySelector('.menu--experiences');
const roomsSearchBox = document.querySelector('#header__search--rooms');
const experiencesSearchBox = document.querySelector('#header__search--experiences');

rooms.addEventListener('click', roomsClickHandler);
experiences.addEventListener('click', experiencesClickHandler);

function roomsClickHandler() {
    if (roomsSearchBox.className === 'rooms--hidden') {
        roomsSearchBox.classList.remove('rooms--hidden');
        roomsSearchBox.classList.add('rooms--show');
        experiencesSearchBox.classList.remove('experiences--show');
        experiencesSearchBox.classList.add('experiences--hidden');
    }
}

function experiencesClickHandler() {
    if (experiencesSearchBox.className === 'experiences--hidden') {
        experiencesSearchBox.classList.remove('experiences--hidden');
        experiencesSearchBox.classList.add('experiences--show');
        roomsSearchBox.classList.remove('rooms--show');
        roomsSearchBox.classList.add('rooms--hidden');
    }
}