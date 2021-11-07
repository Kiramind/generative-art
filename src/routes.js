import Vue from 'vue'
import Router from 'vue-router'
import App from './projects/App.vue'

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
      name: 'App',
      component: App
    },
    // {
    //   path: '/foo',
    //   name: 'App2',
    //   component: App2
    // },
  ]
})
