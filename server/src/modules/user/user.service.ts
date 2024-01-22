import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { FindOptionsWhere } from 'typeorm';
import { User } from './entities/user.entity';
import { RegisterUserDto } from '../auth/dtos/register-user.dto';
import { Response } from 'express';

@Injectable()
export class UserService {
    constructor(
        @Inject('UserRepository')
        private readonly userRepository: UserRepository
    ){

    }

    async registerUser(
        registerDto: RegisterUserDto, 
        res: Response
    ){
        
    }

    async findOne(data: FindOptionsWhere<User>): Promise<User> {
        return this.userRepository.findOne({
          where: data,
        });
    }

}
