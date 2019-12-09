import Vue from 'vue';
import Vuex from 'vuex';

import * as T from './types';
import { Store as settings } from './settings';
import { Store as story } from './story';
import { Store as auth } from './auth';

Vue.use(Vuex);

export const store = new Vuex.Store<T.IRootState>({
  modules: {
    settings,
    story,
    auth,
  },
});
export default store;
