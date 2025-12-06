// TAB LOGIC
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));

        tab.classList.add('active');
        document.getElementById(tab.dataset.tab).classList.add('active');
    });
});

// GAME VARIABLES
let points = 0;
let pointsvalue = 1;
let prevPoints = 0;

let cijena = 10;
let cijena2 = 200;
let cijena3 = 500;

let cijenaMinerValue = 150;
let cijenaMinerValue2 = 500;

let pps = 0;

// SAVE GAME
function saveGame() {
    const data = {
        points,
        pointsvalue,
        cijena,
        cijena2,
        cijena3,
        cijenaMinerValue,
        cijenaMinerValue2,
        pps
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
    cijena2 = data.cijena2 ?? 500;
    cijenaMinerValue = data.cijenaMinerValue ?? 150;
    cijenaMinerValue2 = data.cijenaMinerValue2 ?? 500;
    pps = data.pps ?? 0;

    document.getElementById("cijenaDouble").textContent = cijena;
    document.getElementById("cijenaDouble2").textContent = cijena2;
    document.getElementById("cijenaMiner").textContent = cijenaMinerValue;
    document.getElementById("cijenaMiner2").textContent = cijenaMinerValue2;

    update();
}
loadGame();

// CLICK BUTTON
document.getElementById('clickButton').addEventListener('click', () => {
    points += pointsvalue;
    update();
    saveGame();
});

// UPGRADE 1
document.getElementById('clickDouble').addEventListener('click', () => {
    if (points < cijena) return;
    points -= cijena;
    pointsvalue += 1;
    cijena *= 2;
    document.getElementById("cijenaDouble").textContent = cijena;
    update();
    saveGame();
});

// UPGRADE 2
document.getElementById('clickDouble2').addEventListener('click', () => {
    if (points < cijena2) return;
    points -= cijena2;
    pointsvalue += 5;
    cijena2 *= 2;
    document.getElementById("cijenaDouble2").textContent = cijena2;
    update();
    saveGame();
});

// UPGRADE 3
document.getElementById('clickDouble3').addEventListener('click', () => {
    if (points < cijena3) return;
    points -= cijena3;
    pointsvalue += 5;
    cijena3 *= 2;
    document.getElementById("cijenaDouble3").textContent = cijena3;
    update();
    saveGame();
});

// WORKER 1
document.getElementById('afkminer').addEventListener('click', () => {
    if (points < cijenaMinerValue) return;
    points -= cijenaMinerValue;
    pps += 1;
    cijenaMinerValue = Math.floor(cijenaMinerValue * 1.5);
    document.getElementById("cijenaMiner").textContent = cijenaMinerValue;
    update();
    saveGame();
});

// WORKER 2
document.getElementById('afkminer2').addEventListener('click', () => {
    if (points < cijenaMinerValue2) return;
    points -= cijenaMinerValue2;
    pps += 5;
    cijenaMinerValue2 = Math.floor(cijenaMinerValue2 * 1.5);
    document.getElementById("cijenaMiner2").textContent = cijenaMinerValue2;
    update();
    saveGame();
});

// AUTO PPS (adds PPS every second)
setInterval(() => {
    points += pps;
    update();
    saveGame();
}, 1000);

// PEPS CALCULATION
setInterval(() => {
    let peps = points - prevPoints;
    prevPoints = points;
    document.getElementById("e").textContent = peps;
}, 1000);

// UPDATE UI
function update() {
    document.getElementById("points").textContent = points;
    document.getElementById("k").textContent = pointsvalue;
    document.getElementById("n").textContent = pps;

    document.getElementById("clickDouble").disabled = points < cijena;
    document.getElementById("clickDouble2").disabled = points < cijena2;
    document.getElementById("clickDouble3").disabled = points < cijena3;
    document.getElementById("afkminer").disabled = points < cijenaMinerValue;
    document.getElementById("afkminer2").disabled = points < cijenaMinerValue2;
}


