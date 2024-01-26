import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from 'src/security/jwt/jwt.module';
import { IsExistValidator, UniqueValidator } from 'src/lib/validators';


@Module({
  imports:[
    UserModule,
    JwtModule,
  ],
  providers: [
    AuthService,
    UniqueValidator,
    IsExistValidator
  ],
  controllers: [AuthController]
})
export class AuthModule {}
