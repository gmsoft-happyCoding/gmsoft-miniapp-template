import { DvaModelBuilder } from 'dva-model-creator';
import { COUNT } from '@/constant/namespace';
import countActions from './actions';
import type { State } from './type';

const defaultState = () => 0;

const model = new DvaModelBuilder<State>(defaultState(), COUNT)
  .case(countActions.add, state => ++state)
  .case(countActions.minus, state => --state)
  .build();

export default model;
