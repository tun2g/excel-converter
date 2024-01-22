import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CustomConfigService } from './env.config';
import { EnvVariableService } from './env.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [
    EnvVariableService,
    {
      provide: ConfigService,
      useClass: CustomConfigService,
    },
  ],
  exports: [ConfigModule, ConfigService, EnvVariableService],
})
export class ConfigurationModule {}