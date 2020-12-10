import Vue from 'vue'
import Vuex from 'vuex'
import notebook from './modules/notebook'
import note from './modules/note'
import user from './modules/user'
import trash from './modules/trash'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    notebook,
    note,
    user,
    trash
  }
})