// Author: bruteF04C3

let addedNotes = [];

document.addEventListener('DOMContentLoaded', function () {
    initNoteArea();
    initStyles();
})

function initNoteArea() {
    const BODY = document.getElementsByTagName('body')[0];
    const EXISTING_MARKUP = BODY.innerHTML;
    BODY.innerHTML = '';
    // onclick for testing only
    BODY.innerHTML = `<div id="_vstickynotes-main" tabindex="-1" oncontextmenu="createNoteWithCoords(event)">
        ${EXISTING_MARKUP}
    </div>`;
}

function initStyles() {
    const head = document.head;
    let style;
    let styleTagFound = head.getElementsByTagName('style');
    console.log(styleTagFound);
    if (styleTagFound.length) {
        style = head.getElementsByTagName('style')[0];
    } else {
        console.log('no style tag, nvm, creating one rn !')
        style = document.createElement('style');
        head.appendChild(style);
    }
    setStyle(style);
}

function createNoteWithCoords(event) {
    event.preventDefault();
    const COORDS = [event.screenX, event.screenY]
    constructNote(COORDS);
}

function constructNote(coords) {
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
    showNote(cardFragment);
}

function showNote(card) {
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

function setStyle(entryPoint) {
    entryPoint.textContent += `
        ._vstickynotecard{
            position: absolute;
            height: 120px;
            width: auto;
            background-color: #fff;
            padding: 15px;
            z-index: 21001;
        }
        
        ._vstickynotecard-body{
            border-left: 5px solid blue;
            height: 100%;
        }
        
        input{
            border: none;
            outline: none;
        }
        
        .min{
            height: 30px;
            width: 30px;
            border: 1px solid blue;
            z-index: 21000;
            transform: skew(15deg);
            border-radius: 3px;
            box-shadow: 2px 4px 8px rgb(150, 150, 150);
            padding: 0;
        }
        
        .min > ._vstickynotecard-body {
            display: none;
        }
        
        input:focus{
            outline: none;
            border: none;
        }
        `;
    
    return entryPoint;
}