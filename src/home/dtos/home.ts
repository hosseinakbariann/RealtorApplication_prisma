import { Exclude, Expose, Type } from 'class-transformer';
import { PropertyType } from '../../../enums/propertyType';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString
} from 'class-validator';

export class HomeReponseDto {

  @IsNotEmpty()
  address: string;

  @Exclude()
  number_of_bedrooms: number;

  @Expose({name:"numberOfBedrooms"})
  numberOfBedrooms(){
    return this.number_of_bedrooms;
  }

  @Exclude()
  number_of_bathrooms:number;

  @Expose({name:"numberOfBathrooms"})
  numberOfBathrooms(){
    return this.number_of_bathrooms;
  }


  @IsNotEmpty()
  city: string;

  @Exclude()
  listed_date:Date;

  @Expose({name:"listedDate"})
  listedDate(){
    return this.listed_date;
  }
  price: number;

  propertyType:string;

  @Exclude()
  created_at:Date;

  @Exclude()
  updated_at:Date;

  @Exclude()
  realtor_id: number;


  constructor(partial: Partial<HomeReponseDto>){
    Object.assign(this,partial);
  }


}

export class Image {
  url:string
}

export class CreateHomeDTO{
  @IsString()
  @IsNotEmpty()
  address:string;

  @IsString()
  @IsNotEmpty()
  city:string;

  @IsNumber()
  @IsPositive()
  price:number;

  @IsNumber()
  @IsPositive()
  land_size:number;

  @IsEnum(PropertyType)
  propertyType:PropertyType;
}

export class UpdateHomeDto{
  @IsString()
  @IsOptional()
  address:string;

  @IsString()
  @IsOptional()
  city:string;

  @IsNumber()
  @IsOptional()
  @IsPositive()
  price:number;

  @IsNumber()
  @IsOptional()
  @IsPositive()
  land_size:number;

  @IsEnum(PropertyType)
  @IsOptional()
  propertyType:PropertyType;
}