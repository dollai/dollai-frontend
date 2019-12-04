import { MutationTree } from 'vuex';
import * as T from './types';
import { IStoryState } from './state';
import {ISettingState} from '@/store/settings/state';

export default {
  addPlayers(state: IStoryState, players: T.IPlayer[]) {
    players.forEach((o) => {
      const index = state.players.findIndex((p) => p.code === o.code);
      if (index === -1) {
        state.players.push(o);
      } else {
        state.players[index] = o;
      }
    });
  },

  updatePlayingYoutubeVideo(state: IStoryState, uid: string | null) {
    state.playingYoutubeVideo = uid;
  },
} as MutationTree<IStoryState>;
