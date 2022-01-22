import Direction from './direction.js'

// const MIN_MOVE_RATIO = 0.1;
// const MAX_MOVE_RATIO = 0.8;
const paper = require('paper');

export default class DrawSegment {

  constructor(start, end, direction) {
      this.start = start
      this.end = end
      this.dir = direction
      this.isHoriz = Direction.isHoriz(direction)
      this.enveloppeCache = null
  }

  static of(start, end, direction) {
    return new DrawSegment(start, end,direction)
  }

  enveloppe(size) {
    if (this.enveloppeCache == null) {
      this.enveloppeCache = this._createEnveloppe(size)
    }
    return this.enveloppeCache
  }

  endEnveloppe(size){
    return new paper.Rectangle({
      point: [this.end[0] - size, this.end[1] - size],
      size: [2* size,2* size],
      strokeColor: 'blue',
    })
  }

  _createEnveloppe(size) {
    let recX = this.isHoriz ? Math.min(this.start[0], this.end[0]) - size : this.start[0] - size
    let recY = this.isHoriz ? this.start[1] - size : Math.min(this.start[1], this.end[1]) - size
    let recWidth = this.isHoriz ? Math.abs(this.start[0] - this.end[0]) + size * 2 : size * 2
    let recHeight = this.isHoriz ? size * 2 : Math.abs(this.start[1] - this.end[1]) + size * 2

    return new paper.Rectangle({
      point: [recX, recY],
      size: [recWidth, recHeight],
      strokeColor: 'blue',
    })
  }
}
