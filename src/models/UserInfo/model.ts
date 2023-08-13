import { DvaModelBuilder } from 'dva-model-creator';
import { USER_INFO } from '@/constant/namespace';
import type { State } from './type';

const defaultState = () => ({
  userName: '徐涛',
});

const model = new DvaModelBuilder<State>(defaultState(), USER_INFO).build();

export default model;
