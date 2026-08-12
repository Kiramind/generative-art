<template>
  <v-dialog
    v-model="exportDialog"
    width="500"
  >
    <!-- <template v-slot:activator="{ on, attrs }">
      <v-btn color="gray lighten-2" v-bind="attrs" v-on="on">
        <v-icon left>mdi-application-export</v-icon>
        Debug modèle
      </v-btn>
    </template> -->

    <v-card>
      <v-card-title class="text-h5 bg-grey-lighten-2">
        Valeurs courantes
      </v-card-title>

      <v-card-text>
        {{ prettyModel() }}
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          variant="text"
          @click="copyExportData"
        >
        <v-icon start>$contentCopy</v-icon>
          Copier
        </v-btn>
        <v-btn
          color="primary"
          variant="text"
          @click="exportDialog = false"
        >
          Fermer
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  // import Util from '../util/util.js'

  export default {
    name: 'ExportModelDialog',
    props: ['model'],
    data: () => ({
      exportDialog: false,
    }),
    methods: {
      prettyModel() { return JSON.stringify(this.model)},
      copyExportData() {
        navigator.clipboard.writeText(this.prettyModel()).then(this.exportDialog = false)},
    },
  }
</script>
