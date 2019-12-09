import { Module, GetterTree } from 'vuex';
import { IAuthState } from './state';
import { IRootState } from '../types';
import * as T from './types';

export default {

  user(state: IAuthState): T.IUser | null {
    return state.user;
  },

} as GetterTree<IAuthState, IRootState>;
