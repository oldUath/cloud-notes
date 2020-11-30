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
      let title = window.prompt('创建新笔记本');
      if(title.trim() === ''){
        alert('笔记本名不能为空')
        return
      }
      Notebooks.addNoteBook({title}).then(res=>{
        console.log(res.data);
        alert(res.msg)
        this.notebooks.unshift(res.data)
        
        
      })

      console.log("create...");
    },
    onEdit(item) {
      console.log("edit...");
      let title = window.prompt('修改标题',item.title);
      Notebooks.updateNotebook(item.id,{title})
        .then(res=>{
          console.log(res)
          alert(res.msg)
          item.title = title
        })
    },
    onDelete(item) {
      console.log("delete");
      let isConfirm = window.confirm('你确定要删除吗')
      if(isConfirm){
        Notebooks.deleteNotebook(item.id).then(res=>{
          console.log(res)
          this.notebooks.splice(this.notebooks.indexOf(item),1)
          alert(res.msg)

        })
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "../assets/css/notebookList.less";
</style>
