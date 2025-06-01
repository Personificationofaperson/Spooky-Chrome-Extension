//---------------------------------------------
// GLOBAL VARIABLES
//---------------------------------------------
let points = getPointsFromCookies();
let allClickedSvgs = [];
let svgCollection = document.getElementById("accessories").querySelectorAll("svg"); //FOR EACH CLICKED SVG IN ACCESSORIES, PASS THE CLASS & SVG ITEM TO SUBSTRACT POINTS FUNCTION
const scoreContainer = document.getElementById('score');
const pointsMessage = document.createElement('p');


//---------------------------------------------
// ON LOAD EVENTS
//---------------------------------------------
window.addEventListener('load', () => {
pointsMessage.innerHTML = `${points} coins`;
scoreContainer.appendChild(pointsMessage);
let fullArray = JSON.parse(localStorage.getItem('allClickedSvgs')) || [];
console.log(fullArray); 
fullArray.forEach(function(svgClass) {
    let svgItem = document.querySelector(`svg.${svgClass}`);
    if (svgItem) {
        svgItem.previousElementSibling.style.display = "none"; // Hide the price display
        allClickedSvgs.push(svgClass); // delete dublicates
    }});
});

//---------------------------------------------
// START OF SVG CLICK HANDLER
//---------------------------------------------
svgCollection.forEach(function svgClickHandler(svg) {
    svg.onclick = function() {
        let svgClickedClass = this.classList[0];
        let svgItem = this;
        console.log(svgClickedClass); // Log the clicked SVG class
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
                alert("You don't have enough coins to buy this accessory.");
                points = points;    
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
        
        function erasePrice(svgClickedClass) {
            let priceDisplay = document.querySelector(`.${svgClickedClass}`).previousElementSibling;
            localStorage.setItem(`purchased_${svgClickedClass}`, "true");
            if (localStorage.getItem(`purchased_${svgClickedClass}`) === 'true') {
                priceDisplay.style.display = 'none'; // Hide the price display after purchase
                if (!allClickedSvgs.includes(svgClickedClass)) {
                    allClickedSvgs.push(svgClickedClass);
                    localStorage.setItem('allClickedSvgs', JSON.stringify(allClickedSvgs));
                    console.log("New array: ", allClickedSvgs); // Log the updated array
                }
            }
            else {
                priceDisplay.style.display = 'block'; // Show the price display if not purchased
            }
        };
        


            
        //---------------------------------------------
        // COOKIE HANDLING
        //---------------------------------------------
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