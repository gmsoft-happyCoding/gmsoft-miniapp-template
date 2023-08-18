import { DvaModelBuilder } from 'dva-model-creator';
import { USER_INFO } from '@/constant/namespace';
import type { State } from './type';

const defaultState = () => ({
  userName: '微信用户',
  avatar:
    'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
});

const model = new DvaModelBuilder<State>(defaultState(), USER_INFO).build();

export default model;
