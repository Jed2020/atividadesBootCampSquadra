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
var State = /** @class */ (function () {
    function State() {
    }
    State_1 = State;
    var State_1;
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid'),
        __metadata("design:type", String)
    ], State.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({
            length: 3,
        }),
        __metadata("design:type", String)
    ], State.prototype, "sigla", void 0);
    __decorate([
        typeorm_1.Column({
            length: 256,
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
        typeorm_1.OneToOne(function (type) { return cityModel_1.default; }, function (UF) { return State_1; }),
        typeorm_1.JoinColumn(),
        __metadata("design:type", cityModel_1.default)
    ], State.prototype, "Municipio", void 0);
    State = State_1 = __decorate([
        typeorm_1.Entity('UF')
    ], State);
    return State;
}());
exports.default = State;
//# sourceMappingURL=stateModel.js.map