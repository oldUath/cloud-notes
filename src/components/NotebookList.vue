<template>
  <div id="notebook-list" class="detail">
    <header>
      <a href="#" class="btn" @click.prevent="onCreate"><i class="iconfont icon-plus"></i>新建笔记本</a>
    </header>
    <main>
      <div class="layout">
        <h3>笔记本列表{{ notebooks.length }}</h3>
        <div class="book-list">
          <router-link :to="`/note?notebookId=${item.id}`" v-for="(item, index) in notebooks" :key="index" class="notebook">
            <div>
              <span class="iconfont icon-notebook"></span>{{ item.title }} <span>{{ item.noteCounts }}</span
              ><span class="action" @click.stop.prevent="onEdit(item)">编辑</span>

              <span class="action" @click.stop.prevent="onDelete(item)">删除</span>
              <span class="date">{{ item.createdAt }}</span>
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
Auth.getInfo().then((res) => {
  console.log("用户信息", res.data);
});
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
      this.$prompt("请输入笔记本标题", "创建笔记本", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^.{1,30}$/,
        inputErrorMessage: "标题不能为空，且不超过30个字符",
      })
        .then(({ value }) => {
          return Notebooks.addNoteBook({ title: value });
        })
        .then((res) => {
          this.notebooks.unshift(res.data);
          this.$message({
            type: "success",
            message: res.msg,
          });
        })
      console.log("create...");
    },
    onEdit(item) {
      console.log("edit...");
      let title = "";
      this.$prompt("请输入笔记本标题", "修改笔记本", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^.{1,30}$/,
        inputValue:item.title,
        inputErrorMessage: "标题不能为空，且不超过30个字符",
      })
        .then(({ value }) => {
          title = value;
          return Notebooks.updateNotebook(item.id, { title });
        })
        .then((res) => {
          item.title = title;
          this.$message({
            type: "success",
            message: res.msg,
          });
        })
    },
    onDelete(item) {
      console.log("delete");
      this.$confirm("此操作将删除该笔记本, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 在后端删除掉
          return Notebooks.deleteNotebook(item.id);
        })
        .then((res) => {
          // 删除掉页面的
          this.notebooks.splice(this.notebooks.indexOf(item), 1);
          this.$message({
            type: "success",
            message: res.msg,
          });
        })
    },
  },
};
</script>

<style lang="less" scoped>
@import "../assets/css/notebookList.less";
</style>
