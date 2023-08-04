import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { useLaunch } from '@tarojs/taro';
import { dvaContainer } from '@/utils';
import './app.less';

function App({ children }: PropsWithChildren<any>) {
  useLaunch(() => {
    console.log('App launched.');
  });

  // children 是将要会渲染的页面
  return <Provider store={dvaContainer._store}>{children}</Provider>;
}

export default App;
