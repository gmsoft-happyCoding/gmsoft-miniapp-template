import { spawnSync } from 'child_process';
import { AppType } from '../enums/AppType.enum';
import { BuildType } from '../enums/BuildType.enum';

const build = (miniType: AppType, buildType: BuildType, isBuild?: boolean) => {
  spawnSync(
    'taro',
    [
      'build',
      `--type ${miniType}`,
      ...(buildType === BuildType.SUB_PACKAGE
        ? [`--blended --env ${isBuild ? 'production' : 'development'}`]
        : [isBuild ? '' : '--watch']),
    ],
    {
      shell: true,
      stdio: 'inherit',
      cwd: process.cwd(),
    }
  );
};

export default build;
