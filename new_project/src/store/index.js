import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    id:""
  },
  getters: {
  },
  mutations: {
    increment(state,n){
      state.id = n;
    }
  },
  actions: {
  },
  modules: {
  }
})
