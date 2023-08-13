import { resolve } from 'path';
import { webpack, DllPlugin } from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

const webpackConfig = {
  mode: 'development',
  devtool: false,
  entry: {
    remote: ['redux', 'react-redux', 'dva-core', 'dva-loading', 'dva-model-creator'],
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
      context: resolve(__dirname, '../dist'),
      path: resolve(__dirname, '../dist', '[name]-manifest.json'),
      name: '[name]',
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
