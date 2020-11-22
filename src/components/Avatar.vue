<template>
  <span :title="user.username">{{slug}}</span>
</template>

<script>

  export default {
    data() {
      return {
        user: {
          username: '天王盖地虎'
        },
        slug: '天'
      }
    }
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