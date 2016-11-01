var fs = require('fs');
var path = require('path');
var url = require('url');
var util = require('util');
var assign = require('object-assign');
var clearRequire = require('clear-require');

module.exports = function(options) {
  options = assign({
    encoding: 'utf-8',
    extension: '.html',
    templates: '.',
    mockData: '.',
    rewriteRules: {}
  }, options);
  return function(req, res, next) {
    var urlObject = url.parse(req.url);
    var pathname = options.rewriteRules[urlObject.pathname] || urlObject.pathname;
    var templateAbsPath = path.resolve(path.join(options.templates, pathname));
    if (fs.existsSync(templateAbsPath)) {
      var tpl = fs.readFileSync(templateAbsPath, {encoding: options.encoding});
      var output = tpl;
      res.end(output);
    } else {
      next();
    }
  };
};
