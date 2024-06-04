let btn = document.querySelectorAll(".btn");
let resetBtn = document.querySelector("#restart");
let winShow = document.querySelector(".hide");
let msg = document.querySelector(".msg");

let scoreX = document.querySelector(".score-x");
let scoreO = document.querySelector(".score-o");
let scoreDraw = document.querySelector(".score-draw");

let xTurn = true;
let count = 0;
let xScore = 0;
let oScore = 0;
let drawScore = 0;

let winningPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [2, 5, 8],
  [6, 7, 8],
  [3, 4, 5],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6],
];

btn.forEach((box) => {
  box.addEventListener("click", () => {
    if (xTurn) {
      box.innerText = "X";
      xTurn = false;
      box.style.color = "#48D2FE"
      resetBtn.innerText = "O turn";
      resetBtn.style.backgroundColor = "#E2BE00";
    } else {
      box.innerText = "O";
      xTurn = true;
      box.style.color = "#E2BE00"
      resetBtn.innerText = "X turn";
      resetBtn.style.backgroundColor = "#48D2FE";
    }
    count++;
    box.disabled = true;
    winChecker();
  });
});

const disableBox = () => {
  for (let box of btn) {
    box.disabled = true;
  }
};

const enableBox = () => {
  for (let box of btn) {
    box.disabled = false;
    box.innerText = "";
    winShow.classList.add("hide");
  }
  count = 0;
};

const resetGame = () => {
  xTurn = true;
  enableBox();
};

const showWinner = (winner) => {
  msg.innerText = `Game Over, Winner "${winner}"🎉`;
  winShow.classList.remove("hide");
  disableBox();
  resetBtn.innerText = "New Game";
  resetBtn.style.backgroundColor = "#FFFFFF";

  if (winner === "X") {
    xScore++;
    scoreX.innerText = xScore;
  } else if (winner === "O") {
    oScore++;
    scoreO.innerText = oScore;
  }

};

const showDraw = () => {
  msg.innerText = "Game was Draw!🤝";
  winShow.classList.remove("hide");
  resetBtn.innerText = "New Game";
  resetBtn.style.backgroundColor = "#FFFFFF";
  drawScore++;
  scoreDraw.innerText = drawScore;
};

const winChecker = () => {
  let winnerFound = false;
  for (let i of winningPattern) {
    let [element1, element2, element3] = [
      btn[i[0]].innerText,
      btn[i[1]].innerText,
      btn[i[2]].innerText,
    ];

    if (element1 != "" && element1 == element2 && element2 == element3) {
      showWinner(element1);
      winnerFound = true;
      break;
    }
  }

  if (!winnerFound && count === 9) {
    showDraw();
    disableBox();
  }
};

resetBtn.addEventListener("click", resetGame);
