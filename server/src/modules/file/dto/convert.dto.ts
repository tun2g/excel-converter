import {
    IsEnum, IsOptional,
} from 'class-validator';
import { ColorOutput, FileOutputType } from '../types/file-output.type';
import { FileInputType } from '../types/file-input.type';
import { ApiProperty } from '@nestjs/swagger';

export class ConvertDto {
    @IsEnum(FileOutputType)
    @ApiProperty()
    outputType: FileOutputType;

    @IsEnum(FileInputType)
    @ApiProperty()
    inputType: FileInputType;

    @IsEnum(ColorOutput)
    @ApiProperty()
    @IsOptional()
    color : ColorOutput;
}