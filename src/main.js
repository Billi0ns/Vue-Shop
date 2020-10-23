import Vue from 'vue';
import {
  ButtonPlugin,
  FormPlugin,
  FormCheckboxPlugin,
  FormFilePlugin,
  FormTextareaPlugin,
  FormInputPlugin,
  FormSpinbuttonPlugin,
  FormGroupPlugin,
  ImagePlugin,
  InputGroupPlugin,
  LayoutPlugin,
  ModalPlugin,
  NavbarPlugin,
  ToastPlugin,
} from 'bootstrap-vue';

import App from './App.vue';
import router from './router';
import store from './store';
import { fb } from './firebase';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

[
  ButtonPlugin,
  FormPlugin,
  FormCheckboxPlugin,
  FormFilePlugin,
  FormTextareaPlugin,
  FormInputPlugin,
  FormSpinbuttonPlugin,
  FormGroupPlugin,
  ImagePlugin,
  InputGroupPlugin,
  LayoutPlugin,
  ModalPlugin,
  NavbarPlugin,
  ToastPlugin,
].forEach((comp) => {
  Vue.use(comp);
});
Vue.config.productionTip = false;

let app = '';
// Initialize app only when Firebase Auth object is ready to use
fb.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
      beforeCreate() {
        this.$store.commit('initializeCart');
      },
    }).$mount('#app');
  }
});

Vue.mixin({
  methods: {
    $_makeToast(msg) {
      this.$bvToast.toast(msg, {
        autoHideDelay: 1000,
        variant: 'success',
        solid: true,
        noCloseButton: true,
      });
    },
  },
});

// Move this before new Vue created if any problem occur
Vue.filter('formatNumber', (value) => {
  const formattedNum = Number(value).toLocaleString('en-US');
  const currency = `NT$${formattedNum}`;
  return currency;
});
