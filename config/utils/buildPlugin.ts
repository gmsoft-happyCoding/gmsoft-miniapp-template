import { resolve } from 'path';
import { AppType } from '../enums/AppType.enum';

// 根据 环境 生成不同的 插件
const buildPlugin = (appType: AppType = AppType.WEAPP) => {
  if (appType === AppType.DD) {
    return [
      [resolve(process.cwd(), './config', './TaroPlugin.ts')],
      '@tarojs/plugin-indie',
      '@tarojs/plugin-platform-alipay-dd',
    ];
  }

  if (appType === AppType.WEAPP) {
    return [[resolve(process.cwd(), './config', './TaroPlugin.ts')], '@tarojs/plugin-indie'];
  }

  return [[resolve(process.cwd(), './config', './TaroPlugin.ts')], '@tarojs/plugin-indie'];
};

export { buildPlugin };
