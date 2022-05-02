// Author: bruteF04C3

document.addEventListener('DOMContentLoaded', function() {
    initNoteArea();
})

function initNoteArea() {
    const BODY = document.getElementsByTagName('body')[0];
    const EXISTING_MARKUP = BODY.innerHTML;
    BODY.innerHTML = '';
    // onclick for testing only
    BODY.innerHTML = `<div id="_vstickynotes-main" tabindex="-1" onclick="hideAllNotes()" oncontextmenu="getCursorCoords(event)">
        ${EXISTING_MARKUP}
    </div>`;
}

function getCursorCoords(event) {
    event.preventDefault();
    const COORDS = [event.screenX, event.screenY]
    // renderCard(coords)
    constructCard(COORDS);

}

function constructCard(coords) {
    const CARD = `
    <div class="card">
    <div class="card-header">
      Featured
    </div>
    <div class="card-body">
      <input type="text">
    </div>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
    `

    let cardFragment = document.createRange().createContextualFragment(CARD);

    // DOM Parser , todo
    // let cardFragment = new DOMParser().parseFromString(CARD, 'text/html');

    cardFragment.firstElementChild.style.top = `${coords[1] - 80}px`;
    cardFragment.firstElementChild.style.left = `${coords[0] - 10}px`
    showNotes(cardFragment);
}

function showNotes(card) {
    const MAIN = document.getElementById('_vstickynotes-main');

    MAIN.appendChild(card);
}

function hideAllNotes() {
    const NOTES = document.querySelectorAll('.card');
    NOTES.forEach((item) => {
        item.style.display = 'none';
    })
}