let points = getPointsFromCookies();

window.addEventListener('load', () => {
    let lastAccessory = localStorage.getItem('lastAccessory');

    if (localStorage.getItem(`calledKey_${lastAccessory}`) === 'true') {
        let accessories = document.getElementsByClassName("on-ghost");
        for (let i = 0; i < accessories.length; i++) {
        accessories[i].id === lastAccessory ? accessories[i].style.display = 'block' : accessories[i].style.display = 'none';
        }
    const scoreContainer = document.getElementById('score');
    const pointsMessage = document.createElement('p');
    pointsMessage.innerHTML = `${points} coins`;
    scoreContainer.appendChild(pointsMessage);
}});

    

function addPoints() {
    points += 1;
    const scoreContainer = document.getElementById('score');
    scoreContainer.replaceChildren();
    const pointsMessage = document.createElement('p');
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
};