<template>
  <div id="note">
  <note-sidebar></note-sidebar>
    <div id="note-detail">
      <h1>notebookId: {{ $route.query.notebookId }}</h1>
      <h1>noteId: {{ $route.query.noteId }}</h1>
    </div>
  </div>
</template>

<script>
import Auth from "@/apis/auth";
import NoteSidebar from './NoteSidebar.vue';
export default {
  components: { NoteSidebar },
  data() {
    return {
      msg: "笔记详情页",
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

<style scoped>
#note{
  display: flex;
  align-items: stretch;
  background: #fff;
  flex: 1;
}
</style>
