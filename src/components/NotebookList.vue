<template>
  <div id="notebook-list" class="detail">
    <header>
      <a href="#" class="btn"><i class="iconfont icon-plus"></i>新建笔记本</a>
    </header>
    <main>
        <div class="layout">
            <h3>笔记本列表</h3>
            <div class="book-list">
                <a href="#" class="notebook"> 
                    <div>
                        <span class="iconfont icon-notebook">笔记本标题1<span class="count">3</span><span class="action">编辑</span></span>
                        
                        <span class="action">删除</span>
                        <span class="date">3天谴</span>
                    </div>
                </a>
                 <a href="#" class="notebook">
                    <div>
                        <span class="iconfont icon-notebook">笔记本标题2<span class="count">3</span><span class="action">编辑</span></span>
                        
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
};
</script>

<style lang="less" scoped>
    @import '../assets/css/notebookList.less';
</style>



