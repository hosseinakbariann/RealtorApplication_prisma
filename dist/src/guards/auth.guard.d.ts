import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
export declare class AuthGuard implements CanActivate {
    private readonly reflector;
    private readonly configService;
    private readonly prismaService;
    constructor(reflector: Reflector, configService: ConfigService, prismaService: PrismaService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
