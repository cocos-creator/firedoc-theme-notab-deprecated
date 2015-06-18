
var _ = require('underscore');

module.exports = function (modules, classes, locals) {

  locals.modules = _.sortBy(modules, 'name');
  locals.classes = _.sortBy(
    _.map(classes, function (clazz) {
      clazz.ns = (clazz.module || '') + '.' + clazz.name;
      return clazz;
    }),
    'ns'
  );
};