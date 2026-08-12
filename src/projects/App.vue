<template>
  <v-app>
    <v-app-bar
      color="primary"
    >
      <div class="d-flex align-center pl-4">
        <img
          alt="Logo Art généré"
          class="app-logo mr-2"
          :src="logo"
        >
        <h2 class="text-white">Art Généré</h2>
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>
    <v-main>
      <v-container fluid class="main-content">
        <v-overlay
          contained
          class="align-center justify-center protocol-overlay"
          :model-value="overlay"
          :opacity="0.74"
        >
          <v-btn
            color="orange-lighten-2"
            @click="start"
>
            Commencer...
          </v-btn>
        </v-overlay>
        <GeneratedCanvas ref="canvas" :art-model="artModel" />
        <v-btn
          color="orange-lighten-2" @click="save"
>
          Sauvegarder
        </v-btn>
        <ExportModelDialog :model="artModel" />
        <Inputs
          :art-model="artModel"
          :seed-value="seed.value"
          @update:art-model="artModel = $event"
          @update:seed-value="seed.value = $event"
          @model-update="redraw"
        />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import GeneratedCanvas from '../components/GeneratedCanvas.vue'
import ExportModelDialog from '../components/ExportModelDialog.vue'
import Inputs from '../components/Inputs.vue'
import Util from '../util/util.js'
import paper from 'paper'
import logo from '../assets/logo.svg'

export default {
  name: 'App',
  components: {
    GeneratedCanvas,
    ExportModelDialog,
    Inputs,
  },

  data: () => ({
    logo,
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
    miniParam: true,
    canvas: null,
    exportDialog: false,
  }),
  mounted: function() {
    this.resizeHandler = () => this.redraw()
    window.addEventListener('resize', this.resizeHandler)
    this.$nextTick(this.redraw)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.resizeHandler)
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

<style scoped>
.main-content {
  position: relative;
  padding: 12px;
}

.protocol-overlay {
  z-index: 10;
}

.app-logo {
  width: 40px;
  height: 48px;
  object-fit: contain;
}
</style>
