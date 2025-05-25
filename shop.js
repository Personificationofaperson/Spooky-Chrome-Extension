window.addEventListener('load', () => {
    const scoreContainer = document.getElementById('score');
    const pointsMessage = document.createElement('p');
    pointsMessage.innerHTML = `${points} coins`;
    scoreContainer.appendChild(pointsMessage);
});

let points = getPointsFromCookies();

    function substractPoints(functionName) {
        if (localStorage.getItem('calledKey') === 'true') return;
        localStorage.setItem('calledKey', 'true');
        points -= 10;
    if (points < 0) {
        points = 0;
    }
    }



function buyPumpkin() {
    if (localStorage.getItem('pumpkinBought') === 'true') {
        alert('You have already bought a pumpkin!');
        return 
    };
    localStorage.setItem('pumpkinBought', 'true');
    localStorage.setItem('mustacheBought', 'false');
    substractPoints(buyPumpkin);
    const scoreContainer = document.getElementById('score');
    const pointsMessage = document.createElement('p');

    scoreContainer.replaceChildren();
    pointsMessage.innerHTML = `${points} coins`;
    scoreContainer.appendChild(pointsMessage);
    setPointsInCookies(points);
};

function buyMustache() {
    if (localStorage.getItem('mustacheBought') === 'true') {
        alert('You have already bought a mustache!');
        return 
    };
    localStorage.setItem('mustacheBought', 'true');
    localStorage.setItem('pumpkinBought', 'false');
    substractPoints(buyMustache);
    const scoreContainer = document.getElementById('score');
    const pointsMessage = document.createElement('p');

    scoreContainer.replaceChildren();
    pointsMessage.innerHTML = `${points} coins`;
    scoreContainer.appendChild(pointsMessage);
    setPointsInCookies(points);
};


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