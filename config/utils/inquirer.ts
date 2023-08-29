import { values, pick } from 'lodash';
import { join } from 'path';
import { spawnSync } from 'child_process';
import { prompt } from 'inquirer';
import * as parseArgs from 'minimist';
import { existsSync } from 'fs';
import { AppType } from '../enums/AppType.enum';
import { Env } from '../enums/Env.enum';
import type { CommandParams } from '../type';

// 验证参数是否合规
const validateParams = <T>(param: T, range: T[]) => range.includes(param);

const inquirer = async (build?: boolean) => {
  const parseArgv: CommandParams = pick(parseArgs(process.argv.slice(2)), [
    'env',
    'type',
    'blended',
  ]);

  const { env: envParam, type, blended } = parseArgv;

  const { env, appType } = await prompt([
    {
      type: 'list',
      name: 'env',
      message: '请选择连接环境?',
      choices: values(Env),
      default: Env.DEV1,
      when: !validateParams<Env>(envParam, values(Env)),
    },
    {
      type: 'list',
      name: 'appType',
      message: '请选择小程序类型?',
      choices: [
        { name: '微信小程序', value: AppType.WEAPP },
        { name: '钉钉', value: AppType.DD },
      ],
      default: AppType.WEAPP,
      when: !validateParams<AppType>(type, values(AppType)),
    },
  ]);

  const REACT_MINI_APP_ENV = envParam || env;

  const REACT_MINI_APP_TYPE = type || appType;

  const exists = await existsSync(
    join(process.cwd(), 'project-config', `${REACT_MINI_APP_ENV}.ts`)
  );

  console.log(REACT_MINI_APP_ENV);

  console.log(REACT_MINI_APP_TYPE);

  if (exists) {
    // 设置 小程序类型
    process.env.REACT_MINI_APP_ENV = REACT_MINI_APP_ENV;

    // 设置 小程序环境
    process.env.REACT_MINI_APP_TYPE = REACT_MINI_APP_TYPE;

    console.log(
      `--------------------------当前环境：${REACT_MINI_APP_ENV},小程序类型：${REACT_MINI_APP_TYPE}-------------------------------------`
    );

    spawnSync(
      'taro',
      [`build --type ${REACT_MINI_APP_TYPE} ${build ? (blended ? '--blended' : '') : '--watch'}`],
      {
        shell: true,
        stdio: 'inherit',
      }
    );
  } else {
    console.error(`${env}.ts文件不存在，请检查！`);

    process.exit();
  }
};

export { inquirer };
