import { values, pick } from 'lodash';
import { join } from 'path';
import { execSync } from 'child_process';
import { prompt } from 'inquirer';
import * as parseArgs from 'minimist';
import { existsSync } from 'fs-extra';
import { AppType } from '../enums/AppType.enum';
import { Env } from '../enums/Env.enum';
import { BuildType } from '../enums/BuildType.enum';
import buildSubpackage from './build-subpackage';
import buildMainpackage from './build';
import type { CommandParams } from '../type';

// 验证参数是否合规
const validateParams = <T>(param: T, range: T[]) => range.includes(param);

const inquirer = async (build?: boolean) => {
  const args: any = parseArgs(process.argv.slice(2));

  const parseArgv: CommandParams = pick(args, [
    'env', // 运行环境
    'type', // 编译类型
    'all', // 拉取分包 并合并分包 打包
    'pull',
    'moveDir', // 打包分包后编译完成 复制到主包目录路径
    'buildType',
    'packagename',
    'basePath',
  ]);

  const {
    env: envParam,
    type,
    all,
    pull,
    moveDir,
    buildType = BuildType.MAIN_PACKAGE,
    packagename,
    basePath,
  } = parseArgv;

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

  const exists = existsSync(join(process.cwd(), 'project-config', `${REACT_MINI_APP_ENV}.js`));

  if (exists) {
    // 设置 小程序类型
    process.env.REACT_MINI_APP_ENV = REACT_MINI_APP_ENV;

    // 设置 小程序环境
    process.env.REACT_MINI_APP_TYPE = REACT_MINI_APP_TYPE;

    // 被主包拉取 作为分包时  设置环境变量  用于 复制 主包目录地址
    if (buildType === BuildType.SUB_PACKAGE) {
      process.env.MAIN_APP_SUBMINIAPP_DIR = moveDir;

      process.env.MAIN_APP_SUBMINIAPP_BUILD_PACKAGENAME = packagename;

      process.env.MAIN_APP_BUILD_TYPE = buildType;

      process.env.MAIN_APP_BASE_PATH = basePath;
    }

    // if (buildType === BuildType.MAIN_PACKAGE) {
    //   // 编译 公共dll文件
    //   execSync('ts-node --esm ./config/build-dll.ts', {
    //     stdio: 'inherit',
    //     cwd: process.cwd(),
    //     env: {
    //       NODE_ENV: build ? 'production' : 'development',
    //       REACT_MINI_APP_TYPE,
    //     },
    //   });
    // }

    // 如果是 全量打包
    if (all) {
      buildSubpackage(build, pull).then(() => {
        console.log(
          `----------------当前环境：${REACT_MINI_APP_ENV},小程序类型：${REACT_MINI_APP_TYPE},打包模式:${buildType}-------------------------------------`
        );

        // 编译
        buildMainpackage(REACT_MINI_APP_TYPE, buildType, build);
      });
    } else {
      console.log(
        `------------------当前环境：${REACT_MINI_APP_ENV},小程序类型：${REACT_MINI_APP_TYPE},打包模式:${buildType}-------------------------------------`
      );

      // 编译
      buildMainpackage(REACT_MINI_APP_TYPE, buildType, build);
    }
  } else {
    console.error(`${env}.js文件不存在，请检查！`);

    process.exit();
  }
};

export { inquirer };
