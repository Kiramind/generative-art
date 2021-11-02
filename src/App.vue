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
    <v-navigation-drawer app permanent right clipped expand-on-hover>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Parametres
          </v-list-item-title>
          <v-list-item-subtitle>
            modifier les parametres d'entrée
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-treeview
        selection-type="leaf"
        v-model="paramSelection"
        selectable
        :items="paramNodes"
      ></v-treeview>
    </v-navigation-drawer>
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
    paramSelection: [],
    paramNodes: [
            {
              id: 'pattern',
              name: 'Motif',
              children: [
                { id: 'fillColor', name: 'remplissage', selected: true},
                { id: 'borderColor', name: 'bordure' },
                { id: 'shapeTypes', name: 'formes' },
                { id: 'shapeDetails', name: 'details' },
              ],
            },
          ],
  }),
  mounted: function() {
    // window.addEventListener('resize', this.updateModel)
    window.addEventListener('resize', () => this.redraw())
    this.updateModel()
  },
  updated: function() {
    console.log(this.paramSelection)
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
