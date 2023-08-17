import child_process from 'child_process';
import { resolve } from 'path';
import { get } from 'lodash';
import { existsSync, removeSync, copySync } from 'fs-extra';
import { IPluginContext } from '@tarojs/service';
import webpack from 'webpack';

export default (ctx: IPluginContext, pluginOpts) => {
  let entryName: string = '';

  // 开始编译前 钩子
  ctx.onBuildStart(() => {
    // if (process.env.NODE_ENV !== 'development') {
    child_process.execSync('ts-node --esm ./config/build-dll.ts', {
      stdio: 'inherit',
      cwd: process.cwd(),
    });
    // }
  });

  // 编译中 对webpack进行操作钩子
  ctx.modifyWebpackChain((args: { chain: any }) => {
    const { chain: webpackChain } = args;

    webpackChain.merge({
      plugin: {
        DllReferencePlugin: {
          plugin: webpack.DllReferencePlugin,
          args: [
            {
              context: process.cwd(),
              manifest: require(resolve(__dirname, '../dist', './remote-manifest.json')),
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
    webpackChain.resolve.alias.delete('react$');
    webpackChain.resolve.alias.set(
      'react-reconciler/constants',
      'react-reconciler/cjs/react-reconciler-constants.production.min.js'
    );

    entryName = get(Object.keys(get(webpackChain.toConfig(), 'entry', {})), '0');
  });

  // 编译中 对文件进行操作钩子
  ctx.modifyBuildAssets(args => {
    const { assets } = args;

    // 获得 CachedSource
    const cachedSource = get(assets, `${entryName}.js`);

    if (cachedSource) {
      // 获得 ConcatSource
      let source = cachedSource.original();

      if (source['_children']) {
        source['_children'].unshift(`require("./remote_dll");\n`);
      }
    }
  });

  // 编译完成钩子
  ctx.onBuildFinish(() => {
    // Taro v3.1.4
    const blended = ctx.runOpts.blended || ctx.runOpts.options.blended;

    if (!blended) return;

    console.log('编译结束！');

    const rootPath = resolve(__dirname, '../../../src');
    const miniappPath = resolve(rootPath, './subminiapp/sub-one');
    const outputPath = resolve(__dirname, '../dist/weapp');

    if (existsSync(miniappPath)) {
      removeSync(miniappPath);
    }
    copySync(outputPath, miniappPath);

    console.log('拷贝结束！');
  });

  // 构建完成钩子
  ctx.onBuildComplete(() => {});
};
