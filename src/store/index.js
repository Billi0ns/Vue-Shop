import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentProduct: {},
    showCartModal: false,
    showCartListSlider: false,
    cartItems: [],
    defaultRoute: true,
  },
  mutations: {
    setCurrentProduct(state, payload) {
      state.currentProduct = { ...payload };
    },
    resetCurrentProduct(state) {
      state.currentProduct = {};
    },
    toggleCartModal(state, payload) {
      state.showCartModal = payload;
    },
    toggleCartListSlider(state, payload) {
      state.showCartListSlider = payload;
    },
    initializeCart(state) {
      const localCart = localStorage.getItem('cartItems');
      if (localCart) {
        state.cartItems = JSON.parse(localCart);
        console.log('cart yes');
      } else {
        console.log('cart no');
      }
    },
    addToCart(state, payload) {
      const found = state.cartItems.find((item) => item.id === payload.id);

      if (found) {
        found.amount += payload.amount;
      } else {
        state.cartItems.push(payload);
      }

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    deleteCartItem(state, payload) {
      const found = state.cartItems.find((item) => item.id === payload);
      const index = state.cartItems.indexOf(found);

      if (found) {
        state.cartItems.splice(index, 1);
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    updateCart(state, payload) {
      const found = state.cartItems.find((item) => item.id === payload.id);

      found.amount = payload.amount;
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    resetCart(state) {
      state.cartItems = [];
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    changeDefaultRoute(state, payload) {
      state.defaultRoute = payload;
    },
  },
  actions: {},
  modules: {},
});
