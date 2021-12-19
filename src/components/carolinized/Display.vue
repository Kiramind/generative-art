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
  // import PaperUtil from '../../util/paperUtil.js'
  const paper = require('paper');

  export default {
    props: ['generationModel'],
    name: 'Display',
    data: () => ({
      rand: null,
      canvas: null,
    }),
    mounted: function() {
      paper.setup("myCanvas")
      this.canvas = document.getElementById("myCanvas");
      this.rand = Util.randFromSeed(this.generationModel.seed)
    },
    methods: {
      reset() {
        paper.project.activeLayer.removeChildren();
      },
      drawNew() {
        this.reset()
        let rec = new paper.Path.Rectangle(
          this.randomPoint(),
          new paper.Size(50, 50)
        );
        rec.fillColor = 'red'
        paper.view.draw()
      },
      nextInt(max) {
        Util.randomInt(this.rand, max)
      },
      randomPoint() {
        return [
          Util.randomInt(this.rand, this.canvas.clientWidth),
          Util.randomInt(this.rand, this.canvas.clientHeight),
        ]
      },
    }
  }
</script>
