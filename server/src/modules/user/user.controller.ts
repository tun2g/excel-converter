import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { Role } from 'src/security/decorators/role.decorator';
import { RoleType } from 'src/lib/constants';
import { ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ){

    }

    @HttpCode(HttpStatus.OK)
    @Get('/test')
    @Role([RoleType.USER])
    async test(){
        return {"oke":"oke"}
    }

}
