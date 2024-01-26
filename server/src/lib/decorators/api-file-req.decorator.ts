import { UseInterceptors, applyDecorators } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiExtraModels, ApiOperation, getSchemaPath } from '@nestjs/swagger';

export function ApiFileModel(dtoType): MethodDecorator {
    return applyDecorators(
      UseInterceptors(FileInterceptor('file')),
      ApiConsumes('multipart/form-data'),
      ApiExtraModels(dtoType),
      ApiOperation({ summary: 'Upload a file' }),
      ApiBody({
        schema: {
          allOf: [
            {
                $ref: getSchemaPath(dtoType)
            },
            {
                type: 'object',
                properties: {
                  file: {
                    type: 'string',
                    format: 'binary',
                  },
                },
            }
          ]
        },
      })
    );
  }
