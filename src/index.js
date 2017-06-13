import { existsSync, readFileSync } from 'fs';
import assign from 'object-assign-deep';
import { getPath } from 'packing-template-util';

module.exports = function(options) {
  options = assign({
    encoding: 'utf-8',
    extension: '.html',
    templates: '.',
    mockData: '.',
    rewriteRules: {}
  }, options);
  return async (req, res, next) => {
    const { templatePath, pageDataPath, globalDataPath } = getPath(req, options);
    if (existsSync(templatePath)) {
      try {
        const output = readFileSync(templatePath, { encoding: options.encoding });;
        res.end(output);
      } catch (e) {
        console.log(e);
        next();
      }
    } else {
      next();
    }
  };
};
