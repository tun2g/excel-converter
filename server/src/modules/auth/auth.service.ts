import { BadGatewayException, BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Response } from 'express';
import { RegisterUserDto } from './dtos/register-user.dto';
import { CustomBadRequestException } from 'src/lib/exceptions/bad-request';

@Injectable()
export class AuthService {

    private readonly logger = new Logger(AuthService.name);


    async registerUser(
        registerUserDto: RegisterUserDto,
    ){
        
    }
}
