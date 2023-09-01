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
  pages: ['pages/Index/Index'],

  subPackages: [
    {
      root: 'sub/pages',
      pages: ['Index/Index'],
    },
    ...parseJson(process.env.MINI_APP_SUBPACKAGE_CONFIG),
  ],
};
