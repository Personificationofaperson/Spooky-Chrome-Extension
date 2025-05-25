let points = getPointsFromCookies();

window.addEventListener('load', () => {
    console.log(localStorage)
    console.log(localStorage.getItem('mustacheBought'))
    if (localStorage.getItem('pumpkinBought') === 'true') {
        const pumpkin = document.getElementById('pumpkin');
        const ghostAccessories = document.getElementsByClassName('on-ghost');
        for (let i = 0; i < ghostAccessories.length; i++) {
        ghostAccessories[i].style.display = 'none';
        }
        pumpkin.style.display = 'block';
    }
    if (localStorage.getItem('mustacheBought') === 'true') {
        const pumpkin = document.getElementById('mustache');
        const ghostAccessories = document.getElementsByClassName('on-ghost');
        for (let i = 0; i < ghostAccessories.length; i++) {
        ghostAccessories[i].style.display = 'none';
        }
        mustache.style.display = 'block';
    }
    const scoreContainer = document.getElementById('score');
    const pointsMessage = document.createElement('p');
    pointsMessage.innerHTML = `${points} coins`;
    scoreContainer.appendChild(pointsMessage);
});

function addPoints() {
    points += 1;
    const scoreContainer = document.getElementById('score');
    scoreContainer.replaceChildren();
    const pointsMessage = document.createElement('p');
    pointsMessage.innerHTML = `${points} coins`;
    scoreContainer.appendChild(pointsMessage);
    setPointsInCookies(points);
}

function buyPumpkin() {
    points -= 10;
    if (points < 0) {
        points = 0;
    }
    const scoreContainer = document.getElementById('score');
    const pointsMessage = document.createElement('p');
    localStorage.setItem('pumpkinBought', 'true');

    scoreContainer.replaceChildren();
    pointsMessage.innerHTML = `${points} coins`;
    scoreContainer.appendChild(pointsMessage);
    setPointsInCookies(points);
}

function buyMustache() {
    points -= 10;
    if (points < 0) {
        points = 0;
    }
    const scoreContainer = document.getElementById('score');
    const pointsMessage = document.createElement('p');
    localStorage.setItem('mustacheBought', 'true');
}



// Function to save points in cookies
function setPointsInCookies(points) {
    const expires = new Date();
    expires.setTime(expires.getTime() + 365 * 24 * 60 * 60 * 1000); // Cookie expires in 1 year
    document.cookie = `points=${points}; expires=${expires.toUTCString()}; path=/`;
}

// Function to retrieve points from cookies
function getPointsFromCookies() {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
        const [name, value] = cookie.split('=');
        if (name === 'points') {
            return parseInt(value, 10); // Return the stored points as a number
        }
    }
    return 0; // Default to 0 if no cookie is found
}