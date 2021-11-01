<template>
  <v-container>
    <v-card
  max-width="300"
  outlined
>
  <v-list-item>
    <v-list-item-content>
      <div class="text-overline mb-4">
        Motif
      </div>
      <p>Remplissage</p>
      <v-color-picker
        dot-size="25"
        swatches-max-height="200"
        hide-inputs
        v-model="artModel.pattern.fillColor"
      ></v-color-picker>
    </v-list-item-content>
  </v-list-item>
  <v-list-item>
    <v-list-item-content>
      <p>Ligne</p>
      <v-color-picker
        dot-size="25"
        swatches-max-height="200"
        hide-inputs
        v-model="artModel.pattern.strokeColor"
      ></v-color-picker>
    </v-list-item-content>
  </v-list-item>
  <v-list-item>
    <v-list-item-content>
      <v-select
        :items="patternTypes"
        label="Type"
        outlined
        v-model="artModel.pattern.type"
      ></v-select>
    </v-list-item-content>
  </v-list-item>
  <v-list-item>
    <v-list-item-content>
      <v-slider
        v-model="artModel.pattern.number"
        label="Densité"
        :thumb-size="16"
        thumb-label="always"
        height="40"
        max="100"
        min="10"
      ></v-slider>
    </v-list-item-content>
  </v-list-item>
  <v-list-item v-if="showWidth()">
    <v-list-item-content>
      <v-slider
        v-model="artModel.pattern.width"
        label="Largeur"
        :thumb-size="16"
        thumb-label="always"
        height="40"
        max="50"
        min="5"
      ></v-slider>
    </v-list-item-content>
  </v-list-item>
  <v-list-item v-if="showHeight()">
    <v-list-item-content>
      <v-slider
        v-model="artModel.pattern.height"
        label="Longueur"
        :thumb-size="16"
        thumb-label="always"
        height="40"
        max="50"
        min="5"
      ></v-slider>
    </v-list-item-content>
  </v-list-item>
  <v-list-item v-if="showRadius1()">
    <v-list-item-content>
      <v-slider
        v-model="artModel.pattern.radius1"
        label="Rayon"
        :thumb-size="16"
        thumb-label="always"
        height="40"
        max="50"
        min="5"
      ></v-slider>
    </v-list-item-content>
  </v-list-item>
  <v-list-item v-if="showRadius2()">
    <v-list-item-content>
      <v-slider
        v-model="artModel.pattern.radius2"
        label="Rayon 2"
        :thumb-size="16"
        thumb-label="always"
        height="40"
        max="50"
        min="5"
      ></v-slider>
    </v-list-item-content>
  </v-list-item>
  <v-list-item>
    <v-list-item-content v-if="showSides()">
      <v-slider
        v-model="artModel.pattern.sides"
        label="Pointes"
        :thumb-size="16"
        thumb-label="always"
        height="40"
        max="10"
        min="3"
      ></v-slider>
    </v-list-item-content>
  </v-list-item>
  <v-list-item>
    <v-list-item-content>
      <v-text-field v-model="seed.value" label="Aléatoire"></v-text-field>
    </v-list-item-content>
  </v-list-item>
</v-card>
  </v-container>
</template>

<script>
  // import Util from '../util/util.js'

  export default {
    props: ['artModel', 'seed'],
    name: 'Inputs',
    data: () => ({
      patternTypes: ['rectangle', 'cercle', 'éllipse', 'polygone', 'étoile'],
    }),
    updated: function() {
      this.$emit("model-update");
    },
    methods: {
      showWidth() {
        switch (this.artModel.pattern.type) {
          case "éllipse":
          case "rectangle":
            return true
          default:
          return false
        }
      },
      showHeight() {
        switch (this.artModel.pattern.type) {
          case "éllipse":
          case "rectangle":
          case "polygone":
            return true
          default:
          return false
        }
      },
      showRadius1() {
        switch (this.artModel.pattern.type) {
          case "cercle":
          case "étoile":
            return true
          default:
          return false
        }
      },
      showRadius2() {
        switch (this.artModel.pattern.type) {
          case "étoile":
            return true
          default:
          return false
        }
      },
      showSides() {
        switch (this.artModel.pattern.type) {
          case "étoile":
          case "polygone":
            return true
          default:
          return false
        }
      },
    },
  }
</script>
