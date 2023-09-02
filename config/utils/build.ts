import { spawnSync } from 'child_process';
import { AppType } from '../enums/AppType.enum';
import { BuildType } from '../enums/BuildType.enum';

const build = (miniType: AppType, buildType: BuildType, isBuild?: boolean) => {
  spawnSync(
    'taro',
    [
      'build',
      `--type ${miniType}`,
      ...(buildType === BuildType.SUB_PACKAGE ? ['--blended'] : [isBuild ? '' : '--watch']),
    ],
    {
      shell: true,
      stdio: 'inherit',
      cwd: process.cwd(),
      ...(buildType === BuildType.SUB_PACKAGE
        ? {
            env: {
              // 设置 主包打包分包时 环境打包模式  依赖主包
              // taro 判断 是按 --watch 参数  来定义的
              NODE_ENV: isBuild ? 'production' : 'development',
            },
          }
        : {}),
    }
  );
};

export default build;
