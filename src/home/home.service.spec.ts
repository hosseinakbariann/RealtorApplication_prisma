import {Test, TestingModule} from '@nestjs/testing';
import {HomeService} from './home.service';
import { PrismaService } from '../prisma/prisma.service';
import { PropertyType } from '../../enums/propertyType';
import { NotFoundException } from '@nestjs/common';

const mockGetHomes =[
  {
    id: 6,
    address: "Fatemi street",
    city: "Tehran",
    price: 100000000,
    propertyType: PropertyType.RESIDENTIAL,
    numberOfBedrooms: 1,
    numberOfBathrooms: 1
  }
];

const mockCreateHome =[
  {
    id: 12,
    address: "Kosar street",
    number_of_bedrooms: 2,
    number_of_bathrooms: 2,
    city: "Mashhad",
    listed_date: "2023-12-26T06:31:02.951Z",
    price: 2000000000,
    land_size: 80,
    created_at: "2023-12-26T06:31:02.951Z",
    update_at: "2023-12-26T06:31:02.951Z",
    propertyType: "RESIDENTIAL",
    realtor_id: 1
  }
];

const homeSelect={
  id:true,
  address:true,
  city:true,
  price:true,
  propertyType:true,
  number_of_bathrooms:true,
  number_of_bedrooms:true
};

describe('HomeService',()=>{
  let service:HomeService;
  let prismaService: PrismaService;
  beforeEach(async ()=>{
    const module: TestingModule = await Test.createTestingModule({
      providers:[HomeService, {
        provide:PrismaService,
        useValue:{
          home:{
            findMany:jest.fn().mockReturnValue([mockGetHomes]),
            create:jest.fn().mockReturnValue([mockCreateHome])
          }
        }
      }]
    }).compile();
    service = module.get<HomeService>(HomeService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe("getHomes",()=>{
    const filters = {
      city:"Mashhad",
      price:{
        gte: 1000000,
        lte: 1800000
      },
      propertyType:PropertyType.RESIDENTIAL
    }

    it('should Call prisma home. findMany with correct params', async ()=> {
      const mockPrismaFindManyHomes = jest.fn().mockReturnValue(mockGetHomes);
      jest.spyOn(prismaService.home,"findMany").mockImplementation(mockPrismaFindManyHomes);

      await service.getHomes(filters);
      expect(mockPrismaFindManyHomes).toBeCalledWith(
        {
          select:{
            ...homeSelect
          },
          where:filters
        }
      )
    });

    it("should throw not found exception if not home are found", async()=>{
      const mockPrismaFindManyHomes = jest.fn().mockReturnValue([]);
      jest.spyOn(prismaService.home,"findMany").mockImplementation(mockPrismaFindManyHomes);
      expect(service.getHomes(filters)).rejects.toThrowError(NotFoundException);
    });
  });
  describe("createHome",()=>{
    it("should Call prisma.Create home. Insert with correct payload", async()=> {
      const mockCreateHomeParams = {
        address:"Kosar street",
        number_of_bedrooms:2,
        number_of_bathrooms:2,
        city:"Mashhad",
        price:2000000000,
        land_size:80,
        propertyType: PropertyType.RESIDENTIAL,
        images:[]
      }
      const mockcreateHome = jest.fn().mockReturnValue(mockCreateHome);
      jest.spyOn(prismaService.home,"create").mockImplementation(mockcreateHome)
      await service.createHome(mockCreateHomeParams,1);
      expect(mockcreateHome).toBeCalledWith({
        data:{
          address:"Kosar street",
          number_of_bedrooms:2,
          number_of_bathrooms:2,
          city:"Mashhad",
          price:2000000000,
          land_size:80,
          propertyType: PropertyType.RESIDENTIAL,
          realtor_id:1
        }
      })
    });
  });
});