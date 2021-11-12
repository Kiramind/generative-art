<template>
  <v-tabs v-model="innerTab" vertical>
    <v-tab>
      <v-icon left>mdi-shape</v-icon>
      Formes
    </v-tab>
    <v-tab>
      <v-icon left>mdi-palette</v-icon>
      Couleur
    </v-tab>
    <v-tab>
      <v-icon left>mdi-border-outside</v-icon>
      Bordure
    </v-tab>
    <v-tab>
      <v-icon left>mdi-page-next</v-icon>
      Détails
    </v-tab>
    <v-tab-item name="PatternShapeTabItem">
      <v-card outlined>
        <v-list-item>
          <v-list-item-content>
            <v-select
              :items="patternTypes"
              label="Type"
              outlined
              v-model="patternModel.type"
              dense
            ></v-select>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-text-field v-model="seed.value" label="Position"></v-text-field>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-tab-item>
    <v-tab-item name="PatternColorTabItem">
      <v-card outlined>
        <v-list-item>
          <v-list-item-content>
            <v-color-picker
              dot-size="25"
              swatches-max-height="200"
              hide-inputs
              v-model="patternModel.fillColor"
            ></v-color-picker>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-tab-item>
    <v-tab-item name="PatternLineTabItem">
      <v-card outlined>
        <v-list-item>
          <v-list-item-content>
            <v-color-picker
              dot-size="25"
              swatches-max-height="200"
              hide-inputs
              v-model="patternModel.strokeColor"
            ></v-color-picker>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-tab-item>
    <v-tab-item name="PatternDetailsTabItem">
      <v-card outlined min-width="300">
        <v-list-item>
          <v-list-item-content>
            <v-slider
              v-model="patternModel.number"
              label="Densité"
              :thumb-size="16"
              thumb-label="always"
              height="40"
              max="100"
              min="10"
              dense
            ></v-slider>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="showWidth()">
          <v-list-item-content>
            <v-slider
              v-model="patternModel.width"
              label="Largeur"
              :thumb-size="16"
              thumb-label="always"
              height="40"
              max="50"
              min="5"
              dense
            ></v-slider>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="showHeight()">
          <v-list-item-content>
            <v-slider
              v-model="patternModel.height"
              label="Longueur"
              :thumb-size="16"
              thumb-label="always"
              height="40"
              max="50"
              min="5"
              dense
            ></v-slider>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="showRadius1()">
          <v-list-item-content>
            <v-slider
              v-model="patternModel.radius1"
              label="Rayon"
              :thumb-size="16"
              thumb-label="always"
              height="40"
              max="50"
              min="5"
              dense
            ></v-slider>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="showRadius2()">
          <v-list-item-content>
            <v-slider
              v-model="patternModel.radius2"
              label="Rayon 2"
              :thumb-size="16"
              thumb-label="always"
              height="40"
              max="50"
              min="5"
              dense
            ></v-slider>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="showSides()">
          <v-list-item-content>
            <v-slider
              v-model="patternModel.sides"
              label="Pointes"
              :thumb-size="16"
              thumb-label="always"
              height="40"
              max="10"
              min="3"
            ></v-slider>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-tab-item>
  </v-tabs>
</template>

<script>
  // import Util from '../util/util.js'

  export default {
    props: ['patternModel', 'seed'],
    name: 'Inputs',
    data: () => ({
      patternTypes: ['rectangle', 'cercle', 'éllipse', 'polygone', 'étoile'],
      tab: null,
      innerTab: null,
    }),
    updated: function() {
      this.$emit("model-update");
    },
    methods: {
      showWidth() {
        switch (this.patternModel.type) {
          case "éllipse":
          case "rectangle":
            return true
          default:
          return false
        }
      },
      showHeight() {
        switch (this.patternModel.type) {
          case "éllipse":
          case "rectangle":
            return true
          default:
          return false
        }
      },
      showRadius1() {
        switch (this.patternModel.type) {
          case "cercle":
          case "étoile":
          case "polygone":
            return true
          default:
          return false
        }
      },
      showRadius2() {
        switch (this.patternModel.type) {
          case "étoile":
            return true
          default:
          return false
        }
      },
      showSides() {
        switch (this.patternModel.type) {
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
