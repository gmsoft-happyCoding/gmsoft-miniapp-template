/** 参考 taro、微信、钉钉小程序  app.config.json的配置  */

const parseJson = (jsonString?: string) => {
  if (jsonString) {
    try {
      return JSON.parse(jsonString);
    } catch (error) {
      return [];
    }
  }
  return [];
};

// 最终回溯到 src/app.config.ts文件中,放在这里是因为便于获取各个仓库的配置
module.exports = {
  pages: ['pages/Index/Index'],

  subPackages: [
    {
      root: 'sub/pages',
      pages: ['Index/Index'],
    },
    ...parseJson(process.env.MINI_APP_SUBPACKAGE_CONFIG),
  ],
};
