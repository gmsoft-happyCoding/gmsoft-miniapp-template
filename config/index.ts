import { resolve } from 'path';
import webpack from 'webpack';
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
  ...(appType === AppType.WEAPP ? { outputRoot: 'dist/weapp' } : {}),
  ...(appType === AppType.DD ? { outputRoot: 'dist/ddapp' } : {}),
  ...(appType === AppType.ALIPAY ? { outputRoot: 'dist/alipayapp' } : {}),
  ...(appType === AppType.DD
    ? {
        plugins: [resolve(__dirname, './TaroPlugin.ts'), '@tarojs/plugin-platform-alipay-dd'],
      }
    : { plugins: [resolve(__dirname, './TaroPlugin.ts')] }),
  defineConstants: {},
  copy: {
    patterns: [
      //  { from: 'src/subminiapp/', to: 'dist/weapp/subminiapp/' },
      { from: 'dist/remote_dll.js', to: 'dist/weapp/remote_dll.js' },
    ],
    options: {},
  },
  framework: 'react',
  compiler: {
    type: 'webpack5',
    prebundle: { enable: false },
  },
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
  terser: {
    enable: false, // 压缩
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
    compile: {
      exclude: [resolve(__dirname, '..', 'src/subminiapp')],
    },
    webpackChain(chain) {
      chain.merge({
        plugin: {
          DllReferencePlugin: {
            plugin: webpack.DllReferencePlugin,
            args: [
              {
                context: resolve(__dirname, '../dist'),
                manifest: require(resolve(__dirname, '../dist', 'remote-manifest.json')),
                sourceType: 'global',
              },
            ],
          },
        },
        optimization: {
          providedExports: true,
        },
      });

      // 删除 react 解析问题
      chain.resolve.alias.delete('react$');
      chain.resolve.alias.delete('react-reconciler$');
      chain.resolve.alias.set(
        'react-reconciler/constants',
        'react-reconciler/cjs/react-reconciler-constants.production.min.js'
      );

      console.log(chain.toConfig());
    },
  },
};

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, mergeEnv(require('./dev')));
  }
  return merge({}, config, mergeEnv(require('./prod')));
};
