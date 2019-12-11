import { Module, GetterTree } from 'vuex';
import { IAuthState } from './state';
import { IRootState } from '../types';
import * as T from './types';

export default {

  user(state: IAuthState): T.IUser | null {
    return state.user;
  },

  anonymousUser(state: IAuthState): T.IUser {
    return {
      username: '',
      name: '익명',
      password: '',
    };
  },

} as GetterTree<IAuthState, IRootState>;
