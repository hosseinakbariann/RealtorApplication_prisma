import { ConflictException, HttpException, Injectable, Post } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UserType } from '../../../enums/userType';
import * as bcrypt from 'bcrypt';
import {ConfigService} from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { GenereteProductKeyDto, signInDto } from './dtos/auth';



interface SignupParams {
  email:string;
  password:string
  name:string
  phone:string

}


@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService:ConfigService
  ) {
  }


  async signUp({email,name,phone,password}: SignupParams,userType:UserType) {
    const userExist = await this.prismaService.user.findFirst({
      where: { email: email }
    });
    if (userExist) throw new ConflictException('user exist', 'Your Email has been existed in in our database');
    let hashedPassword = await bcrypt.hash(password, 10);
    await this.prismaService.user.create({
      data:{
        name,
        phone,
        email,
        password: hashedPassword,
        user_type: 'BUYER'
      }
    });
    return [
      {
        status:200,
        msg:'successfully SignedUp'
      },
    ]
  }

  async signIn({ username, password}: signInDto ) {
    const user = await this.prismaService.user.findFirst({
      where: { email: username }
    });
    if (!user) throw new HttpException('Invalid Credential', 400);
    const hashedPassword = user.password;
    const isValidPassword = await bcrypt.compare(password, hashedPassword);
    if(!isValidPassword) throw new HttpException('Invalid Credential', 400);
    const token = await this.generateJWT(user.name, username);
    return [
      {
        status:200,
        msg:'successfully LogedIn',
        token
      },
    ]
  }

  generateProductKey(email:string,userType:string) {
    const string = `${email}-${userType}-${this.configService.get<string>('PRODUCT_KEY_SECRET')}`;
    return bcrypt.hash(string, 10);
  }

  private async generateJWT(name:string, email:string) {
    const token = await jwt.sign({
      name: name,
      email: email,
    }, this.configService.get<string>('SIGNUP_KEY_SECRET'), {
      expiresIn: 3600,
    });
    return token;
  }

}
