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
var class_validator_1 = require("class-validator");
var State = /** @class */ (function () {
    function State() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid'),
        __metadata("design:type", String)
    ], State.prototype, "UF_id", void 0);
    __decorate([
        typeorm_1.Column({
            length: 3,
        }),
        class_validator_1.MaxLength(3, {
            message: 'Atingiu o Máximo.',
        }),
        class_validator_1.MinLength(2, {
            message: 'É muito curto.',
        }),
        __metadata("design:type", String)
    ], State.prototype, "sigla", void 0);
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
    ], State.prototype, "nome_estado", void 0);
    __decorate([
        typeorm_1.Column({
            width: 3,
        }),
        __metadata("design:type", Number)
    ], State.prototype, "status", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return cityModel_1.default; }, function (municipio) { return municipio.UF; }),
        __metadata("design:type", Array)
    ], State.prototype, "Municipio", void 0);
    State = __decorate([
        typeorm_1.Entity('UF')
    ], State);
    return State;
}());
exports.default = State;
//# sourceMappingURL=stateModel.js.map