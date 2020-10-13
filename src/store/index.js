import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentProduct: {},
    showCartModal: false,
    cart: [],
  },
  mutations: {
    setCurrentProduct(state, payload) {
      state.currentProduct = { ...payload };
    },
    toggleCartModal(state, payload) {
      state.showCartModal = payload;
    },
  },
  actions: {},
  modules: {},
});
