import { applyDecorators, type Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

export function ApiModelResponse<T extends Type>(options: {
  type: T;
  description?: string;
  status?: number;
}): MethodDecorator {
  return applyDecorators(
    ApiExtraModels(options.type),
    ApiOkResponse({
      description: options.description,
      status: options.status,
      schema: {
           $ref: getSchemaPath(options.type) }  
    }),
  );
}
