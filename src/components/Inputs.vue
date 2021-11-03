<template>
  <v-container fluid>
    <v-row dense>
      <v-col v-if="showFillColor()">
      <v-card outlined>
        <v-list-item>
          <v-list-item-content>
            <div class="text-overline mb-4">Remplissage</div>
            <v-color-picker
              dot-size="25"
              swatches-max-height="200"
              hide-inputs
              v-model="artModel.pattern.fillColor"
            ></v-color-picker>
          </v-list-item-content>
        </v-list-item>
        </v-card>
      </v-col>
      <v-col v-if="showBorderColor()">
        <v-card outlined>
        <v-list-item>
          <v-list-item-content>
            <div class="text-overline mb-4">Ligne</div>
            <v-color-picker
              dot-size="25"
              swatches-max-height="200"
              hide-inputs
              v-model="artModel.pattern.strokeColor"
            ></v-color-picker>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-col>
    <v-col v-if="showShapeTypes()">
      <v-card outlined>
        <v-list-item>
          <v-list-item-content>
            <div class="text-overline mb-4">Formes</div>
            <v-select
              :items="patternTypes"
              label="Type"
              outlined
              v-model="artModel.pattern.type"
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
    </v-col>
    <v-col v-if="showShapeDetails()">
      <v-card outlined min-width="300">
        <v-list-item>
          <v-list-item-content>
            <div class="text-overline mb-4">Details</div>
            <v-slider
              v-model="artModel.pattern.number"
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
              v-model="artModel.pattern.width"
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
              v-model="artModel.pattern.height"
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
              v-model="artModel.pattern.radius1"
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
              v-model="artModel.pattern.radius2"
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
      </v-card>
    </v-col>
    <!-- XXX -->
    <v-col v-if="showLineDetails()">
      <v-card outlined>
        <v-list-item>
          <v-list-item-content>
            <div class="text-overline mb-4">Details Lignes</div>
            <v-slider
              v-model="artModel.backgroundLines.angle"
              label="Angle"
              :thumb-size="16"
              thumb-label="always"
              height="40"
              max="359"
              min="0"
              dense
            ></v-slider>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-slider
              v-model="artModel.backgroundLines.start"
              label="Départ"
              :thumb-size="16"
              thumb-label="always"
              height="40"
              max="250"
              min="-250"
              dense
            ></v-slider>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-slider
              v-model="artModel.backgroundLines.strokeWidth"
              label="Epaisseur"
              :thumb-size="16"
              thumb-label="always"
              height="40"
              max="10"
              min="0"
              dense
            ></v-slider>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-slider
              v-model="artModel.backgroundLines.dashGap"
              label="Espace pointillé"
              :thumb-size="16"
              thumb-label="always"
              height="40"
              max="50"
              min="0"
              dense
            ></v-slider>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-slider
              v-model="artModel.backgroundLines.dashLength"
              label="Longueur pointillé"
              :thumb-size="16"
              thumb-label="always"
              height="40"
              max="50"
              min="1"
              dense
            ></v-slider>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-slider
              v-model="artModel.backgroundLines.spread"
              label="Ecart"
              step="0.1"
              :thumb-size="16"
              thumb-label="always"
              height="40"
              max="5"
              min="1"
              dense
            ></v-slider>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-col>
    <!-- XXX -->
    </v-row>
  </v-container>
</template>

<script>
  // import Util from '../util/util.js'

  export default {
    props: ['artModel', 'seed', 'paramSelection'],
    name: 'Inputs',
    data: () => ({
      patternTypes: ['rectangle', 'cercle', 'éllipse', 'polygone', 'étoile'],
    }),
    updated: function() {
      this.$emit("model-update");
    },
    methods: {
      showFillColor() {return this.paramSelection.includes('fillColor')},
      showBorderColor() {return this.paramSelection.includes('borderColor')},
      showShapeTypes() {return this.paramSelection.includes('shapeTypes')},
      showShapeDetails() {return this.paramSelection.includes('shapeDetails')},
      showLineDetails() {return true}, //XXX Todo
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
            return true
          default:
          return false
        }
      },
      showRadius1() {
        switch (this.artModel.pattern.type) {
          case "cercle":
          case "étoile":
          case "polygone":
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
