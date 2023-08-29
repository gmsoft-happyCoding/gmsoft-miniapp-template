import { resolve } from 'path';
import { get } from 'lodash';
import { emptyDirSync } from 'fs-extra';
import { execSync } from 'child_process';

// 项目配置目录
const DIR_NAME = 'project-config';

// 获取配置文件
const config = require(resolve(process.cwd(), `./${DIR_NAME}/config.js`));

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
