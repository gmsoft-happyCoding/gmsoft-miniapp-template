import { View, Text, Button } from '@tarojs/components';
import { useLoad } from '@tarojs/taro';
import { dvaContainer } from '@/utils';
import { model } from '@/models/countModel';
import useHandleIndex from './useHandleIndex';
import './index.less';

dvaContainer.injectModel(model);

export default function Index() {
  useLoad(() => {
    console.log('Page loaded.');
  });

  const { count, disPatch } = useHandleIndex();

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
