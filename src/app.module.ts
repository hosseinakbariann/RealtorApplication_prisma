import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import {ConfigModule} from '@nestjs/config';
import { HomeModule } from './home/home.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UserInterceptor } from './user/interceptors/user.interceptor';


@Module({
  imports: [UserModule, PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    HomeModule],
  controllers: [AppController],
  providers: [AppService,{
    provide:APP_INTERCEPTOR,
    useClass:UserInterceptor
  }]
})
export class AppModule {}

