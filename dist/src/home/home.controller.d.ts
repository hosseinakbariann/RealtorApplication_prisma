import { HomeService } from './home.service';
import { HomeReponseDto, UpdateHomeDto } from './dtos/home';
import { PropertyType } from '../../enums/propertyType';
import { UserInfo } from '../user/decrators/user.decorator';
interface createHomeParams {
    address: string;
    number_of_bedrooms: number;
    number_of_bathrooms: number;
    city: string;
    price: number;
    land_size: number;
    propertyType: PropertyType;
}
export declare class HomeController {
    private readonly homeService;
    constructor(homeService: HomeService);
    getHomes(city?: string, minPrice?: string, maxPrice?: string, propertyType?: PropertyType): Promise<HomeReponseDto[]>;
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
    createHome(body: createHomeParams, user: UserInfo): Promise<{
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
    updateHome(id: number, body: UpdateHomeDto, user: UserInfo): Promise<{
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
    DeleteHome(id: number, user: UserInfo): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
export {};
