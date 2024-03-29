import { resolve } from 'path';
import { mergeEnv, buildPlugin, outputRoot } from './utils';
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
  outputRoot: outputRoot(appType as AppType),
  plugins: buildPlugin(appType as AppType),
  defineConstants: {},
  copy: {
    patterns: [],
    options: {},
  },
  framework: 'react',
  compiler: {
    type: 'webpack5',
    prebundle: { enable: false },
  },
  sass: {},
  cache: {
    enable: false, // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
  },
  alias: {
    '@': resolve(__dirname, '..', 'src'),
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
    webpackChain(chain) {
      // linaria/loader 选项详见 https://github.com/callstack/linaria/blob/master/docs/BUNDLERS_INTEGRATION.md#webpack
      chain.module
        .rule('script')
        .use('linariaLoader')
        .loader('@linaria/webpack-loader')
        .options({
          sourceMap: process.env.NODE_ENV !== 'production',
        });
    },
  },
};

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, mergeEnv(require('./dev')));
  }

  return merge({}, config, mergeEnv(require('./prod')));
};
