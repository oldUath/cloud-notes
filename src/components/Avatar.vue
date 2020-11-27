<template>
  <span :title="username">{{slug}}</span>
</template>

<script>
import Auth from '@/apis/auth'
import Bus from '@/helpers/bus'

  export default {
    data() {
      return {
          username: '盖地虎'
      }
    },
    created(){
      Bus.$on('userInfo',user=>{
        this.username = user.username
      });
      Auth.getInfo().then(res=>{
        if(res.isLogin){
          this.username = res.data.username
          console.log(this.username)
        }
      })
    },
    computed:{
      slug(){
        return this.username.charAt(0)
      }
    },
  }
</script>

<style scoped>

span {
  display: inline-block;
  width: 50px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  border-radius: 50%;
  background: #f2b81c;
  color: #fff;
  text-shadow: 1px 0 1px #795c19;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 28px;
  margin-top: 20px;
}
</style>