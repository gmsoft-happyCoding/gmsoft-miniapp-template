module.exports = {
  // easy-mock 服务器
  host: 'http://easy-mock.gm',
  // 生成文件输入目录
  output: 'src/api',
  // 生成代码使用的模板
  template: 'gmsoft-happyCoding/taro-easymock-template',
  projects: [
    // easy-mock project id http://192.168.2.11:7300/project/5fceedfa1ec6fd40c482400c
    {
      id: '5fceedfa1ec6fd40c482400c',
      name: 'djcGatewayStddata',
      urlPreprocessor: url => url.replace('/djc-gateway', ''),
      baseUrl: 'process.env.REACT_MINI_APP_DJC_GATEWAY', // 如果baseUrl为字符串请使用 "'baseUrl'"
    },
  ],
};
