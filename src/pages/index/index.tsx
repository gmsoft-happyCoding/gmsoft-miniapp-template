import { useCallback, useEffect } from 'react';
import { View, Text } from '@tarojs/components';
import { useLoad } from '@tarojs/taro';
import { djcGatewayStddataApi } from '@/api';
import './index.less';

export default function Index() {
  useLoad(() => {
    console.log('Page loaded.');
  });

  const getStand = useCallback(async () => {
    const data = await djcGatewayStddataApi.djc_gateway_stddata_workdays_day_get();

    console.log(data);
  }, []);

  useEffect(() => {
    getStand();
  }, [getStand]);

  return (
    <View className="index">
      <Text>Hello world!</Text>
    </View>
  );
}
