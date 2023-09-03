import { get, reduce, merge } from 'lodash';
import { resolve } from 'path';
import { BuildType } from '../enums/BuildType.enum';

const mergeEnv = (config: any) => {
  const envFileName = process.env.REACT_MINI_APP_ENV;

  const envConfigPath = resolve(process.cwd(), 'project-config', `${envFileName}.ts`);

  const envConfig = require(envConfigPath);

  const envs = get(envConfig, 'envs', {});

  return merge(config, {
    env: reduce(envs, (result, value, key) => ({ ...result, [key]: JSON.stringify(value) }), {
      ...(process.env.MAIN_APP_BUILD_TYPE === BuildType.SUB_PACKAGE
        ? {
            MAIN_APP_BASE_PATH: JSON.stringify(process.env.MAIN_APP_BASE_PATH || ''),
          }
        : {}),
    }),
    // 分包打包 是否 压缩 根据
    ...(process.env.MAIN_APP_BUILD_TYPE === BuildType.SUB_PACKAGE
      ? process.env.NODE_ENV === 'development'
        ? { terser: { enable: false } }
        : {}
      : {}),
  });
};

export { mergeEnv };
