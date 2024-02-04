import { resolve } from 'path';
import { webpack, DllPlugin } from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { AppType } from './enums/AppType.enum';
import { platformCallbackglobalObject, platformCallbackDistDirectory } from './utils';

const PRO_DLL_LIBRARY = [
  'react',
  'react-dom',
  'redux',
  'react-redux',
  'redux-saga',
  'dva-core',
  'dva-loading',
  'dva-model-creator',
  '@linaria/react',
  '@linaria/core',
  '@gmsoft-mini-app/react-hanger',
  '@gmsoft-mini-app/state-container',
];

const DEV_DLL_LIBRARY = PRO_DLL_LIBRARY.concat('react-reconciler');

const webpackConfig = {
  mode: process.env.NODE_ENV,
  devtool: false,
  entry: {
    remote: process.env.NODE_ENV === 'development' ? DEV_DLL_LIBRARY : PRO_DLL_LIBRARY,
  },
  resolve: {
    symlinks: true,
    extensions: ['.js', '.jsx'],
    mainFields: ['browser', 'module', 'jsnext:main', 'main'], // taro 模块解析字段序列
  },
  output: {
    path: resolve(
      __dirname,
      '../dist',
      platformCallbackDistDirectory(process.env.REACT_MINI_APP_TYPE as AppType)
    ),
    filename: '[name]_dll.js',
    library: {
      name: '[name]',
      type: 'global',
    },
    globalObject: platformCallbackglobalObject(process.env.REACT_MINI_APP_TYPE as AppType),
  },
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/preset-env']],
              plugins: [['@babel/plugin-transform-runtime']],
            },
          },
          {
            loader: '@linaria/webpack-loader',
            options: {
              sourceMap: process.env.NODE_ENV !== 'production',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new DllPlugin({
      context: process.cwd(),
      path: resolve(
        __dirname,
        '../dist',
        platformCallbackDistDirectory(process.env.REACT_MINI_APP_TYPE as AppType),
        '[name]-manifest.json'
      ),
      name: '[name]',
      format: true,
    }),
  ],
};

const compiler = webpack(webpackConfig as any);

console.log('------------ dll文件开始编译 ------------');

compiler.run(error => {
  if (!error) {
    console.log('------------ dll编译完成 ------------');
  } else {
    console.log('------------ dll编译失败 ------------');
    process.exit();
  }
});
