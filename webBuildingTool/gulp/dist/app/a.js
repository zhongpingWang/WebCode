define("app/a", [ "../deps/b", "src/a.js" ], function(require, module, exports) {
    var b = require("../deps/b");
    require("src/a.js");
    require.async("b");
    return "a" + " " + b;
});