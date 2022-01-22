<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
      clipped-right
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
        <h2>Art Généré</h2>
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <v-overlay
          :absolute="absolute"
          opacity="0.74"
          :value="overlay"
        >
          <v-btn
            color="orange lighten-2"
            @click="start">
            Commencer...
          </v-btn>
        </v-overlay>
        <GeneratedCanvas v-bind:artModel="artModel" ref="canvas"/>
        <v-btn
          color="orange lighten-2" @click="save">
          Sauvegarder
        </v-btn>
        <ExportModelDialog v-bind:model="artModel"/>
        <Inputs
          v-bind:artModel="artModel"
          v-bind:seed="seed"
          v-bind:paramSelection="paramSelection"
          v-on:model-update="redraw()"/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import GeneratedCanvas from '../components/GeneratedCanvas';
import ExportModelDialog from '../components/ExportModelDialog';
import Inputs from '../components/Inputs';
import Util from '../util/util.js'
const paper = require('paper');

export default {
  name: 'App',
  components: {
    GeneratedCanvas,
    ExportModelDialog,
    Inputs,
  },

  data: () => ({
    artModel: {
        pattern:{
           type:"étoile",
           centers:[],
           fillColor:"#E0180CC8",
           number:10,
           strokeWidth:2,
           strokeColor:"#000000FF",
           rotationIncr:5,
           width:14,
           height:30,
           radius1:20,
           radius2:10,
           sides:5
        },
        pattern2:{
           type:"rectangle",
           centers:[],
           fillColor:"#E1F108E7",
           number:20,
           strokeWidth:2,
           strokeColor:"#EA0C28FF",
           rotationIncr:5,
           width:40,
           height:25,
           radius1:30,
           radius2:10,
           sides:3
        },
        backgroundLines:{
           number:50,
           start:-21,
           spread:2,
           angle:0,
           gap:20,
           strokeWidth:2,
           strokeColor:"#0AE772DB",
           dashLength:5,
           dashGap:5,
           strokeCap:"round"
        },
        background:{
           angle:0,
           nbColor:2,
           color1:"#DED1C3B7",
           color2:"#C1AFE8DC",
           color3:"#67BF11DD",
           colorStops:[
              0.25,
              0.75
           ],
           radial:false
        }
      },
    seed:{ value: "Artiste"},
    rand: Util.randFromSeed("Artiste"),
    overlay: true,
    absolute: true,
    miniParam: true,
    canvas: null,
    exportDialog: false,
    paramSelection: ['bckgLinePosition', 'fillColor'],
    paramNodes: [
            {
              id: 'pattern',
              name: 'Motifs',
              children: [
                { id: 'fillColor', name: 'remplissage'},
                { id: 'borderColor', name: 'bordure' },
                { id: 'shapeTypes', name: 'formes' },
                { id: 'shapeDetails', name: 'details' },
              ],
            },
            {
              id: 'lines',
              name: 'Lignes',
              children: [
                { id: 'bckgLinePosition', name: 'position'},
                { id: 'bckgLineDetails', name: 'détails' },
                { id: 'bckgLineColor', name: 'couleur' },
              ],
            },
            {
              id: 'background',
              name: 'Fond',
              children: [
                { id: 'bckgDetails', name: 'détails' },
                { id: 'bckgColor', name: 'couleur' },
              ],
            },
          ],
  }),
  mounted: function() {
    window.addEventListener('resize', () => this.redraw())
    this.updateModel()
  },
  methods: {
    updateModel() {
      this.canvas = document.getElementById("myCanvas");
      this.rand = Util.randFromSeed(this.seed.value)
      this.updateCenters(this.artModel.pattern)
      this.updateCenters(this.artModel.pattern2)
    },
    updateCenters(pattern) {
      let newCenters = [];
      for (var i = 0; i < pattern.number; i++) {
        newCenters.push(new paper.Point(
          Util.randomInt(this.rand, this.canvas.clientWidth),
          Util.randomInt(this.rand, this.canvas.clientHeight))
        )
      }
      pattern.centers = newCenters
    },
    redraw() {
      this.updateModel()
      if (this.$refs.canvas) {
        this.$refs.canvas.draw()
      }
    },
    start() {
      this.redraw()
      this.overlay = false
    },
    toggleMini() {
      this.miniParam = !this.miniParam
    },
    save() {
      let image = new Image()
      let src = this.canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
      image.src = src
      var w = window.open("")
      w.document.write(image.outerHTML)
      w.document.close()
    },
  },
};
</script>
