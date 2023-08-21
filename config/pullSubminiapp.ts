/* eslint-disable @typescript-eslint/no-unused-vars */
import { resolve } from 'path';
import { execSync } from 'child_process';

// 项目配置目录
// const DIR_NAME = 'project-config';

// 获取配置文件
// const config = require(resolve(process.cwd(), `./${DIR_NAME}/config.js`));

// console.log(config);

const svnPath =
  'https://192.168.2.10:8080/svn/GovProEleTrade/P80综合与解决方案/P8090综合/C3前端应用/小程序/trunk/sub-miniapp';

const subMiniappDir = resolve(process.cwd(), `./subminiapp/sub-miniapp`);

console.log(subMiniappDir);

// 分包项目存放目录
execSync(`svn --force export ${svnPath} ${subMiniappDir}`, {
  stdio: 'inherit',
  cwd: process.cwd(),
});
