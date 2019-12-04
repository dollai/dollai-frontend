import * as T from './types';

// tslint:disable-next-line:no-empty-interface
export interface IStoryState {
  players: T.IPlayer[];
  playingYoutubeVideo: string | null;
}

const state: IStoryState = {
  players: [],
  playingYoutubeVideo: null,
};

export default state;
