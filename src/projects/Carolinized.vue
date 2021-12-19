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
        <h2>Carolinized</h2>
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <Display v-bind:config="generationModel" ref="canvas"/>
        <v-btn
          color="orange lighten-2" @click="draw">
          Draw
        </v-btn>
        <v-btn
          color="orange lighten-2" @click="drawNextStep">
          Next Step
        </v-btn>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Display from '../components/carolinized/Display'
// const paper = require('paper');

export default {
  name: 'Carolinized',
  components: {
    Display,
    // ExportModelDialog,
    // Inputs,
  },

  data: () => ({
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
