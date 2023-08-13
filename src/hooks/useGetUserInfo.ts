import { get } from 'lodash';
import { useSelector } from 'react-redux';
import { USER_INFO, State } from '@/models/UserInfo';

const useGetUserInfo = () => {
  const userInfo = useSelector<any, State>(state => get(state, `${USER_INFO}`) as State);

  return userInfo;
};

export default useGetUserInfo;
