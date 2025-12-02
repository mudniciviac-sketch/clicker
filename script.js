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
    pointsDisplay.textContent = points;


    clickDouble.disabled = points < cijena;
    afkminer.disabled = points < cijena2;
});

clickDouble.addEventListener('click', () => {
    if (points < cijena) return; 

    pointsvalue++;              
    points -= cijena;  
    cijena *= 2;    

    pointsDisplay.textContent = points; 
    cijenaDouble.textContent = cijena;

    clickDouble.disabled = true;
});

afkminer.addEventListener('click', () => {
    if (points < cijena2) return; 

    setInterval(() => {
        points += n;
        pointsDisplay.textContent = points;
    }, 1000);

    n++;     
    points -= cijena2;  
    cijena2 = Math.floor(cijena2 * 1.5);

    pointsDisplay.textContent = points; 
    cijenaMiner.textContent = cijena2;

    afkminer.disabled = true;
});

document.getElementById("n").innerText=n;
