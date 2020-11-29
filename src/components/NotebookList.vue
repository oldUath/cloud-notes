<template>
  <div id="notebook-list" class="detail">
    <header>
      <a href="#" class="btn" @click="onCreate"><i class="iconfont icon-plus"></i>新建笔记本</a>
    </header>
    <main>
      <div class="layout">
        <h3>笔记本列表</h3>
        <div class="book-list">
          <a href="#" class="notebook">
            <div>
              <span class="iconfont icon-notebook"></span>笔记本标题1<span>3</span><span class="action" @click="onEdit">编辑</span>

              <span class="action" @click="onDelete">删除</span>
              <span class="date">3天谴</span>
            </div>
          </a>
          <a href="#" class="notebook">
            <div>
              <span class="iconfont icon-notebook"></span>笔记本标题1<span>3</span><span class="action">编辑</span>

              <span class="action">删除</span>
              <span class="date">3天谴</span>
            </div>
          </a>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Auth from "@/apis/auth";
import Notebooks from "@/apis/notebook";

window.notebooks = Notebooks;
export default {
  data() {
    return {
      msg: "笔记本列表",
    };
  },
  created() {
    Auth.getInfo().then((res) => {
      if (!res.isLogin) {
        this.$router.push({ path: "/login" });
      }
    });
  },
  methods: {
    onCreate() {
      console.log("create...");
    },
    onEdit(){
        console.log('edit...')
    },
    onDelete(){
        console.log('delete')
    }
  },
};
</script>

<style lang="less" scoped>
@import "../assets/css/notebookList.less";
</style>
