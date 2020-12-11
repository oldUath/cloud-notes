import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      alias:'/notebooks',
      component: () => import('@/components/NotebookList')
    },
    {
      path: '/login',
      component: () => import('@/components/Login')
    },
    {
      path: '/note',
      component:() => import('@/components/NoteDetail')
    },
    {
      path: '/trash',
      component:() => import('@/components/TrashDetail')
    }
  ]
})
