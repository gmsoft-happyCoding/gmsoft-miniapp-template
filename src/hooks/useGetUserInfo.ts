import { get } from 'lodash';
import { useSelector } from 'react-redux';
import { USER_INFO, State } from '@/models/UserInfo';

const useGetUserInfo = () => {
  const userInfo = useSelector<any, State>(state => get(state, `${USER_INFO}`) as State);

  const loading = useSelector<any, boolean | undefined>(state =>
    get(state, 'loading.effects.user_info/getUserInfo')
  );

  return { userInfo: userInfo, ...(userInfo || {}), loading };
};

export default useGetUserInfo;
