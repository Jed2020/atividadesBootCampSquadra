"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var addressModel_1 = require("../models/addressModel");
var class_validator_1 = require("class-validator");
var bcrypt = require('bcrypt');
var User = /** @class */ (function () {
    function User() {
    }
    User.prototype.hashPassword = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, bcrypt.hash(this.senha, 3)];
                    case 1:
                        _a.senha = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    User.prototype.hashUpPassword = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, bcrypt.hash(this.senha, 3)];
                    case 1:
                        _a.senha = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid'),
        __metadata("design:type", String)
    ], User.prototype, "Pessoa_id", void 0);
    __decorate([
        typeorm_1.Column({
            length: 256,
            transformer: {
                from: function (value) { return value.toLowerCase(); },
                to: function (value) { return value.toUpperCase(); },
            },
        }),
        class_validator_1.MaxLength(256, {
            message: 'Atingiu o M??ximo.',
        }),
        class_validator_1.MinLength(3, {
            message: '?? muito curto.',
        }),
        __metadata("design:type", String)
    ], User.prototype, "nome", void 0);
    __decorate([
        typeorm_1.Column({
            length: 256,
            transformer: {
                from: function (value) { return value.toLowerCase(); },
                to: function (value) { return value.toUpperCase(); },
            },
        }),
        class_validator_1.MaxLength(256, {
            message: 'Atingiu o M??ximo.',
        }),
        class_validator_1.MinLength(3, {
            message: '?? muito curto.',
        }),
        __metadata("design:type", String)
    ], User.prototype, "sobrenome", void 0);
    __decorate([
        typeorm_1.Column({
            width: 3,
        }),
        __metadata("design:type", Number)
    ], User.prototype, "idade", void 0);
    __decorate([
        typeorm_1.Column({
            length: 50,
        }),
        class_validator_1.IsEmail({
            message: 'Email inv??lido.',
        }),
        __metadata("design:type", String)
    ], User.prototype, "login", void 0);
    __decorate([
        typeorm_1.Column({
            length: 256,
        }),
        class_validator_1.IsString(),
        class_validator_1.MaxLength(50, {
            message: 'Atingiu o M??ximo.',
        }),
        class_validator_1.MinLength(3, {
            message: '?? muito curto.',
        }),
        __metadata("design:type", String)
    ], User.prototype, "senha", void 0);
    __decorate([
        typeorm_1.Column({
            width: 9,
        }),
        __metadata("design:type", Number)
    ], User.prototype, "status", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return addressModel_1.default; }, function (endereco) { return endereco.Pessoa; }, { eager: true }),
        __metadata("design:type", Array)
    ], User.prototype, "Endereco", void 0);
    __decorate([
        typeorm_1.BeforeInsert(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], User.prototype, "hashPassword", null);
    __decorate([
        typeorm_1.BeforeUpdate(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], User.prototype, "hashUpPassword", null);
    User = __decorate([
        typeorm_1.Entity('Pessoa')
    ], User);
    return User;
}());
exports.default = User;
//# sourceMappingURL=userModel.js.map