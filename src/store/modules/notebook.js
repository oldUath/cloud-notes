import Notebook from '@/apis/notebook'
import {Message} from 'element-ui'

const state = {
    notebooks:[]
}
const getters ={
    // 最后获取数据
    notebooks:state=>state.notebooks
}
const mutations = {
    // 操作
    setNotebooks(state,payload){
        state.notebooks = payload.notebooks
    },
    addNotebook(state,payload){
        state.notebooks.unshift(payload.notebooks)
    },
    updateNotebook(state,payload){
        let notebook =state.notebooks.find(notebook=>notebook.id == payload.notebookId)||{}
        notebook.title = payload.title
    },
    deleteNotebook(state,payload){
        state.notebooks = state.notebooks.filter(notebook=>notebook.id !== payload.notebookId)
    }
}
const actions ={
    getNotebooks({commit}){
        Notebook.getAll()
            .then(res=>{
                commit('setNotebooks',{notebooks:res.data})
            })
    },

    addNotebook:({ commit }, payload)=> {
        console.log('222')
        return Notebook.addNoteBook({ title: payload.title })
          .then(res => {
            console.log('successs',res)
            commit('addNotebook', { notebook: res.data })
            Message.success(res.msg)
          })
      },

      updateNotebook({ commit }, payload) {
        return Notebook.updateNotebook(payload.notebookId, { title: payload.title })
          .then(res => {
            commit('updateNotebook', { notebookId: payload.notebookId, title: payload.title })
            Message.success(res.msg)
          
        })
      },

      deleteNotebook({ commit }, payload) {
        return Notebook.deleteNotebook(payload.notebookId)
          .then(res => {
            commit('deleteNotebook', { notebookId: payload.notebookId })
            Message.success(res.msg)

          })
      } 
}

export default {
    state,
    getters,
    mutations,
    actions
}