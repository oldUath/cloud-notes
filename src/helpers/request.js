import axios from 'axios'
import baseURLConfig from './config-baeURL'
import {Message} from 'element-ui'
console.log(baseURLConfig)

axios.defaults.headers.post['Content-Type']='application/x-www-form-urlencoded'
axios.defaults.baseURL = 'http://note-server.hunger-valley.com'
axios.defaults.withCredentials=true

export default function request(url,type='GET',data ={}){
    return new Promise((resolve,reject)=>{

        let option={
            url,
            method:type,
            validateStatus(status){
                return(status>=200 && status<300) || status === 400
            }
        }
        if(type.toLowerCase()==='get'){
            option.params =data
        }else{
            option.data=data
        }
        axios(option).then(res=>{
            if(res.status === 200){
                resolve(res.data)
            }else{
                console.error(res.data)
                Message({
                    type:'error',
                    message:res.data.msg
                })
                reject(res.data)
            }
        }).catch(err=>{
            Message({
                type:'error',
                message:"网络异常"
            })
            reject({msg:'网络异常'})
        })
    })
}

// request('/auth/login','POST',{username:'hunger',password:'123456'})
//     .then(data=>{
//         console.log(data)
//     })