import Util from '../../util/util.js'
import Direction from './direction.js'

const MIN_MOVE_RATIO = 0.1;

export default class Generator {

  constructor(rand, width, height) {
      this.rand = rand
      this.width = width
      this.height = height
  }

  setDimension(width, height){
    this.width = width
    this.height = height
  }

  nextCurl(startPoint) {
    let dirHoriz = this.nextDir(true, startPoint)
    let dirVert = this.nextDir(false, startPoint)

    return this.computeCurlSegment(startPoint, dirHoriz, dirVert)
  }

  computeCurlSegment(startPoint, dir1, dir2) {
    let segments = [startPoint]
    let lastPoint = startPoint

    let dirList = [dir1, dir2, Direction.opp(dir1), Direction.opp(dir2)]
    dirList.forEach( dir => {
      console.log(dir)
      lastPoint = this.movePointToDir(lastPoint, dir);
      segments.push(lastPoint)
    })
    return segments
  }

  nextInt(max) {
    return Util.randomInt(this.rand, max)
  }

  nextIntWithMin(isHoriz, max) {
    let min = Math.round(MIN_MOVE_RATIO * (isHoriz ? this.width : this.height))
    return min + Util.randomInt(this.rand, max - min)
  }
  nextDir(isHoriz, point){
    let threshold = isHoriz ? point[0] : point[1];
    let randomInt = this.nextInt(isHoriz ? this.width : this.height)
    let ret
    if (randomInt < threshold) {
      ret = isHoriz ? Direction.LEFT : Direction.UP;
    } else {
      ret = isHoriz ? Direction.RIGHT : Direction.DOWN;
    }
    console.log("nextDir: isHoriz, point, randomInt, ret", isHoriz, point, randomInt, ret)
    return ret
  }

  randomPoint() {
    return [
      this.nextInt(this.width),
      this.nextInt(this.height)
    ]
  }

  remainingSpace(dir, point) {
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

  movePointToDir(point, dir) {
    console.log("point",point)
    let remainingSpace = this.remainingSpace(dir, point)
    console.log("remainingSpace", remainingSpace)
    let val = this.nextIntWithMin(Direction.isHoriz(dir),remainingSpace)
    console.log("val", val)
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
