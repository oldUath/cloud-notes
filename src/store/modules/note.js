import Note from '@/apis/note'
import {Message} from 'element-ui'

const state = {
    notes:[],
    curNote:{}
}
const getters ={
    // 最后获取数据
    notes:state=>state.notes
}
const mutations = {
    // 操作
    setNote(state,payload){
        state.notes = payload.notes
    },
    addNote(state,payload){
        state.notes.unshift(payload.note)
    },
    updateNote(state,payload){
        let note =state.notes.find(note=>note.id == payload.noteId)||{}
        note.title = payload.title;
        note.content = payload.content;
    },
    deleteNote(state,payload){
        state.notes = state.notes.filter(note=>note.id !== payload.noteId)
    }
}
const actions ={
    getNotes({commit},{notebookId}){
        Note.getAll({notebookId})
            .then(res=>{
                commit('setNote',{notes:res.data})
            })
    },

    addNote:({ commit }, {notebookId,title,content})=> {
         Note.addNote({notebookId},{ title,content})
          .then(res => {
            console.log('successs',res)
            commit('addNote', { note: res.data })
            Message.success(res.msg)
          })
      },

      updateNote({ commit }, {noteId,title,content}) {
        return Note.updateNote({noteId}, { title,content})
          .then(res => {
            commit('updateNotebook', { notebookId, title })
            Message.success(res.msg)
          
        })
      },

      deleteNote({ commit }, {noteId}) {
        return Note.deleteNote({noteId})
          .then(res => {
            commit('deleteNote', { noteId })
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