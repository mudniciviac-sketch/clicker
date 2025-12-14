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
    return Math.floor(n);
}

// GAME VARIABLES
let points = 0;
let pointsvalue = 1;
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

// SAVE GAME
function saveGame() {
    const data = {
        points,
        pointsvalue,
        cijena,
        cijena2,
        cijena3,
        cijena4,
        cijenaMinerValue,
        cijenaMinerValue2,
        cijenaMinerValue3,
        worlevel1,
        worlevel2,
        worlevel3,
        upglevel1,
