import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './typeorm.config';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
        useClass: TypeOrmConfigService,
        dataSourceFactory: async (options) => {
          return await new DataSource(options).initialize();
        },
      }), 
  ],
  exports: [TypeOrmModule],
})
export class ConfigTypeormModule {}