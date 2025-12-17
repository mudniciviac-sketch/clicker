// TAB LOGIC
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));

        tab.classList.add('active');
        document.getElementById(tab.dataset.tab).classList.add('active');

        // === OVDE DODANO: upravljanje ponašanjem lijevog panela kad otvorimo enemy tab ===
        handleTabChange(tab.dataset.tab);
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
let prevPoints = 0

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

// Beyond Upgrade levels
let uuplevel1 = 1;
let uuplevel2 = 1;
let uuplevel3 = 1;
let uuplevel4 = 1;

let uupCost1 = 1000;
let uupCost2 = 5000;
let uupCost3 = 15000;
let uupCost4 = 30000;

let provjera1 = 0;
let provjera2 = 0;
let provjera3 = 0;
let provjera4 = 0;

/* =========================
   === ENEMY VARIABLES ===
   =========================
   enemyLevel: počinje od 1 (HP: 1)
   enemyMaxHP: izračunat kao 10^(level-1) -> daje 1,10,100...
   enemyHP: trenutni HP
   enemyImages: lista data-uri SVG-ova / URL-ova (možeš zamijeniti vlastitim slikama)
   galleryCount: broj thumbova koje prikazujemo
*/
let enemyLevel = 1;
let enemyMaxHP = 1; // 10^(enemyLevel-1)
let enemyHP = enemyMaxHP;
let enemyImages = [

    'https://s.alicdn.com/@sc04/kf/A88a19a1e081c409d8c53995a21b80d6do.png',
    'https://png.pngtree.com/png-vector/20240207/ourmid/pngtree-red-wine-drink-bottle-png-image_11680582.png',
    'https://png.pngtree.com/png-vector/20230831/ourmid/pngtree-one-shot-one-beer-png-image_9210058.png',
    'sss.png',
    'https://cdn11.bigcommerce.com/s-x3kq5bcr0e/products/11399/images/6975/Absolut_Vodka_1L-1__11832.1739697446.386.513.png?c=1'
];
let currentEnemyImgIndex = 0;
let galleryCount = 4; // koliko thumbnaila prikazujemo

// Praćenje trenutnog aktivnog taba
let currentTab = 'upgrades';

