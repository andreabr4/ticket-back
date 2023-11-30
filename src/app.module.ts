import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConcertModule } from './concert/concert.module';
import { OrderModule } from './order/order.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StatusModule } from './status/status.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }), 
    UsersModule, 
    AuthModule, 
    ConcertModule, 
    OrderModule,
    ConfigModule.forRoot(
      {isGlobal:true,
        envFilePath: '.env',
      }  
  ),
    StatusModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
