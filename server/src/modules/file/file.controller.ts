import { Controller, HttpCode, HttpStatus, Post, Req } from '@nestjs/common';
import { FileService } from './file.service';
import { Role } from 'src/security/decorators/role.decorator';
import { RoleType } from 'src/lib/constants';

@Controller('file')
export class FileController {
    constructor(
        private readonly fileService: FileService    
    ){

    }

    @HttpCode(HttpStatus.OK)
    @Post('/convert')
    @Role([RoleType.USER, RoleType.NON_USER])
    async convertToExcel(
        @Req() req
    ){
        const user = req?.user || req?.ipAddress;
        const role = req?.roles[0]; 
        return await this.fileService.convertToExcel(user, role);
    }
    
}
