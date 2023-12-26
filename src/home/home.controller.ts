import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query, UnauthorizedException, UseGuards,
} from '@nestjs/common';
import { HomeService } from './home.service';
import { CreateHomeDTO, HomeReponseDto, UpdateHomeDto } from './dtos/home';
import { PropertyType } from '../../enums/propertyType';
import { User, UserInfo } from '../user/decrators/user.decorator';
import { Roles } from '../decorators/role.decorator';
import { UserType } from '../../enums/userType';
import { AuthGuard } from '../guards/auth.guard';


interface createHomeParams {
  address:string;
  number_of_bedrooms:number;
  number_of_bathrooms:number;
  city:string;
  price:number;
  land_size:number;
  propertyType:PropertyType;
}

@Controller('home')
export class HomeController {

  constructor(private readonly homeService:HomeService) {
  }

  @Get()
  getHomes(
    @Query('city') city?:string,
    @Query('minPrice') minPrice?:string,
    @Query('maxPrice') maxPrice?:string,
    @Query('propertyType') propertyType?:PropertyType
  ):Promise<HomeReponseDto[]>{
    const price = minPrice || maxPrice?{
    ...(minPrice &&  {gte:parseFloat(minPrice)}),
    ...(maxPrice &&  {lte:parseFloat(maxPrice)})
    }:undefined

    const filters = {
      ...(city && {city}),
      ...(price && {price}),
      ...(propertyType && {propertyType}),
    }
   return this.homeService.getHomes(filters);
  }

  @Get(':id')
  getHomeById(
    @Param("id", ParseIntPipe) id :number
  ){
    return this.homeService.getHomeById(id);
  }

  @UseGuards(AuthGuard)
  @Roles(UserType.REALTOR, UserType.ADMIN)
  @Post()
  createHome(
    @Body() body:createHomeParams,
    @User() user: UserInfo
  ){
    return this.homeService.createHome(body,user.id)
  }

  @UseGuards(AuthGuard)
  @Roles(UserType.REALTOR, UserType.ADMIN)
  @Put(':id')
  async updateHome(
    @Param("id", ParseIntPipe) id :number,
    @Body() body:UpdateHomeDto,
    @User() user: UserInfo
){
    return this.homeService.updateHome(body,id);
  }

  @UseGuards(AuthGuard)
  @Roles(UserType.REALTOR, UserType.ADMIN)
  @Delete(':id')
  async DeleteHome(
    @Param("id", ParseIntPipe) id :number,
    @User() user: UserInfo
  ){
    return this.homeService.deleteHome(id);
  }
}
