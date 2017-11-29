const path = require('path');

module.exports = function override(config, env) {
  const babel = config.module.rules
    .find(rule => 'oneOf' in rule)
    .oneOf.find(rule => /babel-loader/.test(rule.loader));

  if (!Array.isArray(babel.include)) {
    babel.include = [babel.include];
  }

  babel.include.push(path.resolve(__dirname, '../views'));

  console.log(babel);
  return config;
};
