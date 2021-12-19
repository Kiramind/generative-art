import Vue from 'vue'
import Router from 'vue-router'
import App from './projects/App.vue'
import Carolinized from './projects/Carolinized.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'App',
      component: App
    },
    {
      path: '/generated_art',
      name: 'Carolinized',
      component: Carolinized
    },
    // {
    //   path: '/foo',
    //   name: 'App2',
    //   component: App2
    // },
  ]
})
