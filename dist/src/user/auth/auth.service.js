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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const bcrypt = require("bcrypt");
const config_1 = require("@nestjs/config");
const jwt = require("jsonwebtoken");
let AuthService = class AuthService {
    constructor(prismaService, configService) {
        this.prismaService = prismaService;
        this.configService = configService;
    }
    async signUp({ email, name, phone, password }, userType) {
        const userExist = await this.prismaService.user.findFirst({
            where: { email: email }
        });
        if (userExist)
            throw new common_1.ConflictException('user exist', 'Your Email has been existed in in our database');
        let hashedPassword = await bcrypt.hash(password, 10);
        await this.prismaService.user.create({
            data: {
                name,
                phone,
                email,
                password: hashedPassword,
                user_type: 'BUYER'
            }
        });
        return [
            {
                status: 200,
                msg: 'successfully SignedUp'
            },
        ];
    }
    async signIn({ username, password }) {
        const user = await this.prismaService.user.findFirst({
            where: { email: username }
        });
        if (!user)
            throw new common_1.HttpException('Invalid Credential', 400);
        const hashedPassword = user.password;
        const isValidPassword = await bcrypt.compare(password, hashedPassword);
        if (!isValidPassword)
            throw new common_1.HttpException('Invalid Credential', 400);
        const token = await this.generateJWT(user.name, username);
        return [
            {
                status: 200,
                msg: 'successfully LogedIn',
                token
            },
        ];
    }
    generateProductKey(email, userType) {
        const string = `${email}-${userType}-${this.configService.get('PRODUCT_KEY_SECRET')}`;
        return bcrypt.hash(string, 10);
    }
    async generateJWT(name, email) {
        const token = await jwt.sign({
            name: name,
            email: email,
        }, this.configService.get('SIGNUP_KEY_SECRET'), {
            expiresIn: 3600,
        });
        return token;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map