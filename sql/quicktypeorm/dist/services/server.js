"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
require("reflect-metadata");
require("../database");
app_1.default.listen(3000, function () {
    console.log('🏃 Running Server');
});
//# sourceMappingURL=server.js.map