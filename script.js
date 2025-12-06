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
document.getElementById("clickButton").addEventListener("click", () => {
    points += ppc;
    update();
});

// ---- UPGRADE BUY ----
function buyUpgrade(costVar, costId, addValue) {
    if (points < costVar.value) return;
    points -= costVar.value;
    ppc += addValue;

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

// ---- UPDATE UI ----
function update() {
    document.getElementById("points").textContent = points;
    document.getElementById("pps").textContent = pps;
}
