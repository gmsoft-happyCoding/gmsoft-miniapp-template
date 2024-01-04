import { styled } from '@linaria/react';
import { View } from '@tarojs/components';
import { AtButton } from 'taro-ui';
import { useSelector } from 'react-redux';
import LoginHoc from '@/components/LoginHoc';
import { MATCH, matchActions, State } from '@/models/Match';
import { get } from 'lodash';
import { useLoad } from '@tarojs/taro';
// import { useActions } from '@/hooks';
import { useActions } from '@gmsoft-mini-app/react-hanger';

const Container = styled(View)`
  padding: 20px;
`;

const CountContainer = styled(View)`
  text-align: center;
  font-size: 20px;
`;

const LayoutBtn = styled(AtButton)`
  margin-bottom: 20px;
`;

function Sub() {
  useLoad(() => {
    console.log('Page loaded.');
  });

  const { count }: State = useSelector<any, State>(state => get(state, `${MATCH}`));

  const { add, minus } = useActions(matchActions);

  return (
    <Container>
      <CountContainer>{count}</CountContainer>

      <View>
        <LayoutBtn
          type="primary"
          onClick={() => {
            add();
          }}
        >
          增加
        </LayoutBtn>
        <LayoutBtn
          type="primary"
          onClick={() => {
            minus();
          }}
        >
          减少
        </LayoutBtn>
      </View>
    </Container>
  );
}

export default LoginHoc(Sub);
