async function getData() {
    try {
        const res = await fetch('http://localhost:3000/cities');
        const json = await res.json();
        return json;
    }
    catch (error) {
        console.log(error);
    }
}

function displayAns(string, parent) {

    const p = document.createElement('p');
    p.innerText = string;
    parent.appendChild(p);
}

async function excerciseA(data) {

    let reduced = data.reduce((a, b) => {
        if (b.province === "małopolskie") {
            return a + b.name + ", ";
        }
        else {
            return a;
        }
    }, "");

    reduced = reduced.substring(0, reduced.length - 2);
    const exA = document.querySelector(".exA");
    displayAns(reduced, exA);
}

async function excerciseB(data) {

    let reduced = data.reduce((a, b) => {
        if (checkAs(b.name)) {
            return a + b.name + ", ";
        }
        else {
            return a;
        }
    }, "");

    reduced = reduced.substring(0, reduced.length - 2);
    const exB = document.querySelector('.exB');
    displayAns(reduced, exB);

}

function checkAs(string) {

    let counter = 0;

    for (let letter of string) {
        if (letter === "A" || letter === "a") {
            counter++;
        }
        if (counter === 2) {
            break;
        }
    }

    return counter === 2;
}

async function excerciseC(data) {

    data.sort((a, b) => {
        return a.dentensity - b.dentensity;
    })

    const exC = document.querySelector('.exC');
    displayAns(data[4].name, exC);
}

async function excerciseD(data) {

    let reduced = data.reduce((a, b) => {
        if (b.people > 100000) {
            return a + b.name + " city, ";
        }
        else {
            return a;
        }
    }, "");

    reduced = reduced.substring(0, reduced.length - 2);
    const exD = document.querySelector('.exD');
    displayAns(reduced, exD);
}

async function excerciseE(data) {

    let above = 0;
    let under = 0;

    for (let element of data) {
        if (element.people > 80000) {
            above++;
        }
        else {
            under++;
        }
    }

    const exE = document.querySelector('.exE');

    displayAns("1) " + above, exE);
    displayAns("2) " + under, exE);

    if (above > under) {
        displayAns('Zatem więcej jest miast powyżej 80000 mieszkańców', exE);
    }
    else {
        displayAns('Zatem więcej jest miast poniżej 80000 mieszkańców', exE);
    }
}

async function excerciseF(data) {

    const filtered = data.filter((element) => {
        return (element.township[0] === "p" || element.township[0] === "P");
    });

    let sum = filtered.reduce((a, b) => a + b.area, 0);
    let average = (sum / filtered.length).toFixed(2);  // this rounds the result up to 2 decimal places
    const exF = document.querySelector('.exF');

    displayAns(average, exF);
}

async function excerciseG(data) {

    const filtered = data.filter((element) => {
        return element.province === "pomorskie";
    })

    let counter = 0;
    for (let element of filtered) {
        if (element.people < 5000) {
            counter++;
        }
    }

    const exG = document.querySelector('.exG')
    if (counter) { // counter evaluates to true if > 0
        displayAns("nie wszystkie", exG);
    }
    else {
        displayAns("tak", exG);
    }

    displayAns("takich miast, które mają powyżej 5000 mieszkańców i są z województwa pomorskiego jest: " +
        (filtered.length - counter), exG);
}

async function loadSite() {
    let data = await getData();
    excerciseA(data);
    excerciseB(data);
    excerciseC(data);
    excerciseD(data);
    excerciseE(data);
    excerciseF(data);
    excerciseG(data);
}

loadSite();
