const Direction = {
  LEFT: Symbol("left"),
  RIGHT: Symbol("right"),
  UP: Symbol("up"),
  DOWN: Symbol("down"),

  isHoriz(dir) {
    return dir === Direction.LEFT || dir === Direction.RIGHT
  },
  opp(dir) {
    switch (dir) {
      case this.LEFT:
        return this.RIGHT;
      case this.RIGHT:
        return this.LEFT;
      case this.UP:
        return this.DOWN;
      case this.DOWN:
        return this.UP;


    }
  }
}

export default Direction
