import { PropertyType } from '../../../enums/propertyType';
export declare class HomeReponseDto {
    address: string;
    number_of_bedrooms: number;
    numberOfBedrooms(): number;
    number_of_bathrooms: number;
    numberOfBathrooms(): number;
    city: string;
    listed_date: Date;
    listedDate(): Date;
    price: number;
    propertyType: string;
    created_at: Date;
    updated_at: Date;
    realtor_id: number;
    constructor(partial: Partial<HomeReponseDto>);
}
export declare class Image {
    url: string;
}
export declare class CreateHomeDTO {
    address: string;
    city: string;
    price: number;
    land_size: number;
    propertyType: PropertyType;
}
export declare class UpdateHomeDto {
    address: string;
    city: string;
    price: number;
    land_size: number;
    propertyType: PropertyType;
}
