// Dynamically change age
document.addEventListener('DOMContentLoaded', () => {
    const today = new Date();
    const DOB = new Date('2015-09-07');
    const differenceInMs = today - DOB;
    const msPerYear = 1000 * 60 * 60 * 24 * 365;
    const differenceInYears = Math.floor(differenceInMs / msPerYear);
    const age = document.getElementById('age');
    age.innerText = differenceInYears;
});

// Add rotating background images
document.addEventListener('DOMContentLoaded', () => {
    const imgCont = document.getElementById('img-cont');
    const bgImgs = [
        'assets/Bacon Gallete.webp',
        'assets/Cookie 2.webp',
        'assets/Blueberry cobler.webp',
        'assets/Cookie.webp',
        'assets/Fruit Gallete.webp'
    ];
    let imgY = 10;
    let imgX = 50;
    const main = document.querySelector('main');
    const mainH = main.clientHeight;
    const windowH = window.innerHeight;
    const bgImgCount = mainH / windowH * 3;
    for(let i = 0; i < bgImgCount; i++) {
        const bgImg = document.createElement('img');
        const time = (Math.random() * 0.5) + 1.7;
        bgImg.src = bgImgs[i % 5];
        bgImg.style.top = imgY + 'vh';
        bgImg.style.left = imgX + '%';
        bgImg.classList.add('img-small');
        bgImg.style.setProperty('--time', time + 's')
        imgY += 43;
        imgX = ((imgX + Math.random() * 5 + 57) % 100) - 5;
        imgCont.appendChild(bgImg);
    }
});