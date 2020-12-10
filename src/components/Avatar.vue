<template>
  <span :title="username">{{slug}}</span>
</template>

<script>
import Auth from '@/apis/auth'
import {mapGetters,mapActions} from 'vuex'

  export default {
    data() {
      return {}
    },
    created(){
      this.setUser()
    },
    methods: {
      ...mapActions({
        'setUser':'checkLogin'
      })
    },
    computed:{
      ...mapGetters([
        'username',
        'slug'
      ])
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