<template>
  <div class="editor-layout">
    <v-tabs v-model="innerTab" direction="vertical" color="primary">
      <v-tab value="shapes"><v-icon start>$shape</v-icon>Formes</v-tab>
      <v-tab value="color"><v-icon start>$palette</v-icon>Couleur</v-tab>
      <v-tab value="border"><v-icon start>$borderOutside</v-icon>Bordure</v-tab>
      <v-tab value="details"><v-icon start>$pageNext</v-icon>Détails</v-tab>
    </v-tabs>

    <v-window v-model="innerTab" class="editor-content">
      <v-window-item value="shapes">
        <v-card variant="outlined" class="pa-4">
          <v-select
            v-model="draftPattern.type"
            :items="patternTypes"
            label="Type"
            variant="outlined"
            density="compact"
            @update:model-value="redraw"
          ></v-select>
          <v-text-field
            v-model="draftSeed"
            label="Position"
            @update:model-value="redraw"
          ></v-text-field>
        </v-card>
      </v-window-item>

      <v-window-item value="color">
        <v-card variant="outlined" class="pa-4">
          <v-color-picker
            v-model="draftPattern.fillColor"
            :dot-size="25"
            hide-inputs
            @update:model-value="redraw"
          ></v-color-picker>
        </v-card>
      </v-window-item>

      <v-window-item value="border">
        <v-card variant="outlined" class="pa-4">
          <v-color-picker
            v-model="draftPattern.strokeColor"
            :dot-size="25"
            hide-inputs
            @update:model-value="redraw"
          ></v-color-picker>
        </v-card>
      </v-window-item>

      <v-window-item value="details">
        <v-card variant="outlined" class="pa-5 slider-panel" min-width="300">
          <v-slider v-model="draftPattern.number" label="Densité" :thumb-size="16" thumb-label="always" :max="100" :min="10" @update:model-value="redraw"></v-slider>
          <v-slider v-if="showWidth()" v-model="draftPattern.width" label="Largeur" :thumb-size="16" thumb-label="always" :max="50" :min="5" @update:model-value="redraw"></v-slider>
          <v-slider v-if="showHeight()" v-model="draftPattern.height" label="Longueur" :thumb-size="16" thumb-label="always" :max="50" :min="5" @update:model-value="redraw"></v-slider>
          <v-slider v-if="showRadius1()" v-model="draftPattern.radius1" label="Rayon" :thumb-size="16" thumb-label="always" :max="50" :min="5" @update:model-value="redraw"></v-slider>
          <v-slider v-if="showRadius2()" v-model="draftPattern.radius2" label="Rayon 2" :thumb-size="16" thumb-label="always" :max="50" :min="5" @update:model-value="redraw"></v-slider>
          <v-slider v-if="showSides()" v-model="draftPattern.sides" label="Pointes" :thumb-size="16" thumb-label="always" :max="10" :min="3" @update:model-value="redraw"></v-slider>
        </v-card>
      </v-window-item>
    </v-window>
  </div>
</template>

<script>
export default {
  name: 'PatternInputTab',
  props: ['modelValue', 'seedValue'],
  emits: ['model-update', 'update:model-value', 'update:seed-value'],
  data() {
    return {
      patternTypes: ['rectangle', 'cercle', 'éllipse', 'polygone', 'étoile'],
      innerTab: 'shapes',
      draftPattern: JSON.parse(JSON.stringify(this.modelValue)),
      draftSeed: this.seedValue,
    }
  },
  methods: {
    redraw() {
      this.$emit('update:model-value', JSON.parse(JSON.stringify(this.draftPattern)))
      this.$emit('update:seed-value', this.draftSeed)
      this.$emit('model-update')
    },
    showWidth() { return ['éllipse', 'rectangle'].includes(this.draftPattern.type) },
    showHeight() { return ['éllipse', 'rectangle'].includes(this.draftPattern.type) },
    showRadius1() { return ['cercle', 'étoile', 'polygone'].includes(this.draftPattern.type) },
    showRadius2() { return this.draftPattern.type === 'étoile' },
    showSides() { return ['étoile', 'polygone'].includes(this.draftPattern.type) },
  },
}
</script>

<style scoped>
.editor-layout {
  display: grid;
  grid-template-columns: minmax(135px, auto) minmax(0, 1fr);
  min-height: 330px;
  background: var(--protocol-panel-bg, #fff);
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
