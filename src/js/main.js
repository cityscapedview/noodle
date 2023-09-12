import Game from "./Game.js";

(async () => {
  const gameboard = document.querySelector("#gameboard");
  const scoreEl = document.querySelector("#score-tracker");
  const roundEl = document.querySelector("#round-tracker");
  const game = new Game(gameboard, scoreEl, roundEl);

  await game.start();

  gameboard.addEventListener("click", (e) => {
    if (!e.target.matches("#gameboard-canvas")) {
      return;
    }
    const { offsetX, offsetY } = e;
    game.handleClick(offsetX, offsetY);
  });
})();
