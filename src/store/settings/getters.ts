import { Module, GetterTree } from 'vuex';
import { ISettingState } from './state';
import { IRootState } from '../types';

export default {

  header(state: ISettingState): string | null {
    return state.header;
  },

} as GetterTree<ISettingState, IRootState>;
