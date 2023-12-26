import { Injectable, NotFoundException } from '@nestjs/common';
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
  city?:string;
  price?:{
    gte?: number;
    lte: number
  }
  propertyType:PropertyType;
}

interface updateHomeParams {
  address?:string;
  number_of_bedrooms?:number;
  number_of_bathrooms?:number;
  city?:string;
  price?:number;
  land_size?:number;
}


@Injectable()
export class HomeService {

  constructor(private readonly prismaService:PrismaService) {}


  async getHomes(filters:GetHomesParam):Promise<HomeReponseDto[]>{
    const homes = await this.prismaService.home.findMany({
      select:{
        id:true,
        address:true,
        city:true,
        price:true,
        propertyType:true,
        number_of_bathrooms:true,
        number_of_bedrooms:true
      },
      where:filters
    });
    if(!homes.length) throw new NotFoundException(404,'Home Not Found', );
    return homes.map(home=>new HomeReponseDto(home));
  }

  async getHomeById(id:number){
    try {
      const home = await this.prismaService.home.findFirst({
        where:{
          id
        },
      });
      if(!home) throw new NotFoundException(404,'Home Not Found', );
      return home;
    }catch (e) {
      throw new NotFoundException(404);
    }
  }


  async createHome({ address, number_of_bedrooms, number_of_bathrooms, city,
                     price, land_size }: createHomeParams,userId: number) {
    try {
     const home =  await this.prismaService.home.create({
        data:{
          address,
          number_of_bedrooms,
          number_of_bathrooms,
          city,
          price,
          land_size,
          propertyType:PropertyType.RESIDENTIAL,
          realtor_id:1
        }
      });
     return home;
    }catch (e) {
      throw new NotFoundException(404);
    }

  }

  async updateHome(data: updateHomeParams,id:number){
    try {
      const home = await this.prismaService.home.findFirst({
        where:{
          id
        },
      });
      if(!home) throw new NotFoundException(404,'Home Not Found', );
      return await this.prismaService.home.update({
        where:{
          id
        },
        data:{
          ...data
        }
      });
    }catch (e) {
      throw new NotFoundException(404);
    }
  }

  async deleteHome(id:number){
    try {
      const home = await this.prismaService.home.findFirst({
      where:{
        id
      },
    });
    if(!home) throw new NotFoundException(404,'Home Not Found', );
    return await this.prismaService.home.deleteMany({
      where:{
        id
      }
    });
  }catch (e) {
    throw new NotFoundException(404);
  }
  }

}
