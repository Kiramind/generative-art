<template>
  <v-container fluid>
    <v-tabs v-model="tab" class="protocol-tabs" align-tabs="end" show-arrows>
      <v-tab class="protocol-tab protocol-tab--pattern1" value="pattern1"><v-icon start>$lockPattern</v-icon>Motifs 1</v-tab>
      <v-tab class="protocol-tab protocol-tab--pattern2" value="pattern2"><v-icon start>$puzzle</v-icon>Motifs 2</v-tab>
      <v-tab class="protocol-tab protocol-tab--lines" value="lines"><v-icon start>$formatLineStyle</v-icon>Lignes</v-tab>
      <v-tab class="protocol-tab protocol-tab--background" value="background"><v-icon start>$arrangeSendBackward</v-icon>Fond</v-tab>
    </v-tabs>

    <v-window
      v-model="tab"
      data-testid="protocol-panel"
      :class="['protocol-panel', `protocol-panel--${tab}`]"
    >
      <v-window-item value="pattern1">
        <PatternInputTab v-model="draftArt.pattern" v-model:seed-value="draftSeed" @model-update="redraw"></PatternInputTab>
      </v-window-item>
      <v-window-item value="pattern2">
        <PatternInputTab v-model="draftArt.pattern2" v-model:seed-value="draftSeed" @model-update="redraw"></PatternInputTab>
      </v-window-item>
      <v-window-item value="lines">
        <div class="editor-layout">
          <v-tabs v-model="lineTab" direction="vertical" color="primary">
            <v-tab value="color"><v-icon start>$palette</v-icon>Couleur</v-tab>
            <v-tab value="position"><v-icon start>$mapMarkerPath</v-icon>Position</v-tab>
            <v-tab value="details"><v-icon start>$pageNext</v-icon>Détails</v-tab>
          </v-tabs>
          <v-window v-model="lineTab" class="editor-content">
            <v-window-item value="color">
              <v-card variant="outlined" class="pa-4">
                <v-color-picker v-model="draftArt.backgroundLines.strokeColor" :dot-size="25" hide-inputs @update:model-value="redraw"></v-color-picker>
              </v-card>
            </v-window-item>
            <v-window-item value="position">
              <v-card variant="outlined" class="pa-5 slider-panel">
                <v-slider v-model="draftArt.backgroundLines.angle" label="Angle" :thumb-size="16" thumb-label="always" :max="359" :min="0" @update:model-value="redraw"></v-slider>
                <v-slider v-model="draftArt.backgroundLines.start" label="Départ" :thumb-size="16" thumb-label="always" :max="250" :min="-250" @update:model-value="redraw"></v-slider>
                <v-slider v-model="draftArt.backgroundLines.spread" label="Écart" :step="0.1" :thumb-size="16" thumb-label="always" :max="5" :min="1" @update:model-value="redraw"></v-slider>
              </v-card>
            </v-window-item>
            <v-window-item value="details">
              <v-card variant="outlined" class="pa-5 slider-panel" min-width="300">
                <v-slider v-model="draftArt.backgroundLines.strokeWidth" label="Épaisseur" :thumb-size="16" thumb-label="always" :max="50" :min="0" @update:model-value="redraw"></v-slider>
                <v-slider v-model="draftArt.backgroundLines.dashGap" label="Espace pointillé" :thumb-size="16" thumb-label="always" :max="100" :min="0" @update:model-value="redraw"></v-slider>
                <v-slider v-model="draftArt.backgroundLines.dashLength" label="Longueur pointillé" :thumb-size="16" thumb-label="always" :max="50" :min="1" @update:model-value="redraw"></v-slider>
              </v-card>
            </v-window-item>
          </v-window>
        </div>
      </v-window-item>

      <v-window-item value="background">
        <div class="editor-layout">
          <v-tabs v-model="backgroundTab" direction="vertical" color="primary">
            <v-tab value="details"><v-icon start>$pageNext</v-icon>Détails</v-tab>
            <v-tab v-if="showBckgColor(1)" value="color1"><v-icon start>$palette</v-icon>Couleur 1</v-tab>
            <v-tab v-if="showBckgColor(2)" value="color2"><v-icon start>$formatColorFill</v-icon>Couleur 2</v-tab>
            <v-tab v-if="showBckgColor(3)" value="color3"><v-icon start>$invertColors</v-icon>Couleur 3</v-tab>
          </v-tabs>
          <v-window v-model="backgroundTab" class="editor-content">
            <v-window-item value="details">
              <v-card variant="outlined" class="pa-5" min-width="300">
                <v-switch v-model="draftArt.background.radial" label="Radial" @update:model-value="redraw"></v-switch>
                <v-slider v-if="!draftArt.background.radial" v-model="draftArt.background.angle" label="Angle" :thumb-size="16" thumb-label="always" :max="359" :min="0" @update:model-value="redraw"></v-slider>
                <v-slider v-model="draftArt.background.nbColor" label="Nombre de couleurs" :thumb-size="16" :ticks="[1, 2, 3]" show-ticks="always" :max="3" :min="1" @update:model-value="redraw"></v-slider>
                <v-range-slider v-model="draftArt.background.colorStops" label="Position couleur" :thumb-size="16" :step="0.05" :max="1" :min="0" @update:model-value="redraw"></v-range-slider>
              </v-card>
            </v-window-item>
            <v-window-item v-for="number in visibleBackgroundColors" :key="number" :value="`color${number}`">
              <v-card variant="outlined" class="pa-4">
                <v-color-picker v-model="draftArt.background[`color${number}`]" :dot-size="25" hide-inputs @update:model-value="redraw"></v-color-picker>
              </v-card>
            </v-window-item>
          </v-window>
        </div>
      </v-window-item>
    </v-window>
  </v-container>
