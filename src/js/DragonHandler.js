export default class DragonHandler {
  #lastTime = 0;
  #x = -1;
  #y = -1;
  #maxX = 8;
  #maxY = 8;
  #interval = .5;
  #pos;
  #delayTime = 0;
  #delayInterval = 2;

  constructor(maxX, maxY, { interval, delay }) {
    this.#maxX = maxX;
    this.#maxY = maxY;
    this.#interval = interval;
    this.#delayInterval = delay;
    this.#startPos();
  }

  #startPos() {
    const directions = ['N', 'S', 'W', 'E'];
    this.#pos = directions[Math.floor(Math.random() * directions.length)];
    switch (this.#pos) {
      case "N":
        this.#y = -1;
        this.#x = Math.floor(Math.random() * this.#maxX)
        break;
      case "S":
        this.#y = this.#maxY;
        this.#x = Math.floor(Math.random() * this.#maxX)
        break;
      case "W":
        this.#x = -1;
        this.#y = Math.floor(Math.random() * this.#maxY)
        break;
      case "E":
        this.#x = this.#maxX;
        this.#y = Math.floor(Math.random() * this.#maxY)
        break;
    }
  }

  addFire(t) {
    if (t - this.#delayTime < this.#delayInterval * 1000) {
      return null;
    }

    if (t - this.#lastTime >= this.#interval * 1000) {
      this.#lastTime = t;

      switch (this.#pos) {
        case "N":
          this.#y++;
          break;
        case "S":
          this.#y--;
          break;
        case "W":
          this.#x++;
          break;
        case "E":
          this.#x--;
          break;
      }

      if (this.#x < 0 || this.#x > 7 || this.#y < 0 || this.#y > 7) {
        this.#startPos();
        this.#delayTime = t;
        return null;
      }

      return {x: this.#x, y: this.#y}
    }
  }
}
