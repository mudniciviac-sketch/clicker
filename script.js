// TAB LOGIC
const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.panel');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const target = tab.getAttribute('data-tab');

        panels.forEach(p => p.classList.remove('active'));
        document.getElementById(target).classList.add('active');
    });
});

// GAME VARIABLES
let points = 0;
let pointsvalue = 1;
let trenutno = 0;

let cijena = 10;      // Upgrade 1
let cijena2 = 200;    // Upgrade 2

let cijenaMinerValue = 150; // Worker cijena
let n = 0;
let e = points;
const clickButton = document.getElementById('clickButton');
const pointsDisplay = document.getElementById('points');

const clickDouble = document.getElementById('clickDouble');
const cijenaDouble = document.getElementById('cijenaDouble');

const clickDouble2 = document.getElementById('clickDouble2');
const cijenaDouble2 = document.getElementById('cijenaDouble2');

const afkminer = document.getElementById('afkminer');
const cijenaMiner = document.getElementById('cijenaMiner');

// SAVE GAME
function saveGame() {
    const data = {
        points,
        pointsvalue,
        cijena,
        cijena2,
        cijenaMinerValue,
        n
    };

    localStorage.setItem("beerClickerSave", JSON.stringify(data));
}

// LOAD GAME
function loadGame() {
    const saved = localStorage.getItem("beerClickerSave");
    if (!saved) return;

    const data = JSON.parse(saved);

    points = data.points ?? 0;
    pointsvalue = data.pointsvalue ?? 1;
    cijena = data.cijena ?? 10;
    cijena2 = data.cijena2 ?? 200;

    cijenaMinerValue = data.cijenaMinerValue ?? 150;
    n = data.n ?? 0;

    cijenaDouble.textContent = cijena;
    cijenaDouble2.textContent = cijena2;
    cijenaMiner.textContent = cijenaMinerValue;
    document.getElementById('n').textContent = n;

    update();
}

// LOAD ON START
loadGame();

// CLICK BUTTON
clickButton.addEventListener('click', () => {
    points += pointsvalue;
    update();
    saveGame();
});

// UPGRADE 1
clickDouble.addEventListener('click', () => {
    if (points < cijena) return;

    points -= cijena;
    pointsvalue++;
    cijena *= 2;

    cijenaDouble.textContent = cijena;
    update();
    saveGame();
});

// UPGRADE 2
clickDouble2.addEventListener('click', () => {
    if (points < cijena2) return;

    points -= cijena2;
    pointsvalue += 5;
    cijena2 *= 2;

    cijenaDouble2.textContent = cijena2;
    update();
    saveGame();
});

// WORKER 1
afkminer.addEventListener('click', () => {
    if (points < cijenaMinerValue) return;

    points -= cijenaMinerValue;
    n++;
    cijenaMinerValue = Math.floor(cijenaMinerValue * 1.5);

    cijenaMiner.textContent = cijenaMinerValue;
    document.getElementById('n').textContent = n;

    update();
    saveGame();
});

// AUTO PPS
setInterval(() => {
    if (n > 0) {
        points += n;
        update();
        saveGame();
    }
}, 1000);

setInterval(() => {
        trenutno = points - e;
        e = points;
        update();
        saveGame();
}, 1000);
// UPDATE UI
function update() {
    pointsDisplay.textContent = points;

    clickDouble.disabled = points < cijena;
    clickDouble2.disabled = points < cijena2;
    afkminer.disabled = points < cijenaMinerValue;
}

// AUTO SAVE
setInterval(saveGame, 3000);

