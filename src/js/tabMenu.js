const rooms = document.querySelector('.menu--rooms');
const experiences = document.querySelector('.menu--experiences');
const roomsSearchBox = document.querySelector('#header__search--rooms');
const experiencesSearchBox = document.querySelector('#header__search--experiences');

rooms.addEventListener('click', roomsClickHandler);
experiences.addEventListener('click', experiencesClickHandler);

function roomsClickHandler() {
    if (roomsSearchBox.className === 'hidden') {
        roomsSearchBox.classList.remove('hidden');
        roomsSearchBox.classList.add('show');
        experiencesSearchBox.classList.remove('show');
        experiencesSearchBox.classList.add('hidden');
    }
}

function experiencesClickHandler() {
    if (experiencesSearchBox.className === 'hidden') {
        experiencesSearchBox.classList.remove('hidden');
        experiencesSearchBox.classList.add('show');
        roomsSearchBox.classList.remove('show');
        roomsSearchBox.classList.add('hidden');
    }
}