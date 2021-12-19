<style scoped>
#myCanvas {
  border: black solid 1px;
  width: 100%;
  /* height: 50%; */
}
</style>
<template>
  <v-container>
  <canvas
    id="myCanvas" resize>
  </canvas>
  </v-container>
</template>

<script>
  import Util from '../../util/util.js'
  // import Direction from './direction.js'
  import Generator from './generator.js'
  // import PaperUtil from '../../util/paperUtil.js'
  const paper = require('paper');

  export default {
    props: ['config'],
    name: 'Display',
    data: () => ({
      rand: null,
      canvas: null,
      lastPoint: null,
      generator: null,
    }),
    mounted: function() {
      paper.setup("myCanvas")
      this.canvas = document.getElementById("myCanvas");
      this.rand = Util.randFromSeed(this.config.seed)
      this.generator = new Generator(this.rand, this.canvas.clientWidth, this.canvas.clientHeight)
    },
    methods: {
      reset() {
        paper.project.activeLayer.removeChildren();
      },
      drawNew() {
        this.reset()
        // let rec = new paper.Path.Rectangle(
        //   this.randomPoint(),
        //   new paper.Size(50, 50)
        // );
        // rec.fillColor = 'red'

        this.lastPoint = this.generator.randomPoint();
        this.drawNextStep()

        paper.view.draw()
      },
      drawNextStep() {
        console.log("startPoint: ", this.lastPoint)
        let seg = [this.lastPoint]
        seg = this.generator.nextCurl(seg[seg.length - 1])
        this.drawPath(seg)
        this.lastPoint = seg[seg.length - 1]
        console.log("segment", seg)
      },
      drawPath(segments) {
        let path = new paper.Path({
          strokeColor: 'black',
          strokeWidth: 5,
          strokeJoin: 'round',
          strokeCap: 'round'
        });
        segments.forEach((pt) => {
          path.add(pt);
        });
      },
      // nextCurl(startPoint) {
      //   let dirHoriz = this.nextDir(true, startPoint)
      //   let dirVert = this.nextDir(false, startPoint)
      //
      //   return this.computeCurlSegment(startPoint, dirHoriz, dirVert)
      // },
      // computeCurlSegment(startPoint, dir1, dir2) {
      //   let segments = [startPoint]
      //   let lastPoint = startPoint
      //
      //   let dirList = [dir1, dir2, Direction.opp(dir1), Direction.opp(dir2)]
      //   dirList.forEach( dir => {
      //     console.log(dir)
      //     lastPoint = this.movePointToDir(lastPoint, dir);
      //     segments.push(lastPoint)
      //   })
      //   return segments
      // },
      // movePointToDir(point, dir) {
      //   console.log("point",point)
      //   let remainingSpace = this.remainingSpace(dir, point)
      //   console.log("remainingSpace", remainingSpace)
      //   let val = this.nextInt(remainingSpace)
      //   console.log("val", val)
      //   switch (dir) {
      //     case Direction.UP:
      //         return [point[0], point[1] - val]
      //     case Direction.DOWN:
      //         return [point[0], point[1] + val]
      //     case Direction.RIGHT:
      //         return [point[0] + val, point[1]]
      //     case Direction.LEFT:
      //         return [point[0] - val, point[1]]
      //     default:
      //       return point;
      //   }
      // },
      // remainingSpace(dir, point) {
      //   switch (dir) {
      //     case Direction.UP:
      //       return point[1];
      //     case Direction.DOWN:
      //       return this.canvas.clientHeight - point[1]
      //       case Direction.LEFT:
      //         return point[0];
      //       case Direction.RIGHT:
      //         return this.canvas.clientWidth - point[0]
      //     default:
      //       return null
      //
      //   }
      // },
      // nextInt(max) {
      //   return Util.randomInt(this.rand, max)
      // },
      // nextDir(isHoriz, point){
      //   let threshold = isHoriz ? point[0] : point[1];
      //   let randomInt = this.nextInt(isHoriz ? this.canvas.clientWidth : this.canvas.clientHeight)
      //   let ret
      //   if (randomInt < threshold) {
      //     ret = isHoriz ? Direction.LEFT : Direction.UP;
      //   } else {
      //     ret = isHoriz ? Direction.RIGHT : Direction.DOWN;
      //   }
      //
      //   console.log("nextDir: isHoriz, point, randomInt, ret", isHoriz, point, randomInt, ret)
      //   return ret
      //
      // },
      // randomPoint() {
      //   return [
      //     Util.randomInt(this.rand, this.canvas.clientWidth),
      //     Util.randomInt(this.rand, this.canvas.clientHeight),
      //   ]
      // },
    }
  }
</script>
