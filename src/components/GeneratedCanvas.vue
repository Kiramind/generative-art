<style scoped>
#myCanvas {
  border: black solid 1px;
  width: 500px;
  height: 500px;
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
  // import Util from '../util/util.js'
  import PaperUtil from '../util/paperUtil.js'
  const paper = require('paper');

  export default {
    props: ['artModel'],
    name: 'GeneratedCanvas',
    data: () => ({}),
    mounted: function() {
      paper.setup("myCanvas")
      this.draw()
    },
    updated: function() {
      // console.log("updated Canvas") // XXX TODEL
    },
    methods: {
      reset() {
        paper.project.activeLayer.removeChildren();
      },
      printModel() {
        console.log(this.artModel.pattern)
      },
      draw() {
        paper.project.activeLayer.removeChildren();
        this.drawPattern()
        paper.view.draw()
      },
      drawPattern(){
        var paths = [];
        for (var i = 0; i < this.artModel.pattern.number; i++) {

          var path = new PaperUtil.shapedPath(
            this.artModel.pattern,
            this.artModel.pattern.centers[i]
          );
          path.rotate(i*this.artModel.pattern.rotationIncr);
          paths.push(path);
        }
        return paths;
      },
    },
  }
</script>
