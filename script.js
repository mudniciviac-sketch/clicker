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
let cijena = 10;
let cijena2 = 150;
let n = 0;

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
    cijena2 = data.cijena2 ?? 150;
    n = data.n ?? 0;

    cijenaDouble.textContent = cijena;
    cijenaMiner.textContent = cijena2;
    document.getElementById('n').textContent = n;

    update();
}

// LOAD GAME ON START
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
    pointsvalue++;
    cijena2 *= 2;

    cijenaDouble2.textContent = cijena2;
    update();
    saveGame();
});
// WORKER 1
afkminer.addEventListener('click', () => {
    if (points < cijena2) return;

    points -= cijena2;
    n++;
    cijena2 = Math.floor(cijena2 * 1.5);

    cijenaMiner.textContent = cijena2;
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

// UPDATE UI
function update() {
    pointsDisplay.textContent = points;

    clickDouble.disabled = points < cijena;
    afkminer.disabled = points < cijena2;
}

// AUTO SAVE EVERY 3 SECONDS
setInterval(saveGame, 3000);


