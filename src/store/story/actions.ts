
import { AxiosResponse } from 'axios';
import { ActionTree, ActionContext, Store } from 'vuex';
import { stringify } from 'qs';
import client from '@/registers/axios';
import { IStoryState } from './state';
import * as T from './types';
import { IRootState, PageNumberPaginationResponse } from '../types';

export default {

  async fetchStories({ commit }, params: any) {
    // const qs = params ? `?${stringify(params)}` : '';
    // const res: AxiosResponse = await client.get(`/stories/stories/${qs}`);
    const data: PageNumberPaginationResponse<T.IStory> = require('@/../cypress/fixtures/stories.json');
    return data;
  },

  async fetchStory({ commit }, code: string) {
    const data: PageNumberPaginationResponse<T.IStory> = require('@/../cypress/fixtures/stories.json');
    return data.results.find((o) => o.code === code) || null;
  },

  async fetchScene({ commit }, uid: string) {
    const data: PageNumberPaginationResponse<T.IScene> = require('@/../cypress/fixtures/scenes.json');
    return data.results.find((o) => o.uid === uid) || null;
  },

  async fetchMessage({ commit }, uid: string) {
    const data: T.IMessage = require(`@/../cypress/fixtures/messages/${uid}.json`);
    return data;
  },
} as ActionTree<IStoryState, IRootState>;
