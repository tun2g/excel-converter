import { applyDecorators } from "@nestjs/common";
import { ApiPropertyOptions } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { Constructor } from "../types";
import { ToArray } from "./transform.decorator";


interface IFieldOptions {
    each?: boolean;
    swagger?: boolean;
    nullable?: boolean;
    groups?: string[];
}

type IClassFieldOptions = IFieldOptions;

export function IsClassField<TClass extends Constructor>(
        getClass: () => TClass,
        options: Omit<ApiPropertyOptions, 'type'> & IClassFieldOptions = {},
)
    : PropertyDecorator 
{
    const classValue = getClass();
  
    const decorators = [
      Type(() => classValue),
      ValidateNested({ each: options.each }),
    ];
  
    if (options.each) {
      decorators.push(ToArray());
    }
  
    return applyDecorators(...decorators);
}