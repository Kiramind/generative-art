import { createApp } from 'vue'
import Main from './Main.vue'
import vuetify from './plugins/vuetify.js'
import router from './routes.js'
import 'vuetify/styles'

createApp(Main)
  .use(router)
  .use(vuetify)
  .mount('#app')
