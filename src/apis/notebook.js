import request from '@/helpers/request'

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
        return request(URL.ADD,'POST',{title})
    }
}