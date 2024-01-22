import { Global, Module } from '@nestjs/common';
import { HttpRequestContextService } from './http-request-context.service';
import { HttpRequestContextMiddleware } from './http-request-context.middleware';

@Global()
@Module({
  providers: [HttpRequestContextService, HttpRequestContextMiddleware],
  exports: [HttpRequestContextService, HttpRequestContextMiddleware],
})
export class HttpRequestContextModule {}
