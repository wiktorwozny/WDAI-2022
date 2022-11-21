function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

const slider = document.querySelector('#slider');
const divs = document.querySelectorAll('.card');

const prev = document.querySelector('#prev');
const next = document.querySelector('#next');
const random = document.querySelector('#random');

let counter = 1;
let neww;
const size = divs[0].clientWidth;

slider.style.transform = 'translateX(' + (-size * counter) + "px";

next.addEventListener('click', () => {

    if (counter >= divs.length - 1) {
        return;
    }

    slider.style.transition = "transform .4s ease-in-out";
    counter += 1;
    slider.style.transform = 'translateX(' + (-size * counter) + "px";
});

prev.addEventListener('click', () => {

    if (counter <= 0) {
        return;
    }

    slider.style.transition = "transform .4s ease-in-out";
    counter -= 1;
    slider.style.transform = 'translateX(' + (-size * counter) + "px";
});

random.addEventListener('click', () => {

    do {
        neww = getRandomInt(1, divs.length - 1);
    } while (neww === counter);

    counter = neww;
    slider.style.transition = "transform .4s ease-in-out";
    slider.style.transform = 'translateX(' + (-size * counter) + "px";
});

slider.addEventListener('transitionend', () => {
    if (divs[counter].id === 'lastClone') {
        slider.style.transition = "none";
        counter = divs.length - 2;
        slider.style.transform = 'translateX(' + (-size * counter) + "px";
    }

    if (divs[counter].id === 'firstClone') {
        slider.style.transition = "none";
        counter = divs.length - counter;
        slider.style.transform = 'translateX(' + (-size * counter) + "px";
    }
});

