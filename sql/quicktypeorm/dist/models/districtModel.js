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
var cityModel_1 = require("../models/cityModel");
var addressModel_1 = require("../models/addressModel");
var class_validator_1 = require("class-validator");
var District = /** @class */ (function () {
    function District() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid'),
        __metadata("design:type", String)
    ], District.prototype, "Bairro_id", void 0);
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
    ], District.prototype, "nome_bairro", void 0);
    __decorate([
        typeorm_1.Column({
            width: 3,
        }),
        __metadata("design:type", Number)
    ], District.prototype, "status", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], District.prototype, "Municipio_id", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return cityModel_1.default; }, function (municipio) { return municipio.Bairro; }, { eager: true }),
        typeorm_1.JoinColumn({ name: "Municipio_id" }),
        __metadata("design:type", cityModel_1.default)
    ], District.prototype, "Municipio", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return addressModel_1.default; }, function (endereco) { return endereco.Bairro; }),
        __metadata("design:type", addressModel_1.default)
    ], District.prototype, "Endereco", void 0);
    District = __decorate([
        typeorm_1.Entity('Bairro')
    ], District);
    return District;
}());
exports.default = District;
//# sourceMappingURL=districtModel.js.map