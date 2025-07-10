import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,              // remove unexpected fields
    forbidNonWhitelisted: true,  // throw error if unexpected fields are present
    transform: true,             // auto-convert types (e.g. string to number)
  }),
);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
