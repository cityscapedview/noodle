import Game from "./Game.js";

(async () => {
  const gameboard = document.querySelector("#gameboard");
  const game = new Game(gameboard);

  await game.start();

  // Event listeners
  const handleCameraZoom = (e) => {
    const direction = e.target.dataset.cameraZoom;
    game.zoomCamera(direction);
  };
  const handleCameraMove = (e) => {
    const direction = e.target.dataset.cameraMove;
    game.moveCamera(direction);
  };

  const cameraMoveEls = document.querySelectorAll("[data-camera-move]");
  cameraMoveEls.forEach((el) => el.addEventListener("click", handleCameraMove));

  const cameraZoomEls = document.querySelectorAll("[data-camera-zoom]");
  cameraZoomEls.forEach((el) => el.addEventListener("click", handleCameraZoom));

  let isAddingBuilding = false;
  const addBuildingEl = document.querySelector("#add-building");
  addBuildingEl.addEventListener("click", () => {
    isAddingBuilding = !isAddingBuilding;

    if (isAddingBuilding) {
      addBuildingEl.innerText = "Off";
    } else {
      addBuildingEl.innerText = "On";
    }
    game.setIsAddingBuilding(isAddingBuilding);
  });

  gameboard.addEventListener("click", (e) => {
    if (!e.target.matches("#gameboard-canvas")) {
      return;
    }
    const { offsetX, offsetY } = e;
    game.handleClick(offsetX, offsetY);
  });
})();
