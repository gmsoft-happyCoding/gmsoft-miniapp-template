import { View, Text, Button, Navigator } from '@tarojs/components';
import { get } from 'lodash';
import { useLoad, useLaunch } from '@tarojs/taro';
import { useGetUserInfo } from '@/hooks';
import './index.less';

export default function Index() {
  useLoad(() => {
    console.log('Page loaded.');
  });

  useLaunch(() => {
    console.log('分包加载');
  });

  const userInfo = useGetUserInfo();

  return (
    <View className="index">
      <View>
        <Text>{get(userInfo, 'userName')}</Text>
      </View>

      <Navigator openType="navigateBack" delta={1}>
        <Button>返回主程序</Button>
      </Navigator>
    </View>
  );
}