// CLICK BUTTON (lijevi panel) - modificirano da služi i za attack kada je enemy tab aktivan
document.getElementById('clickButton').addEventListener('click', () => {
    // update pointsvalue prije svega (kao i u originalnom kodu)
    pointsvalue =
        1 +
        upglevel1 * uuplevel1 * 1 +
        upglevel2 * uuplevel2 * 5 +
        upglevel3 * uuplevel3 * 10 +
        upglevel4 * uuplevel4 * 20;

    if (currentTab === 'enemy') {
        // === ATTACK ===
        // smanji enemyHP za PPC (pointsvalue)
        enemyHP -= pointsvalue;
        if (enemyHP < 0) enemyHP = 0;
        // ne dodaj bodove pri kliku, samo attack (po tvom zahtjevu)
        checkEnemyDead();
        updateEnemyUI();
    } else {
        // ORIGINALNI KLIK (dodaje poene)
        points += pointsvalue;
        update();
    }
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

// Beyond Upgrade buttons
document.getElementById("uup1").addEventListener("click", () => {
    if(points < uupCost1) return;
    provjera1 = uuplevel1;
    points -= uupCost1;
    uuplevel1++;
    if(uuplevel1 > provjera1){
        document.getElementById("uup1").style.display = "hidden";
    }
    update();
});
document.getElementById("uup2").addEventListener("click", () => {
    if(points < uupCost2) return;
    provjera2 = uuplevel2;
    points -= uupCost2;
    uuplevel2++;
    if(uuplevel2 > provjera2){
        document.getElementById("uup2").style.display = "hidden";
    }
    update();
});
document.getElementById("uup3").addEventListener("click", () => {
    if(points < uupCost3) return;
    provjera3 = uuplevel3;
    points -= uupCost3;
    uuplevel3++;
    if(uuplevel3 > provjera3){
        document.getElementById("uup3").style.display = "hidden";
    }
    update();
});
document.getElementById("uup4").addEventListener("click", () => {
    if(points < uupCost4) return;
    provjera4 = uuplevel4;
    points -= uupCost4;
    uuplevel4++;
    if(uuplevel4 > provjera4){
        document.getElementById("uup4").style.display = "hidden";
    }
    update();
});

// WORKERS
document.getElementById('afkminer').addEventListener('click', () => {
    if (points < cijenaMinerValue) return;
    points -= cijenaMinerValue;
    worlevel1++;
    cijenaMinerValue = Math.floor(cijenaMinerValue * 1.5);
    document.getElementById("cijenaMiner").textContent = format(cijenaMinerValue);
    document.getElementById("worlevel1").textContent = worlevel1;
    update();
});

document.getElementById('afkminer2').addEventListener('click', () => {
    if (points < cijenaMinerValue2) return;
    points -= cijenaMinerValue2;
    worlevel2++;
    cijenaMinerValue2 = Math.floor(cijenaMinerValue2 * 1.5);
    document.getElementById("cijenaMiner2").textContent = format(cijenaMinerValue2);
    document.getElementById("worlevel2").textContent = worlevel2;
    update();
});

document.getElementById('afkminer3').addEventListener('click', () => {
    if (points < cijenaMinerValue3) return;
    points -= cijenaMinerValue3;
    worlevel3++;
    cijenaMinerValue3 = Math.floor(cijenaMinerValue3 * 1.5);
    document.getElementById("cijenaMiner3").textContent = format(cijenaMinerValue3);
    document.getElementById("worlevel3").textContent = worlevel3;
    update();
});

document.getElementById('forceNewEnemy').addEventListener('click', () => {
    spawnNewEnemy(true);
});


setInterval(() => {
    pps = (worlevel1 * 1) + (worlevel2 * 5) + (worlevel3 * 10);
    points += pps;
    update();
}, 1000);


setInterval(() => {
    let peps = points - prevPoints;
    prevPoints = points;
    document.getElementById("e").textContent = format(peps);
}, 1000);



setInterval(() => {
    if (currentTab === 'enemy') {
        if (pps > 0 && enemyHP > 0) {
            enemyHP -= pps;
            if (enemyHP < 0) enemyHP = 0;
            checkEnemyDead();
            updateEnemyUI();
        }
    }
}, 1000);


function update() {

    pointsvalue =
        1 +
        upglevel1 * uuplevel1 * 1 +
        upglevel2 * uuplevel2 * 5 +
        upglevel3 * uuplevel3 * 10 +
        upglevel4 * uuplevel4 * 20;

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


    if(upglevel1 > 0 && upglevel1 % 5 === 0) document.getElementById("uup1").style.display = "block";
    if(upglevel2 > 0 && upglevel2 % 5 === 0) document.getElementById("uup2").style.display = "block";
    if(upglevel3 > 0 && upglevel3 % 5 === 0) document.getElementById("uup3").style.display = "block";
    if(upglevel4 > 0 && upglevel4 % 5 === 0) document.getElementById("uup4").style.display = "block";


    document.getElementById("uupCost1").textContent = format(uupCost1);
    document.getElementById("uupCost2").textContent = format(uupCost2);
    document.getElementById("uupCost3").textContent = format(uupCost3);
    document.getElementById("uupCost4").textContent = format(uupCost4);

    
    updateEnemyUI();
}

/* ENEMY FUNKCIJE */


function handleTabChange(tabName) {
    currentTab = tabName;
    const left = document.querySelector('.left');
    const mainImg = document.getElementById('mainImg');
    if (tabName === 'enemy') {
        
        left.classList.add('enemy-active');
        mainImg.classList.remove('beer-img');
        mainImg.classList.add('enemy-main-img');
        mainImg.src = enemyImages[currentEnemyImgIndex];
       
        updateEnemyUI();
        populateGallery();
    } else {
        
        left.classList.remove('enemy-active');
        mainImg.classList.add('beer-img');
        mainImg.classList.remove('enemy-main-img');
        mainImg.src = "https://drinks.hr/app/uploads/2024/11/captain-morgan-white-rum-750ml-canada-gs1-front-grip-digital-render.png";
    }
}


function checkEnemyDead() {
    if (enemyHP <= 0) {
        
        points += 2 * enemyLevel * pointsvalue;

        
        enemyLevel++;
        enemyMaxHP = enemyMaxHP * 10; 
        enemyHP = enemyMaxHP;

        
        currentEnemyImgIndex = Math.floor(Math.random() * enemyImages.length);

        
        populateGallery();
        update();
    }
}

// Ažuriraj enemy UI polja
function updateEnemyUI() {
    document.getElementById('enemyLevel').textContent = enemyLevel;
    document.getElementById('enemyHP').textContent = format(enemyHP);
    document.getElementById('enemyMaxHP').textContent = format(enemyMaxHP);
    document.getElementById('enemyReward').textContent = format(2 * enemyLevel * pointsvalue);

    const mainImg = document.getElementById('mainImg');
    if (currentTab === 'enemy') {
        mainImg.src = enemyImages[currentEnemyImgIndex];
    }


    const lvlEl = document.getElementById('enemyLevel');
    lvlEl.style.background = getLevelColor(enemyLevel);
    lvlEl.style.padding = '4px 8px';
    lvlEl.style.borderRadius = '6px';
}


function getLevelColor(l) {
    if (l <= 5) return '#bff199'; 
    if (l <= 10) return '#fff59d'; 
    if (l <= 15) return '#ffd79a'; 
    if (l <= 20) return '#ff9a9a'; 
    return '#ffb0ff'; 
}

/* Populiraj galeriju thumbnaila s nasumičnim slikama (pri spawn-u ili kada user želi novu) */
function populateGallery() {
    const g = document.getElementById('enemyGallery');
    g.innerHTML = '';
    // izaberi galleryCount nasumičnih indexa (mogu se ponavljati)
    for (let i = 0; i < galleryCount; i++) {
        const idx = Math.floor(Math.random() * enemyImages.length);
        const div = document.createElement('div');
        div.classList.add('enemy-thumb');
        div.style.backgroundImage = `url("${enemyImages[idx]}")`;
        // klik na thumb postavlja tu sliku kao glavnu (i daje male visual povrat)
        div.addEventListener('click', () => {
            currentEnemyImgIndex = idx;
            // osveži glavnu sliku
            if (currentTab === 'enemy') {
                document.getElementById('mainImg').src = enemyImages[currentEnemyImgIndex];
            }
        });
        g.appendChild(div);
    }
}

/* Spawn new enemy (force = true ako želimo odmah novi bez čekanja) */
function spawnNewEnemy(force=false) {
    if (force) {
        currentEnemyImgIndex = Math.floor(Math.random() * enemyImages.length);
        enemyLevel = 1;
        enemyMaxHP = 1;
        enemyHP = enemyMaxHP;
        populateGallery();
        update();
    } else {
        // inače: samo promjena slike i reset hp prema novom levelu
        currentEnemyImgIndex = Math.floor(Math.random() * enemyImages.length);
        enemyHP = enemyMaxHP;
        update();
    }
}

// inicijalno populate galerije
populateGallery();
update();
