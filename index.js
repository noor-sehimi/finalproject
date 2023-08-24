const gridContainer = document.querySelector(".grid-container");
let cards = [];
let firstCard, secondCard;
let lockBoard = false;
let score = 0;
let pairsFound = 0;
const modal = document.querySelector(".modal");
document.querySelector(".score").textContent = score;

let totalCards;

let totalPairs;

fetch("./data/cards.json")
  .then((res) => res.json())
  .then((data) => {
    cards = [...data, ...data];
    shuffleCards();
    generateCards();
    totalPairs = data.length; // Assuming each card in 'data' represents a unique pair.
    totalCards = cards.length;
    console.log(totalCards, totalPairs);
  });

function shuffleCards() {
  let currentIndex = cards.length,
    randomIndex,
    temporaryValue;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = cards[currentIndex];
    cards[currentIndex] = cards[randomIndex];
    cards[randomIndex] = temporaryValue;
  }
}

function generateCards() {
  for (let card of cards) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.setAttribute("data-name", card.name);
    cardElement.innerHTML = `
      <div class="front">
        <img class="front-image" src=${card.image} />
      </div>
      <div class="back"></div>
    `;
    gridContainer.appendChild(cardElement);
    cardElement.addEventListener("click", flipCard);
  }
}

function flipCard() {
  if (lockBoard) return;
  console.log(this);
  console.log(firstCard)
  if (this === firstCard) return;
  
  this.classList.add("flipped");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  score++;
  document.querySelector(".score").textContent = score;
  lockBoard = true;

  checkForMatch();
}
let scoreline = document.querySelector("#score")


function checkForMatch() {
  let isMatch = firstCard.dataset.name === secondCard.dataset.name;

  if (isMatch) {
    disableCards();
    pairsFound++; // Increment the number of pairs found
    score++;

    // Check if the game is finished
    if (pairsFound === totalPairs) {
      stopTimer(); // Stop the timer when all pairs are found
      //alert("Congratulations! You've matched all the pairs!");
      scoreline.innerHTML = score
      modal.classList.add("showModal");
     
      restart();
    }
  } else {
    unflipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetBoard();
  }, 1000);
}

function resetBoard() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

function restart() {
  resetBoard();
  shuffleCards();
  score = 0;
  document.querySelector(".score").textContent = score;
  gridContainer.innerHTML = "";
  generateCards();
  startTimer();
}

let startTime;
let timerInterval;

// Function to start the timer
function startTimer() {
  startTime = new Date().getTime(); // Record the start time
  timerInterval = setInterval(updateTimer, 1000); // Update timer every second (1000 ms)
}

// Function to update the timer display
function updateTimer() {
  const currentTime = new Date().getTime();
  const elapsedTime = currentTime - startTime;
  const minutes = Math.floor(elapsedTime / (1000 * 60));
  const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);

  // Format the time as "MM:SS"
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;

  // Display the formatted time in the HTML element
  document.getElementById("timer").textContent = formattedTime;
}

// Function to stop the timer
function stopTimer() {
  clearInterval(timerInterval);
}
console.log(modal);
startTimer()
console.log(modal);

