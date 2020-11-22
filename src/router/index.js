import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Notebooks from '@/components/NotebookList'
import Note from '@/components/NoteDetail'
import Trash from '@/components/TrashDetail'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: HelloWorld
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/notebooks',
      component:Notebooks
    },
    {
      path: '/note/:noteId',
      component:Note
    },
    {
      path: '/trash/:noteId',
      component:Trash
    }
  ]
})
