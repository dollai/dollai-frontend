import { Module, GetterTree } from 'vuex';
import { IStoryState } from './state';
import { IRootState } from '../types';
import {ISettingState} from '@/store/settings/state';
import * as T from './types';

export default {

  players(state: IStoryState): T.IPlayer[] {
    return state.players;
  },

} as GetterTree<IStoryState, IRootState>;
