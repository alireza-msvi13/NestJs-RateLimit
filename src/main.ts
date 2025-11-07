import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerConfigInit } from './common/swagger/swagger.config';
import { RequestMethod } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  SwaggerConfigInit(app);
  app.setGlobalPrefix('v1', {
    exclude: [
      { path: '/', method: RequestMethod.GET },
      { path: '/', method: RequestMethod.HEAD },
    ],
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
