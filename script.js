// SOUND
const clickSound = document.getElementById("clickSound");
const buySound = document.getElementById("buySound");

// FLOATING TEXT
function spawnFloatText(x, y, value) {
    const f = document.createElement("div");
    f.className = "floatText";
    f.style.left = x + "px";
    f.style.top = y + "px";
    f.textContent = "+" + value;

    document.body.appendChild(f);

    setTimeout(() => f.remove(), 900);
}

// TAB SWITCH
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
        document.getElementById(tab.dataset.tab).classList.add('active');
    });
});

// GAME VARS
let points = 0;
let ppc = 1;    // points per click
let pps = 0;    // points per second

// UPGRADE COSTS
let u1cost = 10;
let u2cost = 200;
let u3cost = 750;

// WORKER COSTS
let w1cost = 150;
let w2cost = 500;
let w3cost = 1500;
let w4cost = 5000;
let w5cost = 15000;

// PPC VALUES
const upgradeValues = [1, 5, 15];

// PPS VALUES
const workerValues = [1, 5, 12, 30, 100];

// CLICK BUTTON
document.getElementById("clickButton").addEventListener("click", (e) => {
    points += ppc;
    clickSound.currentTime = 0;
    clickSound.play();

    spawnFloatText(e.clientX, e.clientY, ppc);
    update();
});

// ---- UPGRADE BUY ----
function buyUpgrade(costVar, costId, addValue) {
    if (points < costVar.value) return;
    points -= costVar.value;
    ppc += addValue;

    buySound.currentTime = 0;
    buySound.play();

    costVar.value = Math.floor(costVar.value * 2);
    document.getElementById(costId).textContent = costVar.value;

    update();
}

document.getElementById("u1btn").onclick = () => buyUpgrade({value:u1cost}, "u1cost", upgradeValues[0]);
document.getElementById("u2btn").onclick = () => buyUpgrade({value:u2cost}, "u2cost", upgradeValues[1]);
document.getElementById("u3btn").onclick = () => buyUpgrade({value:u3cost}, "u3cost", upgradeValues[2]);

// ---- WORKER BUY ----
function buyWorker(costVar, costId, ppsAdd) {
    if (points < costVar.value) return;
    points -= costVar.value;
    pps += ppsAdd;

    buySound.currentTime = 0;
    buySound.play();

    costVar.value = Math.floor(costVar.value * 1.6);
    document.getElementById(costId).textContent = costVar.value;

    update();
}

document.getElementById("w1btn").onclick = () => buyWorker({value:w1cost}, "w1cost", workerValues[0]);
document.getElementById("w2btn").onclick = () => buyWorker({value:w2cost}, "w2cost", workerValues[1]);
document.getElementById("w3btn").onclick = () => buyWorker({value:w3cost}, "w3cost", workerValues[2]);
document.getElementById("w4btn").onclick = () => buyWorker({value:w4cost}, "w4cost", workerValues[3]);
document.getElementById("w5btn").onclick = () => buyWorker({value:w5cost}, "w5cost", workerValues[4]);

// ---- AUTO PPS ----
setInterval(() => {
    if (pps > 0) {
        points += pps;
        update();
    }
}, 1000);

// HIGHLIGHT AFFORDABLE CARDS
function updateHighlights() {
    highlight("cardU1", u1cost);
    highlight("cardU2", u2cost);
    highlight("cardU3", u3cost);

    highlight("cardW1", w1cost);
    highlight("cardW2", w2cost);
    highlight("cardW3", w3cost);
    highlight("cardW4", w4cost);
    highlight("cardW5", w5cost);
}

function highlight(cardId, cost) {
    const card = document.getElementById(cardId);
    if (points >= cost) card.classList.add("affordable");
    else card.classList.remove("affordable");
}

// ---- SAVE / LOAD ----
function saveGame() {
    localStorage.setItem("beerSave", JSON.stringify({
        points, ppc, pps,
        u1cost, u2cost, u3cost,
        w1cost, w2cost, w3cost, w4cost, w5cost
    }));
}

function loadGame() {
    let save = localStorage.getItem("beerSave");
    if (!save) return;
    save = JSON.parse(save);

    points = save.points;
    ppc = save.ppc;
    pps = save.pps;

    u1cost = save.u1cost;
    u2cost = save.u2cost;
    u3cost = save.u3cost;

    w1cost = save.w1cost;
    w2cost = save.w2cost;
    w3cost = save.w3cost;
    w4cost = save.w4cost;
    w5cost = save.w5cost;

    document.getElementById("u1cost").textContent = u1cost;
    document.getElementById("u2cost").textContent = u2cost;
    document.getElementById("u3cost").textContent = u3cost;

    document.getElementById("w1cost").textContent = w1cost;
    document.getElementById("w2cost").textContent = w2cost;
    document.getElementById("w3cost").textContent = w3cost;
    document.getElementById("w4cost").textContent = w4cost;
    document.getElementById("w5cost").textContent = w5cost;

    update();
}

setInterval(saveGame, 3000);

// ---- UPDATE UI ----
function update() {
    document.getElementById("points").textContent = points;
    document.getElementById("pps").textContent = pps;

    updateHighlights();
}
loadGame();
