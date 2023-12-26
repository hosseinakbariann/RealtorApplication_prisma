import { PrismaService } from '../../prisma/prisma.service';
import { UserType } from '../../../enums/userType';
import { ConfigService } from '@nestjs/config';
import { signInDto } from './dtos/auth';
interface SignupParams {
    email: string;
    password: string;
    name: string;
    phone: string;
}
export declare class AuthService {
    private readonly prismaService;
    private readonly configService;
    constructor(prismaService: PrismaService, configService: ConfigService);
    signUp({ email, name, phone, password }: SignupParams, userType: UserType): Promise<{
        status: number;
        msg: string;
    }[]>;
    signIn({ username, password }: signInDto): Promise<{
        status: number;
        msg: string;
        token: string;
    }[]>;
    generateProductKey(email: string, userType: string): any;
    private generateJWT;
}
export {};
