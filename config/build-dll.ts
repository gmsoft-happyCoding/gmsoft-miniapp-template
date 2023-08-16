import { resolve } from 'path';
import { webpack, DllPlugin } from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

const PRO_DLL_LIBRARY = [
  'react',
  'react-dom',
  'redux',
  'react-redux',
  'dva-core',
  'dva-loading',
  'dva-model-creator',
];

const DEV_DLL_LIBRARY = PRO_DLL_LIBRARY.concat('react-reconciler');

const webpackConfig = {
  mode: process.env.NODE_ENV,
  devtool: false,
  entry: {
    remote: process.env.NODE_ENV === 'development' ? DEV_DLL_LIBRARY : PRO_DLL_LIBRARY,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    path: resolve(__dirname, '../dist'),
    filename: '[name]_dll.js',
    library: {
      name: '[name]',
      type: 'global',
    },
    globalObject: 'wx',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new DllPlugin({
      context: process.cwd(),
      path: resolve(__dirname, '../dist', '[name]-manifest.json'),
      name: '[name]',
      format: true,
    }),
  ],
  optimization: {
    minimize: false,
  },
};

const compiler = webpack(webpackConfig as any);

console.log('------------ dll文件开始编译 ------------');

compiler.run(error => {
  if (!error) {
    console.log('------------ dll编译完成 ------------');
  } else {
    console.log('------------ dll编译失败 ------------');
    process.exit(0);
  }
});
