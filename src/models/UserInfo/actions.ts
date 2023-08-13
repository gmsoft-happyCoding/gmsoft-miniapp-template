import { actionCreatorFactory } from 'dva-model-creator';
import { USER_INFO } from '@/constant/namespace';

const actionCreator = actionCreatorFactory(USER_INFO);

// 增加
const add = actionCreator<void>('add');

// 减少
const minus = actionCreator<void>('minus');

const countActions = {
  add,
  minus,
};

export default countActions;
