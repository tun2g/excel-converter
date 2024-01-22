import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { EnvVariableService } from '../lib/configs/env/env.service';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(
    private readonly envVarService : EnvVariableService

  ) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    
    return {
      type: this.envVarService.getEnv().db.type,
      host: this.envVarService.getEnv().db.host,
      port: this.envVarService.getEnv().db.port || 5432,
      username: this.envVarService.getEnv().db.username,
      password: this.envVarService.getEnv().db.password,
      database: this.envVarService.getEnv().db.database,
      synchronize: true,
      autoLoadEntities:true,
      dropSchema: false,
      logging: this.envVarService.getEnv().nodeEnv !== 'prod',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
      cli: {
        entitiesDir: 'src',
        migrationsDir: 'src/lib/configs/database/migrations',
        subscribersDir: 'subscriber',
      },
    } as TypeOrmModuleOptions;
  }
}
