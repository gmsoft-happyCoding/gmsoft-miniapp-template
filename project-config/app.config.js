const parseJson = jsonString => {
  if (jsonString) {
    try {
      return JSON.parse(jsonString);
    } catch (error) {
      return [];
    }
  }
  return [];
};

module.exports = {
  window: {
    backgroundTextStyle: 'light',
    backgroundColor: '#ebedf0',
    navigationBarBackgroundColor: '#2a12ba',
    navigationBarTextStyle: 'white',
  },
  pages: ['pages/Plus/Plus', 'pages/Sub/Sub', 'pages/Index/Index'],
  tabBar: {
    color: '#999',
    selectedColor: '#333',
    list: [
      {
        pagePath: 'pages/Plus/Plus',
        text: '加法',
      },
      {
        pagePath: 'pages/Sub/Sub',
        text: '减法',
      },
      {
        pagePath: 'pages/Index/Index',
        text: '测试页面',
      },
    ],
  },

  subPackages: [...parseJson(process.env.MINI_APP_SUBPACKAGE_CONFIG)],
};
