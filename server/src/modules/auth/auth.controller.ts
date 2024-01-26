import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res, ValidationPipe } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { RegisterUserDto } from './dtos/register-user.dto';
import { RoleType } from 'src/lib/constants';
import { AuthResponse } from './responses/auth.response';
import { ApiModelResponse } from 'src/lib/decorators';
import { LoginUserDto } from './dtos/login-user.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ){

    }

    @HttpCode(HttpStatus.CREATED)
    @Post('/signup')
    @ApiModelResponse({type: AuthResponse})
    async registerUser(
        @Body() registerUserDto : RegisterUserDto,
    ){
        return await this.authService.registerUser(registerUserDto, RoleType.USER);
    }

    @HttpCode(HttpStatus.OK)
    @Post('/signin')
    @ApiModelResponse({type: AuthResponse})
    async loginUser(
        @Body() loginUserDto : LoginUserDto,
    ){
        return await this.authService.loginUser(loginUserDto);
    }

}
