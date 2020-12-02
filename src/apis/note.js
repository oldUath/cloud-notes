import request from '@/helpers/request'
import util from '@/helpers/util'

const URL = {
    GET:'/notes/from/:notebookId',
    ADD:'/notes/to/:notebookId',
    UPDATE:'/notes/:noteId',
    DELETE:'/notes/:noteId'
}

export default {
    getAll({notebookId}){
        return new Promise((resolve,reject)=>{
            request(URL.GET.replace(':notebookId',notebookId))
            .then(res=>{
               res.data = res.data.map(note=>{
                   note.createdAtFriendly = util.friendlyDate(note.createdAt)
                   note.updatedAtFriendly = util.friendlyDate(note.updatedAt)
                   return note
                }).sort((note1,note2)=>{
                    return note1.updatedAt < note2.updaatedAt
                })
                resolve(res)
            }).catch(err=>{
                reject(err)
            })
        })
    },
    updateNote({noteId},{title,content}){
        return request(URL.UPDATE.replace(':noteId',noteId),'PATCH',{title,content});
    },
    deleteNote({noteId}){
        return request(URL.DELETE.replace(':noteId',noteId),'DELETE')
    },
    addNote({notebookId},{title='',content=''}={title:'',content:''}){
        return request(URL.ADD.replace(':notebookId',notebookId),'POST',{title,content})
    }
}