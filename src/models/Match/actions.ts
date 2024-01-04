import { actionCreatorFactory } from 'dva-model-creator';
import { MATCH } from '@/constant/namespace';

const actionCreator = actionCreatorFactory(MATCH);

// 增加
const add = actionCreator<void>('add');

// 减少
const minus = actionCreator<void>('minus');

const countActions = {
  add,
  minus,
};

export default countActions;
