// NestJS REST API main entry point
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,              // remove unexpected fields
      forbidNonWhitelisted: true,  // throw error if unexpected fields are present
      transform: true,             // auto-convert types (e.g. string to number)
    }),
  );
  app.useGlobalInterceptors(new LoggingInterceptor());
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
  console.log(`✅ NestJS is running on: http://localhost:${process.env.PORT ?? 3000}`);
}
bootstrap();
