import Vue from 'vue';
import Vuex from 'vuex';

import * as T from './types';
import { Store as settings } from './settings';

Vue.use(Vuex);

export const store = new Vuex.Store<T.IRootState>({
  modules: {
    settings,
  },
});
export default store;
