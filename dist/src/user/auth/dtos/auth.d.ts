import { UserType } from '../../../../enums/userType';
export declare class SignUpDto {
    name: string;
    phone: string;
    email: string;
    password: string;
    productKey?: string;
}
export declare class signInDto {
    username: string;
    password: string;
}
export declare class GenereteProductKeyDto {
    email: string;
    userType: UserType;
}
