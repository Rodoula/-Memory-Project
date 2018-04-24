//List of cards//

let card = document.getElementsByClassName("card");
let cards = [...card]

// Basic Variables //

var openedCards = [];
var moves = 0;
var matchedCards = [];
let matchCard = document.getElementsByClassName("match");
let modal = document.getElementById('modalWin');
const deck = document.querySelector(".deck");

let stars = document.getElementsByClassName("fa-star");
let move = document.querySelector('.moves');
var span = document.getElementsByClassName("close")[0];
// for the wining modal 
let totalMoves = document.querySelector('.totalMoves');
let totalStars = document.querySelector('.totalStars');
let finishTime = document.querySelector('.finishTimer');
let starRating = document.querySelector(".stars");

//function to shuffle the cards ..

(function start(){
    cards = shuffle(cards);
    move.innerHTML = 0 ;
    // remove all exisiting classes from each card
    for (var i = 0; i < cards.length; i++){
    	deck.innerHTML = "";
    	for (const newCard of cards) {
            deck.appendChild(newCard);
        } 
    		
    };
})();
    

deck.addEventListener("click", function (event) {
    if (event.target.classList.value === "card" && openedCards.length < 2) {
        event.target.classList.add('open', 'show');
        addOpenedCard(event);
        if (openedCards.length === 2) {
            if (openedCards[0].firstElementChild.classList.value ===
                openedCards[1].firstElementChild.classList.value) {
                addMatchedCards();
            } else {
                setTimeout(hideCards, 1000);
            }
        }
        addMove();
    }

})


function addOpenedCard(event) {
    openedCards.push(event.target);
}

function addMatchedCards() {
    matchedCards.push(openedCards[0]);
    matchedCards.push(openedCards[1]);
    for (var i = 0; i <= matchedCards.length; i = i + 1) {
        matchedCards[i].classList.remove('open', 'show');
        matchedCards[i].classList.add('match');
        gameWon();
        openedCards = [];
    }

}

// Update the score panel //

function addMove() {
    moves++;
    if (moves == 1) {
        myTimer();
    }
    if (moves > 6 && moves < 14) {
        for (i = 0; i < 3; i++) {
            if (i > 1) {
                stars[i].style.visibility = "collapse";
            }
        }
    } else if (moves > 16) {
        for (i = 0; i < 3; i++) {
            if (i > 0) {
                stars[i].style.visibility = "collapse";
            }
        }
    }
    move.innerHTML = moves;
}

// Hide the cards in case they don't match//

function hideCards() {
    openedCards[0].classList.remove('open', 'show');
    openedCards[1].classList.remove('open', 'show');
    openedCards = [];
}

// End of the game //
function gameWon() {
    if (matchCard.length == 16) {
        modal.style.visibility = "visible";
        stopTimer();
        show();
        
    }
}


// Timer//
let timerInterval;
let timerCounter = 0;
var second = 0;
var minute = 0;
var timer = document.querySelector(".timer");

function myTimer() {
    timerInterval = setInterval(function () {
        timer.innerHTML = minute + "mins " + second + "secs";
        second++;
        if (second == 60) {
            minute++;
            second = 0;
        }


    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    seconds = 0;
    minutes = 0;
}

// Continue the game, close modal and restart//



span.onclick = function () {
    modal.style.visibility = "hidden";
}

const reset = document.querySelector(".restart");
reset.addEventListener('click', function () {
    location.reload();
});


function show() {
    totalMoves.innerHTML = moves;
    totalStars.innerHTML = starRating.innerHTML;
    finishTime.innerHTML = timer.innerHTML;
}

