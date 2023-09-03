module.exports = {
  envs: {
    // 作为 小程序的  跟路径   不用修改 如果是 主包 则为空字符串  否则 在编译时  自动注入
    MAIN_APP_BASE_PATH: process.env.MAIN_APP_BASE_PATH || '',
  },
};
