import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import rawBodyMiddleware from './order/rawBody.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(rawBodyMiddleware())
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
