import Vue from 'vue';
import VModal from 'vue-js-modal';

Vue.use(
  VModal,
  {
    dialog: true,
    dynamicDefaults: { clickToClose: false },
    injectModalsContainer: true,
  },
);
