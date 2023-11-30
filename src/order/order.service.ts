import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './order.schema';
import { Resend } from 'resend';
import { EmailTemplatePurchase } from 'src/components/Purchase';
import { ConcertDocument } from 'src/concert/concert.schema';
import { UserDocument } from 'src/users/users.schema';
import * as QRCode from 'qrcode';
import * as PDFDocument from 'pdfkit';
import * as fs from 'fs';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class OrderService {
  constructor(
    @InjectModel('order') private orderModel: Model<OrderDocument>,
    @InjectModel('concert') private concertModel: Model<ConcertDocument>,
    @InjectModel('user') private readonly userModel: Model<UserDocument>,
    private configService: ConfigService
  ) {}
 

  async createOrder(order: any) {
    const stripe = require('stripe')(
      this.configService.get<string>('STRIPE_API_KEY')
    );
    const checkout = await stripe.checkout.sessions.create({
      success_url: this.configService.get<string>('SUCCESS_URL'),
      line_items: [{ price: order.priceID, quantity: order.quantity }],
      customer_email: order.email,
      mode: 'payment',
    });

    let newOrder = new Order();
    newOrder.email = order.email;
    newOrder.productID = order.productID;
    newOrder.priceID = order.priceID;
    newOrder.date = new Date();
    newOrder.quantity = order.quantity;
    newOrder.paid = false;
    newOrder.checkoutSessionID = checkout.id;
    newOrder.consumed = false;

    await this.orderModel.create(newOrder);

    return { uri: checkout.url };
  }

  public async constructEventFromPayload(signature: string, payload: Buffer) {
    const stripe = require('stripe')(
      this.configService.get<string>('STRIPE_API_KEY')
    );
    let upcomingEvent = await stripe.webhooks.constructEvent(
      payload,
      signature,
      this.configService.get<string>('WEBHOOK_SECRET'),
    );

    if (
      (upcomingEvent.type =
        'checkout.session.completed' &&
        upcomingEvent.data.object.object == 'checkout.session' &&
        upcomingEvent.data.object.payment_status == 'paid')
    ) {
      await this.orderModel.updateOne(
        { checkoutSessionID: upcomingEvent.data.object.id },
        { paid: true },
      );
      let orderCompleted = await this.orderModel.findOne({
        checkoutSessionID: upcomingEvent.data.object.id,
      });

      let orderUser = await this.userModel.findOne({
        email: orderCompleted.email,
      });

      let orderConcert = await this.concertModel.findOne({
        productID: orderCompleted.productID,
      });

      orderConcert.stock

      let stockUpdate = await this.concertModel.updateOne({
        productID: orderConcert.productID},
        {stock:(orderConcert.stock - orderCompleted.quantity)}
        )

      const resend = new Resend(this.configService.get<string>('RESEND_API_KEY'));

      const doc = new PDFDocument();
      const buffers: Buffer[] = [];

      doc.on('data', (buffer) => buffers.push(buffer));
      const logoPath = './src/components/logoBlack.png';
      const logoSize = { width: 100 };
      const qrSize = { width: 100, height: 100 };

      if (fs.existsSync(logoPath)) {
        const logoX = (doc.page.width - logoSize.width) / 2;
        doc.image(logoPath, logoX, 40, logoSize);
      }

      doc.fontSize(20).text('', { align: 'center' });
      doc.moveDown(4.5);
      let orderTotalPrice =orderCompleted.quantity*orderConcert.price

      const texts = [
        `Name: ${orderUser.name}`,
        `Surname:  ${orderUser.surname}`,
        `Musician:  ${orderConcert.musician}`,
        `Description: ${orderConcert.description.en}`,
        `Place: ${orderConcert.place.city}, ${orderConcert.place.country}`,
        `Date: ${orderConcert.date.toLocaleString()}`,
        `Quantity: ${orderCompleted.quantity}`,
        `Price: ${orderTotalPrice} €`,
      ];

      texts.forEach((text) => {
        doc.fontSize(12).text(text, { align: 'center' });
      });

      // Generate QR Code
      const qrCodeDataURL = await QRCode.toDataURL(orderCompleted.checkoutSessionID, {
        errorCorrectionLevel: 'H',
      });
      const qrX = (doc.page.width - qrSize.width) / 2;
      doc.image(qrCodeDataURL, qrX, doc.y, qrSize);
      doc.end();

      doc.on('end', () => {
        const pdfData = Buffer.concat(buffers);
        // Optionally, save to a file to check

        resend.emails.send({
          from: 'onboarding@resend.dev',
          to: [orderCompleted.email],
          subject: `Here are your tickets, ${orderUser.name} -Enjoy them!`,
          react: EmailTemplatePurchase({
            name: orderUser.name,
            surname: orderUser.surname,
          }),
          attachments: [
            {
              filename: `${orderConcert.musician}_ticket.pdf`,
              content: pdfData,
            },
          ],
        });
      });
    }

    return;
  }
}
