window.addEventListener('load', () => {
    const scoreContainer = document.getElementById('score');
    const pointsMessage = document.createElement('p');
    pointsMessage.innerHTML = `${points} coins`;
    scoreContainer.appendChild(pointsMessage);
    localStorage.getItem("lastAccessory");
    let svgClickedClass = localStorage.getItem('lastAccessory');
    erasePrice(svgClickedClass);
    console.log(svgClickedClass);
});

let points = getPointsFromCookies();

    function substractPoints(svgClickedClass, svgItem) {
        let price = parseFloat(svgItem.dataset.price);
        if (localStorage.getItem(`calledKey_${svgClickedClass}`) === 'true') return;
        localStorage.setItem(`calledKey_${svgClickedClass}`, 'true');
        points -= 10;
    if (points < price) { 
        points += 10; 
        alert("You don't have enough coins to buy this accessory.");
    }
    };

    function erasePrice(svgClickedClass) {
        
        let priceDisplay = document.querySelector(`.${svgClickedClass}`).previousElementSibling;
        if (!priceDisplay) return;
        localStorage.setItem("purchased", "true");
        if (localStorage.getItem("purchased") === 'true') {
        priceDisplay.style.display = 'none'; // Hide the price display after purchase
        }
    };


        let svgCollection = document.getElementById("accessories").querySelectorAll("svg"); //FOR EACH CLICKED SVG IN ACCESSORIES, PASS THE CLASS & SVG ITEM TO SUBSTRACT POINTS FUNCTION
        svgCollection.forEach(function(svg) {
        svg.onclick = function() {

        let svgClickedClass = svg.getAttribute("class"); 
        localStorage.setItem('lastAccessory', `${svgClickedClass}`); //PERSISTING VALUE TO OTHER PAGE
        let svgItem = document.querySelector(`svg.${svgClickedClass}`);

        substractPoints(svgClickedClass, svgItem);
        erasePrice(svgClickedClass);

        
        const scoreContainer = document.getElementById('score'); //FROM HERE CHANGING COINS AMOUNT UPPER LEFT CORNER
        const pointsMessage = document.createElement('p');

        scoreContainer.replaceChildren();
        pointsMessage.innerHTML = `${points} coins`;
        scoreContainer.appendChild(pointsMessage);
        setPointsInCookies(points);
    }});





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