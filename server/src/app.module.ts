import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
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
import { AuthMiddleware } from './security/middlewares/auth.middleware';
import { JwtModule } from './security/jwt/jwt.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './security/guards/role.guard';
import { FileModule } from './modules/file/file.module';
import { TokenModule } from './modules/token/token.module';

@Module({
  imports: [
    ConfigurationModule,
    AuthModule, 
    RoleModule,
    ConfigTypeormModule,
    HttpRequestContextModule,
    LoggerModule.forRootAsync(loggerModuleParams),
    UserModule,
    JwtModule,
    FileModule,
    TokenModule,
  ],
  controllers: [],
  providers: [
      {
          provide: APP_GUARD,
          useClass: RolesGuard,
      },
  ],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIdHeaderMiddleware, HttpRequestContextMiddleware).forRoutes('*');
    consumer
            .apply(AuthMiddleware)
            .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
