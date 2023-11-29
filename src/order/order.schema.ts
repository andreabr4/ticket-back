import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type OrderDocument = Order & Document; 

@Schema()
export class Order {

@Prop({required:true})
email:string; 

@Prop({required:true})
quantity:number;

@Prop({required:true})
productID:string; 

@Prop({required:true})
priceID:string; 

@Prop({required:true})
date:Date; 

@Prop({required:true})
paid:boolean; 

@Prop({required:true})
checkoutSessionID:string;

@Prop({required:true})
consumed:boolean; 

@Prop({required:true})
event:[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);