</template>

<script>
import PatternInputTab from './PatternInputTab.vue'

export default {
  name: 'Inputs',
  components: { PatternInputTab },
  props: ['artModel', 'seedValue'],
  emits: ['model-update', 'update:art-model', 'update:seed-value'],
  data() {
    return {
      tab: 'pattern1',
      lineTab: 'color',
      backgroundTab: 'details',
      draftArt: JSON.parse(JSON.stringify(this.artModel)),
      draftSeed: this.seedValue,
    }
  },
  computed: {
    visibleBackgroundColors() {
      return Array.from({ length: this.draftArt.background.nbColor }, (_, index) => index + 1)
    },
  },
  methods: {
    redraw() {
      this.$emit('update:art-model', JSON.parse(JSON.stringify(this.draftArt)))
      this.$emit('update:seed-value', this.draftSeed)
      this.$emit('model-update')
    },
    showBckgColor(number) { return this.draftArt.background.nbColor >= number },
  },
}
</script>

<style scoped>
.protocol-tabs {
  background: #f4f2ef;
  border: 1px solid #dedbd6;
  border-bottom: 0;
}

.protocol-tab {
  color: #3f4549;
  letter-spacing: 0.02em;
  opacity: 0.82;
  transition: background-color 180ms ease, color 180ms ease, opacity 180ms ease;
}

.protocol-tab--pattern1 {
  background: #f8e2d2;
}

.protocol-tab--pattern2 {
  background: #e9e0f5;
}

.protocol-tab--lines {
  background: #dcefe8;
}

.protocol-tab--background {
  background: #dde9f5;
}

.protocol-tab--pattern1.v-tab--selected {
  background: #eeb889;
  color: #5e3012;
}

.protocol-tab--pattern2.v-tab--selected {
  background: #c9b5e4;
  color: #402b5c;
}

.protocol-tab--lines.v-tab--selected {
  background: #a9d5c5;
  color: #194d3e;
}

.protocol-tab--background.v-tab--selected {
  background: #b5cde6;
  color: #203f5f;
}

.protocol-tab.v-tab--selected {
  opacity: 1;
}

.protocol-panel {
  border: 1px solid #dedbd6;
  border-top: 0;
  transition: background-color 180ms ease;
}

.protocol-panel--pattern1 {
  --protocol-panel-bg: #fff7f0;
  background: var(--protocol-panel-bg);
}

.protocol-panel--pattern2 {
  --protocol-panel-bg: #faf7ff;
  background: var(--protocol-panel-bg);
}

.protocol-panel--lines {
  --protocol-panel-bg: #f3fbf8;
  background: var(--protocol-panel-bg);
}

.protocol-panel--background {
  --protocol-panel-bg: #f4f8fc;
  background: var(--protocol-panel-bg);
}

.editor-layout {
  display: grid;
  grid-template-columns: minmax(135px, auto) minmax(0, 1fr);
  min-height: 330px;
  background: var(--protocol-panel-bg);
}

.editor-content {
  min-width: 0;
}

.slider-panel {
  padding-top: 44px !important;
}

@media (max-width: 600px) {
  .editor-layout {
    grid-template-columns: 128px minmax(0, 1fr);
  }
}
</style>
