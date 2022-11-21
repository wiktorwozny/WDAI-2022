const pass = document.querySelector('#pass');
const repeat = document.querySelector('#repeat');

// icons
const chars = document.querySelector('#chars');
const special = document.querySelector('#special');
const caps = document.querySelector('#caps');
const digits = document.querySelector('#digits');

pass.addEventListener('input', check);

function check(e) {

    if (countCharacters(e.target.value) >= 8) {
        setOk(chars);
    }
    else {
        setWrong(chars);
    }

    if (countSpecialChars(e.target.value) >= 1) {
        setOk(special);
    }
    else {
        setWrong(special);
    }

    if (countCapitalLetters(e.target.value) >= 1) {
        setOk(caps);
    }
    else {
        setWrong(caps);
    }

    if (countDigits(e.target.value) >= 1) {
        setOk(digits);
    }
    else {
        setWrong(digits);
    }

    compare();
}

function countCharacters(value) {
    return value.length;
}

function countSpecialChars(value) {
    let counter = 0;
    let specialChars = [' ','!', '"', '#', '$', '%', '&', '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=',
        '>', '?', '@', '[', ']', '^', '_', '`', '{', '|', '}', '~', "'"]

    for (let letter of value) {
        if (specialChars.includes(letter)) {
            counter++;
        }
    }

    return counter;
}

function countCapitalLetters(value) {
    let counter = 0;

    for (let letter of value) {
        if (letter.toUpperCase() === letter) {
            counter++;
        }
    }

    return counter;
}

function countDigits(value) {
    let counter = 0;

    for (let letter of value) {
        if (letter.charCodeAt() >= 48 && letter.charCodeAt() <= 57) {
            counter++;
        }
    }

    return counter;
}

function setOk(img) {
    img.src = "https://img.icons8.com/color/25/null/ok--v1.png";
}

function setWrong(img) {
    img.src = "https://img.icons8.com/sf-black-filled/25/null/cancel.png";
}

// show/hide password
const showPass = document.querySelector('#showPass');
const showRepeat = document.querySelector('#showRepeat');

showPass.addEventListener('click', () => {

    if (pass.type === 'password') {
        pass.type = 'text';
    }
    else {
        pass.type = 'password';
    }
})

showRepeat.addEventListener('click', () => {

    if (repeat.type === 'password') {
        repeat.type = 'text';
    }
    else {
        repeat.type = 'password';
    }
})

// comparison with second input
repeat.addEventListener('input', () => {
    compare();
})

function compare() {

    if (repeat.value.length > 0) {
        if(repeat.value !== pass.value) {
            repeat.parentNode.style.border = '2px solid red';
        }
        else {
            repeat.parentNode.style.border = '2px solid green';
        }
    }
}
