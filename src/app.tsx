import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { useLaunch } from '@tarojs/taro';
import { stateContainer } from '@/utils';
import { model } from '@/models/UserInfo';
import './app.scss';

stateContainer.injectModel(model);

function App({ children }: PropsWithChildren<any>) {
  useLaunch(() => {
    console.log('App launched.');
  });

  // children 是将要会渲染的页面
  return <Provider store={stateContainer._store}>{children}</Provider>;
}

export default App;
