const path = require('path');

const getRelativePath = filePath => {
  if (!/^\.(\.)?\//.test(filePath)) {
    filePath = `./${filePath}`;
  }
  return filePath;
};
const chunksHandle = (chunks, compilation) => {
  // 获取入口chunk
  const entryChunk = chunks.pop();

  // 遍历入口文件
  entryChunk.files.forEach(filePath => {
    console.log(filePath);
    const assetFile = compilation.assets[filePath];
    const extname = path.extname(filePath);

    if (assetFile) {
      let content = assetFile.source();
      // 增加 dll js
      if (extname === '.js') {
        let subFile = 'vendor.dll.js';
        let relativePath = path.relative(filePath, subFile);
        relativePath = getRelativePath(relativePath);
        //   content = `require("${relativePath}");\n${content}`;

        console.log('写入js');
        content = `require("./remote.dll");\n${content}`;
      }
      assetFile.source = () => content;
    }
  });
};
const emitHandle = (compilation, callback) => {
  if (compilation.entrypoints instanceof Map) {
    compilation.entrypoints.forEach(({ chunks }) => chunksHandle(chunks, compilation));
  } else {
    Object.keys(compilation.entrypoints).forEach(key => {
      const { chunks } = compilation.entrypoints[key];
      chunksHandle(chunks, compilation);
    });
  }
  callback();
};

class MpvuePlugin {
  apply(compiler) {
    compiler.hooks.emit.tapAsync('mpvue-emit', emitHandle);
  }
}

module.exports = MpvuePlugin;
