import { DllReferencePlugin } from 'webpack';
import { execSync } from 'child_process';
import { resolve } from 'path';
import { get } from 'lodash';
import { existsSync, removeSync, copySync } from 'fs-extra';
import { IPluginContext } from '@tarojs/service';
import { outputRoot } from './utils';

export default (ctx: IPluginContext, pluginOpts) => {
  const { appType } = pluginOpts;

  let entryName: string = '';

  // 开始编译前 钩子
  ctx.onBuildStart(() => {
    const blended = ctx.runOpts.blended || ctx.runOpts.options.blended;

    if (!blended) {
      execSync('ts-node --esm ./config/build-dll.ts', {
        stdio: 'inherit',
        cwd: process.cwd(),
      });
    }
  });

  // 编译中 对webpack进行操作钩子
  ctx.modifyWebpackChain((args: { chain: any }) => {
    const { chain: webpackChain } = args;

    webpackChain.merge({
      plugin: {
        DllReferencePlugin: {
          plugin: DllReferencePlugin,
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
    const outputPath = resolve(__dirname, '../', `${outputRoot(appType)}`);

    if (existsSync(miniappPath)) {
      removeSync(miniappPath);
    }
    copySync(outputPath, miniappPath);

    console.log('拷贝结束！');
  });

  // 构建完成钩子
  ctx.onBuildComplete(() => {
    const blended = ctx.runOpts.blended || ctx.runOpts.options.blended;

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
