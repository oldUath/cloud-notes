<template>
  <div id="notebook-list" class="detail">
    <header>
      <a href="#" class="btn" @click.prevent="onCreate"><i class="iconfont icon-plus"></i>新建笔记本</a>
    </header>
    <main>
      <div class="layout">
        <h3>笔记本列表{{notebooks.length}}</h3>
        <div class="book-list">
          <router-link to="/note/1" v-for="(item, index) in notebooks" :key="index" class="notebook">
            <div>
              <span class="iconfont icon-notebook"></span>{{item.title}}
              <span>{{item.noteCounts}}</span><span class="action" @click.stop.prevent="onEdit(item)">编辑</span>

              <span class="action" @click.stop.prevent="onDelete(item)">删除</span>
              <span class="date">3天谴</span>
            </div>
          </router-link>
          
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Auth from "@/apis/auth";
import Notebooks from "@/apis/notebook";
Auth.getInfo().then(res=>{
  console.log('用户信息',res.data)
})
export default {
  data() {
    return {
      msg: "笔记本列表",
      notebooks: [],
    };
  },
  created() {
    Auth.getInfo().then((res) => {
      if (!res.isLogin) {
        this.$router.push({ path: "/login" });
      }
    });
    Notebooks.getAll().then((res) => {
      this.notebooks = res.data;
      console.log(res.data);
    });
  },
  methods: {
    onCreate() {
      console.log("create...");
    },
    onEdit(item) {
      console.log("edit...");
    },
    onDelete(item) {
      console.log("delete");
    },
  },
};
</script>

<style lang="less" scoped>
@import "../assets/css/notebookList.less";
</style>
