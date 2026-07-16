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


