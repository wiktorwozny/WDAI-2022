const startBtn = document.querySelector('#start-button');
const nextGameBtn = document.querySelector('#next-game-btn');
const startForm = document.querySelector('.start-game-container');
const lossForm = document.querySelector('.loss-container');
const input = document.querySelector('#username');
const scoresList = document.querySelector('.scores ol');
let username;
const gameInfo = document.querySelector('.game-info');
let health;
let points;
const healthDiv = document.querySelector('.health');
const pointsDiv = document.querySelector('.points');
let gameInterval;
let zombieNo;
const board = document.querySelector('.board');
let zombiesIntervals = {};
const customCursor = document.querySelector('#cursor');

startBtn.addEventListener('click', firstGame);
nextGameBtn.addEventListener('click', newGame);

function firstGame() {

    if (!input.checkValidity()) {
        return;
    }
    startForm.style.transform = "translateY(-200%)";
    username = document.querySelector('#username').value;
    gameInfo.style.display = "flex";
    document.querySelector('.name').innerHTML = username;
    newGame();
}

function newGame() {

    lossForm.style.transform = "translateY(-200%)";

    board.addEventListener('click', miss);
    window.addEventListener("mousemove", followCursor)
    document.body.style.cursor="none";

    health = 3;
    points = 0;
    zombieNo = 0;

    updateHealth();
    updatePoints();

    gameInterval = setInterval(spawn, 500);
}

function spawn() {

    let zombieSpawned = document.createElement('div');
    zombieSpawned.classList.add("zombie");
    zombieSpawned.setAttribute("id", zombieNo);
    zombieSpawned.addEventListener('click', hit);
    zombieNo++;

    let speed = getRandomInt(1, 6) * 10;
    let top = getRandomInt(50, 70);
    let resize = getRandomInt(60, 130) / 100;

    zombieSpawned.style.top = top + "vh";
    zombieSpawned.style.transform = "scale(" + resize + ")";
    zombieSpawned.style.left = "101vw";
    board.appendChild(zombieSpawned);

    move(zombieSpawned, speed);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

function move(zombieSpawned, speed) {

    let bgOffset = 0;
    let curPos = 0;

    zombiesIntervals[zombieSpawned.id] = setInterval(() => {
        zombieSpawned.style.backgroundPosition = bgOffset + 200 +"px 0px";
        zombieSpawned.style.left = 101 - curPos + "vw";
        bgOffset -= 200;
        curPos++;
        if (bgOffset === -1800)
            bgOffset = 0;
        if (curPos === 115) {
            zombieSpawned.remove();
            points -= 6;
            health -= 1;
            updatePoints();
            updateHealth();
            if (health === 0) {
                loss();
            }
            clearInterval(zombiesIntervals[zombieSpawned.id]);
        }
    }, speed);
}

function loss() {

    // clearing intervals
    clearInterval(gameInterval);
    for (let id in zombiesIntervals) {
        clearInterval(zombiesIntervals[id]);
        delete zombiesIntervals[id];
    }

    // clearing board
    let zombiesToRemove = document.querySelectorAll('div.zombie');
    zombiesToRemove.forEach((elem) => {
        elem.remove();
    });

    getHighscores();

    board.removeEventListener('click', miss);
    window.removeEventListener("mousemove", followCursor);
    document.body.style.cursor="default";
    lossForm.style.transform = "translateY(0px)";

}

function hit() {

    event.stopPropagation();

    points += 12;
    updatePoints();
    clearInterval(zombiesIntervals[this.id]);
    this.remove();
}

function miss() {
    points -= 6;
    updatePoints();
}

function updateHealth() {
    healthDiv.innerHTML = "hp: " + health;
}

function updatePoints() {
    pointsDiv.innerHTML = points;
}

function followCursor(e) {
    customCursor.style.top = e.pageY + "px";
    customCursor.style.left = e.pageX + "px";
}

// getting highscores
async function getHighscores() {
    let data = await fetch("https://jsonblob.com/api/jsonBlob/1043856731519860736");
    let json = await data.json();
    update(json);
}

async function update(json) {

    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${day}-${month}-${year}`;

    let data = json;
    data.push({"username": username, "date": currentDate, "points": points});
    data.sort((a, b) => {
        return b.points - a.points;
    })

    if (data.length > 7) {
        data = data.slice(0, 7);
    }

    // removing previous scores
    const scoresElems = document.querySelectorAll('.scores li');
    scoresElems.forEach((elem) => {
        elem.remove();
    });

    // adding updated scores
    for (let score of data) {
        console.log(score);
        let li = document.createElement('li');
        li.textContent = score.username + " on " + score.date + " scored " + score.points + " points.";
        scoresList.appendChild(li);
    }

    await sendScore("https://jsonblob.com/api/jsonBlob/1043856731519860736", data);
}

async function sendScore(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'PUT',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    return response.json();
}
