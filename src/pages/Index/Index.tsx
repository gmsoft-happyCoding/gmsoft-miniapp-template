import { useCallback } from 'react';
import { styled } from '@linaria/react';
import { View, Navigator } from '@tarojs/components';
import { AtButton, AtInput, AtAvatar } from 'taro-ui';
import { get } from 'lodash';
import Taro, { useLoad } from '@tarojs/taro';
import { useGetUserInfo } from '@/hooks';

const Container = styled(View)`
  padding: 20px;
`;

const LayoutBtn = styled(AtButton)`
  margin-bottom: 20px;
`;

const NikeName = styled(AtInput)`
  margin-bottom: 20px;
`;

const AvatarContainer = styled(AtButton)`
  margin-bottom: 20px;
  border: none;
  width: auto;
`;

export default function Index() {
  useLoad(() => {
    console.log('Page loaded.');
  });
  const userInfo = useGetUserInfo();

  const onLogin = () => {
    Taro.login({
      success(res) {
        console.log('获取登录code回调：');
        console.log(res);
      },
    });
  };

  const askAuthUserInfo = useCallback(async () => {
    const scope = await Taro.getSetting();

    console.log(scope);

    const data = await Taro.authorize({ scope: 'scope.userInfo' });

    console.log(data);
  }, []);

  const bindgetuserinfo = () => {
    console.log('获取微信用户信息：');

    Taro.getUserProfile({ desc: '暂时昵称' }).then(res => {
      console.log(res);
    });
  };

  const bindgetrealtimephonenumber = event => {
    console.log('获取手机号回调：');
    console.log(event);
  };

  const bindchooseavatar = useCallback(event => {
    console.log(event);
  }, []);

  const nikeNameChange = useCallback(name => {
    console.log(name);
  }, []);

  return (
    <Container>
      {/* @ts-ignore */}
      <NikeName
        title="昵称"
        type="text"
        placeholder="请输入昵称"
        value={get(userInfo, 'userName')}
        onChange={nikeNameChange}
      />
      {/* @ts-ignore */}
      <AvatarContainer openType="chooseAvatar" onChooseavatar={bindchooseavatar}>
        <AtAvatar image={get(userInfo, 'avatar')} />
      </AvatarContainer>

      <View>
        <LayoutBtn type="primary" onClick={onLogin}>
          获取登录code
        </LayoutBtn>
        <LayoutBtn type="primary" onClick={askAuthUserInfo}>
          用户信息获取授权
        </LayoutBtn>
        <LayoutBtn type="secondary" onClick={bindgetuserinfo}>
          获取微信用户信息
        </LayoutBtn>
        {/* @ts-ignore */}
        <LayoutBtn openType="getPhoneNumber" onGetrealtimephonenumber={bindgetrealtimephonenumber}>
          获取手机号码
        </LayoutBtn>
        <Navigator url="/sub/pages/Index/Index">
          <LayoutBtn>跳转本地子页面</LayoutBtn>
        </Navigator>
        <Navigator url="/subminiapp/sub-miniapp/pages/Index/Index">
          <LayoutBtn>跳转子页面</LayoutBtn>
        </Navigator>

        <View>{process.env.REACT_MINIAPP}</View>

        <View>{process.env.MAIN_APP_BASE_PATH}</View>

        <View>{process.env.REACT_DJC_DATAGATWAY}</View>
      </View>
    </Container>
  );
}
