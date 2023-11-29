import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema()
export class Place {
  @Prop({ required: true })
  city: string;
  
  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  latitude: number;

  @Prop({ required: true })
  longitude: number;
}

@Schema()
export class Description {
  @Prop({ required: true })
  en: string;
  
  @Prop()
  es: string; 
}

export type ConcertDocument = Concert & Document;


@Schema()
export class Concert {
  @Prop({ required: true })
  place: Place;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  genre: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  musician: string;

  @Prop({ required: false })
  image: string;

  @Prop({ required: true })
  stock: number;

  @Prop({ required: true })
  description: Description;

  @Prop({ required: true })
  productID: string;

  @Prop({ required: true })
  priceID: string;

  @Prop({required:true})
  spotifyID:string;
}

export const ConcertSchema = SchemaFactory.createForClass(Concert);
