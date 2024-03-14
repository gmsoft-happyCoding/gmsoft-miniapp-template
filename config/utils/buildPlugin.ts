import { AppType } from '../enums/AppType.enum';

// 根据 环境 生成不同的 插件
const buildPlugin = (appType: AppType = AppType.WEAPP) => {
  if (appType === AppType.DD) {
    return [
      '@gmsoft-mini-app/taro-build-plugin',
      '@tarojs/plugin-indie',
      '@tarojs/plugin-platform-alipay-dd',
    ];
  }

  if (appType === AppType.WEAPP) {
    return ['@gmsoft-mini-app/taro-build-plugin', '@tarojs/plugin-indie'];
  }

  return ['@gmsoft-mini-app/taro-build-plugin', '@tarojs/plugin-indie'];
};

export { buildPlugin };
