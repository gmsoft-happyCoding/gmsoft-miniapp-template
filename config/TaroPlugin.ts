import child_process from 'child_process';
import { get } from 'lodash';
import { IPluginContext } from '@tarojs/service';

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
  ctx.onBuildFinish(async () => {});

  // 构建完成钩子
  ctx.onBuildComplete(() => {});
};
