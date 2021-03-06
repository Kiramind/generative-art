import Vue from 'vue'
import Main from './Main.vue'
import vuetify from './plugins/vuetify'
import router from './routes.js'

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(Main)
}).$mount('#app')
