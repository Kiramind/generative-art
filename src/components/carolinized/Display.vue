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
  import Generator from './generator.js'
  import Collision from './collision.js'
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
      collision: null,
      directionStack: [],

    }),
    mounted: function() {
      paper.setup("myCanvas")
      this.canvas = document.getElementById("myCanvas")
      this.rand = Util.randFromSeed(this.config.seed)
      this.generator = new Generator(this.rand, this.canvas.clientWidth, this.canvas.clientHeight)
      this.collision = new Collision(paper)
      this.path = new paper.Path({
        strokeColor: 'black',
        strokeWidth: 5,
        strokeJoin: 'round',
        strokeCap: 'round'
      })
      // this.path.add([100,100])
      // this.path.add([100,200])
      // this.path.add([300,200])
    },
    methods: {
      reset() {
        paper.project.activeLayer.removeChildren()
        this.lastPoint = null
        this.collision.clear()
      },
      drawNew() {
        // this.reset()
        this.drawNextStep()
        paper.view.draw()
      },
      drawNextStepX() {
        // this.path.add([100,100])
        // this.path.add([100,200])
        // this.path.add([300,200])
      },
      drawNextStep() {
        let keepTrying = true
        let nbTry = 0
        while (keepTrying && nbTry < 10 ) {
          if (this.lastPoint == null) {
            this.lastPoint = this.generator.randomPoint()
            this.path.add(this.lastPoint)
          }
          console.log("lastPoint", this.lastPoint)
          let drawSegment = this.generator.nextDrawSegment(this.lastPoint)
          console.log("gen segment", drawSegment)
          let isValid = !this.collision.isColliding(drawSegment)
          console.log("is Valid ?", isValid)
          if (isValid) {
              keepTrying = false
              this.collision.addSegment(drawSegment)
              this.drawPath(drawSegment)
              this.lastPoint = drawSegment.end
          } else {
            this.generator.popSegment()
          }
          nbTry++
        }
        if (keepTrying) {
          this.popSegment()
        }
        console.log("path", this.path)
      },
      popSegment() {
        console.log("pop. Last point before: ", this.lastPoint)
        console.log("path before", this.path)
        let lastSegment = this.path.lastSegment
        this.path.removeSegment(this.path.segments.length -1)
        console.log("removed segment",lastSegment)
        console.log("path after", this.path)
        // console.log("lastPoint after pop", this.lastPoint)
        this.generator.popSegment()
      },
      drawPath(drawSegment) {
        this.path.add(drawSegment.start)
        this.path.add(drawSegment.end)
      },
    }
  }
</script>
