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
        <h2 class="text-white">Carolinized</h2>
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <Display ref="canvas" :config="generationModel" />
        <v-btn
          color="orange-lighten-2" @click="draw"
>
          Dessiner
        </v-btn>
        <v-btn
          color="orange-lighten-2" @click="drawNextStep"
>
          Étape suivante
        </v-btn>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Display from '../components/carolinized/Display.vue'
import logo from '../assets/logo.svg'
// const paper = require('paper');

export default {
  name: 'Carolinized',
  components: {
    Display,
    // ExportModelDialog,
    // Inputs,
  },

  data: () => ({
    logo,
    generationModel: {
      seed: "Caroline", // TODO chose seed from input
      stepByStep: false, // TODO Enable step by step drawing
      padding: 0, // TODO use padding
    }
  }),
  mounted: function() {},
  methods: {
    draw() {
      this.$refs.canvas.drawNew()
    },
    drawNextStep() {
      this.$refs.canvas.drawNextStep()
    }
  }
}
</script>

<style scoped>
.app-logo {
  width: 40px;
  height: 48px;
  object-fit: contain;
}
</style>
