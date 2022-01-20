"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var userRoutes_1 = require("./userRoutes");
var stateRoutes_1 = require("./stateRoutes");
var cityRoutes_1 = require("./cityRoutes");
var districtRoutes_1 = require("./districtRoutes");
var addressRoutes_1 = require("./addressRoutes");
var routes = express_1.Router();
routes.use('/user', userRoutes_1.default);
routes.use('/state', stateRoutes_1.default);
routes.use('/city', cityRoutes_1.default);
routes.use('/district', districtRoutes_1.default);
routes.use('/address', addressRoutes_1.default);
exports.default = routes;
//# sourceMappingURL=index.js.map