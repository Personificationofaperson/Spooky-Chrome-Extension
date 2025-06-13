//---------------------------------------------
// GLOBAL VARIABLES
//---------------------------------------------
let points = getPointsFromCookies();
let lastVisit = parseInt(localStorage.getItem("pageVisitedTime") || "0", 10);
let now = Date.now();
let OneDay = 24 * 60 * 60 * 1000; // One day in milliseconds
let clickCount = 0;
let clickTimeout;
const textBalloon = document.querySelector(".text-balloon")
textBalloon.style.display = "none"; 



//---------------------------------------------
// ON WINDOW LOAD: CHECK LAST VISIT & UPDATE POINTS + GET CORRECT 
//---------------------------------------------
window.addEventListener('load', () => {
    console.log(lastVisit)
    console.log(now);
    if(now - lastVisit > OneDay) {
    points += 5;
    localStorage.setItem("pageVisitedTime", now.toString());
} else {
  points = getPointsFromCookies();
};
    setPointsInCookies(points);
    let lastAccessory = localStorage.getItem('lastAccessory');
    let allClickedSvgs = JSON.parse(localStorage.getItem('allClickedSvgs')) || [];


    const scoreContainer = document.getElementById('score');
    const pointsMessage = document.createElement('p');
    pointsMessage.innerHTML = `${points} coins`;
    scoreContainer.appendChild(pointsMessage);

    console.log("is the lastaccessory true? ", localStorage.getItem(`calledKey_${lastAccessory}`));
    if (localStorage.getItem(`calledKey_${lastAccessory}`) === 'true') {
        let accessories = document.getElementsByClassName("on-ghost");
        console.log("id: ", accessories[2].id); 
        console.log("class: ", lastAccessory);
        console.log("does comparing work? ", accessories[2].id === lastAccessory);
        console.log("the if loop does run")
        for (let i = 0; i < accessories.length; i++) {
            console.log("the for loop does run")
        accessories[i].id === lastAccessory ? accessories[i].style.display = 'block' : accessories[i].style.display = 'none';
    }
        localStorage.setItem("previousItem", lastAccessory);    
    }
    else if (localStorage.getItem(`calledKey_${lastAccessory}`) === 'false') { 
        console.log("the else loop does run")
        let previousAccessoryId = localStorage.getItem("previousItem");
        let previousAccessoryItem = document.getElementById(previousAccessoryId);
        console.log(previousAccessoryItem)
        previousAccessoryItem.style.display = "block"; // show the accessory with last accessory true
        }
    });
    


    

function addPoints() {
    points += 1;
    const scoreContainer = document.getElementById('score');
    scoreContainer.replaceChildren();
    const pointsMessage = document.createElement('p');
    pointsMessage.innerHTML = `${points} coins`;
    scoreContainer.appendChild(pointsMessage);
    setPointsInCookies(points);
    clickMessageHandler(clickCount);
}


function clickMessageHandler() {
    clearTimeout(clickTimeout);
    clickCount++;

    clickTimeout = setTimeout(() => {
        textBalloon.style.display = "none";
        clickCount = 0;
    }
    ,5000)
    specificMessageHandler(clickCount);
};

function specificMessageHandler(clickCount) { // Make this work when clicking happens within a certain timeframe
    console.log(clickCount)
    if (clickCount >= 10 && clickCount < 25) {
        showMessage("Easy there, buddy!")
    }
    else if (clickCount >= 25 && clickCount < 40) {
        showMessage("I think the button's scared now.")
    }
    else if (clickCount >= 40 && clickCount < 55) {
        showMessage("If you break it, I'm not replacing it.")
    }
    else if (clickCount >= 55 && clickCount < 75) {
        showMessage("I’m calling the click police.")
    }
    else {
        textBalloon.style.display = "none"; 
    }
}

function showMessage(message) {
    console.log(message)
    textBalloon.style.display = "block";
    textBalloon.replaceChildren();
    const textMessage = document.createElement('p');
    textMessage.textContent = message;
    textBalloon.appendChild(textMessage);
}






// Function to save points in cookies
function setPointsInCookies(points) {
    localStorage.setItem("points", points.toString());
}

// Function to retrieve points from cookies
function getPointsFromCookies() {
    return parseInt(localStorage.getItem("points") || "0", 10); // Default to 0 if no cookie is found
};