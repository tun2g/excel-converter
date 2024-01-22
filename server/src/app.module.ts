import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { AuthModule } from './modules/auth/auth.module';
import { RoleModule } from './modules/role/role.module';
import loggerModuleParams from './lib/configs/logger/logger';
import { ConfigurationModule } from './lib/configs/env/env.module';
import { ConfigTypeormModule } from './database/typeorm.module';
import { RequestIdHeaderMiddleware } from './lib/middlewares/request-id-header.middleware';
import { HttpRequestContextMiddleware } from './lib/http-request-context/http-request-context.middleware';
import { HttpRequestContextModule } from './lib/http-request-context/http-request-context.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigurationModule,
    AuthModule, 
    RoleModule,
    ConfigTypeormModule,
    HttpRequestContextModule,
    LoggerModule.forRootAsync(loggerModuleParams),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIdHeaderMiddleware, HttpRequestContextMiddleware).forRoutes('*');
  }
}
