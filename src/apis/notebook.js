import request from '@/helpers/request'
import util from '@/helpers/util'

const URL = {
    GET:'/notebooks',
    ADD:'/notebooks',
    UPDATE:'/notebooks/:id',
    DELETE:'/notebooks/:id'
}

export default {
    getAll(){
        return new Promise((resolve,reject)=>{
            request(URL.GET).then(res=>{
                // 获取到笔记本信息，然后进行排序,最新的在前面
                res.data = res.data.sort((notebook1,notebook2)=>notebook1.createdAt<notebook2.createdAt)
                res.data.forEach(notebook=>{
                        notebook.createdAtFriendly = util.friendlyDate(notebook.createdAt);
                        notebook.updatedAtFriendly = util.friendlyDate(notebook.updatedAt)
                    })
                resolve(res)
            }).catch(err=>{
                reject(err)
            })
        })
    },
    updateNotebook(notebookId,{title=""}={title:""}){
        return request(URL.UPDATE.replace(':id',notebookId),'PATCH',{title});
    },
    deleteNotebook(notebookId){
        return request(URL.DELETE.replace(':id',notebookId),'DELETE')
    },
    addNoteBook({title=''}={title:''}){
        return new Promise((resolve, reject) => {
             request(URL.ADD, 'POST', { title })
              .then(res => {
                res.data.createdAtFriendly = util.friendlyDate(res.data.createdAt)
                res.data.updatedAtFriendly = util.friendlyDate(res.data.updatedAt)
                resolve(res)
              }).catch(err => {
                reject(err)
              })
          })
    }
}