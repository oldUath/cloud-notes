<template>
  <div id="note" class="detail">
    <note-sidebar @update:notes="(val) => (notes = val)"></note-sidebar>
    <div class="note-detail">
      <div class="note-empty" v-show="!curNote.id">请选择笔记</div>
      <div v-show="curNote.id" class="note-detail-ct" >
        <div class="note-bar">
          <span>创建日期：{{ curNote.createdAtFriendly }}</span>
          <span>更新日期：{{ curNote.updatedAtFriendly }}</span>
          <span>{{ statusText }}</span>
          <span class="iconfont icon-delete" @click="deleteNote"></span>
          <span class="iconfont icon-fullscreen" @click="isShowPreview = !isShowPreview"></span>
        </div>
        <div class="note-title">
          <input type="text" placeholder="请输入笔记名称" @keydown="statusText='正在输入...'" @input="updateNote" v-model="curNote.title" />
        </div>
        <div class="editor">
          <textarea v-show="!isShowPreview" v-model="curNote.content" @input="updateNote" @keydown="statusText='正在输入...'" placeholder="输入内容支持markdown语法"></textarea>
          <div class="preview markdown-body" v-html="previewContent" v-show="isShowPreview">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Auth from "@/apis/auth";
import NoteSidebar from "./NoteSidebar.vue";
import Bus from "@/helpers/bus";
// 节流函数，当用户输入完后才进行保存
import _ from 'lodash'
import Notes from '../apis/note'
//使用markdown
import MarkdownIt from 'markdown-it'
let md = new MarkdownIt();

import {mapState,mapMutations,mapActions,mapGetters} from 'vuex'


export default {
  components: { NoteSidebar },
  data() {
    return {
      curNote: {}, //当前选中的note
      notes: [], //所有的note
      statusText:'笔记未改动',
      isShowPreview:false
    };
  },
  created() {
    console.log('this.notes',this.notes)
    Auth.getInfo().then((res) => {
      if (!res.isLogin) {
        this.$router.push({ path: "/login" });
      }
    });
    Bus.$once("update:notes", (val) => {
      this.curNote = val.find((note) => note.id == this.$route.query.noteId) || {};
    });
  },
  computed:{
    previewContent(){
      return md.render(this.curNote.content|| "")
    }
  },
  methods: {
    updateNote:_.debounce(function(){
      Notes.updateNote({noteId:this.curNote.id},{title:this.curNote.title,
      content:this.curNote.content})
        .then(data=>{
          this.statusText='已保存'
        }).catch(data=>{
          this.statusText='保存出错'
        })

    },300),
    deleteNote(){
      Notes.deleteNote({noteId:this.curNote.id})
        .then(data=>{
          console.log(this.notes.notesCount)
          this.$message.success(data.msg)
          // 删除后从notes中也删掉
          this.notes.splice(this.notes.indexOf(this.curNote),1)
          this.$router.replace({path:'/note'})
        })
    }
  },

  // 路由守卫
  beforeRouteUpdate(to, from, next) {
    console.log("beforeRouteUpdate");
    console.log(to, from);
    this.curNote = this.notes.find((note) => note.id == to.query.noteId);
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
