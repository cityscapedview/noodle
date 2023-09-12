import Game from "./Game.js";

(async () => {
  const gameboard = document.querySelector("#gameboard");
  const scoreEl = document.querySelector("#score-tracker");
  const roundEl = document.querySelector("#round-tracker");
  const game = new Game(gameboard, scoreEl, roundEl);

  const startButton = document.querySelector("#start-button");
  const titleScreen = document.querySelector(".title-screen");
  const scoreboard = document.querySelector(".scoreboard");

  // Event listeners
  startButton.addEventListener("click", async () => {
    gameboard.classList.remove("hidden");
    scoreboard.classList.remove("hidden");
    titleScreen.classList.add("hidden");
    await game.start();
  });

  gameboard.addEventListener("click", (e) => {
    if (!e.target.matches("#gameboard-canvas")) {
      return;
    }
    const { offsetX, offsetY } = e;
    game.handleClick(offsetX, offsetY);
  });
})();
