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
exports.UpdateHomeDto = exports.CreateHomeDTO = exports.Image = exports.HomeReponseDto = void 0;
const class_transformer_1 = require("class-transformer");
const propertyType_1 = require("../../../enums/propertyType");
const class_validator_1 = require("class-validator");
class HomeReponseDto {
    numberOfBedrooms() {
        return this.number_of_bedrooms;
    }
    numberOfBathrooms() {
        return this.number_of_bathrooms;
    }
    listedDate() {
        return this.listed_date;
    }
    constructor(partial) {
        Object.assign(this, partial);
    }
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], HomeReponseDto.prototype, "address", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], HomeReponseDto.prototype, "number_of_bedrooms", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "numberOfBedrooms" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HomeReponseDto.prototype, "numberOfBedrooms", null);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], HomeReponseDto.prototype, "number_of_bathrooms", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "numberOfBathrooms" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HomeReponseDto.prototype, "numberOfBathrooms", null);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], HomeReponseDto.prototype, "city", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], HomeReponseDto.prototype, "listed_date", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "listedDate" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HomeReponseDto.prototype, "listedDate", null);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], HomeReponseDto.prototype, "created_at", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], HomeReponseDto.prototype, "updated_at", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], HomeReponseDto.prototype, "realtor_id", void 0);
exports.HomeReponseDto = HomeReponseDto;
class Image {
}
exports.Image = Image;
class CreateHomeDTO {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateHomeDTO.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateHomeDTO.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateHomeDTO.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateHomeDTO.prototype, "land_size", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(propertyType_1.PropertyType),
    __metadata("design:type", String)
], CreateHomeDTO.prototype, "propertyType", void 0);
exports.CreateHomeDTO = CreateHomeDTO;
class UpdateHomeDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateHomeDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateHomeDto.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], UpdateHomeDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], UpdateHomeDto.prototype, "land_size", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(propertyType_1.PropertyType),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateHomeDto.prototype, "propertyType", void 0);
exports.UpdateHomeDto = UpdateHomeDto;
//# sourceMappingURL=home.js.map