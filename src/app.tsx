import { PropsWithChildren, useEffect, useContext } from 'react';
import { Provider } from 'react-redux';
import Taro, { useLaunch } from '@tarojs/taro';
import { dvaContainer } from '@/utils';
import { model } from '@/models/UserInfo';
import './app.less';

dvaContainer.injectModel(model);

function App({ children }: PropsWithChildren<any>) {
  useLaunch(() => {
    console.log('App launched.');
  });

  useEffect(() => {
    const taroGlobalData = Taro.getApp();

    taroGlobalData.a = 1;
  }, []);

  // children 是将要会渲染的页面
  return <Provider store={dvaContainer._store}>{children}</Provider>;
}

export default App;
