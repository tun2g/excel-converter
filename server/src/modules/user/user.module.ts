import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRole } from './entities/user-role.entity';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [
    RoleModule,
    TypeOrmModule.forFeature([User, UserRole])
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
  ],
  exports:[
    UserService
  ]
})
export class UserModule {
  
}
