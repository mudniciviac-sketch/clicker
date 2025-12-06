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

// GAME LOGIC
let points = 0;
let pointsvalue = 1;
let cijena = 10;
let cijena2 = 150;
let n = 0;

const clickButton = document.getElementById('clickButton');
const pointsDisplay = document.getElementById('points');

const clickDouble = document.getElementById('clickDouble');
const cijenaDouble = document.getElementById('cijenaDouble');

const afkminer = document.getElementById('afkminer');
const cijenaMiner = document.getElementById('cijenaMiner');

clickButton.addEventListener('click', () => {
    points += pointsvalue;
    update();
});

clickDouble.addEventListener('click', () => {
    if (points < cijena) return;

    points -= cijena;
    pointsvalue++;
    cijena *= 2;

    cijenaDouble.textContent = cijena;
    update();
});

afkminer.addEventListener('click', () => {
    if (points < cijena2) return;

    points -= cijena2;
    n++;
    cijena2 = Math.floor(cijena2 * 1.5);

    cijenaMiner.textContent = cijena2;
    document.getElementById('n').textContent = n;
    update();
});

setInterval(() => {
    if (n > 0) {
        points += n;
        update();
    }
}, 1000);

function update() {
    pointsDisplay.textContent = points;

    clickDouble.disabled = points < cijena;
    afkminer.disabled = points < cijena2;
}
