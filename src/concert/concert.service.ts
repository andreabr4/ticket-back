import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Concert, ConcertDocument } from './concert.schema';
import { stripeConsants } from 'src/keys/stripe';
const stripe = require('stripe')(
  stripeConsants.secret,
);
// EL APIKEY NO TIENE QUE IR AQUI

@Injectable()
export class ConcertService {
  constructor(
    @InjectModel('concert') private concertModel: Model<ConcertDocument>,
  ) {}
  async createConcert(concert: any) {
    const product = await stripe.products.create({
      name: concert.musician + " - " + concert.place.city + " | " + concert.date.toLocaleString()
    });

    const price = await stripe.prices.create({
      unit_amount: concert.price*100,
      currency: 'eur',
      product: product.id,
    });

    let newConcert = new Concert();
    newConcert.place = concert.place;
    newConcert.date = concert.date;
    newConcert.genre = concert.genre;
    newConcert.price = concert.price;
    newConcert.musician = concert.musician;
    newConcert.image = concert.image;
    newConcert.stock = concert.stock;
    newConcert.description = concert.description;
    newConcert.productID=product.id
    newConcert.priceID=price.id,
    newConcert.spotifyID =concert.spotify
    

    return await this.concertModel.create(newConcert)
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
    return await this.concertModel.distinct('genre');
  }

  async deleteConcert(musician: string) {
    return await this.concertModel.deleteOne({
      musician: musician,
    });
  }

  async updateConcert(body: any) {
    return await this.concertModel.updateOne({ _id: body.id }, body);
  }
}
