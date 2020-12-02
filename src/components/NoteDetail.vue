<template>
  <div id="note" class="detail">
    <note-sidebar></note-sidebar>
    <div class="note-detail">
      <div class="note-bar">
        <span>创建日期：2天前</span>
        <span>更新日期：1s</span>
        <span>已保存</span>
        <span class="iconfont icon-delete"></span>
        <span class="iconfont icon-fullscreen"></span>
      </div>
      <div class="note-title">
        <input type="text" placeholder="请输入笔记名称" />
      </div>
      <div class="editor">
        <textarea v-show="true" placeholder="输入内容支持markdown语法"></textarea>
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

<style lang="less" >
@import url(../assets/css/noteDetail.less);

#note {
  display: flex;
  align-items: stretch;
  background: #fff;
  flex: 1;
}
</style>
