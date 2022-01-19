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
var stateModel_1 = require("../models/stateModel");
var City = /** @class */ (function () {
    function City() {
    }
    City_1 = City;
    var City_1;
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid'),
        __metadata("design:type", String)
    ], City.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({
            length: 256,
        }),
        __metadata("design:type", String)
    ], City.prototype, "nome_cidade", void 0);
    __decorate([
        typeorm_1.Column({
            width: 3,
        }),
        __metadata("design:type", Number)
    ], City.prototype, "status", void 0);
    __decorate([
        typeorm_1.OneToOne(function (type) { return stateModel_1.default; }, function (Municipio) { return City_1; }),
        __metadata("design:type", stateModel_1.default)
    ], City.prototype, "UF", void 0);
    City = City_1 = __decorate([
        typeorm_1.Entity('Municipio')
    ], City);
    return City;
}());
exports.default = City;
//# sourceMappingURL=cityModel.js.map