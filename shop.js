//---------------------------------------------
// GLOBAL VARIABLES
//---------------------------------------------
let points = getPointsFromCookies();
let allClickedSvgs = JSON.parse(localStorage.getItem('allClickedSvgs')) || [];
let svgCollection = document.getElementById("accessories").querySelectorAll("svg"); //FOR EACH CLICKED SVG IN ACCESSORIES, PASS THE CLASS & SVG ITEM TO SUBSTRACT POINTS FUNCTION
const scoreContainer = document.getElementById('score');
const pointsMessage = document.createElement('p');
const popup = document.querySelector(".popup");
let clickCount = 0;


//---------------------------------------------
// ON LOAD EVENTS -> loading in the array of bought items & loading in coins
//---------------------------------------------
window.addEventListener('load', () => {
let fullArray = JSON.parse(localStorage.getItem('allClickedSvgs')) || [];
pointsMessage.innerHTML = `${points} coins`;
scoreContainer.appendChild(pointsMessage);
    if (fullArray.length >= 0) {
        document.querySelectorAll('.price').forEach(function(price) {
        price.style.display = 'block'; // Show all price displays if no items are purchased
    })};
    for (var i = 0; i < fullArray.length; i++) {
        let className = fullArray[i];
        let svg = document.querySelector(`[class="${className}"]`);
        svg.previousElementSibling.style.display = "none";
    };
});

//---------------------------------------------
// START OF SVG CLICK HANDLER
//---------------------------------------------
svgCollection.forEach(function svgClickHandler(svg) {
    svg.onclick = function() {
        let svgClickedClass = this.classList[0];
        let svgItem = this;
        svgClassCollection(svgClickedClass, svgItem); //PERSISTING VALUE TO OTHER PAGE
        checkPrice(svgClickedClass, svgItem);
        coinResetOnPurchase(svgClickedClass, svgItem);
        }});
        
        function svgClickedCollection(svgClickedClass, svgItem) {
            allClickedSvgs.push(svgClickedClass); //PUSHING CLICKED SVG TO ALLCLICKEDSVGS ARRAY 
        };
        
        function svgClassCollection(svgClickedClass) {
            localStorage.setItem('lastAccessory', `${svgClickedClass}`); //PERSISTING VALUE TO OTHER PAGE
        };
        
        
        function checkPrice(svgClickedClass, svgItem) {
            let price = parseFloat(svgItem.dataset.price);
            if (localStorage.getItem(`calledKey_${svgClickedClass}`) === 'true') return;
            localStorage.setItem(`calledKey_${svgClickedClass}`, 'true');

            if (price > points) {
                popup.classList.add("visible");
                points = points;
                localStorage.setItem(`calledKey_${svgClickedClass}`, 'false');    
            }
            else {
                points -= price; 
                setPointsInCookies(points);
                erasePrice(svgClickedClass, svgItem); // Call the function to hide the price display
            }
        };

        function coinResetOnPurchase(svgClickedClass, svgItem) {
            const scoreContainer = document.getElementById('score'); //FROM HERE CHANGING COINS AMOUNT UPPER LEFT CORNER
            const pointsMessage = document.createElement('p');
            
            scoreContainer.replaceChildren();
            pointsMessage.innerHTML = `${points} coins`;
            scoreContainer.appendChild(pointsMessage);
            setPointsInCookies(points);
        }
        
        function erasePrice(svgClickedClass, svgItem) {
            let priceDisplay = svgItem.previousElementSibling;
            localStorage.setItem(`purchased_${svgClickedClass}`, "true");
            if (localStorage.getItem(`purchased_${svgClickedClass}`) === 'true') {
                priceDisplay.style.display = 'none'; // Hide the price display after purchase
                    allClickedSvgs.push(svgClickedClass);
                    localStorage.setItem('allClickedSvgs', JSON.stringify(allClickedSvgs));
            }
            else {
                priceDisplay.style.display = 'block'; // Show the price display if not purchased
            }
        };

        function closeButton() {
            popup.classList.remove("visible");
        };
            
            
// ---------------------------------------------
// POINTS HANDLING IN LOCAL STORAGE
// ---------------------------------------------

// Function to save points in localStorage
function setPointsInCookies(points) {
    localStorage.setItem("points", points.toString());
}

// Function to retrieve points from localStorage
function getPointsFromCookies() {
    return parseInt(localStorage.getItem("points") || "0", 10); // Default to 0 if no cookie is found
};