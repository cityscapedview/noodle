export default class BuildingGameObject {
  #game;
  #cellX;
  #cellY;
  #frame = 1;
  #gameObjectID;

  constructor(game, cellX, cellY) {
    this.#game = game;
    this.#cellX = cellX;
    this.#cellY = cellY;
    this.#gameObjectID = Math.random().toString(36).substring(7);
  }

  get gameObjectID() {
    return this.#gameObjectID;
  }

  isBlocking(cellX, cellY) {
    return true;
    if (this.#cellX === cellX && this.#cellY + 1 === cellY) {
      return true;
    }
    if (this.#cellX + 1 === cellX && this.#cellY + 1 === cellY) {
      return true;
    }
    return false;
  }

  isAt(cellX, cellY) {
    if (this.#cellX === cellX && this.#cellY === cellY) {
      return true;
    }
    if (this.#cellX + 1 === cellX && this.#cellY === cellY) {
      return true;
    }
    if (this.#cellX === cellX && this.#cellY + 1 === cellY) {
      return true;
    }
    if (this.#cellX + 1 === cellX && this.#cellY + 1 === cellY) {
      return true;
    }
  }

  getRenderState() {
    return [
      {
        position: [this.#cellX, this.#cellY],
        moving: null,
        movingProgress: null,
        zIndex: this.#cellY * this.#game.zIndexSize * 2 + 3,
        offsetY: 0,
        spriteID: "BLDG_POST_0_0",
      },
      {
        position: [this.#cellX + 1, this.#cellY],
        moving: null,
        movingProgress: null,
        zIndex: this.#cellY * this.#game.zIndexSize * 2 + 3,
        offsetY: 0,
        spriteID: "BLDG_POST_1_0",
      },
      {
        position: [this.#cellX, this.#cellY + 1],
        moving: null,
        movingProgress: null,
        zIndex: (this.#cellY + 1) * this.#game.zIndexSize + 3,
        offsetY: 0,
        spriteID: "BLDG_POST_0_1",
      },
      {
        position: [this.#cellX + 1, this.#cellY + 1],
        moving: null,
        movingProgress: null,
        zIndex: (this.#cellY + 1) * this.#game.zIndexSize + 3,
        offsetY: 0,
        spriteID: "BLDG_POST_1_1",
      },
    ];
  }

  update() {}
}
