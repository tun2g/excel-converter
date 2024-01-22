import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
import { HttpStatus, UnprocessableEntityException, ValidationPipe, VersioningType } from '@nestjs/common';
import { HttpExceptionFilter } from './lib/filters/entity-exception.filter';
import { BadRequestExceptionFilter } from './lib/filters/bad-request-exception.filter';
import * as process from 'process';
import { swaggerConfig } from './lib/configs/swagger/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{ bufferLogs: true });

  app.enableCors();
  app.use(helmet());

  app.enableVersioning({
      type: VersioningType.URI,
      defaultVersion: '1',
  });
  app.useLogger(app.get(Logger));

  const reflector = app.get(Reflector);

  app.useGlobalFilters(
    new HttpExceptionFilter(reflector),
    new BadRequestExceptionFilter(reflector)
  );

  app.useGlobalInterceptors(new LoggerErrorInterceptor());

  app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        transform: true,
        dismissDefaultMessages: true,
        exceptionFactory: (errors) => new UnprocessableEntityException(errors),
      }),
  );

  if(process.env.NODE_ENV !== 'prod'){
    swaggerConfig(app);
  }

  app.setGlobalPrefix("api");

  await app.listen(3000);
}
bootstrap();