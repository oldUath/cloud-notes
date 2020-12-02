<template>
  <div id="note" class="detail">
    <note-sidebar @update:notes="val => notes=val"></note-sidebar>
    <div class="note-detail">
      <div class="note-bar">
        <span>创建日期：{{ curNote.createdAtFriendly }}</span>
        <span>更新日期：{{ curNote.updatedAtFriendly }}</span>
        <span>{{ curNote.statusText }}</span>
        <span class="iconfont icon-delete"></span>
        <span class="iconfont icon-fullscreen"></span>
      </div>
      <div class="note-title">
        <input type="text" placeholder="请输入笔记名称" :value="curNote.title" />
      </div>
      <div class="editor">
        <textarea v-show="true" :value="curNote.content" placeholder="输入内容支持markdown语法"></textarea>
        <div class="preview markdown-body" v-html="false" v-show="false"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Auth from "@/apis/auth";
import NoteSidebar from "./NoteSidebar.vue";
export default {
  components: { NoteSidebar },
  data() {
    return {
      curNote:{},//当前选中的note
      notes:[],//所有的note
    };
  },
  created() {
    Auth.getInfo().then((res) => {
      if (!res.isLogin) {
        this.$router.push({ path: "/login" });
      }
    })
  },
  // 路由守卫
  beforeRouteUpdate(to,from,next){
    console.log('beforeRouteUpdate')
    console.log(to,from)
    this.curNote = this.notes.find(note => note.id == to.query.noteId) 
    next();
  },
};
</script>

<style lang="less">
@import url(../assets/css/noteDetail.less);

#note {
  display: flex;
  align-items: stretch;
  background: #fff;
  flex: 1;
}
</style>
