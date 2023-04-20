module.exports = {
  // easy-mock 服务器
  host: "http://easy-mock.gm",
  // 生成文件输入目录
  output: "src/api",
  // 生成代码使用的模板
  template: "gmsoft-happyCoding/wx-extend-ts",
  projects: [
    {
      id: "5e5f000a86d71f0b2fed7e12", // easy-mock project id http://192.168.2.11:7300/project/5a5459145ca5151dd8559d0f
      name: "cow",
      //    urlPreprocessor: url => url.replace("/xcj-gateway", ""),
      baseUrl: "process.env.COW_BASEURL", // 如果baseUrl为字符串请使用 "'baseUrl'"
    },
  ],
};
