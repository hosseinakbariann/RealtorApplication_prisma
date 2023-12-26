import { Test, TestingModule } from '@nestjs/testing';
import { HomeController } from './home.controller';
import { PrismaService } from '../prisma/prisma.service';
import { HomeService } from './home.service';
import { ConfigService } from '@nestjs/config';
import { PropertyType } from '../../enums/propertyType';
import { User, UserInfo } from '../user/decrators/user.decorator';

const mockUser = {
  name: 'Amir',
  id: 1,
  email: 'Amir@gmail.com',
  iat: 1703571224,
  exp: 1703574824,
};

const mockupdateHome = {
  id: 5,
  address: 'Kosar street',
  number_of_bedrooms: 2,
  number_of_bathrooms: 2,
  city: 'Mashhad',
  price: 2000000000,
  land_size: 80,
  propertyType: PropertyType.RESIDENTIAL,
  realtor_id: 1,
};

describe('HomeController', () => {
  let controller: HomeController;
  let homeService: HomeService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HomeController],
      providers: [{
        provide: HomeService,
        useValue: {
          getHomes: jest.fn().mockReturnValue([]),
          UpdateHome: jest.fn().mockReturnValue(mockupdateHome),
        },
      }, PrismaService, ConfigService],
    }).compile();

    controller = module.get<HomeController>(HomeController);
    homeService = module.get<HomeService>(HomeService);
  });

  describe('getHomes', () => {
    it('should construct filter object correctly', async () => {
      const mockGetHomes = jest.fn().mockReturnValue([]);
      jest.spyOn(homeService, 'getHomes').mockImplementation(mockGetHomes);
      await controller.getHomes('Mashhad', '1500000000000');
      expect(mockGetHomes).toBeCalledWith({
        city: 'Mashhad',
        price: {
          gte: 1500000000000,
        },
      });
    });
  });

  describe('UpdateHome', () => {
    it('should updatehome if realtorid is Valid', async () => {
      const MockUpdateHome = jest.fn().mockReturnValue(mockupdateHome);

      jest.spyOn(homeService, 'updateHome').mockImplementation(MockUpdateHome);

      await controller.updateHome(5, mockupdateHome, mockUser);

      expect(mockupdateHome).toBeCalledWith();
    });
  });
});
