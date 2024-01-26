import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenUsage } from './entities/token-usage.entity';
import { TokenUsageRepository } from './token.repository';

@Module({
  imports:[TypeOrmModule.forFeature([TokenUsage])],
  providers: [
    TokenService,
    TokenUsageRepository,
  ],
  controllers: [TokenController],
  exports:[
    TokenService
  ]
})
export class TokenModule {}
