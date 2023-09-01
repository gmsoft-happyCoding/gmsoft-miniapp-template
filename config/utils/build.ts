import { execSync } from 'child_process';
import { AppType } from '../enums/AppType.enum';
import { BuildType } from '../enums/BuildType.enum';

const build = (miniType: AppType, buildType: BuildType, mode?: boolean) => {
  console.log(`打包模式:${buildType}`);

  console.log(process.env.MINI_APP_SUBPACKAGE_CONFIG);

  // 编译主包
  execSync(
    `taro build --type ${miniType} ${
      mode ? (buildType === BuildType.SUB_PACKAGE ? '--blended' : '') : '--watch'
    }`,
    {
      stdio: 'inherit',
      cwd: process.cwd(),
    }
  );
};

export default build;
