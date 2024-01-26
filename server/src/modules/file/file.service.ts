import { HttpStatus, Injectable } from '@nestjs/common';
import { TokenService } from '../token/token.service';
import { ConvertDto } from './dto/convert.dto';
import * as ExcelJs from "exceljs";
import * as fs from "fs";
import { FileOutputType } from './types/file-output.type';
import { RoleType } from 'src/lib/constants';
import { FileInputType } from './types/file-input.type';

@Injectable()
export class FileService {

    constructor(
        private readonly tokenService: TokenService
    ){

    }

    async convertToExcel(convertDto: ConvertDto, req, res){
        const user = req?.user || req?.ipAddress;
        const role = req.roles[0];
        const using = await this.tokenService.useToken(role.name, user);  
        
        if(!using){
            return res.status(HttpStatus.TOO_MANY_REQUESTS).json({
                message : "Too many requests."
            })
        }
        
        let json;
        switch(convertDto.inputType){
            case FileInputType.JSON_TEXT:
                json = req.body.json;
                break;
            case FileInputType.JSON_FILE:
                const buffer = req.file.buffer;
                const jsonContent = buffer.toString('utf8'); 
                json = JSON.parse(jsonContent);
                break;
        }
        const columns = Object.keys(json[0]);

        const rows = [];
        json.forEach((data) => {
            const row = []
            columns.forEach((key) => {
                row.push(data[key]);
            });
            rows.push(row);
        });

        const buffer = await this.createFile(columns, rows, convertDto.outputType);
        
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.set('Content-Disposition', `attachment; filename=convert.${convertDto.outputType}`);
        return res.send(buffer);
    }

    async createFile(
        columns: string[],
        rows : any[] = [],
        outputType: FileOutputType,
        stored : boolean = true,
    )
     : Promise<ExcelJs.Buffer>
    {
        const workbook = new ExcelJs.Workbook();
        const worksheet = workbook.addWorksheet("Sheet 1"); 
        const headerRow = worksheet.addRow(columns);
        headerRow.font = { bold: true };
        
        for(let i=0;i < rows.length; i++){
            worksheet.addRow(rows[i]);
        }
        let buffer : ExcelJs.Buffer;
        
        switch(outputType){
            case FileOutputType.XLSX: 
                buffer = await workbook.xlsx.writeBuffer();
                break;
            case FileOutputType.CSV:
                buffer = await workbook.csv.writeBuffer();
                break;
        }   

        const uint8Array = new Uint8Array(buffer);

        stored && fs.writeFileSync(`./uploads/files/convert.${outputType}`, uint8Array);
        
        return buffer;
    } 

}
