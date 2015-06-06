'use strict';

var through = require('through2');
var SEAJS_REG = /(sea|seajs)(-.*)?\.js/;
var CMD_REG = /seajs\.(config|use)|define|define\(.*function\s*\(\s*require\s*(.*)?\)\s*\{/;

function isCMD(file) {
  return SEAJS_REG.test(file.relative) || CMD_REG.test(new Buffer(String(file.contents)));
}

var addWrapPlugin = function() {
  var stream = through.obj(function(file, encoding, callback) {
    if (file.isNull()) {
      return callback(null, file);
    }

    if (file.isStream()) {
      return callback(null, file);
    }

    if (file.isBuffer()) {
      if (!isCMD(file)) {
        var output = 'define(function(require, exports, module) {\n' + String(file.contents) + '\n});';
        file.contents = new Buffer(output);
      }
      return callback(null, file);
    }

    callback(null, file);
  });

  return stream;
};

module.exports = addWrapPlugin;
