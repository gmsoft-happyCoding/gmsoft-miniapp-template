export default defineAppConfig({
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
  pages: ['pages/Index/Index'],
  subPackages: [
    {
      root: 'sub/pages',
      pages: ['Index/Index'],
    },
    // {
    //   root: 'subminiapp/sub-one/pages',
    //   pages: ['sub/index'],
    // },
  ],
});
