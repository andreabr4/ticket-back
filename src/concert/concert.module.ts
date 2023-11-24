import { Module } from '@nestjs/common';
import { ConcertService } from './concert.service';
import { ConcertController } from './concert.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConcertSchema } from './concert.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: "concert", schema: ConcertSchema }])],
  providers: [ConcertService],
  controllers: [ConcertController]
})
export class ConcertModule {}
