import Vue from 'vue';
import Vuex from 'vuex';

import * as T from './types';
import { Store as settings } from './settings';
import { Store as story } from './story';

Vue.use(Vuex);

export const store = new Vuex.Store<T.IRootState>({
  modules: {
    settings,
    story,
  },
});
export default store;
