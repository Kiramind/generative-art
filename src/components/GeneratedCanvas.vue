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
      draw() {
        let c = document.getElementById("myCanvas");
        paper.project.activeLayer.removeChildren();
        this.drawBackground(c)
        this.drawLineBackground(c)
        this.drawPattern()
        paper.view.draw()
      },
      drawBackground(canvas) {
        let bckgModel = this.artModel.background;
        let center = [canvas.clientWidth / 2, canvas.clientHeight / 2]
        let bound = new paper.Path.Rectangle(
          [0,0],
          new paper.Size(canvas.clientWidth+5, canvas.clientHeight+5)
        );
        let direction = new paper.Path.Line(
          [
            center[0],
            - canvas.clientHeight,
          ],
          [
            center[0],
            2 * canvas.clientHeight,
          ],
        );
        direction.rotate(bckgModel.angle, center)
        let intersections = bound.getIntersections(direction)
        bound.fillColor = {
          gradient: {
              stops: this.backgroundStops(),
              radial: bckgModel.radial
          },
          origin: bckgModel.radial ? center : intersections[0].point,
          destination: bckgModel.radial ? [0,0]: intersections[1].point
        }
      },
      backgroundStops(){
        let bckgModel = this.artModel.background;
        let stops = []
        if (bckgModel.nbColor == 1) {
          stops.push([[bckgModel.color1, bckgModel.colorStops[0]]])
          stops.push([[bckgModel.color1, bckgModel.colorStops[1]]])
        }
        if (bckgModel.nbColor == 2) {
          stops.push([[bckgModel.color1, bckgModel.colorStops[0]]])
          stops.push([[bckgModel.color2, bckgModel.colorStops[1]]])
        }
        if (bckgModel.nbColor == 3) {
          stops.push([[bckgModel.color1, bckgModel.colorStops[0]]])
          stops.push([[bckgModel.color2, 0.5]])
          stops.push([[bckgModel.color3, bckgModel.colorStops[1]]])
        }
        return stops
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
      drawLineBackground(canvas){
        var paths = [];
        let lineModel = this.artModel.backgroundLines;
        paths.push(this.backgroundLinePath(lineModel.angle, lineModel.start, canvas));
        paths.push(this.backgroundLinePath(lineModel.angle, lineModel.start + lineModel.spread * lineModel.gap, canvas));
        paths.push(this.backgroundLinePath(lineModel.angle, lineModel.start + lineModel.spread * -lineModel.gap, canvas));
        for (var i = 2; i < lineModel.number; i++) {
          var path1 = this.backgroundLinePath(lineModel.angle, lineModel.start + Math.pow(i,lineModel.spread) * lineModel.gap, canvas);
          var path2 = this.backgroundLinePath(lineModel.angle, lineModel.start + Math.pow(i,lineModel.spread) * -lineModel.gap, canvas);

          paths.push(path1, path2);
        }
        return paths;
      },
      backgroundLinePath(angle, delta, canvas){
        let line = paper.Path.Line(
          new paper.Point(canvas.clientWidth/2,-canvas.clientHeight),
          new paper.Point(canvas.clientWidth/2, 2 * canvas.clientHeight)
        );

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
