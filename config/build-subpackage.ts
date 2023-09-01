import { resolve } from 'path';
import { get } from 'lodash';
import { emptyDirSync, existsSync } from 'fs-extra';
import { execSync, spawnSync } from 'child_process';
import { BuildType } from './enums/BuildType.enum';
import { parseJson } from './utils';

interface SubpageConfig {
  pages: string[];
  subPackages: Array<{ root: string; pages: string[] }>;
}

// 项目配置目录
const DIR_NAME = 'project-config';

// 获取配置文件
const config = require(resolve(process.cwd(), `./${DIR_NAME}/config.ts`));

// 分包项目 存放目录 名称
const subpackageDir = get(config, 'subpackageDir');

// 分包项目配置
const subpackage = get(config, 'remoteSubpackage');

// 任务执行 svn 拉取操作
const pullSvn = (svnPath: string, subMiniappDir: string, subpackageName: string) => {
  // 分包项目存放目录
  execSync(`svn --force export ${svnPath} ${subMiniappDir}/${subpackageName}`, {
    stdio: 'inherit',
    cwd: process.cwd(),
  });
};

// 执行打包操作
const buildSubpackage = (subMiniappDir: string, subpackageName: string) => {
  const nodeCwd = resolve(process.cwd(), `${subMiniappDir}/${subpackageName}`);

  // 复制分包存放 编译后结果目录
  const moveDir = resolve(process.cwd(), './src', `${subMiniappDir}/${subpackageName}`);

  const params = [
    `build --env ${process.env.REACT_MINI_APP_ENV} --type ${process.env.REACT_MINI_APP_TYPE} --moveDir ${moveDir} --buildType ${BuildType.SUB_PACKAGE} --packagename ${subpackageName}`,
  ];

  // 分包项目存放目录
  spawnSync('pnpm', params, {
    cwd: nodeCwd,
    stdio: 'inherit',
    shell: true,
  });
};

// 处理分包配置 转换为 主包的分包配置
const transfromSubpackageConfig = (
  subMiniappDir: string,
  subpackageName: string,
  subpageConfig: SubpageConfig
) => {
  const pages = get(subpageConfig, 'pages');

  const subPackages = get(subpageConfig, 'subPackages');

  if (pages && Array.isArray(pages) && pages.length > 0) {
    return [
      {
        root: `${subMiniappDir}/${subpackageName}`,
        pages,
      },
      ...(Array.isArray(subPackages) && subPackages.length > 0
        ? subPackages.map(item => ({
            ...item,
            root: `${subMiniappDir}/${subpackageName}/${item.root}`,
          }))
        : []),
    ];
  }

  return [];
};

if (subpackage && Array.isArray(subpackage)) {
  // 清空目录
  emptyDirSync(resolve(process.cwd(), subpackageDir));

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

  subpackage.reduce(async (pre, cur) => {
    try {
      await pre;
      return new Promise<void>((promistResolve, reject) => {
        const subpackageName = get(cur, 'name');

        if (subpackageName) {
          // 获取 配置目录
          const subAppConfigFilePath = resolve(
            process.cwd(),
            `${subpackageDir}`,
            `./${subpackageName}/project-config/app.config.ts`
          );

          // 检测是否有配置文件
          if (existsSync(subAppConfigFilePath)) {
            const subAppConfig = require(subAppConfigFilePath);

            const transformConfig = transfromSubpackageConfig(
              subpackageDir,
              subpackageName,
              subAppConfig
            );

            const parse = parseJson(process.env.MINI_APP_SUBPACKAGE_CONFIG);

            process.env.MINI_APP_SUBPACKAGE_CONFIG = JSON.stringify([...parse, ...transformConfig]);
          }

          buildSubpackage(subpackageDir, subpackageName);
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
