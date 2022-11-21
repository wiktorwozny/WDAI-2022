let points = 0;
let propagation = true;
let changeVal = false;

let blue = document.getElementById('blue');
let red = document.getElementById('red');
let yellow = document.getElementById('yellow');
const section = document.getElementById('section');
const propagationButton = document.getElementById('prop');
const reset = document.getElementById('reset');
const change = document.getElementById('change');

function start() {

    red.style.backgroundColor = 'indianred';
    yellow.style.backgroundColor = 'yellow';

    blue.addEventListener('click', blueClick, changeVal);
    red.addEventListener('click', redClick, changeVal);
    yellow.addEventListener('click', yellowClick, changeVal);
}

function check() {
    displayPoints();

    if (points > 30) {
        red.removeEventListener('click', redClick, changeVal);
        // red.addEventListener('click', disabled, changeVal);
        red.style.backgroundColor = 'grey';
    }

    if (points > 50) {
        yellow.removeEventListener('click', yellowClick, changeVal);
        // yellow.addEventListener('click', disabled, changeVal);
        yellow.style.backgroundColor = 'grey';
    }
}

function displayPoints() {
    document.querySelector('h1').innerText = "points: " + points;
}

function clear() {
    while (section.children.length > 1) {
        section.removeChild(section.lastChild);
    }
}

function displayCom(str) {
    let paragraph = document.createElement('p');
    let textnode = document.createTextNode(str);
    paragraph.appendChild(textnode);
    section.appendChild(paragraph);
}

propagationButton.addEventListener('click', () => {
    if (propagation) {
        propagationButton.innerText = "StartPropagation";
        propagation = false;
    }
    else {
        propagationButton.innerText = "StopPropagation";
        propagation = true;
    }
});

reset.addEventListener('click', () => {
    points = 0;
    changeVal = false;
    propagation = true;
    clear();
    displayPoints();

    start();
});

change.addEventListener('click', () => {

    blue.removeEventListener('click', blueClick, changeVal);
    red.removeEventListener('click', redClick, changeVal);
    // red.removeEventListener('click', disabled, changeVal);
    yellow.removeEventListener('click', yellowClick, changeVal);
    // yellow.removeEventListener('click', disabled, changeVal);

    changeVal = !changeVal

    blue.addEventListener('click', blueClick, changeVal);
    red.addEventListener('click', redClick, changeVal);
    yellow.addEventListener('click', yellowClick, changeVal);
    check();
})

function blueClick() {

    points += 1;
    displayCom("Nacisnales niebieski o wartosci 1!");
    check();
}

function redClick() {

    if (propagation) {
        event.stopPropagation();
    }

    points += 2;
    displayCom("Nacisnales czerwony o wartosci 2!");
    check();
}

function yellowClick() {

    if (propagation) {
        event.stopPropagation();
    }

    points += 5;
    displayCom("Nacisnales zolty o wartosci 5!");
    check();
}

function disabled() {
    if (propagation) {
        event.stopPropagation();
    }

    var paragraph = document.createElement('p');
    var textnode = document.createTextNode("Przycisk wyłączony!");
    paragraph.appendChild(textnode);
    section.appendChild(paragraph);
}

start();
check();
