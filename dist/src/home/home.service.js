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
exports.HomeService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const home_1 = require("./dtos/home");
let HomeService = class HomeService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async getHomes(filters) {
        const homes = await this.prismaService.home.findMany({
            select: {
                id: true,
                address: true,
                city: true,
                price: true,
                propertyType: true,
                number_of_bathrooms: true,
                number_of_bedrooms: true
            },
            where: filters
        });
        if (!homes.length)
            throw new common_1.NotFoundException(404, 'Home Not Found');
        return homes.map(home => new home_1.HomeReponseDto(home));
    }
    async getHomeById(id) {
        try {
            const home = await this.prismaService.home.findFirst({
                where: {
                    id
                },
            });
            if (!home)
                throw new common_1.NotFoundException(404, 'Home Not Found');
            return home;
        }
        catch (e) {
            throw new common_1.NotFoundException(404);
        }
    }
    async createHome({ address, number_of_bedrooms, number_of_bathrooms, city, price, land_size }, userId) {
        try {
            const home = await this.prismaService.home.create({
                data: {
                    address,
                    number_of_bedrooms,
                    number_of_bathrooms,
                    city,
                    price,
                    land_size,
                    propertyType: 'RESIDENTIAL',
                    realtor_id: 1
                }
            });
            return home;
        }
        catch (e) {
            throw new common_1.NotFoundException(404);
        }
    }
    async updateHome(data, id) {
        try {
            const home = await this.prismaService.home.findFirst({
                where: {
                    id
                },
            });
            if (!home)
                throw new common_1.NotFoundException(404, 'Home Not Found');
            return await this.prismaService.home.update({
                where: {
                    id
                },
                data: Object.assign({}, data)
            });
        }
        catch (e) {
            throw new common_1.NotFoundException(404);
        }
    }
    async deleteHome(id) {
        try {
            const home = await this.prismaService.home.findFirst({
                where: {
                    id
                },
            });
            if (!home)
                throw new common_1.NotFoundException(404, 'Home Not Found');
            return await this.prismaService.home.deleteMany({
                where: {
                    id
                }
            });
        }
        catch (e) {
            throw new common_1.NotFoundException(404);
        }
    }
};
HomeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], HomeService);
exports.HomeService = HomeService;
//# sourceMappingURL=home.service.js.map