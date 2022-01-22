import Util from '../../util/util.js'
import Direction from './direction.js'
import DrawSegment from './DrawSegment.js'

const MIN_MOVE_RATIO = 0.1
const MAX_MOVE_RATIO = 0.8
const PADDING = 20

export default class Generator {

  constructor(rand, width, height) {
      this.rand = rand
      this.width = width
      this.height = height
      this.beat = 0
      this.dirStack = []
  }

  setDimension(width, height){
    this.width = width
    this.height = height
  }

  nextDrawSegment(lastPoint) {
    console.log("generator before", this.beat, this.dirStack)
    let dir = this._nextDir(lastPoint)
    let nextPoint = this._movePointToDir(lastPoint, dir)
    this.dirStack.push(dir)
    this.beat = (this.beat +1) % 4
    console.log("generator after", this.beat, dir, this.dirStack)
    return DrawSegment.of(lastPoint, nextPoint, dir)
  }

  popSegment() {
    this.beat--
    if (this.beat < 0 ) {
      this.beat = 3
    }
    this.dirStack.pop()
  }

  _nextDir(lastPoint) {
    switch(this.beat) {
      case 0:
        return this._generateDir(true, lastPoint)
      case 1:
        return this._generateDir(false, lastPoint)
      case 2:
      case 3:
        return Direction.opp(this.dirStack[this.dirStack.length - 2])
      default:
        throw ("Unexpected beat value: " + this.beat)
    }
  }

  _nextInt(max) {
    return Util.randomInt(this.rand, max)
  }

// TODO prevent going out of bound
  _nextIntBound(isHoriz, max) {
    let bound = isHoriz ? this.width : this.height
    max = Math.max(0, Math.min(max - PADDING, MAX_MOVE_RATIO * bound))
    let min = Math.min(max, Math.round(MIN_MOVE_RATIO * bound))
    return min + Util.randomInt(this.rand, max - min)
  }

  // TODO: take into account padding + min collision distance
  _generateDir(isHoriz, point){
    let threshold = isHoriz ? point[0] : point[1];
    let randomInt = this._nextInt(isHoriz ? this.width : this.height)
    let ret
    if (randomInt < threshold) {
      ret = isHoriz ? Direction.LEFT : Direction.UP;
    } else {
      ret = isHoriz ? Direction.RIGHT : Direction.DOWN;
    }
    return ret
  }

  randomPoint() {
    return [
      this._nextInt(this.width),
      this._nextInt(this.height)
    ]
  }

  _remainingSpace(dir, point) {
    switch (dir) {
      case Direction.UP:
        return point[1];
      case Direction.DOWN:
        return this.height - point[1]
        case Direction.LEFT:
          return point[0];
        case Direction.RIGHT:
          return this.width - point[0]
      default:
        return null

    }
  }

  _movePointToDir(point, dir) {
    // console.log("point",point)
    let remainingSpace = this._remainingSpace(dir, point)
    // console.log("remainingSpace", remainingSpace)
    let val = this._nextIntBound(Direction.isHoriz(dir),remainingSpace)
    // console.log("val", val)
    switch (dir) {
      case Direction.UP:
          return [point[0], point[1] - val]
      case Direction.DOWN:
          return [point[0], point[1] + val]
      case Direction.RIGHT:
          return [point[0] + val, point[1]]
      case Direction.LEFT:
          return [point[0] - val, point[1]]
      default:
        return point;
    }
  }
}
