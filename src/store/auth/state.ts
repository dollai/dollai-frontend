import * as T from './types';

// tslint:disable-next-line:no-empty-interface
export interface IAuthState {
  user: T.IUser | null;
}

const state: IAuthState = {
  user: null,
};

export default state;
