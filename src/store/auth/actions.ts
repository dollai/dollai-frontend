
import { AxiosResponse } from 'axios';
import { ActionTree, ActionContext, Store } from 'vuex';
import { stringify } from 'qs';
import client from '@/registers/axios';
import { IAuthState } from './state';
import * as T from './types';
import { IRootState, PageNumberPaginationResponse } from '../types';


export default {

  async postAuth({ commit }, formdata: T.ILoginForm) {
    const data: T.IUser[] = require('@/../cypress/fixtures/users.json');
    const { username, password } = formdata;
    const index = data.findIndex((o) => o.username === username && o.password === password);
    if (index !== -1) {
      commit('updateUser', data[index]);
      localStorage.setItem('username', username);
      return data[index];
    }
    throw Error;
  },

  async fetchUser({ commit }, username: string) {
    const data: T.IUser[] = require('@/../cypress/fixtures/users.json');
    const index = data.findIndex((o) => o.username === username);
    if (index !== -1) {
      commit('updateUser', data[index]);
      localStorage.setItem('username', username);
      return data[index];
    }
    throw Error;
  },

} as ActionTree<IAuthState, IRootState>;
