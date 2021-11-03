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
  import Util from '../util/util.js'
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
        this.drawLineBackground()
        this.drawPattern()
        paper.view.draw()
      },
      drawPattern() {
        var paths = [];
        for (var i = 0; i < this.artModel.pattern.number; i++) {

          var path = new PaperUtil.shapedPath(
            this.artModel.pattern,
            this.artModel.pattern.centers[i]
          );
          path.rotate(i*this.artModel.pattern.rotationIncr);
          paths.push(path);
        }
        return paths
      },
      drawLineBackground(){
        var paths = [];
        let lineModel = this.artModel.backgroundLines;
        for (var i = 0; i < lineModel.number; i++) {
          var path1 = this.backgroundLinePath(lineModel.angle, Math.pow(i,lineModel.spread) * lineModel.gap);
          var path2 = this.backgroundLinePath(lineModel.angle, Math.pow(i,lineModel.spread) * -lineModel.gap);

          paths.push(path1, path2);
        }
        return paths;
      },
      backgroundLinePath(angle, delta){
        let c = document.getElementById("myCanvas");
        var line = paper.Path.Line(new paper.Point(0,0), new paper.Point(c.clientWidth, c.clientHeight));
        line.rotate(45); //XXX see starting point.
        line.rotate(angle);
        line.translate(new paper.Point(delta * Util.cosDeg(angle), delta * Util.sinDeg(angle)));

        let lineModel = this.artModel.backgroundLines;
        //
        line.strokeColor = lineModel.strokeColor;
        line.strokeWidth = lineModel.strokeWidth;
        line.strokeCap = lineModel.strokeCap;
        line.dashArray = [lineModel.dashLength, lineModel.dashGap];
        return line;
      },
    },
  }
</script>
