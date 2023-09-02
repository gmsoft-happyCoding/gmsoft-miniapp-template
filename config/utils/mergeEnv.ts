import { get, reduce, merge } from 'lodash';
import { resolve } from 'path';

const mergeEnv = (config: any) => {
  const envFileName = process.env.REACT_MINI_APP_ENV;

  const envConfigPath = resolve(process.cwd(), 'project-config', `${envFileName}.ts`);

  const envConfig = require(envConfigPath);

  const envs = get(envConfig, 'envs', {});

  return merge(config, {
    env: reduce(envs, (result, value, key) => ({ ...result, [key]: JSON.stringify(value) }), {}),
  });
};

export { mergeEnv };
