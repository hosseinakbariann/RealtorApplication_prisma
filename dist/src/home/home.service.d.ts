import { PrismaService } from '../prisma/prisma.service';
import { PropertyType } from '../../enums/propertyType';
import { HomeReponseDto } from './dtos/home';
interface createHomeParams {
    address: string;
    number_of_bedrooms: number;
    number_of_bathrooms: number;
    city: string;
    price: number;
    land_size: number;
    propertyType: PropertyType;
}
interface GetHomesParam {
    city?: string;
    price?: {
        gte?: number;
        lte: number;
    };
    propertyType: PropertyType;
}
interface updateHomeParams {
    address?: string;
    number_of_bedrooms?: number;
    number_of_bathrooms?: number;
    city?: string;
    price?: number;
    land_size?: number;
}
export declare class HomeService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    getHomes(filters: GetHomesParam): Promise<HomeReponseDto[]>;
    getHomeById(id: number): Promise<{
        id: number;
        address: string;
        number_of_bedrooms: number;
        number_of_bathrooms: number;
        city: string;
        listed_date: Date;
        price: number;
        land_size: number;
        created_at: Date;
        update_at: Date;
        propertyType: import(".prisma/client").$Enums.PropertyType;
        realtor_id: number;
    }>;
    createHome({ address, number_of_bedrooms, number_of_bathrooms, city, price, land_size }: createHomeParams, userId: number): Promise<{
        id: number;
        address: string;
        number_of_bedrooms: number;
        number_of_bathrooms: number;
        city: string;
        listed_date: Date;
        price: number;
        land_size: number;
        created_at: Date;
        update_at: Date;
        propertyType: import(".prisma/client").$Enums.PropertyType;
        realtor_id: number;
    }>;
    updateHome(data: updateHomeParams, id: number): Promise<{
        id: number;
        address: string;
        number_of_bedrooms: number;
        number_of_bathrooms: number;
        city: string;
        listed_date: Date;
        price: number;
        land_size: number;
        created_at: Date;
        update_at: Date;
        propertyType: import(".prisma/client").$Enums.PropertyType;
        realtor_id: number;
    }>;
    deleteHome(id: number): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
export {};
