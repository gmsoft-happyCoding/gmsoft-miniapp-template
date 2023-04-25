import { get } from 'lodash';
import { join } from 'path';

const mergeEnv = (config: any) => {
  const envFileName = process.env.REACT_MINI_APP_ENV;

  const envConfig = require(join(process.cwd(), 'project-config', `${envFileName}.ts`));

  return Object.assign({}, config, { env: get(envConfig, 'evns', {}) });
};

export { mergeEnv };
