import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { useLaunch } from '@tarojs/taro';
import { stateContainer } from '@/utils';
import { model } from '@/models/UserInfo';
import { model as matchModel } from '@/models/Match';
import './app.scss';

stateContainer.injectModel(model);

stateContainer.injectModel(matchModel);

function App({ children }: PropsWithChildren<any>) {
  useLaunch(() => {
    console.log('App launched.');
  });

  // children 是将要会渲染的页面
  return <Provider store={stateContainer._store}>{children}</Provider>;
}

export default App;
