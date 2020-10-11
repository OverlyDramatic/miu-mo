import Vue from 'vue'
import Vuex from 'vuex'
// * modules
import window from './modules/window.store'
import app from './modules/app.store'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    window,
    app
  }
})
