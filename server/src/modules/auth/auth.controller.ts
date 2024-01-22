import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { RegisterUserDto } from './dtos/register-user.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ){

    }

    @HttpCode(HttpStatus.CREATED)
    @Post('/signup')
    async registerUser(
        @Body() registerUserDto : RegisterUserDto,
        @Res() res : Response
    ){
        await this.authService.registerUser(registerUserDto);
    }

}
