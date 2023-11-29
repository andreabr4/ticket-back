import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderSchema } from './order.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ConcertSchema } from 'src/concert/concert.schema';
import { UserSchema } from 'src/users/users.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: "order", schema: OrderSchema },  {name:"concert", schema: ConcertSchema}, {name:"user", schema: UserSchema}])],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
