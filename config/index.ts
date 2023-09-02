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
  sass: {
    resource: resolve(process.cwd(), 'src/global.scss'),
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
  mini: {
    hot: true,
    enableSourceMap: false,
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

      console.log(chain.toConfig());
    },
  },
};

module.exports = function (merge) {
  console.log(process.env.NODE_ENV);

  if (process.env.NODE_ENV === 'development') {
    console.log('打印 dev.ts');

    console.log(require('./dev.ts'));

    console.log(mergeEnv(require('./dev.ts')));

    console.log(merge({}, config, mergeEnv(require('./dev.ts'))));

    return merge({}, config, mergeEnv(require('./dev.ts')));
  }

  console.log('打印 prod.ts');

  console.log(require('./prod.ts'));

  console.log(mergeEnv(require('./prod.ts')));

  console.log(merge({}, config, mergeEnv(require('./prod.ts'))));

  return merge({}, config, mergeEnv(require('./prod.ts')));
};
