import { Injectable } from '@nestjs/common';
import { TokenService } from '../token/token.service';
import { ConvertDto } from './dto/convert.dto';
import * as ExcelJs from "exceljs";
import * as fs from "fs";
import { ColorOutput, FileOutputType } from './types/file-output.type';
import { FileInputType } from './types/file-input.type';
import { CustomBadRequestException } from 'src/lib/exceptions/bad-request';

@Injectable()
export class FileService {
    private colorMapping : { [key in ColorOutput]: ExcelJs.Color };

    constructor(
        private readonly tokenService: TokenService
    ){
        const colorsMapping : { [key in ColorOutput]: ExcelJs.Color }= {
            [ColorOutput.RED]: { argb: 'FF00FF00', theme: 100 },
            [ColorOutput.GREEN]: { argb: 'green', theme: 1 },
            [ColorOutput.DEFAULT] : { argb: 'default', theme: 1},
            [ColorOutput.BLUE]: { argb: 'blue', theme: 1 },
            [ColorOutput.YELLOW]: { argb: 'yellow', theme: 1}, 
        }
        this.colorMapping = colorsMapping;
    }

    async convertToExcel(convertDto: ConvertDto, req, res){
        const user = req?.user || req?.ipAddress;
        const role = req.roles[0];
        const using = await this.tokenService.useToken(role.name, user);  
        
        // if(!using){
        //     return res.status(HttpStatus.TOO_MANY_REQUESTS).json({
        //         message : "Too many requests."
        //     })
        // }
        
        let json;
        switch(convertDto.inputType){
            case FileInputType.JSON_TEXT:
                json = req.body?.json;
                break;
            case FileInputType.JSON_FILE:
                const buffer = req.file.buffer;
                const jsonContent = buffer.toString('utf8'); 
                json = JSON.parse(jsonContent);
                break;
        }

        try {
            let isColored = convertDto?.color !== ColorOutput.DEFAULT;
            const color = isColored ? this.colorMapping[convertDto?.color] : isColored;
            const buffer = await this.createBasicFile(json, convertDto.outputType, color);
            
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.set('Content-Disposition', `attachment; filename=convert.${convertDto.outputType}`);
            return res.send(buffer);
            
        } catch (error) {
            throw new CustomBadRequestException({details: [{message: "Bad request", error: "invalid_data"}]});
        }
    }

    private processObject(obj,worksheet : ExcelJs.Worksheet ,prefix = '') {

        for (const key in obj) {
          
          if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            const currentKey = key;
    
            if (typeof value === 'object' && !Array.isArray(value)) {
                worksheet.addRow([currentKey, value]);
            } else {
                this.processObject(value, worksheet, currentKey);
            }
          }
        }   
    }

    private setColor(worksheet : ExcelJs.Worksheet, color : ExcelJs.Color){

        worksheet.eachRow(function(row, rowNumber){
            row.eachCell( function(cell, colNumber){
                if(cell.value && cell.value)
                    row.getCell(colNumber).font = {color: {argb: "004e47cc"}};
            });
        });
    }

    private async getOutputFile(
        workbook : ExcelJs.Workbook, 
        outputType : FileOutputType, 
    ){
        let buffer : ExcelJs.Buffer;
        switch(outputType){
            case FileOutputType.XLSX: 
                buffer = await workbook.xlsx.writeBuffer();
                break;
            case FileOutputType.CSV:
                buffer = await workbook.csv.writeBuffer();
                break;
        }
        return buffer; 
    }

    async createConplexFile(
        json: any,
        outputType: FileOutputType,
        stored: boolean = true
    ){
        const workbook = new ExcelJs.Workbook();
        const worksheet = workbook.addWorksheet("Sheet 1"); 
        this.processObject(json, worksheet, outputType);

        let buffer : ExcelJs.Buffer = await this.getOutputFile(workbook, outputType);

        stored && fs.writeFileSync(`./uploads/files/convert.${outputType}`, new Uint8Array(buffer));

        return buffer;
    }

    async createBasicFile(
        json : any,
        outputType: FileOutputType,
        color : ExcelJs.Color | boolean,
        stored : boolean = true,
    )
     : Promise<ExcelJs.Buffer>
    {
        const columns = json.length >0 ? Object.keys(json[0]) : [];
        const rows = [];
        json.forEach((data) => {
            const row = []
            columns.forEach((key) => {
                row.push(data[key]);
            });
            rows.push(row);
        });
        const workbook = new ExcelJs.Workbook();
        let worksheet = workbook.addWorksheet("Sheet 1"); 
        const headerRow = worksheet.addRow(columns);
        headerRow.font = { bold: true };
        
        for(let i=0;i < rows.length; i++){
            worksheet.addRow(rows[i]);
        }
        if(typeof(color) !== "boolean"){
            this.setColor(worksheet, color);
        }
        worksheet.getRow(1).fill = {
            type: 'pattern',
            pattern:'solid',
            fgColor:{ argb:'cccccc' }
        }
        let buffer : ExcelJs.Buffer = await this.getOutputFile(workbook, outputType);

        const uint8Array = new Uint8Array(buffer);
        
        stored && fs.writeFileSync(`./uploads/files/convert.${outputType}`, uint8Array);
        
        return buffer;
    } 

}
