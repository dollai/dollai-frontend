import Vue from 'vue';
import './plugins/vee-validate';
import App from './App.vue';
import router from './router';
import store from './store';
import './registers/modal';

Vue.config.productionTip = false;

const app = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

if ((window as any).Cypress) {
  (window as any).app = app;
}
