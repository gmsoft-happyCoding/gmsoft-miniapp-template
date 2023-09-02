import { DllReferencePlugin } from 'webpack';
import { resolve } from 'path';
import { get } from 'lodash';
import { existsSync, removeSync, copySync } from 'fs-extra';
import { IPluginContext } from '@tarojs/service';
import { outputRoot } from './utils';
import { BuildType } from './enums/BuildType.enum';

export default (ctx: IPluginContext, pluginOpts) => {
  const blended = ctx.runOpts.blended || ctx.runOpts.options.blended;

  const { appType } = pluginOpts;

  let entryName: string = '';

  // 开始编译前 钩子
  ctx.onBuildStart(() => {});

  // 编译中 对webpack进行操作钩子
  ctx.modifyWebpackChain((args: { chain: any }) => {
    const { chain: webpackChain } = args;

    webpackChain.merge({
      ...(process.env.MAIN_APP_BUILD_TYPE === BuildType.SUB_PACKAGE
        ? { mode: process.env.NODE_ENV || 'production' }
        : {}),
      plugin: {
        DllReferencePlugin: {
          plugin: DllReferencePlugin,
          args: [
            {
              context: process.cwd(),
              manifest: require(resolve(
                process.cwd(),
                blended ? '../../dist' : './dist',
                './remote-manifest.json'
              )),
              sourceType: 'global',
            },
          ],
        },
      },
      output: {
        chunkLoadingGlobal: process.env.MAIN_APP_SUBMINIAPP_BUILD_PACKAGENAME || 'webpackJsonp',
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
    // 作为分包项目 不需要引入 公共js 由 主包负责引入
    if (blended) return;

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
    if (!blended) return;

    console.log('编译结束！');

    const rootPath = process.env.MAIN_APP_SUBMINIAPP_DIR;

    const outputPath = resolve(__dirname, '../', `${outputRoot(appType)}`);

    if (rootPath) {
      removeSync(rootPath);

      copySync(outputPath, rootPath);

      console.log('拷贝结束！');
    }
  });

  // 构建完成钩子
  ctx.onBuildComplete(() => {
    // 只有不是 分包项目 都要复制
    if (blended) return;

    // 复制 dll文件到对应的小程序目录中
    const dllFilePath = resolve(process.cwd(), './dist/remote_dll.js');

    const outputPath = resolve(process.cwd(), './dist/weapp/remote_dll.js');

    if (existsSync(dllFilePath)) {
      copySync(dllFilePath, outputPath, { overwrite: true });
    }
  });
};
