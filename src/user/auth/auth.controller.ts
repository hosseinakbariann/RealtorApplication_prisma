import { Body, Controller, Get, Param, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto, signInDto, GenereteProductKeyDto } from './dtos/auth';
import { UserType } from '../../../enums/userType';
import { User, UserInfo } from '../decrators/user.decorator';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService:AuthService) {
  }

  @Post("signup")
  signup(
    @Body() body:SignUpDto,
    userType:UserType
  ){
    return this.authService.signUp(body,userType);
  }


  @Post("signin")
  signin(
    @Body() body:signInDto
  ){
    return this.authService.signIn(body);
  }

  @Post('/key')
  async generateProductKey(
    @Body() {email}: GenereteProductKeyDto,
    @Param() userType: UserType
  ){
    return this.authService.generateProductKey(email,userType);
  }

  @Get("me")
  me(
    @User() user:UserInfo
  ){
    return user;
  }

}
