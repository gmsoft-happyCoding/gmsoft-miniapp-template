/* eslint-disable @typescript-eslint/no-unused-vars */
import { resolve } from 'path';
import { get } from 'lodash';
import { spawnSync } from 'child_process';

// 项目配置目录
const DIR_NAME = 'project-config';

// 获取配置文件
const config = require(resolve(process.cwd(), `./${DIR_NAME}/config.js`));

// 分包项目 存放目录 名称
const subpackageDir = get(config, 'subpackageDir');

// 分包项目配置
const subpackage = get(config, 'remoteSubpackage');

// 执行打包操作
const buildSubpackage = (subMiniappDir: string, subpackageName: string) => {
  // 分包项目存放目录
  spawnSync('pnpm', ['build', '--env dev1', '--type dd', ' --blended'], {
    cwd: resolve(`${subMiniappDir}/${subpackageName}`),
    stdio: 'inherit',
    shell: true,
  });
};

if (subpackage && Array.isArray(subpackage)) {
  subpackage.reduce(async (pre, cur) => {
    try {
      await pre;
      return new Promise<void>((promistResolve, reject) => {
        const subpackageName = get(cur, 'name');

        if (subpackageName) {
          buildSubpackage(subpackageDir, subpackageName);
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
