// import { useCallback, useEffect } from 'react';
import { View, Text, Button } from '@tarojs/components';
import { useLoad } from '@tarojs/taro';
// import { djcGatewayStddataApi } from '@/api';
import { dvaContainer } from '@/utils';
import { model } from '@/models/countModel';
import useHandleIndex from './useHandleIndex';
import './index.less';

dvaContainer.injectModel(model);

export default function Index() {
  useLoad(() => {
    console.log('Page loaded.');
  });

  // const getStand = useCallback(async () => {
  //   const data = await djcGatewayStddataApi.djc_gateway_stddata_workdays_day_get();

  //   console.log(data);
  // }, []);

  const { count, disPatch } = useHandleIndex();

  // useEffect(() => {
  //   getStand();
  // }, [getStand]);

  return (
    <View className="index">
      <Text>{count}</Text>
      <Button
        onClick={() => {
          disPatch.add();
        }}
      >
        增加
      </Button>
      <Button
        onClick={() => {
          disPatch.minus();
        }}
      >
        减少
      </Button>
    </View>
  );
}
