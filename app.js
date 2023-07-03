const rulesBtn = document.querySelector(".rules");
const rulesModal = document.querySelector(".all-rules");
const closeRulesBtn = document.querySelector(".close-rules");
rulesBtn.addEventListener("click", (e) => {
  rulesModal.classList.add("show-modal");
});
closeRulesBtn.addEventListener("click", (e) => {
  rulesModal.classList.remove("show-modal");
});

const ticBox = document.querySelector(".tic-tac-toe");
let counter = 1;
// odd numbers (player 1) will correspond to X while even numbers (player 2) will correspond to O

let playerOne = ["Player 1"];
let playerTwo = ["Player 2"];
let allBoxes = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const winnerModal = document.querySelector(".winner-congrat");

const ticX = (e) => {
  if (
    e.target.classList.contains("occupied") ||
    e.target.classList.contains("fa-o") ||
    e.target.classList.contains("fa-x")
  ) {
    window.alert("Please choose an empty square");
  } else {
    e.target.classList.add("occupied");
    e.target.innerHTML = ` <i class="fa-solid fa-x"></i>`;
    counter++;
    playerOne.push(e.target.dataset.id);
    const indexId = allBoxes.findIndex((item) => item == e.target.dataset.id);
    allBoxes.splice(indexId, 1);

    // persist the state
    localStorage.setItem("playerOne", JSON.stringify(playerOne));
    localStorage.setItem("allBoxes", JSON.stringify(allBoxes));
    localStorage.setItem("counter", JSON.stringify(counter));

    checkWinner(playerOne);
  }
};

const ticO = (e) => {
  if (
    e.target.classList.contains("occupied") ||
    e.target.classList.contains("fa-o") ||
    e.target.classList.contains("fa-x")
  ) {
    window.alert("Please choose an empty square");
  } else {
    e.target.classList.add("occupied");
    e.target.innerHTML = ` <i class="fa-solid fa-o"></i>`;
    counter++;
    playerTwo.push(e.target.dataset.id);
    const indexId = allBoxes.findIndex((item) => item == e.target.dataset.id);
    allBoxes.splice(indexId, 1);

    // persist the state
    localStorage.setItem("playerTwo", JSON.stringify(playerTwo));
    localStorage.setItem("allBoxes", JSON.stringify(allBoxes));
    localStorage.setItem("counter", JSON.stringify(counter));

    checkWinner(playerTwo);
  }
};

ticBox.addEventListener("click", (e) => {
  if (allBoxes.length === 1) {
    shouldPersist = false;
    localStorage.setItem("shouldPersist", JSON.stringify(shouldPersist));
    winnerModal.innerHTML = `<h2>Game Has Ended In A TIE!</h2>
      <button class="btn replay">Replay</button>
      <button class="btn reset">Reset</button>`;
    winnerModal.classList.add("show-modal");
    resetOrReplay();
  }
  if (counter % 2 === 0) {
    ticO(e);
  } else {
    ticX(e);
  }
});

function checkWinner(gamer) {
  const player = gamer.map((id) => parseInt(id));
  if (player.includes(1) && player.includes(2) && player.includes(3)) {
    congratulateWinner(gamer);
  }
  if (player.includes(4) && player.includes(5) && player.includes(6)) {
    congratulateWinner(gamer);
  }
  if (player.includes(7) && player.includes(8) && player.includes(9)) {
    congratulateWinner(gamer);
  }
  if (player.includes(1) && player.includes(4) && player.includes(7)) {
    congratulateWinner(gamer);
  }
  if (player.includes(2) && player.includes(5) && player.includes(8)) {
    congratulateWinner(gamer);
  }
  if (player.includes(3) && player.includes(6) && player.includes(9)) {
    congratulateWinner(gamer);
  }
  if (player.includes(1) && player.includes(5) && player.includes(9)) {
    congratulateWinner(gamer);
  }
  if (player.includes(3) && player.includes(5) && player.includes(7)) {
    congratulateWinner(gamer);
  }
}

const playerXSpan = document.querySelector(".playerX");
let playerXScore = 0;

const playerOSpan = document.querySelector(".playerO");
let playerOScore = 0;
let shouldPersist = true;

