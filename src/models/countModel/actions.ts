import { actionCreatorFactory } from 'dva-model-creator';
import { COUNT } from '@/constant/namespace';

const actionCreator = actionCreatorFactory(COUNT);

// 增加
const add = actionCreator<void>('add');

// 减少
const minus = actionCreator<void>('minus');

const countActions = {
  add,
  minus,
};

export default countActions;
