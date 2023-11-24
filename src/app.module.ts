import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConcertModule } from './concert/concert.module';

@Module({
  imports: [MongooseModule.forRoot("mongodb://127.0.0.1:27017/ticketApp"), UsersModule, AuthModule, ConcertModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
