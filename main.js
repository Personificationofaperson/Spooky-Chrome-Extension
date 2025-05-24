let points = getPointsFromCookies();

window.addEventListener('load', () => {
    if (localStorage.getItem('pumpkinBought') === 'true') {
        const pumpkin = document.getElementById('pumpkin');
        pumpkin.style.display = 'block';
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