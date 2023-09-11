export default class BuildingGameObject {
  #game;
  #cellX;
  #cellY;
  #positions;
  #ignitedPositions = [];
  #frame = 1;
  #gameObjectID;

  #destroyAfterFrames = 180;

  constructor(game, cellX, cellY) {
    this.#game = game;
    this.#cellX = cellX;
    this.#cellY = cellY;
    this.#gameObjectID = Math.random().toString(36).substring(7);
    this.#positions = {
      TOP_LEFT: {
        position: [this.#cellX, this.#cellY],
        isIgnited: false,
        hp: 100,
      },
      TOP_RIGHT: {
        position: [this.#cellX + 1, this.#cellY],
        isIgnited: false,
        hp: 100,
      },
      BOTTOM_LEFT: {
        position: [this.#cellX, this.#cellY + 1],
        isIgnited: false,
        hp: 100,
      },
      BOTTOM_RIGHT: {
        position: [this.#cellX + 1, this.#cellY + 1],
        isIgnited: false,
        hp: 100,
      },
    };
  }

  get gameObjectID() {
    return this.#gameObjectID;
  }

  isBlocking() {
    return true;
  }

  isBuildingIgnited(cellX, cellY) {
    const key = Object.keys(this.#positions).find(
      (key) =>
        this.#positions[key].position[0] === cellX &&
        this.#positions[key].position[1] === cellY
    );
    return this.#positions[key].isIgnited;
  }

  extinguish(cellX, cellY) {
    const key = Object.keys(this.#positions).find(
      (key) =>
        this.#positions[key].position[0] === cellX &&
        this.#positions[key].position[1] === cellY
    );
    this.#positions[key].isIgnited = false;
  }

  ignite(cellX, cellY) {
    const key = Object.keys(this.#positions).find(
      (key) =>
        this.#positions[key].position[0] === cellX &&
        this.#positions[key].position[1] === cellY
    );
    this.#positions[key].isIgnited = true;
  }

  isAt(cellX, cellY) {
    const isAt = Object.values(this.#positions).some(
      ({ position: [x, y] }) => x === cellX && y === cellY
    );
    return isAt;
  }

  getRenderState() {
    let objects = [];
    Object.entries(this.#positions).forEach(
      ([key, { isIgnited, position, hp }]) => {
        objects.push({
          position,
          moving: null,
          movingProgress: null,
          zIndex: position[1] * this.#game.zIndexSize,
          offsetY: 0,
          spriteID: `BLDG_POST_${key}`,
        });

        if (isIgnited && hp > 0) {
          objects.push({
            position,
            moving: null,
            movingProgress: null,
            zIndex: position[1] * this.#game.zIndexSize,
            offsetY: 0,
            spriteID: "FIRE_" + (this.#frame < 8 ? "3" : "4"),
          });
        } else if (isIgnited && hp === 0) {
          objects.push({
            position,
            moving: null,
            movingProgress: null,
            zIndex: position[1] * this.#game.zIndexSize,
            offsetY: 0,
            spriteID: "FIRE_1",
          });
        }
      }
    );

    return objects;
  }

  update() {
    // TODO: This is a hack to make the fire animation work.
    this.#frame++;
    if (this.#frame % 16 === 0) {
      this.#frame = 0;
    }

    Object.entries(this.#positions).forEach(([key, { isIgnited, hp }]) => {
      if (isIgnited && hp > 0) {
        hp -= 1;
        this.#positions[key].hp = hp;
      }
    });
  }
}
