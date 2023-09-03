import { resolve, basename } from 'path';
import { get, omit } from 'lodash';
import { emptyDir, remove, existsSync } from 'fs-extra';
import { execSync, spawnSync } from 'child_process';
import { BuildType } from '../enums/BuildType.enum';
import { parseJson } from '.';

type SubPackages = Array<{ root: string; pages: string[] }>;

interface SubpageConfig {
  pages: string[];
  subPackages: SubPackages;
}

// 分包的 分包配置 全部转换为
const transformSubPackages = (subPackages: SubPackages = []) =>
  subPackages.reduce<string[]>((pre: string[], cur: { root: string; pages: string[] }) => {
    const root = cur.root;

    const pages = cur.pages;

    return [...pre, ...pages.map(item => `${root}/${item}`)];
  }, []);

// 处理分包配置 转换为 主包的分包配置
const transfromSubpackageConfig = (
  subMiniappDir: string,
  subpackageName: string,
  subpageConfig: SubpageConfig
) => {
  const pages = get(subpageConfig, 'pages');

  const subPackages = get(subpageConfig, 'subPackages');

  // 去除路径 前面的  ./
  const base = basename(subMiniappDir);

  if (pages && Array.isArray(pages) && pages.length > 0) {
    return [
      {
        root: `${base}/${subpackageName}`,
        pages: [...pages, ...transformSubPackages(subPackages)],
      },
    ];
  }

  return [];
};

// 任务执行 svn 拉取操作
const pullSvn = (svnPath: string, subMiniappDir: string, subpackageName: string) => {
  // 分包项目存放目录
  execSync(`svn --force export ${svnPath} ${subMiniappDir}/${subpackageName}`, {
    stdio: 'inherit',
    cwd: process.cwd(),
  });
};

// 执行打包操作
const buildSubpackage = (subMiniappDir: string, subpackageName: string, isBuild?: boolean) => {
  const nodeCwd = resolve(process.cwd(), `${subMiniappDir}/${subpackageName}`);

  // 复制分包存放 编译后结果目录
  const moveDir = resolve(process.cwd(), './src', `${subMiniappDir}/${subpackageName}`);

  const command = isBuild ? 'build' : 'start';

  const params = [
    `${command} --env ${process.env.REACT_MINI_APP_ENV} --type ${process.env.REACT_MINI_APP_TYPE} --moveDir ${moveDir} --buildType ${BuildType.SUB_PACKAGE} --packagename ${subpackageName}`,
  ];

  // 分包项目存放目录
  spawnSync('pnpm', params, {
    cwd: nodeCwd,
    stdio: 'inherit',
    shell: true,
    // 排除主进程 对于 MINI_APP_SUBPACKAGE_CONFIG 环境变量 的注入
    env: omit(process.env, ['MINI_APP_SUBPACKAGE_CONFIG']),
  });
};

const build = async (isBuild?: boolean) => {
  // 项目配置目录
  const DIR_NAME = 'project-config';

  // 获取配置文件
  const config = require(resolve(process.cwd(), `./${DIR_NAME}/config`));

  // 分包项目 存放目录 名称
  const subpackageDir = get(config, 'subpackageDir');

  // 分包项目配置
  const subpackage = get(config, 'remoteSubpackage');

  if (subpackage && Array.isArray(subpackage)) {
    try {
      await remove(resolve(process.cwd(), `${subpackageDir}`));
    } catch (error) {
      console.log('清空文件夹失败');
      console.log(JSON.stringify(error));
      process.exit();
    }

    const pullsubpackage = subpackage.reduce(async (pre, cur) => {
      try {
        await pre;
        return new Promise<void>((promistResolve, reject) => {
          const svbPath = get(cur, 'repositories');

          const subpackageName = get(cur, 'name');

          if (svbPath && subpackageName) {
            pullSvn(svbPath, subpackageDir, subpackageName);
            promistResolve();
          } else {
            reject();
          }
        });
      } catch (error) {
        return Promise.reject();
      }
    }, Promise.resolve());

    return subpackage.reduce(async (pre, cur) => {
      try {
        await pre;
        return new Promise<void>((promistResolve, reject) => {
          const subpackageName = get(cur, 'name');

          if (subpackageName) {
            // 获取 配置目录
            const subAppConfigFilePath = resolve(
              process.cwd(),
              `${subpackageDir}`,
              `./${subpackageName}/project-config/app.config.js`
            );

            // 检测是否有配置文件
            if (existsSync(subAppConfigFilePath)) {
              const subAppConfig = require(subAppConfigFilePath);

              const transformConfig = transfromSubpackageConfig(
                subpackageDir,
                subpackageName,
                subAppConfig
              );

              console.log(transformConfig);

              const parse = parseJson(process.env.MINI_APP_SUBPACKAGE_CONFIG);

              process.env.MINI_APP_SUBPACKAGE_CONFIG = JSON.stringify([
                ...parse,
                ...transformConfig,
              ]);
            }

            buildSubpackage(subpackageDir, subpackageName, isBuild);
            promistResolve();
          } else {
            reject();
          }
        });
      } catch (error) {
        return Promise.reject();
      }
    }, pullsubpackage);
  }

  return Promise.reject();
};

export default build;
