import Notebook from '@/apis/notebook'

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
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}