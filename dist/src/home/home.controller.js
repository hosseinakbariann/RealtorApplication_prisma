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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeController = void 0;
const common_1 = require("@nestjs/common");
const home_service_1 = require("./home.service");
const home_1 = require("./dtos/home");
const propertyType_1 = require("../../enums/propertyType");
const user_decorator_1 = require("../user/decrators/user.decorator");
const role_decorator_1 = require("../decorators/role.decorator");
const userType_1 = require("../../enums/userType");
const auth_guard_1 = require("../guards/auth.guard");
let HomeController = class HomeController {
    constructor(homeService) {
        this.homeService = homeService;
    }
    getHomes(city, minPrice, maxPrice, propertyType) {
        const price = minPrice || maxPrice ? Object.assign(Object.assign({}, (minPrice && { gte: parseFloat(minPrice) })), (maxPrice && { lte: parseFloat(maxPrice) })) : undefined;
        const filters = Object.assign(Object.assign(Object.assign({}, (city && { city })), (price && { price })), (propertyType && { propertyType }));
        return this.homeService.getHomes(filters);
    }
    getHomeById(id) {
        return this.homeService.getHomeById(id);
    }
    createHome(body, user) {
        return this.homeService.createHome(body, user.id);
    }
    async updateHome(id, body, user) {
        return this.homeService.updateHome(body, id);
    }
    async DeleteHome(id, user) {
        return this.homeService.deleteHome(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('city')),
    __param(1, (0, common_1.Query)('minPrice')),
    __param(2, (0, common_1.Query)('maxPrice')),
    __param(3, (0, common_1.Query)('propertyType')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], HomeController.prototype, "getHomes", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], HomeController.prototype, "getHomeById", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, role_decorator_1.Roles)(userType_1.UserType.REALTOR, userType_1.UserType.ADMIN),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], HomeController.prototype, "createHome", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, role_decorator_1.Roles)(userType_1.UserType.REALTOR, userType_1.UserType.ADMIN),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, home_1.UpdateHomeDto, Object]),
    __metadata("design:returntype", Promise)
], HomeController.prototype, "updateHome", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, role_decorator_1.Roles)(userType_1.UserType.REALTOR, userType_1.UserType.ADMIN),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], HomeController.prototype, "DeleteHome", null);
HomeController = __decorate([
    (0, common_1.Controller)('home'),
    __metadata("design:paramtypes", [home_service_1.HomeService])
], HomeController);
exports.HomeController = HomeController;
//# sourceMappingURL=home.controller.js.map