<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
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
      <Inputs
        v-bind:artModel="artModel"
        v-bind:seed="seed"
        v-on:model-update="redraw()"/>
    </v-main>
  </v-app>
</template>

<script>
import GeneratedCanvas from './components/GeneratedCanvas';
import Inputs from './components/Inputs';
import Util from './util/util.js'
const paper = require('paper');

export default {
  name: 'App',
  components: {
    GeneratedCanvas,
    Inputs,
  },

  data: () => ({
    artModel: {
      pattern: {
        type: "rectangle",
        centers: [],
        fillColor: "#67FBFBDD",
        number: 10,
        strokeWidth: 2,
        strokeColor: "#000000FF",
        rotationIncr: 5,
        width: 20,
        height: 35,
        radius1: 20,
        radius2: 10,
        sides: 5,
      },
    },
    seed:{ value: "Artiste"},
    rand: Util.randFromSeed("Artiste"),
    overlay: true,
    absolute: true,
  }),
  mounted: function() {
    // window.addEventListener('resize', this.updateModel)
    window.addEventListener('resize', () => this.redraw())
    this.updateModel()
  },
  methods: {
    updateModel() {
      let c = document.getElementById("myCanvas");
      this.rand = Util.randFromSeed(this.seed.value)
      let newCenters = [];
      for (var i = 0; i < this.artModel.pattern.number; i++) {
        newCenters.push(new paper.Point(
          Util.randomInt(this.rand, c.clientWidth),
          Util.randomInt(this.rand, c.clientHeight))
        )
      }
      console.log(newCenters)
      this.artModel.pattern.centers = newCenters
    },
    redraw() {
      this.updateModel()
      this.$refs.canvas.draw()
    },
    start() {
      this.redraw()
      this.overlay = false
    }
  },
};
</script>
