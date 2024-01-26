import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { TokenModule } from '../token/token.module';

@Module({
  imports:[
    TokenModule
  ],
  providers: [FileService],
  controllers: [FileController]
})
export class FileModule {}
