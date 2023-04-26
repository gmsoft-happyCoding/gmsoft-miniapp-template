import { get, reduce } from 'lodash';
import { join } from 'path';
import { spawn } from 'child_process';
import { prompt } from 'inquirer';
import { existsSync } from 'fs';
import { AppType } from './enums/AppType.enum';

const envFileName = process.env.REACT_MINI_APP_ENV;

const envConfigPath = join(process.cwd(), 'project-config', `${envFileName}.ts`);

const mergeEnv = (config: any) => {
  const envConfig = require(envConfigPath);

  const envs = get(envConfig, 'envs', {});

  return Object.assign({}, config, {
    env: reduce(envs, (result, value, key) => ({ ...result, [key]: JSON.stringify(value) }), {}),
  });
};

const questions = [
  {
    type: 'list',
    name: 'env',
    message: '请选择连接环境?',
    choices: ['dev', 'test1', 'show', 'pro'],
    default: 'dev',
  },
  {
    type: 'list',
    name: 'appType',
    message: '请选择小程序类型?',
    choices: [
      { name: '微信小程序', value: AppType.weapp },
      { name: '钉钉', value: AppType.DD },
    ],
    default: '微信小程序',
  },
];

const inquirer = async (build?: boolean) => {
  const { env, appType } = await prompt(questions);

  const exists = await existsSync(join(process.cwd(), 'project-config', `${env}.ts`));

  if (exists) {
    // 设置 小程序类型
    process.env.REACT_MINI_APP_ENV = env;

    // 设置 小程序环境
    process.env.REACT_MINI_APP_TYPE = appType;

    console.log(env, appType);

    spawn('taro', [`build --type ${appType} ${build ? '' : '--watch'}`], {
      shell: true,
      stdio: 'inherit',
    })
      .on('close', (code: number) => process.exit(code!))
      .on('error', spawnError => console.error(spawnError));
  } else {
    console.error(`${env}.ts文件不存在，请检查！`);

    process.exit();
  }
};

export { mergeEnv, inquirer };
