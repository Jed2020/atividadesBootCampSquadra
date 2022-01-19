"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var userRoutes_1 = require("./userRoutes");
var routes = express_1.Router();
routes.use('/user', userRoutes_1.default);
exports.default = routes;
//# sourceMappingURL=index.js.map