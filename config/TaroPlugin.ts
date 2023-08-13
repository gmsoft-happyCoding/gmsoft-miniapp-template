import child_process from 'child_process';
import { IPluginContext } from '@tarojs/service';

export default (ctx: IPluginContext, pluginOpts) => {
  // plugin 主体
  // 开始编译前 钩子
  ctx.onBuildStart(() => {
    child_process.execSync('ts-node --esm ./config/build-dll.ts', {
      stdio: 'inherit',
      cwd: process.cwd(),
    });
  });

  // 编译中 对文件进行操作钩子
  ctx.modifyBuildAssets(args => {
    console.log(args);
  });

  // 编译完成钩子
  ctx.onBuildFinish(async () => {});

  // 构建完成钩子
  ctx.onBuildComplete(() => {});
};
