import appConfig from '../project-config/app.config';

console.log(appConfig);

export default defineAppConfig({
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
  ...appConfig,
});
