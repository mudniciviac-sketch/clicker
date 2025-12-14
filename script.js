// TAB LOGIC
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));

        tab.classList.add('active');
        document.getElementById(tab.dataset.tab).classList.add('active');
    });
});

// FORMAT BIG NUMBERS
function format(n) {
    if (n >= 1_000_000_000_000) return (n / 1_000_000_000_000).toFixed(1) + "T";
    if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(1) + "B";
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
    return n;
}

// GAME VARIABLES
let points = 0;
let pointsvalue = 0;
let prevPoints = 0;

let cijena = 10;
let cijena2 = 200;
let cijena3 = 500;
let cijena4 = 1000;

let cijenaMinerValue = 150;
let cijenaMinerValue2 = 500;
let cijenaMinerValue3 = 1500;

let pps = 0;

let upglevel1 = 0;
let upglevel2 = 0;
let upglevel3 = 0;
let upglevel4 = 0;

let worlevel1 = 0;
let worlevel2 = 0;
let worlevel3 = 0;

// CLICK BUTTON
document.getElementById('clickButton').addEventListener('click', () => {
    pointsvalue = 1 + upglevel1 * 1 + upglevel2 * 5 + upglevel3 * 10 + upglevel4 * 20;
    points += pointsvalue;
    update();
});

// UPGRADE 1
document.getElementById('clickDouble').addEventListener('click', () => {
    if (points < cijena) return;
    points -= cijena;
    upglevel1++;
    cijena *= 2;
    document.getElementById("cijenaDouble").textContent = format(cijena);
    document.getElementById("upglevel1").textContent = upglevel1;
    update();
});

// UPGRADE 2
document.getElementById('clickDouble2').addEventListener('click', () => {
    if (points < cijena2) return;
    points -= cijena2;
    upglevel2++;
    cijena2 *= 2;
    document.getElementById("cijenaDouble2").textContent = format(cijena2);
    document.getElementById("upglevel2").textContent = upglevel2;
    update();
});

// UPGRADE 3
document.getElementById('clickDouble3').addEventListener('click', () => {
    if (points < cijena3) return;
    points -= cijena3;
    upglevel3++;
    cijena3 *= 2;
    document.getElementById("cijenaDouble3").textContent = format(cijena3);
    document.getElementById("upglevel3").textContent = upglevel3;
    update();
});

// UPGRADE 4
document.getElementById('clickDouble4').addEventListener('click', () => {
    if (points < cijena4) return;
    points -= cijena4;
    upglevel4++;
    cijena4 *= 2;
    document.getElementById("cijenaDouble4").textContent = format(cijena4);
    document.getElementById("upglevel4").textContent = upglevel4;
    update();

});

// WORKER 1
document.getElementById('afkminer').addEventListener('click', () => {
    if (points < cijenaMinerValue) return;
    points -= cijenaMinerValue;
    worlevel1++;
    cijenaMinerValue = Math.floor(cijenaMinerValue * 1.5);
    document.getElementById("cijenaMiner").textContent = format(cijenaMinerValue);
    document.getElementById("worlevel1").textContent = worlevel1;
    update();

});

// WORKER 2
document.getElementById('afkminer2').addEventListener('click', () => {
    if (points < cijenaMinerValue2) return;
    points -= cijenaMinerValue2;
    worlevel2++;
    cijenaMinerValue2 = Math.floor(cijenaMinerValue2 * 1.5);
    document.getElementById("cijenaMiner2").textContent = format(cijenaMinerValue2);
    document.getElementById("worlevel2").textContent = worlevel2;
    update();

});

// WORKER 3
document.getElementById('afkminer3').addEventListener('click', () => {
    if (points < cijenaMinerValue3) return;
    points -= cijenaMinerValue3;
    worlevel3++;
    cijenaMinerValue3 = Math.floor(cijenaMinerValue3 * 1.5);
    document.getElementById("cijenaMiner3").textContent = format(cijenaMinerValue3);
    document.getElementById("worlevel3").textContent = worlevel3;
    update();
    saveGame();
});

// AUTO PPS
setInterval(() => {
    pps = (worlevel1 * 1) + (worlevel2 * 5) + (worlevel3 * 10);
    points += pps;
    update();
    
}, 1000);

// PEPS
setInterval(() => {
    let peps = points - prevPoints;
    prevPoints = points;
    document.getElementById("e").textContent = format(peps);
}, 1000);

// UPDATE UI
function update() {
    document.getElementById("points").textContent = format(points);
    document.getElementById("k").textContent = pointsvalue;
    document.getElementById("n").textContent = pps;

    document.getElementById("clickDouble").disabled = points < cijena;
    document.getElementById("clickDouble2").disabled = points < cijena2;
    document.getElementById("clickDouble3").disabled = points < cijena3;
    document.getElementById("clickDouble4").disabled = points < cijena4;

    document.getElementById("afkminer").disabled = points < cijenaMinerValue;
    document.getElementById("afkminer2").disabled = points < cijenaMinerValue2;
    document.getElementById("afkminer3").disabled = points < cijenaMinerValue3;
}



