import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConcertModule } from './concert/concert.module';
import { OrderModule } from './order/order.module';
import { mongoConstants } from './keys/mongo';

@Module({
  imports: [MongooseModule.forRoot(mongoConstants.uri), UsersModule, AuthModule, ConcertModule, OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
