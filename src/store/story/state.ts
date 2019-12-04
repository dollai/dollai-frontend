import * as T from './types';

// tslint:disable-next-line:no-empty-interface
export interface IStoryState {
  players: T.IPlayer[];
}

const state: IStoryState = {
  players: [],
};

export default state;