function congratulateWinner(gamer) {
  shouldPersist = false;
  localStorage.setItem("shouldPersist", JSON.stringify(shouldPersist));
  winnerModal.innerHTML = `<h2>${gamer[0]} Wins!</h2>
      <button class="btn replay">Replay</button>
      <button class="btn reset">Reset</button>`;
  winnerModal.classList.add("show-modal");

  if (gamer[0] === "Player 1") {
    playerXScore += 3;
    playerXSpan.textContent = playerXScore;
    localStorage.setItem("playerXScore", JSON.stringify(playerXScore));
  }

  if (gamer[0] === "Player 2") {
    playerOScore += 3;
    playerOSpan.textContent = playerOScore;
    localStorage.setItem("playerOScore", JSON.stringify(playerOScore));
  }
  resetOrReplay();
}

const allSquares = [...document.querySelectorAll(".tic")];

function resetGame() {
  playerOne = ["Player 1"];
  playerTwo = ["Player 2"];
  allBoxes = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  counter = 1;

  // const allSquares = [...document.querySelectorAll(".tic")];
  allSquares.forEach((square) => {
    square.innerHTML = "";
    square.classList.remove("occupied");
  });
  playerOScore = 0;
  playerXScore = 0;
  playerOSpan.textContent = 0;
  playerXSpan.textContent = 0;
  localStorage.clear();
  shouldPersist = true;
  localStorage.setItem("shouldPersist", JSON.stringify(shouldPersist));
}

function replayGame() {
  playerOne = ["Player 1"];
  playerTwo = ["Player 2"];
  allBoxes = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  counter = 1;

  allSquares.forEach((square) => {
    square.innerHTML = "";
    square.classList.remove("occupied");
  });

  localStorage.removeItem("playerOne");
  localStorage.removeItem("playerTwo");
  localStorage.removeItem("allBoxes");

  shouldPersist = true;
  localStorage.setItem("shouldPersist", JSON.stringify(shouldPersist));
}

function resetOrReplay() {
  winnerModal.addEventListener("click", (e) => {
    if (e.target.classList.contains("replay")) {
      winnerModal.classList.remove("show-modal");
      replayGame();
    }
    if (e.target.classList.contains("reset")) {
      winnerModal.classList.remove("show-modal");
      resetGame();
    }
  });
}

//persisting data

window.addEventListener("DOMContentLoaded", () => {
  playerXScore = JSON.parse(localStorage.getItem("playerXScore"));
  if (playerXScore) {
    playerXSpan.textContent = playerXScore;
  } else {
    playerXSpan.textContent = 0;
  }

  playerOScore = JSON.parse(localStorage.getItem("playerOScore"));
  if (playerOScore) {
    playerOSpan.textContent = playerOScore;
  } else {
    playerOSpan.textContent = 0;
  }

  counter = JSON.parse(localStorage.getItem("counter"));

  shouldPersist = JSON.parse(localStorage.getItem("shouldPersist"));

  if (shouldPersist) {
    if (JSON.parse(localStorage.getItem("playerOne"))) {
      playerOne = JSON.parse(localStorage.getItem("playerOne"));
      persistGameState(playerOne);
    }
    if (JSON.parse(localStorage.getItem("playerTwo"))) {
      playerTwo = JSON.parse(localStorage.getItem("playerTwo"));
      persistGameState(playerTwo);
    }
    if (JSON.parse(localStorage.getItem("allBoxes"))) {
      allBoxes = JSON.parse(localStorage.getItem("allBoxes"));
    }
  } else {
    replayGame();
  }
});

function persistGameState(gamer) {
  gamer.forEach((id) => {
    allSquares.forEach((square) => {
      if (id == square.dataset.id) {
        if (gamer[0] == "Player 1") {
          square.innerHTML = ` <i class="fa-solid fa-x"></i>`;
          square.classList.add("occupied");
        } else {
          square.innerHTML = ` <i class="fa-solid fa-o"></i>`;
          square.classList.add("occupied");
        }
      }
    });
  });
}

/*
Possible winning combinations

123
456
789

147
256
789

159
357

*/

// we'll create a displayTicToe function that we'll use a setInterval function to call every 1milisecond. This function's job will be to display all the ticToe on the screen. It will have to get the info from the localStorage (basic info will be which square is occupied and what it is occupied with)
