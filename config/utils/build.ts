import { spawnSync } from 'child_process';
import { AppType } from '../enums/AppType.enum';
import { BuildType } from '../enums/BuildType.enum';

const build = (miniType: AppType, buildType: BuildType, isBuild?: boolean) => {
  console.log(`打包模式:${buildType}`);

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
    }
  );
};

export default build;
