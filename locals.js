
module.exports = function (modules, classes, locals) {

  // TODO
  // console.log(modules[0]);

  locals.modules = modules.sort(function (prev, next) {
    return prev.name > next.name;
  });

  locals.classes = classes.sort(function (prev, next) {
    if (prev.module === next.modules)
      return prev.name > next.name;
    else
      return prev.module > next.module;
  });

};