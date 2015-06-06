define(function(require, module, exports) {
    var b = require("../deps/b.js");
    require("jquery");
    require.async("b");
    return "a" + " " + b;
});