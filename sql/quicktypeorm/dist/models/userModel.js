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
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var addressModel_1 = require("../models/addressModel");
var class_validator_1 = require("class-validator");
var User = /** @class */ (function () {
    function User() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid'),
        __metadata("design:type", String)
    ], User.prototype, "Pessoa_id", void 0);
    __decorate([
        typeorm_1.Column({
            length: 256,
        }),
        class_validator_1.MaxLength(256, {
            message: 'Atingiu o Máximo.',
        }),
        class_validator_1.MinLength(3, {
            message: 'É muito curto.',
        }),
        __metadata("design:type", String)
    ], User.prototype, "nome", void 0);
    __decorate([
        typeorm_1.Column({
            length: 256,
        }),
        class_validator_1.MaxLength(256, {
            message: 'Atingiu o Máximo.',
        }),
        class_validator_1.MinLength(3, {
            message: 'É muito curto.',
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
            message: 'Email inválido.',
        }),
        __metadata("design:type", String)
    ], User.prototype, "login", void 0);
    __decorate([
        typeorm_1.Column({
            length: 50,
        }),
        class_validator_1.IsString(),
        class_validator_1.MaxLength(50, {
            message: 'Atingiu o Máximo.',
        }),
        class_validator_1.MinLength(3, {
            message: 'É muito curto.',
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
        __metadata("design:type", addressModel_1.default)
    ], User.prototype, "Endereco", void 0);
    User = __decorate([
        typeorm_1.Entity('Pessoa')
    ], User);
    return User;
}());
exports.default = User;
//# sourceMappingURL=userModel.js.map