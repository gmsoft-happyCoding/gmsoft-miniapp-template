import { resolve } from 'path';
import { webpack, DllReferencePlugin } from 'webpack';

const webpackConfig = {
  mode: 'production',
  context: resolve(process.cwd(), './config'),
  entry: {
    app: './app.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    path: resolve(__dirname, './dist'),
    filename: '[name].js',
  },
  plugins: [
    new DllReferencePlugin({
      context: resolve(__dirname, './dist'),
      manifest: require(resolve(__dirname, './dist', 'dll-manifest.json')),
    }),
  ],
  optimization: {
    minimize: false,
  },
};

console.log(resolve(__dirname, './dist', 'dll-manifest.json'));

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
