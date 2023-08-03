const devConfig = {
  env: {
    NODE_ENV: '"development"',
  },
  defineConstants: {},
  mini: {},
  h5: {},
  compiler: {
    type: 'webpack5',
    prebundle: { enable: false },
  },
};

module.exports = devConfig;
