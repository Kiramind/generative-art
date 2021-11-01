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

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <GeneratedCanvas v-bind:artModel="artModel" ref="canvas"/>
      <Inputs v-bind:artModel="artModel" v-on:model-update="redraw()"/>
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
        centers: [
          new paper.Point(30,30),
          new paper.Point(350,50),
          new paper.Point(210,50),
          new paper.Point(24,123),
          new paper.Point(415,12),
          new paper.Point(333,321),
          new paper.Point(89,123),
          new paper.Point(177,222),
          new paper.Point(200,89),
          new paper.Point(250,400),
        ],
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
    seed: "default",
    lastSeed: "default",
    rand: Util.randFromSeed("default"),
  }),
  methods: {
    updateModel() {
      this.rand = Util.randFromSeed(this.seed)
      let newCenters = [];
      for (var i = 0; i < this.artModel.pattern.number; i++) {
        newCenters.push(new paper.Point(
          Util.randomInt(this.rand, 500),
          Util.randomInt(this.rand, 500))
        )
      }
      console.log(newCenters)
      this.artModel.pattern.centers = newCenters
    },
    redraw() {
      this.updateModel()
      this.$refs.canvas.draw()
    },
  },
};
</script>
