import { MutationTree } from 'vuex';
import * as T from './types';
import { ISettingState } from './state';

export default {
  updateHeader(state: ISettingState, header: string | null) {
    state.header = header;
  },
} as MutationTree<ISettingState>;
