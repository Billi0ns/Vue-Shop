import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentProduct: {},
  },
  mutations: {
    setCurrentProduct(state, payload) {
      state.currentProduct = { ...payload };
    },
  },
  actions: {},
  modules: {},
});
