import { get, reduce, merge } from 'lodash';
import { resolve } from 'path';

const mergeEnv = (config: any) => {
  const envFileName = process.env.REACT_MINI_APP_ENV;

  const envConfigPath = resolve(process.cwd(), 'project-config', `${envFileName}.ts`);

  const envConfig = require(envConfigPath);

  const envs = get(envConfig, 'envs', {});

  return merge(config, {
    env: reduce(envs, (result, value, key) => ({ ...result, [key]: JSON.stringify(value) }), {}),
    // 分包打包 是否 压缩 根据
    ...(process.env.NODE_ENV === 'production' ? { terser: { enable: false } } : {}),
  });
};

export { mergeEnv };
