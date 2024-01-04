import { DvaModelBuilder } from 'dva-model-creator';
import { MATCH } from '@/constant/namespace';
import actions from './actions';
import type { State } from './type';

const defaultState = () => ({
  count: 0,
});

const model = new DvaModelBuilder<State>(defaultState(), MATCH)
  .case(actions.add, ({ count }) => ({ count: count + 1 }))
  .case(actions.minus, ({ count }) => ({ count: count - 1 }))
  .build();

export default model;
