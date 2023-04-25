import { spawn } from 'child_process';
import { prompt } from 'inquirer';
import { existsSync } from 'fs';
import { join } from 'path';
import { AppType } from './enums/AppType.enum';

const questions = [
  {
    type: 'list',
    name: 'env',
    message: '请选择连接环境?',
    choices: ['dev', 'test1', 'show'],
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

const inquirer = async () => {
  const { env, appType } = await prompt(questions);

  const exists = await existsSync(join(process.cwd(), 'project-config', `${env}.ts`));

  if (exists) {
    // 设置 小程序类型
    process.env.REACT_MINI_APP_ENV = env;

    // 设置 小程序环境
    process.env.REACT_MINI_APP_TYPE = appType;

    spawn('taro', [`build --type ${appType} --watch`], {
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

inquirer();
