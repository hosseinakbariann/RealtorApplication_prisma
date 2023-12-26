import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import * as jwt from 'jsonwebtoken';
import {ConfigService} from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';

interface JwtPayload {
  name:string;
  email: string
  id: number
}


@Injectable()
export class AuthGuard implements CanActivate{
  constructor(
    private readonly reflector:Reflector,
    private readonly configService:ConfigService,
    private readonly prismaService: PrismaService
  ) {}
  async canActivate(context:ExecutionContext) {
    const roles = this.reflector.getAllAndOverride('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (roles.length>0) {
      const request = context.switchToHttp().getRequest();
      const token = request?.headers?.authorization?.split('Bearer ')[1];
      try {
        const user = jwt.verify(token,this.configService.get<string>('SIGNUP_KEY_SECRET')) as JwtPayload;
        if(!user) return false
        const userInfo = await this.prismaService.user.findFirst({
          where:{
            email:user.email
          }
        });
        if(roles.includes(userInfo.user_type.toString())) return true;
        return false;
      }catch (e) {
        return false
      }
    }

    return false;
  }
}