import { Body, Controller, Post, Headers, Req, BadRequestException, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import RequestWithRawBody from './requestWithRawBody.interface';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('order')
@Controller('order')
export class OrderController {
    constructor(private readonly OrderService: OrderService) {}

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post('create')
    async createOrder(@Body() order: any) {
      return await this.OrderService.createOrder(order);
    }

    @Post('/stripe-event')
    async handleIncomingEvents(
      @Headers('stripe-signature') signature: string,
      @Req() request: RequestWithRawBody
    ) {
      if (!signature) {
        throw new BadRequestException('Missing stripe-signature header');
      }
   
      return this.OrderService.constructEventFromPayload(signature, request.rawBody);
    }


}
