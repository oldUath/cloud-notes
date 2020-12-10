<template>
  <div class="detail" id="trash">
    <div class="note-sidebar">
      <h3 class="notebook-title">回收站</h3>
      <div class="menu">
        <div>更新时间</div>
        <div>标题</div>
      </div>
      <ul class="notes">
        <li v-for="(note, index) in trashNotes" :key="index">
          <router-link :to="`/trash?noteId=${note.id}`">
            <span class="date">{{ note.updatedAtFriendly }}</span>
            <span class="title">{{ note.title }}</span>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="note-detail">
      <div class="note-bar" v-if="true">
        <span> 创建日期: {{ curTrashNote.createdAtFriendly }}</span>
        <span> | </span>
        <span> 更新日期: {{ curTrashNote.updatedAtFriendly }}</span>
        <span> | </span>
        <span> 所属笔记本: {{ belongTo }}</span>

        <a class="btn action" @click="onRevert">恢复</a>
        <a class="btn action" @click="onDelete">彻底删除</a>
      </div>
      <div class="note-title">
        <span>{{ curTrashNote.title }}</span>
      </div>
      <div class="editor">
        <div class="preview markdown-body" v-html="compiledMarkdown"></div>
      </div>
    </div>
  </div>
</template>
<script>
import Auth from "@/apis/auth";
import MarkdownIt from "markdown-it";

let md = new MarkdownIt();

export default {
  data() {
    return {
      msg: "笔记本回收",
      curTrashNote: {
        id: 3,
        title: "笔记",
        content: "### dddd",
        createdAtFriendly: "2小时前",
        updatedAtFriendly: "刚刚",
      },
      belongTo: "我的笔记本",
      trashNotes: [
        {
          id: 1,
          title: "笔记1",
          content: "### dd1dd",
          createdAtFriendly: "2小时前",
          updatedAtFriendly: "刚刚",
        },
        {
          id: 2,
          title: "笔记2",
          content: "### ddd2d",
          createdAtFriendly: "2小时前",
          updatedAtFriendly: "刚刚",
        },
        {
          id: 3,
          title: "笔记3",
          content: "### dddd3",
          createdAtFriendly: "2小时前",
          updatedAtFriendly: "刚刚",
        },
      ],
    };
  },
  created() {
    Auth.getInfo().then((res) => {
      if (!res.isLogin) {
        this.$router.push({ path: "/login" });
      }
    });
  },
  computed: {
    compiledMarkdown() {
      return md.render(this.curTrashNote.content || "");
    },
  },
  methods: {
    onDelete() {
      console.log("onDelete");
    },
    onRevert() {
      console.log("revert");
    },
  },
};
</script>

<style lang='less'>
@import url(../assets/css/noteSidebar.less);
@import url(../assets/css/noteDetail.less);
#trash {
  display: flex;
  align-items: stretch;
  background-color: #fff;
  flex: 1;

  .note-bar {
    .action {
      float: right;
      margin-left: 10px;
      padding: 2px 4px;
      font-size: 12px;

    }
  }
 }
</style>
