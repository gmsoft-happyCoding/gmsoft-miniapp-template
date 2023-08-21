import { resolve } from 'path';
import { get } from 'lodash';
import { execSync } from 'child_process';

// 项目配置目录
const DIR_NAME = 'project-config';

// 获取配置文件
const config = require(resolve(process.cwd(), `./${DIR_NAME}/config.js`));

// 分包项目 存放目录 名称
const subpackageDir = get(config, 'subpackageDir');

// 分包项目配置
const subpackage = get(config, 'subpackage');

// 任务执行 svn 拉取操作
const pullSvn = (svnPath: string, subMiniappDir: string, subpackageName: string) => {
  // 分包项目存放目录
  execSync(`svn --force export ${svnPath} ${subMiniappDir}/${subpackageName}`, {
    stdio: 'inherit',
    cwd: process.cwd(),
  });
};

if (subpackage && Array.isArray(subpackage)) {
  subpackage.reduce(async (pre, cur) => {
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
}
