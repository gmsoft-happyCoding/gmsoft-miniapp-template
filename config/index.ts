import { resolve } from 'path';
import { mergeEnv } from './utils';
import { AppType } from './enums/AppType.enum';

// 设置 小程序环境
const appType = process.env.REACT_MINI_APP_TYPE;

const config = {
  projectName: 'gmsoft-miniapp-template',
  date: '2023-4-20',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
  },
  sourceRoot: 'src',
  outputRoot: appType === AppType.weapp ? 'dist/weapp' : 'dist/ddapp',
  ...(appType === AppType.weapp
    ? {}
    : {
        plugins: ['@tarojs/plugin-platform-alipay-dd'],
      }),
  defineConstants: {},
  copy: {
    patterns: [],
    options: {},
  },
  framework: 'react',
  compiler: 'webpack5',
  cache: {
    enable: false, // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
  },
  alias: {
    '@/components': resolve(__dirname, '..', 'src/components'),
    '@/utils': resolve(__dirname, '..', 'src/utils'),
    '@/models': resolve(__dirname, '..', 'src/models'),
    '@/api': resolve(__dirname, '..', 'src/api'),
    '@/enums': resolve(__dirname, '..', 'src/enums'),
    '@/constant': resolve(__dirname, '..', 'src/constant'),
    '@/hooks': resolve(__dirname, '..', 'src/hooks'),
  },
  mini: {
    hot: true,
    postcss: {
      pxtransform: {
        enable: true,
        config: {},
      },
      url: {
        enable: true,
        config: {
          limit: 1024, // 设定转换尺寸上限
        },
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
  },
};

console.log(__dirname);

console.log(resolve(__dirname, '..', 'node_modules/gm-react-hanger/index.js'));

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, mergeEnv(require('./dev')));
  }
  return merge({}, config, mergeEnv(require('./prod')));
};
