const rooms = document.querySelector('.menu--rooms');
const experiences = document.querySelector('.menu--experiences');
const roomsSearchBox = document.querySelector('#header__search--rooms');
const experiencesSearchBox = document.querySelector('#header__search--experiences');

rooms.addEventListener('click', roomsClickHandler);
experiences.addEventListener('click', experiencesClickHandler);

function roomsClickHandler() {
    if (roomsSearchBox.className === 'rooms__hidden') {
        roomsSearchBox.classList.remove('rooms__hidden');
        roomsSearchBox.classList.add('rooms__show');
        experiencesSearchBox.classList.remove('experiences__show');
        experiencesSearchBox.classList.add('experiences__hidden');
    }
}

function experiencesClickHandler() {
    if (experiencesSearchBox.className === 'experiences__hidden') {
        experiencesSearchBox.classList.remove('experiences__hidden');
        experiencesSearchBox.classList.add('experiences__show');
        roomsSearchBox.classList.remove('rooms__show');
        roomsSearchBox.classList.add('rooms__hidden');
    }
}