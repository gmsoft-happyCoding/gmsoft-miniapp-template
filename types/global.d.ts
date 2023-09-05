/// <reference types="@tarojs/taro" />
/// <reference types="@tarojs/plugin-platform-alipay-dd/types/shims-dd.d.ts" />

declare module '*.png';
declare module '*.gif';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.styl';

declare namespace NodeJS {
  interface ProcessEnv {
    TARO_ENV: 'weapp' | 'swan' | 'alipay' | 'h5' | 'rn' | 'tt' | 'quickapp' | 'qq' | 'jd' | 'dd';
  }
}

declare var wx: {
  _stateContainer_: any;
};

declare var dd: {
  _stateContainer_: any;
};
