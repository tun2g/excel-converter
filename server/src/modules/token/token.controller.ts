import { Controller, Get, HttpCode, HttpStatus, Req } from '@nestjs/common';
import { TokenService } from './token.service';
import { Role } from 'src/security/decorators/role.decorator';
import { RoleType } from 'src/lib/constants';
import { ApiTags } from '@nestjs/swagger';

@Controller('token')
@ApiTags('token')
export class TokenController {
    constructor(
        private readonly tokenService: TokenService
    ){

    }

    @HttpCode(HttpStatus.OK)
    @Get('/used-today')
    @Role([RoleType.USER, RoleType.NON_USER])
    async getUsedTokenToday(
        @Req() req
    ){
        const user = req?.user || req.ipAddress;
        return await this.tokenService.getUsedTokenToday(user);
    }
}
