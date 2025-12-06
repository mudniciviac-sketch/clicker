// TAB LOGIC
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
let ppc = 1;     
let pps = 0;     

// Upgrade costs
let u1cost = 10;
let u2cost = 200;
let u3cost = 750;

// Worker costs
let w1cost = 150;
let w2cost = 500;
let w3cost = 1500;

// CLICK BUTTON
document.getElementById('clickButton').addEventListener('click', () => {
    points += ppc;
    update();
});

// BUY UPGRADE
function buyUpgrade(cost, costID, valueAdd) {
    if (points < cost.value) return;
    points -= cost.value;
    ppc += valueAdd;

    cost.value = Math.floor(cost.value * 2);
    document.getElementById(costID).textContent = cost.value;

    update();
}

document.getElementById("u1btn").onclick = () => buyUpgrade({value:u1cost}, "u1cost", 1);
document.getElementById("u2btn").onclick = () => buyUpgrade({value:u2cost}, "u2cost", 5);
document.getElementById("u3btn").onclick = () => buyUpgrade({value:u3cost}, "u3cost", 15);

// BUY WORKER
function buyWorker(cost, costID, ppsAdd) {
    if (points < cost.value) return;
    points -= cost.value;
    pps += ppsAdd;

    cost.value = Math.floor(cost.value * 1.5);
    document.getElementById(costID).textContent = cost.value;

    update();
}

document.getElementById("w1btn").onclick = () => buyWorker({value:w1cost}, "w1cost", 1);
document.getElementById("w2btn").onclick = () => buyWorker({value:w2cost}, "w2cost", 5);
document.getElementById("w3btn").onclick = () => buyWorker({value:w3cost}, "w3cost", 12);

// AUTO PPS
setInterval(() => {
    if (pps > 0) {
        points += pps;
        update();
    }
}, 1000);

// UPDATE UI
function update() {
    document.getElementById("points").textContent = points;
    document.getElementById("pps").textContent = pps;
}
