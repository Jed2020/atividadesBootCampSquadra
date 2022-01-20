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
var districtModel_1 = require("../models/districtModel");
var userModel_1 = require("../models/userModel");
var class_validator_1 = require("class-validator");
var Address = /** @class */ (function () {
    function Address() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid'),
        __metadata("design:type", String)
    ], Address.prototype, "Endereco_id", void 0);
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
    ], Address.prototype, "nome_rua", void 0);
    __decorate([
        typeorm_1.Column({
            length: 10,
        }),
        class_validator_1.MaxLength(10, {
            message: 'Atingiu o Máximo.',
        }),
        class_validator_1.MinLength(0, {
            message: 'É muito curto.',
        }),
        __metadata("design:type", String)
    ], Address.prototype, "numero", void 0);
    __decorate([
        typeorm_1.Column({
            length: 20,
        }),
        class_validator_1.MaxLength(20, {
            message: 'Atingiu o Máximo.',
        }),
        class_validator_1.MinLength(0, {
            message: 'É muito curto.',
        }),
        __metadata("design:type", String)
    ], Address.prototype, "complemento", void 0);
    __decorate([
        typeorm_1.Column({
            length: 10,
        }), class_validator_1.MaxLength(10, {
            message: 'Atingiu o Máximo.',
        }),
        class_validator_1.MinLength(0, {
            message: 'É muito curto.',
        }),
        __metadata("design:type", String)
    ], Address.prototype, "cep", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Address.prototype, "Bairro_id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Address.prototype, "Pessoa_id", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return districtModel_1.default; }, function (bairro) { return bairro.Endereco; }, { eager: true }),
        typeorm_1.JoinColumn({ name: "Bairro_id" }),
        __metadata("design:type", districtModel_1.default)
    ], Address.prototype, "Bairro", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return userModel_1.default; }, function (pessoa) { return pessoa.Endereco; }),
        typeorm_1.JoinColumn({ name: "Pessoa_id" }),
        __metadata("design:type", userModel_1.default)
    ], Address.prototype, "Pessoa", void 0);
    Address = __decorate([
        typeorm_1.Entity('Endereco')
    ], Address);
    return Address;
}());
exports.default = Address;
//# sourceMappingURL=addressModel.js.map