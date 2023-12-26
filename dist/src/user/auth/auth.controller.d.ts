import { AuthService } from './auth.service';
import { SignUpDto, signInDto, GenereteProductKeyDto } from './dtos/auth';
import { UserType } from '../../../enums/userType';
import { UserInfo } from '../decrators/user.decorator';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(body: SignUpDto, userType: UserType): Promise<{
        status: number;
        msg: string;
    }[]>;
    signin(body: signInDto): Promise<{
        status: number;
        msg: string;
        token: string;
    }[]>;
    generateProductKey({ email }: GenereteProductKeyDto, userType: UserType): Promise<any>;
    me(user: UserInfo): UserInfo;
}
