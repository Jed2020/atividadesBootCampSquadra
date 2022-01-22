"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var typeorm_1 = require("typeorm");
var class_validator_1 = require("class-validator");
var cityModel_1 = require("../models/cityModel");
var cityRepository_1 = require("../repositories/cityRepository");
var cityRouter = express_1.Router();
cityRouter.post('/', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
    var repo, _a, nome_cidade, status, UF_id, city, errors, res, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                repo = typeorm_1.getRepository(cityModel_1.default);
                _a = request.body, nome_cidade = _a.nome_cidade, status = _a.status, UF_id = _a.UF_id;
                city = repo.create({
                    nome_cidade: nome_cidade, status: status, UF_id: UF_id
                });
                return [4 /*yield*/, class_validator_1.validate(city)];
            case 1:
                errors = _b.sent();
                if (!(errors.length === 0)) return [3 /*break*/, 3];
                return [4 /*yield*/, repo.save(city)];
            case 2:
                res = _b.sent();
                return [2 /*return*/, response.status(201).json(res)];
            case 3: return [2 /*return*/, response.status(400).json(errors)];
            case 4:
                err_1 = _b.sent();
                console.error('err.mensage :>>', err_1.message);
                return [2 /*return*/, response.status(400).send({ msg: "Erro nos dados." })];
            case 5: return [2 /*return*/];
        }
    });
}); });
cityRouter.get('/', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
    var repository;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(cityModel_1.default).find()];
            case 1:
                repository = _a.sent();
                if (repository.length === 0) {
                    return [2 /*return*/, response.status(400).send({ msg: "Não existe nenhum Nome com estes dados." })];
                }
                response.json(repository);
                return [2 /*return*/];
        }
    });
}); });
cityRouter.get('/:nome_cidade', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
    var repository, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                repository = typeorm_1.getCustomRepository(cityRepository_1.default);
                return [4 /*yield*/, repository.findByName(request.params.nome_cidade)];
            case 1:
                res = _a.sent();
                if (res.length === 0) {
                    return [2 /*return*/, response.status(400).send({ msg: "Não existe nenhum Nome com estes dados." })];
                }
                response.json(res);
                return [2 /*return*/];
        }
    });
}); });
cityRouter.put('/:Municipio_id', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
    var repository, res, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                repository = typeorm_1.getRepository(cityModel_1.default);
                return [4 /*yield*/, repository.findOne(request.params.Municipio_id)];
            case 1:
                res = _a.sent();
                if (!!res) return [3 /*break*/, 2];
                return [2 /*return*/, response.status(400).send({ msg: "Não existe nenhum Nome com estes dados." })];
            case 2:
                typeorm_1.getRepository(cityModel_1.default).merge(res, request.body);
                return [4 /*yield*/, typeorm_1.getRepository(cityModel_1.default).save(res)];
            case 3:
                results = _a.sent();
                return [2 /*return*/, response.send(results)];
        }
    });
}); });
cityRouter.delete("/:Municipio_id", function (request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var repository, res, results;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    repository = typeorm_1.getRepository(cityModel_1.default);
                    return [4 /*yield*/, repository.findOne(request.params.Municipio_id)];
                case 1:
                    res = _a.sent();
                    if (!!res) return [3 /*break*/, 2];
                    return [2 /*return*/, response.status(400).send({ msg: "Não existe nenhum Nome com estes dados." })];
                case 2:
                    res.status = 2;
                    return [4 /*yield*/, typeorm_1.getRepository(cityModel_1.default).save(res)];
                case 3:
                    results = _a.sent();
                    return [2 /*return*/, response.send(results)];
            }
        });
    });
});
exports.default = cityRouter;
//# sourceMappingURL=cityRoutes.js.map