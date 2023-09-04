import { get, reduce, merge } from 'lodash';
import { resolve } from 'path';
import { existsSync } from 'fs-extra';
import { BuildType } from '../enums/BuildType.enum';

const envTransfrom = (envs: any) =>
  reduce(
    envs,
    (result, value, key) => ({
      ...result,
      [key]: JSON.stringify(`${value}`),
    }),
    {}
  );

const mergeEnv = (config: any) => {
  const envFileName = process.env.REACT_MINI_APP_ENV;

  if (envFileName) {
    const envConfigPath = resolve(process.cwd(), 'project-config', `${envFileName}.ts`);

    const defaultConfigPath = resolve(process.cwd(), 'project-config', 'default.ts');

    if (existsSync(envConfigPath)) {
      if (existsSync(defaultConfigPath)) {
        return merge(config, {
          env: {
            ...merge(
              envTransfrom(get(require(defaultConfigPath), 'envs', {})),
              envTransfrom(get(require(envConfigPath), 'envs', {}))
            ),
          },
          // 分包打包 是否 压缩 根据
          ...(process.env.MAIN_APP_BUILD_TYPE === BuildType.SUB_PACKAGE
            ? process.env.NODE_ENV === 'development'
              ? { terser: { enable: false } }
              : {}
            : {}),
        });
      } else {
        console.log(`${resolve(process.cwd(), 'project-config')}下缺少<default.ts>文件`);
        process.exit();
      }
    } else {
      console.log(`${resolve(process.cwd(), 'project-config')}下缺少<${envFileName}.ts>文件`);
      process.exit();
    }
  } else {
    console.log(`无法知道当前环境`);
    process.exit();
  }
};

export { mergeEnv };
