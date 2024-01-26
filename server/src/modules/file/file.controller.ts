import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res, UploadedFile } from '@nestjs/common';
import { FileService } from './file.service';
import { Role } from 'src/security/decorators/role.decorator';
import { RoleType } from 'src/lib/constants';
import { ConvertDto } from './dto/convert.dto';
import { ApiFileModel } from 'src/lib/decorators';
import { ApiTags } from '@nestjs/swagger';

@Controller('file')
@ApiTags('file')
export class FileController {
    constructor(
        private readonly fileService: FileService    
    ){

    }

    @HttpCode(HttpStatus.OK)
    @Post('/convert')
    @Role([RoleType.USER, RoleType.NON_USER])
    @ApiFileModel(ConvertDto)
    async convertToExcel(
        @Req() req,
        @Body() convertDto: ConvertDto,
        @UploadedFile() file: Express.Multer.File,
        @Res() res
    ){
        return await this.fileService.convertToExcel(convertDto, req, res);
    }
}
