import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import rawBodyMiddleware from './order/rawBody.middleware';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(rawBodyMiddleware());
  app.enableCors();
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Tickets shop API')
    .setDescription('Ticket shop API description')
    .setVersion('1.0')
    .addTag('tickets')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docu', app, document);
  await app.listen(3000);
}
bootstrap();
