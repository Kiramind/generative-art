<template>
  <v-container fluid>
    <v-tabs
      v-model="tab"
      color="orange"
      dark
      right
    >
      <v-tab>
      <v-icon left>mdi-lock-pattern</v-icon>
        Motifs
      </v-tab>
      <v-tab>
        <v-icon left>mdi-format-line-style</v-icon>
        Lignes
      </v-tab>
      <v-tab>
        <v-icon left>mdi-arrange-send-backward</v-icon>
        Fond
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab" name="InputTabItems">
      <v-tab-item name="PatternTabItem">
        <v-tabs v-model="innerTab" vertical>
          <v-tab>
            <v-icon left>mdi-palette</v-icon>
            Couleur
          </v-tab>
          <v-tab>
            <v-icon left>mdi-border-outside</v-icon>
            Bordure
          </v-tab>
          <v-tab>
            <v-icon left>mdi-shape</v-icon>
            Formes
          </v-tab>
          <v-tab>
            <v-icon left>mdi-page-next</v-icon>
            Détails
          </v-tab>
          <v-tab-item name="PatternColorTabItem">
            <v-card outlined>
              <v-list-item>
                <v-list-item-content>
                  <v-color-picker
                    dot-size="25"
                    swatches-max-height="200"
                    hide-inputs
                    v-model="artModel.pattern.fillColor"
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
                    v-model="artModel.pattern.strokeColor"
                  ></v-color-picker>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-tab-item>
          <v-tab-item name="PatternShapeTabItem">
            <v-card outlined>
              <v-list-item>
                <v-list-item-content>
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
          </v-tab-item>
          <v-tab-item name="PatternDetailsTabItem">
            <v-card outlined min-width="300">
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
          </v-tab-item>
        </v-tabs>
      </v-tab-item>
      <v-tab-item name="LineTabItem">
        <v-tabs vertical>
          <v-tab>
            <v-icon left>mdi-palette</v-icon>
            Couleur
          </v-tab>
          <v-tab>
            <v-icon left>mdi-map-marker-path</v-icon>
            Position
          </v-tab>
          <v-tab>
            <v-icon left>mdi-page-next</v-icon>
            Détails
          </v-tab>
          <v-tab-item name="LineColorTabItem">
            <v-card outlined>
              <v-list-item>
                <v-list-item-content>
                  <v-color-picker
                    dot-size="25"
                    swatches-max-height="200"
                    hide-inputs
                    v-model="artModel.backgroundLines.strokeColor"
                  ></v-color-picker>
                </v-list-item-content>
              </v-list-item>
              </v-card>
          </v-tab-item>
          <v-tab-item name="LinePositionTabItem">
            <v-card outlined>
              <v-list-item>
                <v-list-item-content>
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
          </v-tab-item>
          <v-tab-item name="LineDetailsTabItem">
            <v-card min-width="300" outlined>
              <v-list-item>
                <v-list-item-content>
                  <v-slider
                    v-model="artModel.backgroundLines.strokeWidth"
                    label="Epaisseur"
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
                    v-model="artModel.backgroundLines.dashGap"
                    label="Espace pointillé"
                    :thumb-size="16"
                    thumb-label="always"
                    height="40"
                    max="100"
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
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-tab-item>
      <v-tab-item name="BackgroundTabItem">
        <v-tabs vertical>
          <v-tab>
            <v-icon left>mdi-page-next</v-icon>
            Détails
          </v-tab>
          <v-tab v-if="showBckgColor(1)">
            <v-icon left>mdi-palette</v-icon>
            Couleur 1
          </v-tab>
          <v-tab v-if="showBckgColor(2)">
            <v-icon left>mdi-format-color-fill</v-icon>
            Couleur 2
          </v-tab>
          <v-tab v-if="showBckgColor(3)">
            <v-icon left>mdi-invert-colors</v-icon>
            Couleur 3
          </v-tab>
          <v-tab-item name="BackgroundDetailTabItem">
            <v-card min-width="300" outlined>
              <v-list-item>
                <v-list-item-content>
                  <v-switch v-model="artModel.background.radial" label="Radial"></v-switch>
                </v-list-item-content>
              </v-list-item>
              <v-list-item v-if="showBckgAngle()">
                <v-list-item-content>
                  <v-slider
                    v-model="artModel.background.angle"
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
                    v-model="artModel.background.nbColor"
                    label="NbColor"
                    :thumb-size="16"
                    :tick-labels="[1,2,3]"
                    height="40"
                    max="3"
                    min="1"
                    dense
                  ></v-slider>
                  <v-range-slider
                    v-model="artModel.background.colorStops"
                    label="Position couleur"
                    :thumb-size="16"
                    step="0.05"
                    height="40"
                    max="1"
                    min="0"
                    dense
                  ></v-range-slider>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-tab-item>
          <v-tab-item name="BackgroundColor1TabItem" v-if="showBckgColor(1)">
            <v-card outlined>
              <v-list-item>
                <v-list-item-content>
                  <v-color-picker
                    dot-size="25"
                    swatches-max-height="200"
                    hide-inputs
                    v-model="artModel.background.color1"
                  ></v-color-picker>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </v-tab-item>
            <v-tab-item name="BackgroundColor2TabItem" v-if="showBckgColor(2)">
              <v-card outlined>
                <v-list-item>
                  <v-list-item-content>
                    <v-color-picker
                      dot-size="25"
                      swatches-max-height="200"
                      hide-inputs
                      v-model="artModel.background.color2"
                    ></v-color-picker>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
          </v-tab-item>
          <v-tab-item name="BackgroundColor3TabItem" v-if="showBckgColor(3)">
            <v-card outlined>
              <v-list-item>
                <v-list-item-content>
                  <v-color-picker
                    dot-size="25"
                    swatches-max-height="200"
                    hide-inputs
                    v-model="artModel.background.color3"
                  ></v-color-picker>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
  // import Util from '../util/util.js'

  export default {
    props: ['artModel', 'seed', 'paramSelection'],
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
      showFillColor() {return this.paramSelection.includes('fillColor')},
      showBorderColor() {return this.paramSelection.includes('borderColor')},
      showShapeTypes() {return this.paramSelection.includes('shapeTypes')},
      showShapeDetails() {return this.paramSelection.includes('shapeDetails')},
      showLinePosition() {return this.paramSelection.includes('bckgLinePosition')},
      showLineDetails() {return this.paramSelection.includes('bckgLineDetails')},
      showLineColor() {return this.paramSelection.includes('bckgLineColor')},
      showBckgColor(n) {
        return this.artModel.background.nbColor >= n
      },
      showBckgDetails() {return this.paramSelection.includes('bckgDetails')},
      showBckgAngle() {return !this.artModel.background.radial},
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
