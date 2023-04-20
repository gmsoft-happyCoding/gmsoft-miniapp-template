// 示例, 如果你使用 `vs code` 作为开发工具， 你还可以使用注释的语法引入插件包含的声明文件，可获得类似于typescript的友好提示
/**
 * @typedef { import("@tarojs/plugin-mini-ci").CIOptions } CIOptions
 * @type {CIOptions}
 */
const CIPluginOpt = {
  weapp: {
    appid: "微信小程序appid",
    privateKeyPath:
      "密钥文件相对项目根目录的相对路径，例如 key/private.appid.key",
  },
  tt: {
    email: "字节小程序邮箱",
    password: "字节小程序密码",
  },
  alipay: {
    appid: "支付宝小程序appid",
    toolId: "工具id",
    privateKeyPath:
      "密钥文件相对项目根目录的相对路径，例如 key/pkcs8-private-pem",
  },
  dd: {
    appid: "钉钉小程序appid,即钉钉开放平台后台应用管理的 MiniAppId 选项",
    token: "令牌，从钉钉后台获取",
  },
  swan: {
    token: "鉴权需要的token令牌",
  },
  // 版本号
  version: "1.0.0",
  // 版本发布描述
  desc: "版本描述",
};

module.exports = CIPluginOpt;
