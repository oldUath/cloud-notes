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
          <span class="iconfont icon-trash" @click="onDeleteNote"></span>
          <span class="iconfont icon-bianji" v-show="!isShowPreview" @click="isShowPreview = !isShowPreview"></span>
          <span class="iconfont icon-xianshi" @click="isShowPreview = !isShowPreview" v-show="isShowPreview" ></span>
        </div>
        <div class="note-title">
          <input type="text" placeholder="请输入笔记名称" @keydown="statusText='正在输入...'" @input="onUpdateNote" v-model="curNote.title" />
        </div>
        <div class="editor">
          <textarea v-show="!isShowPreview" v-model="curNote.content" @input="onUpdateNote" @keydown="statusText='正在输入...'" placeholder="输入内容支持markdown语法"></textarea>
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
// 节流函数，当用户输入完后才进行保存
import _ from 'lodash'
//使用markdown
import MarkdownIt from 'markdown-it'
import {mapState,mapMutations,mapActions,mapGetters} from 'vuex'

let md = new MarkdownIt();



export default {
  components: { NoteSidebar },
    
  data() {
    return {
      statusText:'笔记未改动',
      isShowPreview:false
    };
  },
  created() {
    console.log('this.notes',this.notes)
    this.checkLogin({ path: "/login" })


  },
computed:{
    // 获取vuex的数据
    ...mapGetters([
      'notes',
      'curNote'
    ]),
    previewContent(){
      return md.render(this.curNote.content|| "")
    }
  },
  methods: {
    ...mapMutations([
      'setCurNote'
    ]),
    ...mapActions([
      'updateNote',
      'deleteNote',
      'checkLogin'

    ]),
    onUpdateNote:_.debounce(function(){
      this.updateNote({noteId:this.curNote.id,title:this.curNote.title,
      content:this.curNote.content})
        .then(data=>{
          this.statusText='已保存'
        }).catch(data=>{
          this.statusText='保存出错'
        })

    },300),
    onDeleteNote(){
      this.deleteNote({noteId:this.curNote.id})
        .then(data=>{
          this.$router.replace({path:'/note'})
        })
    }
  },

  // 路由守卫
  beforeRouteUpdate(to, from, next) {
    this.setCurNote({curNoteId:to.query.noteId})
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
.icon-bianji{
  color: red!important;
}
</style>
