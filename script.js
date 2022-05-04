// Author: bruteF04C3

let addedNotes = [];

document.addEventListener('DOMContentLoaded', function () {
    initNoteArea();
})

function initNoteArea() {
    const BODY = document.getElementsByTagName('body')[0];
    const EXISTING_MARKUP = BODY.innerHTML;
    BODY.innerHTML = '';
    // onclick for testing only
    BODY.innerHTML = `<div id="_vstickynotes-main" tabindex="-1" oncontextmenu="getCursorCoords(event)">
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
    const alphaNum = Math.random().toString(36).substring(2, 8);
    const CARD = `
    <div class="_vstickynotecard" id="_vstickynote${coords[1]}${alphaNum}" onmouseleave="toggleState(this.id, 'min')" onmouseenter="toggleState(this.id, 'max')">
    <div class="_vstickynotecard-body">
    <div class="_vstickynotecard-title">
        Note
      </div>
      <input id="_vstickynote${coords[1]}${alphaNum}inp" type="text">
    </div>
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

function toggleState(id, stateTo) {
    const self = document.getElementById(id);
    const note = document.getElementById(`${id}inp`);
    let timeStamp = new Date();
    if (stateTo === 'min') {
        self.classList.add('min');
        addedNotes.push(
            {
                [id]: note.value
            }
        )
        localStorage.setItem(`addedNotes${timeStamp.getTime()}`, JSON.stringify(addedNotes));
    } else {
        self.classList.remove('min');
        // retrieve selected value here
    }
}