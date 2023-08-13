const path = require('path');
const { webpack, DllPlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const PLIGIN_NAME = 'BuildDllPlugin';

class BuildDllPlugin {
  apply(compiler) {
    compiler.hooks.run.tapAsync('MyPlugin', (params, callback) => {
      console.log('开始执行run');
      callback();
    });

    compiler.hooks.done.tapAsync('MyPlugin', (params, callback) => {
      console.log('编译完成run');
      callback();
    });
  }
}

module.exports = BuildDllPlugin;
