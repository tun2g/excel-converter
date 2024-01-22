import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvVariableService } from '../env/env.service';

@Module({
  imports: [
    BullModule.forRootAsync({
      inject: [EnvVariableService],
      useFactory: (envVarService: EnvVariableService) => ({
        redis: {
            host: envVarService.getEnv().redis.host,
            port: envVarService.getEnv().redis.port,
            username: envVarService.getEnv().redis.username,
            password: envVarService.getEnv().redis.password,
        },
      }),
    }),
  ],
})
export class BullConfigModule {}