module.exports = {
  /* 模块名称，该名称和模块所在目录名称一致 */
  name: 'miniapp-name',

  /* 分包项目存放目录名称 */
  subpackageDir: './subminiapp', // path.resolve(process.cwd(),[subpackageDir])

  // remoteSubpackage: [
  //   {
  //     name: 'sub-miniapp',

  //     /* 仓库类型 */
  //     repositoriesType: 'svn', // @repositoriesTyp svn | git

  //     /* 仓库地址 */
  //     repositories:
  //       'https://192.168.2.10:8080/svn/GovProEleTrade/P80综合与解决方案/P8090综合/C3前端应用/小程序/trunk/sub-miniapp',
  //   },
  // ],
};
