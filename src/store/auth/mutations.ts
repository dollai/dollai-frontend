import { MutationTree } from 'vuex';
import * as T from './types';
import { IAuthState } from './state';

export default {
  updateUser(state: IAuthState, user: T.IUser) {
    state.user = user;
  },
} as MutationTree<IAuthState>;
