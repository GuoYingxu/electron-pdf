import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      redirect:'/enter',
      component: require('@/components/HomePage').default,
      children:[
        {
          path:'/enter',
          name:'enter',
          component: require('@/components/EnterPage').default
        },
        {
          path:"/menu",
          name:'menu',
          component: require('@/components/MenuPage').default
        },
        {
          path:'/view/:name',
          name:'view',
          component: require('@/components/ViewPage').default
        },
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
