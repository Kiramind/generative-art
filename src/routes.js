import { createRouter, createWebHashHistory } from 'vue-router'
import App from './projects/App.vue'
import Carolinized from './projects/Carolinized.vue'

export default createRouter({
  history: createWebHashHistory(),
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
    }
  ]
})
