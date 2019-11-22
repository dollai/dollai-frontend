
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

} as ActionTree<IStoryState, IRootState>;
