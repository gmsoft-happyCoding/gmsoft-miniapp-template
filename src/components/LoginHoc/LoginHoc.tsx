/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { useLoad } from '@tarojs/taro';
import { AtActivityIndicator } from 'taro-ui';
import { useGetUserInfo } from '@/hooks';
// import { useGetUserInfo, useActions } from '@/hooks';
import { useActions } from '@gmsoft-mini-app/react-hanger';
import { userInfoActions } from '@/models/UserInfo';

const LoginHoc =
  <T extends {}>(Component: React.ComponentType<T>) =>
  (props: T) => {
    const { getUserInfo } = useActions(userInfoActions);

    const { userInfo, loading } = useGetUserInfo();

    console.log(loading);

    console.log(userInfo);

    console.log(getUserInfo);

    useLoad(() => {
      // 第一次进入小程序 才会 获取用户信息
      if (loading === undefined) {
        getUserInfo();
      }
    });

    if (loading === false) {
      return <Component {...props} />;
    }

    return <AtActivityIndicator mode="center" content="正在获取用户信息" />;
  };

export default LoginHoc;
