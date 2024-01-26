import { Injectable } from '@nestjs/common';
import { TokenService } from '../token/token.service';
import { RoleType } from 'src/lib/constants';
import { Role } from '../role/entities/role.entity';

@Injectable()
export class FileService {

    constructor(
        private readonly tokenService: TokenService
    ){

    }

    async convertToExcel(user: string, role: Role){
        const using = await this.tokenService.useToken(role.name, user);  
        if(using === true){
            return "oke";
        }
        else {
            return "false";
        }      
    }

}
