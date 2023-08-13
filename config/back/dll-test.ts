import { resolve, join } from 'path';
import { webpack, DllPlugin } from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

const webpackConfig = {
  mode: 'production',
  entry: {
    dll: ['lodash'],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    path: resolve(__dirname, './dist'),
    filename: '[name].js',
    library: '[name]',
    globalObject: 'wx',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new DllPlugin({
      context: resolve(__dirname, './dist'),
      path: join(__dirname, './dist', '[name]-manifest.json'),
      name: '[name]',
    }),
  ],
  optimization: {
    minimize: false,
  },
};

const compiler = webpack(webpackConfig as any);

compiler.run(error => {
  if (!error) {
    console.log('dll编译完成');
  } else {
    console.log('dll编译失败');
  }
});
