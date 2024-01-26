import {
    IsEmpty,
    IsEnum,
    IsString,
} from 'class-validator';
import { FileOutputType } from '../types/file-output.type';
import { FileInputType } from '../types/file-input.type';
import { ApiProperty } from '@nestjs/swagger';

export class ConvertDto {
    @IsEnum(FileOutputType)
    @ApiProperty()
    outputType: FileOutputType;

    @IsEnum(FileInputType)
    @ApiProperty()
    inputType: FileInputType;
}