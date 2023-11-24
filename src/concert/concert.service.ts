import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Concert, ConcertDocument } from './concert.schema';

@Injectable()
export class ConcertService {
  constructor(
    @InjectModel('concert') private concertModel: Model<ConcertDocument>,
  ) {}
  async createConcert(concert: any) {
    let newConcert = new Concert();
    newConcert.place = concert.place;
    newConcert.date = concert.date;
    newConcert.genre = concert.genre;
    newConcert.price = concert.price;
    newConcert.musician = concert.musician;
    newConcert.image = concert.image;
    newConcert.stock = concert.stock;
    newConcert.description = concert.description;

    return await this.concertModel.create(newConcert);
  }

  async showConcerts() {
    return await this.concertModel.find();
  }

  async showConcertGenre(genre: string) {
    return await this.concertModel.find({
      genre: genre,
    });
  }

  async getDistinctGenres() {
    return await this.concertModel.distinct('genre')
  }

  async deleteConcert(musician: string) {
    return await this.concertModel.deleteOne({
      musician: musician,
    });
  }

  async updateConcert(body: any) {
    return await this.concertModel.updateOne({'_id':body.id},body);
  }
}
