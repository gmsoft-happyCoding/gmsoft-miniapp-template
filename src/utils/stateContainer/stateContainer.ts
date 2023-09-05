import { create } from 'dva-core';
import createLoading from 'dva-loading';
import type { StateContainer, Model, ArgsI } from './type';

// model namespace cache
const cached = {};

let stateContainer: any;

if (process.env.TARO_ENV === 'weapp') {
  stateContainer = wx['_stateContainer_'];
}

if (process.env.TARO_ENV === 'dd') {
  stateContainer = dd['_stateContainer_'];
}

// eslint-disable-next-line no-console
const defaultOnError = (err: any) => console.error(err);

const createStateContainer = ({
  NODE_ENV = 'production',
  onError = defaultOnError,
}: ArgsI = {}) => {
  if (stateContainer) return stateContainer as StateContainer;

  stateContainer = create({ onError });

  if (process.env.TARO_ENV === 'weapp') {
    wx['_stateContainer_'] = stateContainer;
  }

  if (process.env.TARO_ENV === 'dd') {
    dd['_stateContainer_'] = stateContainer;
  }

  stateContainer.use(createLoading());

  /**
   * dynamic inject dva model to stateContainer
   * if replace=true, same namespace model will be replaced
   */
  stateContainer.injectModel = (model: Model, replace = false) => {
    // @ts-ignore
    const m = model.default || model;
    if (replace || NODE_ENV === 'development') {
      // Replace a model if it exsits, if not, add it to app
      stateContainer.replaceModel(m);
    } else if (!cached[m.namespace]) {
      stateContainer.model(m);
    }
    cached[m.namespace] = 1;
    return m;
  };

  stateContainer.start();

  return stateContainer as StateContainer;
};

export default createStateContainer({
  NODE_ENV: process.env.NODE_ENV,
  onError: err => {
    console.error(err);
  },
});
