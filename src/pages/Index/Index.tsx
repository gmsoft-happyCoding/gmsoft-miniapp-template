import { useEffect } from 'react';
import { View, Text, Button, Navigator } from '@tarojs/components';
import { get } from 'lodash';
import Taro, { useLoad } from '@tarojs/taro';
import { dvaContainer } from '@/utils';
import { model } from '@/models/countModel';
import { useGetUserInfo } from '@/hooks';
import useHandleIndex from './useHandleIndex';
import './index.less';

dvaContainer.injectModel(model);

export default function Index() {
  useLoad(() => {
    console.log('Page loaded.');
  });

  const { count, disPatch } = useHandleIndex();

  const userInfo = useGetUserInfo();

  useEffect(() => {
    const taroGlobalData = Taro.getApp();

    setTimeout(() => {
      taroGlobalData.a = 100;
    }, 5000);
  }, []);

  return (
    <View className="index">
      <Text>{count}</Text>

      <Button
        onClick={() => {
          disPatch.add();
        }}
      >
        增加+
      </Button>
      <Button
        onClick={() => {
          disPatch.minus();
        }}
      >
        减少-
      </Button>

      <View>
        <Text>{get(userInfo, 'userName')}</Text>
      </View>
      <Navigator url="/sub/pages/Index/Index">
        <Button>跳转本地子页面</Button>
      </Navigator>

      <Navigator url="/subminiapp/sub-one/pages/sub/index">
        <Button>跳转子页面</Button>
      </Navigator>
    </View>
  );
}
