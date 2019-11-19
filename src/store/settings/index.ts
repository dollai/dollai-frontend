import { Module } from 'vuex';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';
import state, { ISettingState } from './state';
import { IRootState } from '../types';


const namespaced: boolean = true;

export const Store: Module<ISettingState, IRootState> = {
  namespaced,
  state,
  actions,
  getters,
  mutations,
};
